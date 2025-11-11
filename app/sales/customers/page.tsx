"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Customer } from "@/lib/db-schema"

const navItems = [
  { title: "Sales Orders", titleKa: "გაყიდვის შეკვეთები", href: "/sales" },
  { title: "Customers", titleKa: "კლიენტები", href: "/sales/customers" },
  { title: "Invoices", titleKa: "ინვოისები", href: "/sales/invoices" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/sales/reports" },
]

export default function CustomersPage() {
  const { customers, addCustomer } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<Customer>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: formData.name || "",
      tax_id: formData.tax_id || "",
      email: formData.email || "",
      phone: formData.phone || "",
      segment: formData.segment || "regular",
      status: formData.status || "active",
      created_at: new Date().toISOString(),
    }
    addCustomer(newCustomer)
    setIsOpen(false)
    setFormData({})
  }

  return (
    <ModuleLayout moduleName="Sales Management" moduleNameKa="გაყიდვების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground">Manage customer relationships and information</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email (example: user@domain.com)"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID</Label>
                  <Input
                    id="tax_id"
                    value={formData.tax_id || ""}
                    onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="segment">Segment</Label>
                  <Select
                    value={formData.segment || "regular"}
                    onValueChange={(value) => setFormData({ ...formData, segment: value as Customer['segment'] })}
                  >
                    <SelectTrigger id="segment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Add Customer</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {customers.map((customer) => (
            <Card key={customer.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{customer.name}</CardTitle>
                      <CardDescription>{customer.email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        customer.segment === "vip"
                          ? "default"
                          : customer.segment === "regular"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {customer.segment}
                    </Badge>
                    <Badge variant="outline">{customer.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tax ID</p>
                    <p className="font-medium text-foreground">{customer.tax_id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">{new Date(customer.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ModuleLayout>
  )
}
