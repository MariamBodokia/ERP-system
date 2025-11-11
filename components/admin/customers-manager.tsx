"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDataStore } from "@/lib/data-store"
import type { Customer } from "@/lib/db-schema"

export function CustomersManager() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [formData, setFormData] = useState<Partial<Customer>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData)
    } else {
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
    }
    setIsOpen(false)
    setEditingCustomer(null)
    setFormData({})
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setFormData(customer)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customers Management</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingCustomer(null)
                  setFormData({})
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Tax ID</Label>
                  <Input
                    value={formData.tax_id || ""}
                    onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email (example: user@domain.com)"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Segment</Label>
                  <Select
                    value={formData.segment}
                    onValueChange={(value) => setFormData({ ...formData, segment: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingCustomer ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Tax ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.tax_id}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell className="capitalize">{customer.segment}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {customer.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(customer)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteCustomer(customer.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
