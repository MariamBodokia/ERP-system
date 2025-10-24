# ERP System Database Setup Guide

This guide explains how to set up and modify the database for the ERP system.

## Database Schema Overview

The ERP system uses the following main tables:

### Core Tables

1. **users** - System users and authentication
2. **contracts** - Legal contracts and agreements
3. **purchase_orders** - Procurement orders
4. **suppliers** - Supplier information
5. **warehouses** - Warehouse locations
6. **inventory_items** - Stock and inventory
7. **sales_orders** - Customer orders
8. **customers** - Customer information
9. **accounting_entries** - Financial transactions

## Setup Instructions

### Option 1: Using Supabase (Recommended)

1. **Connect Supabase Integration**
   - Click "Connect" in the sidebar
   - Select "Supabase" from the integrations list
   - Follow the authentication flow

2. **Run SQL Scripts**
   - Navigate to the `scripts` folder in your project
   - Execute the SQL files in order:
     - `01-create-tables.sql`
     - `02-seed-data.sql`

3. **Verify Setup**
   - Check the Supabase dashboard to confirm tables are created
   - Verify sample data is loaded

### Option 2: Using Neon Database

1. **Connect Neon Integration**
   - Click "Connect" in the sidebar
   - Select "Neon" from the integrations list
   - Authorize the connection

2. **Run Migration Scripts**
   - Use the same SQL scripts from the `scripts` folder
   - Execute in the Neon SQL editor

## Database Schema Details

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  language VARCHAR(2) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Contracts Table
\`\`\`sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  party_buyer VARCHAR(255) NOT NULL,
  party_seller VARCHAR(255) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  payment_terms TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Purchase Orders Table
\`\`\`sql
CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number VARCHAR(50) UNIQUE NOT NULL,
  supplier_id UUID REFERENCES suppliers(id),
  order_date DATE NOT NULL,
  delivery_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  payment_terms TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Suppliers Table
\`\`\`sql
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  tax_id VARCHAR(50) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_resident BOOLEAN DEFAULT true,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  rating DECIMAL(3,2),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Inventory Items Table
\`\`\`sql
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  unit_of_measure VARCHAR(20) NOT NULL,
  warehouse_id UUID REFERENCES warehouses(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  min_quantity INTEGER NOT NULL DEFAULT 0,
  max_quantity INTEGER NOT NULL DEFAULT 0,
  unit_price DECIMAL(15,2) NOT NULL,
  lot_number VARCHAR(50),
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Warehouses Table
\`\`\`sql
CREATE TABLE warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Sales Orders Table
\`\`\`sql
CREATE TABLE sales_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id),
  order_date DATE NOT NULL,
  delivery_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL,
  total_amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  payment_method VARCHAR(50),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Customers Table
\`\`\`sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  tax_id VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  segment VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Accounting Entries Table
\`\`\`sql
CREATE TABLE accounting_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_number VARCHAR(50) UNIQUE NOT NULL,
  entry_date DATE NOT NULL,
  type VARCHAR(50) NOT NULL,
  debit_account VARCHAR(20) NOT NULL,
  credit_account VARCHAR(20) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  description TEXT,
  reference_doc VARCHAR(100),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Modifying the Database

### Adding a New Table

1. Create a new SQL file in the `scripts` folder (e.g., `03-add-new-table.sql`)
2. Define your table schema:
\`\`\`sql
CREATE TABLE your_table_name (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Add your columns here
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`
3. Run the script through your database provider

### Adding Columns to Existing Tables

\`\`\`sql
ALTER TABLE table_name 
ADD COLUMN new_column_name VARCHAR(255);
\`\`\`

### Creating Indexes for Performance

\`\`\`sql
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_inventory_sku ON inventory_items(sku);
CREATE INDEX idx_sales_customer ON sales_orders(customer_id);
\`\`\`

### Setting Up Row Level Security (RLS) - Supabase Only

\`\`\`sql
-- Enable RLS
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view their own contracts"
ON contracts FOR SELECT
USING (auth.uid() = created_by);
\`\`\`

## Data Migration

### Exporting Data
\`\`\`sql
COPY table_name TO '/path/to/file.csv' CSV HEADER;
\`\`\`

### Importing Data
\`\`\`sql
COPY table_name FROM '/path/to/file.csv' CSV HEADER;
\`\`\`

## Backup and Restore

### Creating a Backup
- **Supabase**: Use the Supabase dashboard backup feature
- **Neon**: Use `pg_dump` command:
\`\`\`bash
pg_dump -h your-host -U your-user -d your-database > backup.sql
\`\`\`

### Restoring from Backup
\`\`\`bash
psql -h your-host -U your-user -d your-database < backup.sql
\`\`\`

## Common Modifications

### Adding a New Module

1. Design your table schema
2. Create migration script
3. Update TypeScript interfaces in `lib/db-schema.ts`
4. Add mock data in `lib/mock-data.ts`
5. Create UI pages for the module

### Changing Data Types

\`\`\`sql
ALTER TABLE table_name 
ALTER COLUMN column_name TYPE new_data_type;
\`\`\`

### Adding Constraints

\`\`\`sql
ALTER TABLE table_name
ADD CONSTRAINT constraint_name CHECK (condition);
\`\`\`

## Environment Variables

Make sure to set these environment variables:

- `DATABASE_URL` - Your database connection string
- `SUPABASE_URL` - Supabase project URL (if using Supabase)
- `SUPABASE_ANON_KEY` - Supabase anonymous key (if using Supabase)

## Troubleshooting

### Connection Issues
- Verify your connection string is correct
- Check firewall settings
- Ensure database is running

### Permission Errors
- Verify user has necessary privileges
- Check RLS policies (Supabase)

### Performance Issues
- Add indexes on frequently queried columns
- Use EXPLAIN ANALYZE to identify slow queries
- Consider partitioning large tables

## Support

For additional help:
- Check the integration documentation in the Connect sidebar
- Review the database provider's documentation
- Contact support through the Help menu
