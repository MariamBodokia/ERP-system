"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Store } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { InventoryItem, Warehouse } from "@/lib/db-schema"
import { useLanguage } from "@/lib/language-context"

const navItems = [
  { title: "Inventory", titleKa: "ინვენტარი", href: "/warehouse" },
  { title: "Warehouses", titleKa: "საწყობები", href: "/warehouse/locations" },
  { title: "Movements", titleKa: "გადაადგილებები", href: "/warehouse/movements" },
  { title: "Inventory Check", titleKa: "ინვენტარიზაცია", href: "/warehouse/inventory-check" },
]

export default function WarehousePage() {
  const { inventory, warehouses, addInventoryItem } = useDataStore()
  const { t } = useLanguage()
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({})

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.warehouse_id) return
    
    addInventoryItem({
      id: Date.now().toString(),
      name: newItem.name,
      sku: `SKU-${Date.now()}`,
      category: 'general',
      unit_of_measure: 'units',
      quantity: Number(newItem.quantity),
      min_quantity: 5,
      max_quantity: 100,
      warehouse_id: newItem.warehouse_id,
      unit_price: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    setIsAddingItem(false)
    setNewItem({})
  }

  return (
    <ModuleLayout
      moduleName="Warehouse Management"
      moduleNameKa="საწყობის მართვა"
      navItems={[
        { title: "Overview", titleKa: "მიმოხილვა", href: "/warehouse" },
        { title: "Inventory Check", titleKa: "მარაგების შემოწმება", href: "/warehouse/inventory-check" },
        { title: "Locations", titleKa: "მდებარეობები", href: "/warehouse/locations" },
        { title: "Movements", titleKa: "მოძრაობები", href: "/warehouse/movements" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("inventoryItems")}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">
              {t("manageInventory")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("warehouses")}
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warehouses.length}</div>
            <p className="text-xs text-muted-foreground">
              {t("manageWarehouses")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("inventory")}</CardTitle>
              <CardDescription>
                {t("manageInventory")}
              </CardDescription>
            </div>
            <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  {t("add")}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("newInventoryItem")}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">{t("productName")}</Label>
                    <Input
                      id="name"
                      value={newItem.name || ''}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">{t("quantity")}</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newItem.quantity || ''}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="warehouse">{t("warehouses")}</Label>
                    <Select
                      value={newItem.warehouse_id}
                      onValueChange={(value) => setNewItem({ ...newItem, warehouse_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectWarehouse")} />
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
                </div>
                <Button onClick={handleAddItem}>{t("add")}</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {inventory.map((item) => {
            const warehouse = warehouses.find((w: Warehouse) => w.id === item.warehouse_id)
            return (
              <div
                key={item.id}
                className="mb-4 grid grid-cols-[1fr_100px] items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {warehouse?.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-self-end">
                  <div className="text-sm text-muted-foreground">
                    {item.quantity} units
                  </div>
                  {item.quantity < 10 && (
                    <Badge variant="destructive" className="h-6">
                      Low Stock
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </ModuleLayout>
  )
}
