-- Create properties table
create table properties (
  id text primary key,
  title text,
  location text,
  price text,
  type text,
  status text,
  beds text,
  baths text,
  sqft text,
  image text,
  features text[],
  description text
);

-- Create team_members table
create table team_members (
  id text primary key,
  name text,
  role text,
  description text,
  image text
);

-- Create storage bucket for images
insert into storage.buckets (id, name, public) 
values ('images', 'images', true);

-- Enable Row Level Security (RLS)
alter table properties enable row level security;
alter table team_members enable row level security;

-- Create policies for properties (Anyone can read, only authenticated can write)
create policy "Public properties are viewable by everyone." on properties for select using (true);
create policy "Authenticated users can insert properties." on properties for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update properties." on properties for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete properties." on properties for delete using (auth.role() = 'authenticated');

-- Create policies for team_members (Anyone can read, only authenticated can write)
create policy "Public team members are viewable by everyone." on team_members for select using (true);
create policy "Authenticated users can insert team members." on team_members for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update team members." on team_members for update using (auth.role() = 'authenticated');
create policy "Authenticated users can delete team members." on team_members for delete using (auth.role() = 'authenticated');

-- Create policies for storage bucket (Anyone can view, only authenticated can upload)
create policy "Public images are viewable by everyone." on storage.objects for select using (bucket_id = 'images');
create policy "Authenticated users can upload images." on storage.objects for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "Authenticated users can update images." on storage.objects for update using (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "Authenticated users can delete images." on storage.objects for delete using (bucket_id = 'images' and auth.role() = 'authenticated');
