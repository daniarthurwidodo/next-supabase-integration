-- Update the sync function to preserve existing user data
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Insert a new row into public.users when a user is created in auth.users
  insert into public.users (id, full_name, email, created_at, updated_at)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    new.created_at,
    new.updated_at
  );
  return new;
exception
  when unique_violation then
    -- If the user already exists, only update email and timestamps
    -- Preserve existing full_name and avatar_url
    update public.users 
    set 
      email = new.email,
      updated_at = new.updated_at
    where id = new.id;
    return new;
end;
$$ language plpgsql security definer;