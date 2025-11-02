"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, ShoppingCart } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PurchaseOrder } from "@/lib/db-schema"
import { useLanguage } from "@/lib/language-context"

const navItems = [
  { title: "Purchase Orders", titleKa: "შესყიდვის შეკვეთები", href: "/procurement" },
  { title: "Suppliers", titleKa: "მიმწოდებლები", href: "/procurement/suppliers" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/procurement/reports" },
]

export default function ProcurementPage() {
  const { purchaseOrders, suppliers, addPurchaseOrder } = useDataStore()
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<PurchaseOrder>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPO: PurchaseOrder = {
      id: Date.now().toString(),
      po_number: `PO-${Date.now()}`,
      supplier_id: formData.supplier_id || "",
      order_date: new Date().toISOString(),
      delivery_date: formData.delivery_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "created",
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("newPurchaseOrder")}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                {/* Form content */}
              </form>
            </DialogContent>
          </Dialog>
        </div>

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
                    <Badge
                      variant={po.status === "approved" ? "default" : po.status === "created" ? "secondary" : "outline"}
                    >
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
    </ModuleLayout>
  )
}
