-- Create the bookings table
create table if not exists public.bookings (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  phone text not null,
  service text not null,
  date date not null,
  time time not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.bookings enable row level security;

-- Create a policy that allows all operations for now (you can make it more restrictive later)
create policy "Enable all operations for all users" on public.bookings
  for all
  using (true)
  with check (true); 