export type ProfileRole = "member" | "admin";
export type ReportType = "financial" | "performance" | "minutes";
export type SubscriptionStatus = "active" | "pending" | "expired";
export type SupportRequestStatus = "pending" | "rejected" | "completed";
export type ContactMessageStatus = "new" | "read" | "archived";
export type Gender = "male" | "female";
export type NewsCategory = "family" | "fund";
export type TaskStatus = "todo" | "in_progress" | "done";

export type User = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string;
  phone: string | null;
  national_id: string | null;
  avatar_url: string | null;
  role: ProfileRole;
  family_member_id: string | null;
  created_at: string;
};

export type FamilyBranch = {
  id: string;
  name: string;
  parent_branch_id: string | null;
};

export type FamilyMember = {
  id: string;
  profile_id: string | null;
  full_name: string;
  national_id: string | null;
  gender: Gender;
  birth_date: string | null;
  death_date: string | null;
  father_id: string | null;
  mother_id: string | null;
  branch_id: string | null;
  photo_url: string | null;
};

export type BoardMember = {
  id: string;
  full_name: string;
  role_title: string;
  photo_url: string | null;
  order_index: number;
  bio: string | null;
};

export type InitiativeType = {
  id: string;
  title: string;
  order_index: number;
};

export type Initiative = {
  id: string;
  initiative_type_id: string;
  title: string;
  description: string;
  icon: string | null;
  order_index: number;
};

export type Report = {
  id: string;
  type: ReportType;
  title: string;
  file_url: string;
  period_label: string | null;
  published_date: string;
};

export type Subscription = {
  id: string;
  profile_id: string;
  plan_name: string;
  amount: string;
  status: SubscriptionStatus;
  start_date: string;
  end_date: string | null;
};

export type SupportRequest = {
  id: string;
  profile_id: string;
  initiative_id: string | null;
  description: string;
  status: SupportRequestStatus;
  admin_comment: string | null;
  created_at: string;
};

export type SupportRequestWithDetails = SupportRequest & {
  member_name: string;
  initiative_title: string | null;
};

export type ContactMessage = {
  id: string;
  full_name: string;
  mobile: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
};

export type NewsItem = {
  id: string;
  category: NewsCategory;
  title: string;
  body: string;
  published_date: string;
};

export type Video = {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  published_date: string;
};

export type MagazineIssue = {
  id: string;
  title: string;
  issue_label: string | null;
  file_url: string;
  published_date: string;
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  assignee_id: string | null;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
};

export type TaskWithAssignee = Task & {
  assignee_name: string | null;
};
