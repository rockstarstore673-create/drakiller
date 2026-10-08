-- DRAKILLER Supabase Database Schema
-- Copy semua query ini dan paste ke Supabase SQL Editor, lalu jalankan

create extension if not exists "pgcrypto";

-- ============================================================================
-- PROFILES TABLE - User profile data
-- ============================================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  email text not null,
  role text not null default 'user' check (role in ('user','admin','super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- PROJECTS TABLE - User project management
-- ============================================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- PROJECT_FILES TABLE - Files dalam project
-- ============================================================================
create table if not exists project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  file_name text not null,
  file_type text not null,
  file_size bigint not null default 0,
  file_url text not null,
  file_path text not null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- PROCESSING_JOBS TABLE - Photo/video enhancement queue
-- ============================================================================
create table if not exists processing_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  tool_type text not null,
  input_file_url text,
  output_file_url text,
  status text not null default 'queued' check (status in ('queued','processing','completed','failed','cancelled')),
  progress integer not null default 0,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- AI_CONVERSATIONS TABLE - AI chat history
-- ============================================================================
create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  model text not null default 'llama-3.1-8b-instant',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- AI_MESSAGES TABLE - Messages dalam conversation
-- ============================================================================
create table if not exists ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references ai_conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  model text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- GITHUB_HISTORY TABLE - GitHub search history
-- ============================================================================
create table if not exists github_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  repository_url text not null,
  repository_name text not null,
  owner text not null,
  search_query text not null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- FAVORITES TABLE - Saved tools, projects, repositories
-- ============================================================================
create table if not exists favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  item_type text not null check (item_type in ('tool','project','repository')),
  item_id text not null,
  item_name text not null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- AUDIT_LOGS TABLE - Track user actions untuk security
-- ============================================================================
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  action text not null,
  resource text not null,
  details text,
  ip_address text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- SYSTEM_SETTINGS TABLE - Admin settings
-- ============================================================================
create table if not exists system_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- ANNOUNCEMENTS TABLE - Admin announcements untuk users
-- ============================================================================
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  type text not null default 'info' check (type in ('info','warning','success')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- REPORTS TABLE - User feedback dan abuse reports
-- ============================================================================
create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  category text not null,
  description text not null,
  status text not null default 'open' check (status in ('open','in_progress','resolved','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================
alter table profiles enable row level security;
alter table projects enable row level security;
alter table project_files enable row level security;
alter table processing_jobs enable row level security;
alter table ai_conversations enable row level security;
alter table ai_messages enable row level security;
alter table github_history enable row level security;
alter table favorites enable row level security;
alter table audit_logs enable row level security;

-- ============================================================================
-- RLS POLICIES - PROFILES
-- ============================================================================
create policy "profiles_select_own"
on profiles
for select
using (auth.uid() = id);

create policy "profiles_insert_own"
on profiles
for insert
with check (auth.uid() = id);

create policy "profiles_update_own"
on profiles
for update
using (auth.uid() = id);

-- ============================================================================
-- RLS POLICIES - PROJECTS
-- ============================================================================
create policy "projects_select_own"
on projects
for select
using (auth.uid() = user_id);

create policy "projects_insert_own"
on projects
for insert
with check (auth.uid() = user_id);

create policy "projects_update_own"
on projects
for update
using (auth.uid() = user_id);

create policy "projects_delete_own"
on projects
for delete
using (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - PROJECT_FILES
-- ============================================================================
create policy "project_files_select_own"
on project_files
for select
using (
  exists (
    select 1 from projects p
    where p.id = project_files.project_id
      and p.user_id = auth.uid()
  )
);

-- ============================================================================
-- RLS POLICIES - PROCESSING_JOBS
-- ============================================================================
create policy "jobs_select_own"
on processing_jobs
for select
using (auth.uid() = user_id);

create policy "jobs_insert_own"
on processing_jobs
for insert
with check (auth.uid() = user_id);

create policy "jobs_update_own"
on processing_jobs
for update
using (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - AI_CONVERSATIONS
-- ============================================================================
create policy "ai_conversations_select_own"
on ai_conversations
for select
using (auth.uid() = user_id);

create policy "ai_conversations_insert_own"
on ai_conversations
for insert
with check (auth.uid() = user_id);

create policy "ai_conversations_update_own"
on ai_conversations
for update
using (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - AI_MESSAGES
-- ============================================================================
create policy "ai_messages_select_own"
on ai_messages
for select
using (
  exists (
    select 1 from ai_conversations c
    where c.id = ai_messages.conversation_id
      and c.user_id = auth.uid()
  )
);

create policy "ai_messages_insert_own"
on ai_messages
for insert
with check (
  exists (
    select 1 from ai_conversations c
    where c.id = ai_messages.conversation_id
      and c.user_id = auth.uid()
  )
);

-- ============================================================================
-- RLS POLICIES - GITHUB_HISTORY
-- ============================================================================
create policy "github_history_select_own"
on github_history
for select
using (auth.uid() = user_id);

create policy "github_history_insert_own"
on github_history
for insert
with check (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - FAVORITES
-- ============================================================================
create policy "favorites_select_own"
on favorites
for select
using (auth.uid() = user_id);

create policy "favorites_insert_own"
on favorites
for insert
with check (auth.uid() = user_id);

create policy "favorites_delete_own"
on favorites
for delete
using (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES - AUDIT_LOGS (Admin only dapat akses semua)
-- ============================================================================
create policy "audit_logs_insert"
on audit_logs
for insert
with check (true);

-- ============================================================================
-- INDEXES untuk performa
-- ============================================================================
create index idx_projects_user_id on projects(user_id);
create index idx_project_files_project_id on project_files(project_id);
create index idx_processing_jobs_user_id on processing_jobs(user_id);
create index idx_processing_jobs_status on processing_jobs(status);
create index idx_ai_conversations_user_id on ai_conversations(user_id);
create index idx_ai_messages_conversation_id on ai_messages(conversation_id);
create index idx_github_history_user_id on github_history(user_id);
create index idx_favorites_user_id on favorites(user_id);
create index idx_audit_logs_user_id on audit_logs(user_id);
create index idx_audit_logs_created_at on audit_logs(created_at);
