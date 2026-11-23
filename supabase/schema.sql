-- Stan Creatives Supabase foundation
-- Run this in Supabase SQL Editor. RLS is enabled; customer/order writes
-- are intentionally blocked until secure Edge Functions are added.

create table if not exists public.products (
  id bigint primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  description text,
  price_kes integer not null default 0 check (price_kes >= 0),
  active boolean not null default true,
  images jsonb not null default '[]'::jsonb,
  options jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique,
  customer_name text not null,
  email text not null,
  phone text not null,
  delivery_address text not null,
  city text not null,
  delivery_notes text,
  currency text not null default 'KES',
  subtotal integer not null default 0 check (subtotal >= 0),
  delivery_fee integer not null default 0 check (delivery_fee >= 0),
  total integer not null default 0 check (total >= 0),
  payment_method text,
  payment_status text not null default 'pending',
  status text not null default 'received',
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id),
  product_name text not null,
  colour text,
  size text,
  quantity integer not null check (quantity > 0),
  unit_price integer not null check (unit_price >= 0),
  personalization jsonb not null default '{}'::jsonb
);

create table if not exists public.design_requests (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  email text,
  phone text,
  product_id bigint references public.products(id),
  product_name text,
  colour text,
  size text,
  placement text,
  design_text text,
  artwork_path text,
  preview_data jsonb not null default '{}'::jsonb,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text,
  amount integer not null check (amount >= 0),
  currency text not null default 'KES',
  status text not null default 'pending',
  provider_payload jsonb,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.design_requests enable row level security;
alter table public.payments enable row level security;

-- Anyone can view active products; only authenticated admins will be able
-- to edit after admin roles are configured.
create policy "Public can read active products"
  on public.products for select
  using (active = true);

-- Intentionally no public policies on orders, order_items, design_requests,
-- or payments. Add secure Edge Functions and admin auth before accepting data.
