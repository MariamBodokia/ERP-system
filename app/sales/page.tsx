"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingBag } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SalesOrder } from "@/lib/db-schema"

const navItems = [
  { title: "Sales Orders", titleKa: "გაყიდვის შეკვეთები", href: "/sales" },
  { title: "Customers", titleKa: "კლიენტები", href: "/sales/customers" },
  { title: "Invoices", titleKa: "ინვოისები", href: "/sales/invoices" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/sales/reports" },
]

export default function SalesPage() {
  const { salesOrders, customers, addSalesOrder } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<SalesOrder>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newOrder: SalesOrder = {
      id: Date.now().toString(),
      order_number: `SO-${Date.now()}`,
      customer_id: formData.customer_id || "",
      order_date: new Date().toISOString(),
      delivery_date: formData.delivery_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "new",
      total_amount: Number(formData.total_amount) || 0,
      currency: formData.currency || "USD",
      payment_method: formData.payment_method || "card",
      created_by: "current-user", // TODO: Add user management
      created_at: new Date().toISOString(),
    }
    addSalesOrder(newOrder)
    setIsOpen(false)
    setFormData({})
  }

  return (
    <ModuleLayout moduleName="Sales Management" moduleNameKa="გაყიდვების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Orders</h1>
            <p className="text-muted-foreground">Manage customer orders and sales</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Sales Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Sales Order</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    value={formData.customer_id || ""}
                    onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
                  >
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_amount">Total Amount</Label>
                  <Input
                    id="total_amount"
                    type="number"
                    value={formData.total_amount || ""}
                    onChange={(e) => setFormData({ ...formData, total_amount: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency || "USD"}
                    onValueChange={(value) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment_method">Payment Method</Label>
                  <Select
                    value={formData.payment_method || "card"}
                    onValueChange={(value) => setFormData({ ...formData, payment_method: value })}
                  >
                    <SelectTrigger id="payment_method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Create Order</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {salesOrders.map((order) => {
            const customer = customers.find((c) => c.id === order.customer_id)
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>{order.order_number}</CardTitle>
                        <CardDescription>Customer: {customer?.name}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default">{order.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Order Date</p>
                      <p className="font-medium text-foreground">{order.order_date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Delivery Date</p>
                      <p className="font-medium text-foreground">{order.delivery_date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium text-foreground">
                        {order.currency} {order.total_amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment Method</p>
                      <p className="font-medium text-foreground">{order.payment_method}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </ModuleLayout>
  )
}
