-- Sample content for local/demo use. Run after 0001_init.sql.
-- Auth users (member + admin demo accounts) are created separately —
-- see supabase/README.md — because auth.users needs the Admin API.

-- ── Board of Trustees ────────────────────────────────────────────────────
insert into board_members (full_name, role_title, order_index, bio) values
  ('عبدالله المعجب', 'رئيس مجلس الأمناء', 1, 'يقود مجلس الأمناء منذ تأسيس الصندوق، بخبرة تمتد لأكثر من عشرين عامًا في العمل المؤسسي.'),
  ('سلطان المعجب', 'نائب رئيس مجلس الأمناء', 2, 'يشرف على متابعة تنفيذ استراتيجيات الصندوق ومبادراته.'),
  ('فهد المعجب', 'أمين الصندوق (المسؤول المالي)', 3, 'مسؤول عن الإدارة المالية وإعداد التقارير الدورية للصندوق.'),
  ('ماجد المعجب', 'رئيس اللجنة التنفيذية', 4, 'يتولى الإشراف على تنفيذ المبادرات والبرامج اليومية.'),
  ('نواف المعجب', 'عضو مجلس الأمناء', 5, null),
  ('تركي المعجب', 'عضو مجلس الأمناء', 6, null);

-- ── Initiatives ──────────────────────────────────────────────────────────
insert into initiatives (category, title, description, order_index) values
  ('social_support', 'الإغاثة الطارئة', 'دعم عاجل لأفراد العائلة في الحالات الطارئة والظروف الاستثنائية.', 1),
  ('social_support', 'إعانة الزواج', 'مساهمة مالية للمقبلين على الزواج من أبناء العائلة.', 2),
  ('social_support', 'المساعدة الصحية', 'دعم تكاليف العلاج للحالات الصحية غير المغطاة.', 3),
  ('scientific_excellence', 'برنامج التفوق العلمي', 'تكريم الأوائل من الطلاب والمواهب الواعدة في العائلة.', 4),
  ('gatherings', 'اللقاءات والفعاليات العائلية', 'تنظيم لقاءات دورية ومناسبات اجتماعية لتعزيز التواصل.', 5),
  ('investment', 'الاستثمار وتنمية الأصول', 'مبادرات لتنمية أصول الصندوق وضمان استدامته المالية.', 6);

-- ── Reports ──────────────────────────────────────────────────────────────
-- file_url values are placeholders; replace with real paths once report
-- files are uploaded to the "reports" storage bucket via the admin panel.
insert into reports (type, title, period_label, published_date, file_url) values
  ('financial', 'التقرير المالي السنوي', '2025', '2026-01-15', 'reports/financial-2025.pdf'),
  ('financial', 'التقرير المالي النصف سنوي', 'النصف الأول 2025', '2025-07-10', 'reports/financial-h1-2025.pdf'),
  ('performance', 'تقرير الإنجازات السنوي', '2025', '2026-01-20', 'reports/performance-2025.pdf'),
  ('minutes', 'محضر اجتماع الجمعية العمومية', 'يناير 2026', '2026-01-25', 'reports/minutes-2026-01.pdf');

-- ── Family branches & sample tree ────────────────────────────────────────
with root_branch as (
  insert into family_branches (name) values ('الفرع الرئيسي') returning id
)
insert into family_members (full_name, gender, birth_date, branch_id)
select 'المعجب الجد الأول', 'male', '1930-01-01', id from root_branch;

with grandfather as (
  select id from family_members where full_name = 'المعجب الجد الأول'
), branch as (
  select id from family_branches where name = 'الفرع الرئيسي'
)
insert into family_members (full_name, gender, birth_date, father_id, branch_id)
select v.full_name, v.gender, v.birth_date, grandfather.id, branch.id
from grandfather, branch,
  (values
    ('عبدالله المعجب', 'male', '1955-03-10'),
    ('سلطان المعجب', 'male', '1958-06-22'),
    ('نورة المعجب', 'female', '1960-09-05')
  ) as v(full_name, gender, birth_date);

with father as (
  select id from family_members where full_name = 'عبدالله المعجب'
), branch as (
  select id from family_branches where name = 'الفرع الرئيسي'
)
insert into family_members (full_name, gender, birth_date, father_id, branch_id)
select v.full_name, v.gender, v.birth_date, father.id, branch.id
from father, branch,
  (values
    ('فهد المعجب', 'male', '1985-02-14'),
    ('ماجد المعجب', 'male', '1988-11-30'),
    ('هند المعجب', 'female', '1990-04-18')
  ) as v(full_name, gender, birth_date);
