"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Store, Pencil, Trash2 } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { InventoryItem, Warehouse } from "@/lib/db-schema"
import { useLanguage } from "@/lib/language-context"
import { getStatusBadgeClasses } from "@/lib/status-colors"

const navItems = [
  { title: "Inventory", titleKa: "ინვენტარი", href: "/warehouse" },
  { title: "Warehouses", titleKa: "საწყობები", href: "/warehouse/locations" },
  { title: "Movements", titleKa: "გადაადგილებები", href: "/warehouse/movements" },
  { title: "Inventory Check", titleKa: "ინვენტარიზაცია", href: "/warehouse/inventory-check" },
]

export default function WarehousePage() {
  const { inventory, warehouses, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useDataStore()
  const { t } = useLanguage()
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)
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
      status: newItem.status || 'in-stock',
      unit_price: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    setIsAddingItem(false)
    setNewItem({})
  }

  const handleUpdateItem = () => {
    if (!editingItem || !editingItem.name || !editingItem.quantity || !editingItem.warehouse_id) return
    
    updateInventoryItem(editingItem.id, {
      name: editingItem.name,
      quantity: Number(editingItem.quantity),
      warehouse_id: editingItem.warehouse_id,
      status: editingItem.status || 'in-stock',
      updated_at: new Date().toISOString()
    })
    setEditingItem(null)
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
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newItem.status || 'in-stock'}
                      onValueChange={(value) => setNewItem({ ...newItem, status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-stock">In Stock</SelectItem>
                        <SelectItem value="low-stock">Low Stock</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        <SelectItem value="overstock">Overstock</SelectItem>
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
                className="mb-4 grid grid-cols-[1fr_auto] items-center gap-4 p-3 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {warehouse?.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    {item.quantity} units
                  </div>
                  {item.status && (
                    <Badge className={getStatusBadgeClasses(item.status)}>
                      {item.status === 'in-stock' && 'In Stock'}
                      {item.status === 'low-stock' && 'Low Stock'}
                      {item.status === 'out-of-stock' && 'Out of Stock'}
                      {item.status === 'overstock' && 'Overstock'}
                    </Badge>
                  )}
                  {!item.status && item.quantity < 10 && (
                    <Badge variant="destructive" className="h-6">
                      Low Stock
                    </Badge>
                  )}
                  <Dialog open={editingItem?.id === item.id} onOpenChange={(open) => !open && setEditingItem(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingItem(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingItemId(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {editingItem?.id === item.id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Inventory Item</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <Label htmlFor="edit-name">Product Name</Label>
                            <Input
                              id="edit-name"
                              value={editingItem.name || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-quantity">Quantity</Label>
                            <Input
                              id="edit-quantity"
                              type="number"
                              value={editingItem.quantity || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, quantity: Number(e.target.value) })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-warehouse">Warehouse</Label>
                            <Select
                              value={editingItem.warehouse_id}
                              onValueChange={(value) => setEditingItem({ ...editingItem, warehouse_id: value })}
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
                            <Label htmlFor="edit-status">Status</Label>
                            <Select
                              value={editingItem.status || 'in-stock'}
                              onValueChange={(value) => setEditingItem({ ...editingItem, status: value as any })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="in-stock">In Stock</SelectItem>
                                <SelectItem value="low-stock">Low Stock</SelectItem>
                                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                <SelectItem value="overstock">Overstock</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button onClick={handleUpdateItem}>Save Changes</Button>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <AlertDialog open={!!deletingItemId} onOpenChange={(open) => !open && setDeletingItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inventory Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inventory item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingItemId) {
                  deleteInventoryItem(deletingItemId)
                  setDeletingItemId(null)
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
