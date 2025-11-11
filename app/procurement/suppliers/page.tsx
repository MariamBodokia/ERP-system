"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Building2, Star, Pencil, Trash2 } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Supplier } from "@/lib/db-schema"
import { getStatusBadgeClasses, getResidencyBadgeClasses } from "@/lib/status-colors"

const navItems = [
  { title: "Purchase Orders", titleKa: "შესყიდვის შეკვეთები", href: "/procurement" },
  { title: "Suppliers", titleKa: "მიმწოდებლები", href: "/procurement/suppliers" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/procurement/reports" },
]

export default function SuppliersPage() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [deletingSupplierId, setDeletingSupplierId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Supplier>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: formData.name || "",
      tax_id: formData.tax_id || "",
      contact_email: formData.contact_email || "",
      contact_phone: formData.contact_phone || "",
      country: formData.country || "",
      is_resident: formData.is_resident || true,
      rating: formData.rating || 3,
      status: formData.status || "active",
      created_at: new Date().toISOString(),
    }
    addSupplier(newSupplier)
    setIsOpen(false)
    setFormData({})
  }

  const handleUpdateRating = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSupplier && formData.rating) {
      updateSupplier(editingSupplier.id, { rating: formData.rating })
      setEditingSupplier(null)
      setFormData({})
    }
  }

  return (
    <ModuleLayout moduleName="Procurement" moduleNameKa="შესყიდვები" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Suppliers</h1>
            <p className="text-muted-foreground">Manage supplier relationships and information</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Supplier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Supplier</DialogTitle>
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
                  <Label htmlFor="contact_email">Email *</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email (example: user@domain.com)"
                    value={formData.contact_email || ""}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone || ""}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
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
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="is_resident">Residency</Label>
                  <Select
                    value={formData.is_resident ? "true" : "false"}
                    onValueChange={(value) => setFormData({ ...formData, is_resident: value === "true" })}
                  >
                    <SelectTrigger id="is_resident">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Resident</SelectItem>
                      <SelectItem value="false">Non-resident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating || "3"}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  />
                </div>
                <Button type="submit" className="w-full">Add Supplier</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={!!editingSupplier} onOpenChange={(open) => !open && setEditingSupplier(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Supplier</DialogTitle>
            </DialogHeader>
            {editingSupplier && (
              <form onSubmit={(e) => {
                e.preventDefault()
                if (editingSupplier.id) {
                  updateSupplier(editingSupplier.id, formData)
                  setEditingSupplier(null)
                  setFormData({})
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Name *</Label>
                  <Input
                    id="editName"
                    value={formData.name || editingSupplier.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editTaxId">Tax ID *</Label>
                  <Input
                    id="editTaxId"
                    value={formData.tax_id || editingSupplier.tax_id || ""}
                    onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email *</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email (example: user@domain.com)"
                    value={formData.contact_email || editingSupplier.contact_email || ""}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone</Label>
                  <Input
                    id="editPhone"
                    value={formData.contact_phone || editingSupplier.contact_phone || ""}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editCountry">Country</Label>
                  <Input
                    id="editCountry"
                    value={formData.country || editingSupplier.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editResidency">Residency</Label>
                  <Select
                    value={formData.is_resident ? "true" : "false"}
                    onValueChange={(value) => setFormData({ ...formData, is_resident: value === "true" })}
                  >
                    <SelectTrigger id="editResidency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Resident</SelectItem>
                      <SelectItem value="false">Non-resident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editRating">Rating (1-5)</Label>
                  <Input
                    id="editRating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating || editingSupplier.rating || "3"}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select
                    value={formData.status || editingSupplier.status || "active"}
                    onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger id="editStatus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {suppliers.map((supplier) => (
            <Card key={supplier.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{supplier.name}</CardTitle>
                      <CardDescription>{supplier.contact_email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingSupplier(supplier)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingSupplierId(supplier.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className={getResidencyBadgeClasses(supplier.is_resident)}>
                      {supplier.is_resident ? "Resident" : "Non-Resident"}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadgeClasses(supplier.status)}>
                      {supplier.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Tax ID</p>
                    <p className="font-medium text-foreground">{supplier.tax_id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Country</p>
                    <p className="font-medium text-foreground">{supplier.country}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{supplier.contact_phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium text-foreground">{supplier.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={!!deletingSupplierId} onOpenChange={(open) => !open && setDeletingSupplierId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this supplier? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingSupplierId) {
                  deleteSupplier(deletingSupplierId)
                  setDeletingSupplierId(null)
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </ModuleLayout>
  )
}
