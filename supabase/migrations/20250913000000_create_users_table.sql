-- Create users table
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  full_name text,
  avatar_url text,
  email text
);

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;

-- Create a trigger to update the updated_at column
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

create trigger update_users_updated_at 
  before update on public.users 
  for each row 
  execute procedure public.update_updated_at_column();