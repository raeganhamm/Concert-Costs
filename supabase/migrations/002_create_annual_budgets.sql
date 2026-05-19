create table public.annual_budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year integer not null check (year >= 2000 and year <= 2100),
  annual_budget numeric(10, 2) not null check (annual_budget >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, year)
);

create index annual_budgets_user_id_year_idx on public.annual_budgets (user_id, year);

alter table public.annual_budgets enable row level security;

create policy "Users can view own annual budgets"
  on public.annual_budgets
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own annual budgets"
  on public.annual_budgets
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own annual budgets"
  on public.annual_budgets
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
