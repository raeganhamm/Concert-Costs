create table public.concerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  concert_name text not null,
  artist text not null,
  venue text not null,
  city text not null,
  state text not null,
  concert_date date not null,
  distance_from_home numeric(8, 2),
  hours_at_event numeric(6, 2) not null check (hours_at_event > 0),
  ticket_cost numeric(10, 2) not null default 0,
  ticket_fees numeric(10, 2) not null default 0,
  parking_cost numeric(10, 2) not null default 0,
  food_drink_cost numeric(10, 2) not null default 0,
  merchandise_cost numeric(10, 2) not null default 0,
  lodging_cost numeric(10, 2) not null default 0,
  travel_cost numeric(10, 2) not null default 0,
  other_cost numeric(10, 2) not null default 0,
  fun_rating integer not null check (fun_rating between 1 and 10),
  notes text,
  created_at timestamptz not null default now()
);

create index concerts_user_id_concert_date_idx on public.concerts (user_id, concert_date desc);

alter table public.concerts enable row level security;

create policy "Users can view own concerts"
  on public.concerts
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own concerts"
  on public.concerts
  for insert
  to authenticated
  with check (auth.uid() = user_id);
