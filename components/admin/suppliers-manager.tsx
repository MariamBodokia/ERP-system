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
import type { Supplier } from "@/lib/db-schema"
import { Checkbox } from "@/components/ui/checkbox"

export function SuppliersManager() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [formData, setFormData] = useState<Partial<Supplier>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSupplier) {
      updateSupplier(editingSupplier.id, formData)
    } else {
      const newSupplier: Supplier = {
        id: Date.now().toString(),
        name: formData.name || "",
        tax_id: formData.tax_id || "",
        country: formData.country || "",
        is_resident: formData.is_resident || false,
        contact_email: formData.contact_email || "",
        contact_phone: formData.contact_phone || "",
        rating: formData.rating || 0,
        status: formData.status || "active",
        created_at: new Date().toISOString(),
      }
      addSupplier(newSupplier)
    }
    setIsOpen(false)
    setEditingSupplier(null)
    setFormData({})
  }

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier)
    setFormData(supplier)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      deleteSupplier(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Suppliers Management</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingSupplier(null)
                  setFormData({})
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingSupplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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
                    <Label>Country</Label>
                    <Input
                      value={formData.country || ""}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email (example: user@domain.com)"
                      value={formData.contact_email || ""}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={formData.contact_phone || ""}
                      onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Rating (0-5)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating || ""}
                      onChange={(e) => setFormData({ ...formData, rating: Number.parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox
                      id="is_resident"
                      checked={formData.is_resident || false}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_resident: checked as boolean })}
                    />
                    <Label htmlFor="is_resident">Is Resident</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingSupplier ? "Update" : "Create"}</Button>
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
              <TableHead>Country</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.tax_id}</TableCell>
                <TableCell>{supplier.country}</TableCell>
                <TableCell>{supplier.contact_email}</TableCell>
                <TableCell>{supplier.contact_phone}</TableCell>
                <TableCell>{supplier.rating.toFixed(1)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      supplier.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {supplier.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(supplier)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(supplier.id)}>
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
