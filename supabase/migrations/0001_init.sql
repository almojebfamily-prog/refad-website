-- Refad Family Fund — initial schema
-- Run this in the Supabase SQL editor (or `supabase db push`) against a fresh project.

create extension if not exists "pgcrypto";

-- ── Enums ────────────────────────────────────────────────────────────────
create type profile_role as enum ('member', 'admin');
create type report_type as enum ('financial', 'performance', 'minutes');
create type initiative_category as enum (
  'social_support', 'scientific_excellence', 'gatherings', 'investment'
);
create type subscription_status as enum ('active', 'pending', 'expired');
create type support_request_status as enum (
  'pending', 'approved', 'rejected', 'completed'
);
create type contact_message_status as enum ('new', 'read', 'archived');
create type gender as enum ('male', 'female');

-- ── Tables ───────────────────────────────────────────────────────────────
create table family_branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parent_branch_id uuid references family_branches (id) on delete set null
);

create table family_members (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  gender gender not null,
  birth_date date,
  death_date date,
  father_id uuid references family_members (id) on delete set null,
  mother_id uuid references family_members (id) on delete set null,
  branch_id uuid references family_branches (id) on delete set null,
  photo_url text
);

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text,
  avatar_url text,
  role profile_role not null default 'member',
  family_member_id uuid references family_members (id) on delete set null,
  created_at timestamptz not null default now()
);

create table board_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role_title text not null,
  photo_url text,
  order_index int not null default 0,
  bio text
);

create table initiatives (
  id uuid primary key default gen_random_uuid(),
  category initiative_category not null,
  title text not null,
  description text not null,
  icon text,
  order_index int not null default 0
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  type report_type not null,
  title text not null,
  file_url text not null,
  period_label text,
  published_date date not null default current_date
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  plan_name text not null,
  amount numeric(10, 2) not null,
  status subscription_status not null default 'pending',
  start_date date not null default current_date,
  end_date date
);

create table support_requests (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles (id) on delete cascade,
  initiative_id uuid references initiatives (id) on delete set null,
  description text not null,
  status support_request_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile text not null,
  subject text not null,
  message text not null,
  status contact_message_status not null default 'new',
  created_at timestamptz not null default now()
);

-- ── Helper: is the current user an admin? ───────────────────────────────
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- ── RLS ──────────────────────────────────────────────────────────────────
alter table profiles enable row level security;
alter table family_branches enable row level security;
alter table family_members enable row level security;
alter table board_members enable row level security;
alter table initiatives enable row level security;
alter table reports enable row level security;
alter table subscriptions enable row level security;
alter table support_requests enable row level security;
alter table contact_messages enable row level security;

-- Public-read reference content (shown on the public Refad Fund pages)
create policy "board_members are publicly readable" on board_members
  for select using (true);
create policy "initiatives are publicly readable" on initiatives
  for select using (true);
create policy "reports are publicly readable" on reports
  for select using (true);

-- Admin-only writes on public reference content
create policy "admins manage board_members" on board_members
  for all using (is_admin()) with check (is_admin());
create policy "admins manage initiatives" on initiatives
  for all using (is_admin()) with check (is_admin());
create policy "admins manage reports" on reports
  for all using (is_admin()) with check (is_admin());

-- Profiles: owner or admin
create policy "profiles are viewable by owner or admin" on profiles
  for select using (auth.uid() = id or is_admin());
create policy "profiles are editable by owner or admin" on profiles
  for update using (auth.uid() = id or is_admin());
create policy "admins insert profiles" on profiles
  for insert with check (is_admin() or auth.uid() = id);

-- Family tree: any authenticated member can read; only admins write
create policy "family data readable by authenticated members" on family_branches
  for select using (auth.role() = 'authenticated');
create policy "family data readable by authenticated members" on family_members
  for select using (auth.role() = 'authenticated');
create policy "admins manage family_branches" on family_branches
  for all using (is_admin()) with check (is_admin());
create policy "admins manage family_members" on family_members
  for all using (is_admin()) with check (is_admin());

-- Subscriptions: owner or admin
create policy "subscriptions viewable by owner or admin" on subscriptions
  for select using (auth.uid() = profile_id or is_admin());
create policy "admins manage subscriptions" on subscriptions
  for all using (is_admin()) with check (is_admin());

-- Support requests: owner creates/reads their own; admin manages all
create policy "members view own support_requests" on support_requests
  for select using (auth.uid() = profile_id or is_admin());
create policy "members create own support_requests" on support_requests
  for insert with check (auth.uid() = profile_id);
create policy "admins update support_requests" on support_requests
  for update using (is_admin());

-- Contact messages: anyone can submit, only admins can read
create policy "anyone can submit a contact message" on contact_messages
  for insert with check (true);
create policy "admins read contact_messages" on contact_messages
  for select using (is_admin());
create policy "admins update contact_messages" on contact_messages
  for update using (is_admin());

-- ── Storage buckets ──────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('reports', 'reports', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('family-photos', 'family-photos', true)
on conflict (id) do nothing;

create policy "public read reports bucket" on storage.objects
  for select using (bucket_id = 'reports');
create policy "admins write reports bucket" on storage.objects
  for insert with check (bucket_id = 'reports' and is_admin());
create policy "admins delete reports bucket" on storage.objects
  for delete using (bucket_id = 'reports' and is_admin());

create policy "public read avatars bucket" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "owners write avatars bucket" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');
create policy "owners update avatars bucket" on storage.objects
  for update using (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "public read family-photos bucket" on storage.objects
  for select using (bucket_id = 'family-photos');
create policy "admins write family-photos bucket" on storage.objects
  for insert with check (bucket_id = 'family-photos' and is_admin());
