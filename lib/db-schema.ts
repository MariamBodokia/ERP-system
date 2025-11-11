export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "accountant" | "warehouse" | "sales" | "hr"
  language: "en" | "ka" // English or Georgian
  created_at: string
}

export interface Contract {
  id: string
  contract_number: string
  title: string
  type: "sales" | "purchase" | "service" | "lease" | "license" | "partnership"
  status: "draft" | "active" | "expired" | "cancelled"
  party_buyer: string
  party_seller: string
  amount: number
  currency: string
  start_date: string
  end_date: string
  payment_terms: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface PurchaseOrder {
  id: string
  po_number: string
  supplier_id: string
  order_date: string
  delivery_date: string
  status: "created" | "approved" | "cancelled" | "purchased" | "paid" | "received"
  total_amount: number
  currency: string
  payment_terms: string
  created_by: string
  created_at: string
}

export interface PurchaseOrderItem {
  id: string
  po_id: string
  sku: string
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface Supplier {
  id: string
  name: string
  tax_id: string
  country: string
  is_resident: boolean
  contact_email: string
  contact_phone: string
  rating: number
  status: "active" | "inactive"
  created_at: string
}

export interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  unit_of_measure: string
  warehouse_id: string
  quantity: number
  min_quantity: number
  max_quantity: number
  unit_price: number
  status?: "in-stock" | "low-stock" | "out-of-stock" | "overstock"
  lot_number?: string
  expiry_date?: string
  created_at: string
  updated_at: string
}

export interface Warehouse {
  id: string
  name: string
  location: string
  type: "main" | "regional" | "retail"
  status: "active" | "inactive"
  created_at: string
}

export interface SalesOrder {
  id: string
  order_number: string
  customer_id: string
  order_date: string
  delivery_date: string
  status: "new" | "processing" | "shipped" | "paid" | "closed"
  total_amount: number
  currency: string
  payment_method: string
  created_by: string
  created_at: string
}

export interface Customer {
  id: string
  name: string
  tax_id: string
  email: string
  phone: string
  segment: "vip" | "regular" | "new"
  status: "active" | "inactive"
  created_at: string
}

export interface AccountingEntry {
  id: string
  entry_number: string
  entry_date: string
  type: "income" | "expense" | "transfer"
  debit_account: string
  credit_account: string
  amount: number
  currency: string
  description: string
  reference_doc?: string
  created_by: string
  created_at: string
}
