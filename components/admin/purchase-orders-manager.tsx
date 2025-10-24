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
import type { PurchaseOrder } from "@/lib/db-schema"

export function PurchaseOrdersManager() {
  const { purchaseOrders, suppliers, addPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingPO, setEditingPO] = useState<PurchaseOrder | null>(null)
  const [formData, setFormData] = useState<Partial<PurchaseOrder>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPO) {
      updatePurchaseOrder(editingPO.id, formData)
    } else {
      const newPO: PurchaseOrder = {
        id: Date.now().toString(),
        po_number: formData.po_number || "",
        supplier_id: formData.supplier_id || suppliers[0]?.id || "1",
        order_date: formData.order_date || new Date().toISOString().split("T")[0],
        delivery_date: formData.delivery_date || new Date().toISOString().split("T")[0],
        status: formData.status || "created",
        total_amount: formData.total_amount || 0,
        currency: formData.currency || "GEL",
        payment_terms: formData.payment_terms || "",
        created_by: "admin",
        created_at: new Date().toISOString(),
      }
      addPurchaseOrder(newPO)
    }
    setIsOpen(false)
    setEditingPO(null)
    setFormData({})
  }

  const handleEdit = (po: PurchaseOrder) => {
    setEditingPO(po)
    setFormData(po)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this purchase order?")) {
      deletePurchaseOrder(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Purchase Orders Management</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingPO(null)
                  setFormData({})
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingPO ? "Edit Purchase Order" : "Add New Purchase Order"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>PO Number</Label>
                    <Input
                      value={formData.po_number || ""}
                      onChange={(e) => setFormData({ ...formData, po_number: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Supplier</Label>
                    <Select
                      value={formData.supplier_id}
                      onValueChange={(value) => setFormData({ ...formData, supplier_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.name}
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
                        <SelectItem value="created">Created</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="purchased">Purchased</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
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
                    <Label>Payment Terms</Label>
                    <Input
                      value={formData.payment_terms || ""}
                      onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingPO ? "Update" : "Create"}</Button>
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
              <TableHead>PO Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((po) => {
              const supplier = suppliers.find((s) => s.id === po.supplier_id)
              return (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.po_number}</TableCell>
                  <TableCell>{supplier?.name || "Unknown"}</TableCell>
                  <TableCell>{po.order_date}</TableCell>
                  <TableCell>{po.delivery_date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        po.status === "approved" || po.status === "received"
                          ? "bg-green-500/10 text-green-500"
                          : po.status === "created"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {po.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {po.total_amount.toLocaleString()} {po.currency}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(po)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(po.id)}>
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
