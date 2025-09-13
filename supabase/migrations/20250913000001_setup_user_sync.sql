-- Function to create a user in public.users when a user is created in auth.users
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
    -- If the user already exists, update the record
    update public.users 
    set 
      full_name = coalesce(new.raw_user_meta_data->>'full_name', ''),
      email = new.email,
      updated_at = new.updated_at
    where id = new.id;
    return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function when a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute procedure public.handle_new_user();