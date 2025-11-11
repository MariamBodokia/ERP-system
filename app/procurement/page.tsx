"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, ShoppingCart, Pencil, Trash2 } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PurchaseOrder } from "@/lib/db-schema"
import { useLanguage } from "@/lib/language-context"
import { getStatusBadgeClasses } from "@/lib/status-colors"

const navItems = [
  { title: "Purchase Orders", titleKa: "შესყიდვის შეკვეთები", href: "/procurement" },
  { title: "Suppliers", titleKa: "მიმწოდებლები", href: "/procurement/suppliers" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/procurement/reports" },
]

export default function ProcurementPage() {
  const { purchaseOrders, suppliers, addPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = useDataStore()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [editingPO, setEditingPO] = useState<PurchaseOrder | null>(null)
  const [deletingPOId, setDeletingPOId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<PurchaseOrder>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPO: PurchaseOrder = {
      id: Date.now().toString(),
      po_number: `PO-${Date.now()}`,
      supplier_id: formData.supplier_id || "",
      order_date: new Date().toISOString(),
      delivery_date: formData.delivery_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: (formData.status as any) || "created",
      total_amount: Number(formData.total_amount) || 0,
      currency: formData.currency || "USD",
      payment_terms: formData.payment_terms || "net 30",
      created_by: "current-user", // TODO: Add user management
      created_at: new Date().toISOString(),
    }
    addPurchaseOrder(newPO)
    setIsOpen(false)
    setFormData({})
  }

  return (
    <ModuleLayout moduleName="Procurement" moduleNameKa="შესყიდვები" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("purchaseOrders")}</h1>
            <p className="text-muted-foreground">{t("managePurchaseOrders")}</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t("newPurchaseOrder")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t("newPurchaseOrder")}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">{t("supplier")} *</Label>
                    <Select value={formData.supplier_id || ""} onValueChange={(value: string) => setFormData({ ...formData, supplier_id: value })}>
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
                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status || "created"} onValueChange={(value: string) => setFormData({ ...formData, status: value as any })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created">Draft</SelectItem>
                        <SelectItem value="approved">Active</SelectItem>
                        <SelectItem value="purchased">Purchased</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalAmount">Total Amount *</Label>
                    <Input
                      id="totalAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.total_amount || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, total_amount: Number(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency *</Label>
                    <Select value={formData.currency || "USD"} onValueChange={(value: string) => setFormData({ ...formData, currency: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GEL">GEL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate">Delivery Date *</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={formData.delivery_date?.split('T')[0] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, delivery_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Input
                      id="paymentTerms"
                      placeholder="e.g., net 30"
                      value={formData.payment_terms || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, payment_terms: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Purchase Order
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={!!editingPO} onOpenChange={(open) => !open && setEditingPO(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Purchase Order</DialogTitle>
            </DialogHeader>
            {editingPO && (
              <form onSubmit={(e) => {
                e.preventDefault()
                if (editingPO.id) {
                  updatePurchaseOrder(editingPO.id, formData)
                  setEditingPO(null)
                  setFormData({})
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editSupplier">Supplier *</Label>
                  <Select value={formData.supplier_id || editingPO.supplier_id || ""} onValueChange={(value: string) => setFormData({ ...formData, supplier_id: value })}>
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
                <div className="space-y-2">
                  <Label htmlFor="editAmount">Total Amount *</Label>
                  <Input
                    id="editAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.total_amount || editingPO.total_amount || ""}
                    onChange={(e) => setFormData({ ...formData, total_amount: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editCurrency">Currency *</Label>
                  <Select value={formData.currency || editingPO.currency || "USD"} onValueChange={(value: string) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GEL">GEL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDeliveryDate">Delivery Date *</Label>
                  <Input
                    id="editDeliveryDate"
                    type="date"
                    value={(formData.delivery_date || editingPO.delivery_date || "").split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPaymentTerms">Payment Terms</Label>
                  <Input
                    id="editPaymentTerms"
                    placeholder="e.g., net 30"
                    value={formData.payment_terms || editingPO.payment_terms || ""}
                    onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status *</Label>
                  <Select value={formData.status || editingPO.status || "created"} onValueChange={(value: string) => setFormData({ ...formData, status: value as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created">Draft</SelectItem>
                      <SelectItem value="approved">Active</SelectItem>
                      <SelectItem value="purchased">Purchased</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
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
          {purchaseOrders.map((po) => {
            const supplier = suppliers.find((s) => s.id === po.supplier_id)
            return (
              <Card key={po.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>{po.po_number}</CardTitle>
                        <CardDescription>{t("supplier")}: {supplier?.name}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingPO(po)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingPOId(po.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Badge variant="outline" className={getStatusBadgeClasses(po.status)}>
                        {t(
                          po.status === "created" 
                            ? "draft" 
                            : po.status === "approved" 
                              ? "active"
                              : po.status === "purchased"
                                ? "purchased"
                                : po.status === "received"
                                  ? "received"
                                  : po.status === "paid"
                                    ? "paid"
                                    : "cancelled"
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t("orderDate")}</p>
                      <p className="font-medium text-foreground">{po.order_date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t("deliveryDate")}</p>
                      <p className="font-medium text-foreground">{po.delivery_date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t("amount")}</p>
                      <p className="font-medium text-foreground">
                        {po.currency} {po.total_amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t("paymentTerms")}</p>
                      <p className="font-medium text-foreground">{po.payment_terms}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <AlertDialog open={!!deletingPOId} onOpenChange={(open) => !open && setDeletingPOId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Purchase Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this purchase order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingPOId) {
                  deletePurchaseOrder(deletingPOId)
                  setDeletingPOId(null)
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
