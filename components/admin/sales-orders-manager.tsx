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
import type { SalesOrder } from "@/lib/db-schema"

export function SalesOrdersManager() {
  const { salesOrders, customers, addSalesOrder, updateSalesOrder, deleteSalesOrder } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingSO, setEditingSO] = useState<SalesOrder | null>(null)
  const [formData, setFormData] = useState<Partial<SalesOrder>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSO) {
      updateSalesOrder(editingSO.id, formData)
    } else {
      const newSO: SalesOrder = {
        id: Date.now().toString(),
        order_number: formData.order_number || "",
        customer_id: formData.customer_id || customers[0]?.id || "1",
        order_date: formData.order_date || new Date().toISOString().split("T")[0],
        delivery_date: formData.delivery_date || new Date().toISOString().split("T")[0],
        status: formData.status || "new",
        total_amount: formData.total_amount || 0,
        currency: formData.currency || "GEL",
        payment_method: formData.payment_method || "",
        created_by: "admin",
        created_at: new Date().toISOString(),
      }
      addSalesOrder(newSO)
    }
    setIsOpen(false)
    setEditingSO(null)
    setFormData({})
  }

  const handleEdit = (so: SalesOrder) => {
    setEditingSO(so)
    setFormData(so)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sales order?")) {
      deleteSalesOrder(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sales Orders Management</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingSO(null)
                  setFormData({})
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sales Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingSO ? "Edit Sales Order" : "Add New Sales Order"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Order Number</Label>
                    <Input
                      value={formData.order_number || ""}
                      onChange={(e) => setFormData({ ...formData, order_number: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Customer</Label>
                    <Select
                      value={formData.customer_id}
                      onValueChange={(value) => setFormData({ ...formData, customer_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
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
                  <div>
                    <Label>Order Date</Label>
                    <Input
                      type="date"
                      value={formData.order_date || ""}
                      onChange={(e) => setFormData({ ...formData, order_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Delivery Date</Label>
                    <Input
                      type="date"
                      value={formData.delivery_date || ""}
                      onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                      required
                    />
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
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Total Amount</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.total_amount || ""}
                      onChange={(e) => setFormData({ ...formData, total_amount: Number.parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GEL">GEL</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Payment Method</Label>
                    <Input
                      value={formData.payment_method || ""}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingSO ? "Update" : "Create"}</Button>
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
              <TableHead>Order Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesOrders.map((so) => {
              const customer = customers.find((c) => c.id === so.customer_id)
              return (
                <TableRow key={so.id}>
                  <TableCell className="font-medium">{so.order_number}</TableCell>
                  <TableCell>{customer?.name || "Unknown"}</TableCell>
                  <TableCell>{so.order_date}</TableCell>
                  <TableCell>{so.delivery_date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        so.status === "paid" || so.status === "closed"
                          ? "bg-green-500/10 text-green-500"
                          : so.status === "new"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {so.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {so.total_amount.toLocaleString()} {so.currency}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(so)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(so.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
