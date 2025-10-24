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
import type { InventoryItem } from "@/lib/db-schema"

export function InventoryManager() {
  const { inventory, warehouses, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [formData, setFormData] = useState<Partial<InventoryItem>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      updateInventoryItem(editingItem.id, { ...formData, updated_at: new Date().toISOString() })
    } else {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        sku: formData.sku || "",
        name: formData.name || "",
        category: formData.category || "",
        unit_of_measure: formData.unit_of_measure || "pcs",
        warehouse_id: formData.warehouse_id || warehouses[0]?.id || "1",
        quantity: formData.quantity || 0,
        min_quantity: formData.min_quantity || 0,
        max_quantity: formData.max_quantity || 0,
        unit_price: formData.unit_price || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      addInventoryItem(newItem)
    }
    setIsOpen(false)
    setEditingItem(null)
    setFormData({})
  }

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData(item)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this inventory item?")) {
      deleteInventoryItem(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Inventory Management</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingItem(null)
                  setFormData({})
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>SKU</Label>
                    <Input
                      value={formData.sku || ""}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Unit of Measure</Label>
                    <Input
                      value={formData.unit_of_measure || ""}
                      onChange={(e) => setFormData({ ...formData, unit_of_measure: e.target.value })}
                      placeholder="pcs, kg, liter, etc."
                      required
                    />
                  </div>
                  <div>
                    <Label>Warehouse</Label>
                    <Select
                      value={formData.warehouse_id}
                      onValueChange={(value) => setFormData({ ...formData, warehouse_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select warehouse" />
                      </SelectTrigger>
                      <SelectContent>
                        {warehouses.map((warehouse) => (
                          <SelectItem key={warehouse.id} value={warehouse.id}>
                            {warehouse.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={formData.quantity || ""}
                      onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Min Quantity</Label>
                    <Input
                      type="number"
                      value={formData.min_quantity || ""}
                      onChange={(e) => setFormData({ ...formData, min_quantity: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Max Quantity</Label>
                    <Input
                      type="number"
                      value={formData.max_quantity || ""}
                      onChange={(e) => setFormData({ ...formData, max_quantity: Number.parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.unit_price || ""}
                      onChange={(e) => setFormData({ ...formData, unit_price: Number.parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
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
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Min/Max</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => {
              const warehouse = warehouses.find((w) => w.id === item.warehouse_id)
              const isLowStock = item.quantity < item.min_quantity
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${isLowStock ? "text-destructive" : "text-foreground"}`}>
                      {item.quantity} {item.unit_of_measure}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.min_quantity} / {item.max_quantity}
                  </TableCell>
                  <TableCell>₾ {item.unit_price.toFixed(2)}</TableCell>
                  <TableCell>{warehouse?.name || "Unknown"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)}>
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
