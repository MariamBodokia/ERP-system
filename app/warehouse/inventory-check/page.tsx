"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ClipboardCheck, Pencil, Trash2 } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getStatusBadgeClasses } from "@/lib/status-colors"

const navItems = [
  { title: "Overview", titleKa: "მიმოხილვა", href: "/warehouse" },
  { title: "Inventory Check", titleKa: "მარაგების შემოწმება", href: "/warehouse/inventory-check" },
  { title: "Locations", titleKa: "მდებარეობები", href: "/warehouse/locations" },
  { title: "Movements", titleKa: "მოძრაობები", href: "/warehouse/movements" },
]

interface InventoryCheck {
  id: string
  checkNumber: string
  warehouse_id: string
  date: string
  status: "completed" | "in-progress"
  itemsChecked: number
  discrepancies: number
}

export default function InventoryCheckPage() {
  const { warehouses, inventoryChecks, addInventoryCheck, updateInventoryCheck, deleteInventoryCheck } = useDataStore()
  const [isAddingCheck, setIsAddingCheck] = useState(false)
  const [editingCheck, setEditingCheck] = useState<InventoryCheck | null>(null)
  const [deletingCheckId, setDeletingCheckId] = useState<string | null>(null)
  const [newCheck, setNewCheck] = useState<Partial<InventoryCheck>>({})

  const handleAddCheck = () => {
    if (!newCheck.warehouse_id) return

    addInventoryCheck({
      id: Date.now().toString(),
      checkNumber: `IC-${Date.now()}`,
      warehouse_id: newCheck.warehouse_id,
      date: new Date().toISOString(),
      status: "in-progress",
      itemsChecked: 0,
      discrepancies: 0
    })
    setIsAddingCheck(false)
    setNewCheck({})
  }

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCheck && newCheck.status) {
      updateInventoryCheck(editingCheck.id, { status: newCheck.status as "completed" | "in-progress" })
      setEditingCheck(null)
      setNewCheck({})
    }
  }

  return (
    <ModuleLayout moduleName="Warehouse Management" moduleNameKa="საწყობის მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventory Checks</h1>
            <p className="text-muted-foreground">Manage inventory audits and cycle counts</p>
          </div>
          <Dialog open={isAddingCheck} onOpenChange={setIsAddingCheck}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Start New Check
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Inventory Check</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="warehouse">Warehouse</Label>
                  <Select
                    value={newCheck.warehouse_id}
                    onValueChange={(value) => setNewCheck({ ...newCheck, warehouse_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a warehouse" />
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
              <Button onClick={handleAddCheck}>Start Check</Button>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={!!editingCheck} onOpenChange={(open) => !open && setEditingCheck(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Inventory Check</DialogTitle>
            </DialogHeader>
            {editingCheck && (
              <form onSubmit={(e) => {
                e.preventDefault()
                if (editingCheck.id) {
                  updateInventoryCheck(editingCheck.id, newCheck)
                  setEditingCheck(null)
                  setNewCheck({})
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editWarehouse">Warehouse *</Label>
                  <Select value={newCheck.warehouse_id || editingCheck.warehouse_id || ""} onValueChange={(value) => setNewCheck({ ...newCheck, warehouse_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a warehouse" />
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
                <div className="space-y-2">
                  <Label htmlFor="editItemsChecked">Items Checked</Label>
                  <Input
                    id="editItemsChecked"
                    type="number"
                    min="0"
                    value={newCheck.itemsChecked || editingCheck.itemsChecked || 0}
                    onChange={(e) => setNewCheck({ ...newCheck, itemsChecked: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDiscrepancies">Discrepancies</Label>
                  <Input
                    id="editDiscrepancies"
                    type="number"
                    min="0"
                    value={newCheck.discrepancies || editingCheck.discrepancies || 0}
                    onChange={(e) => setNewCheck({ ...newCheck, discrepancies: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status *</Label>
                  <Select value={newCheck.status || editingCheck.status || "in-progress"} onValueChange={(value: string) => setNewCheck({ ...newCheck, status: value as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
          {inventoryChecks.map((check) => {
            const warehouse = warehouses.find(w => w.id === check.warehouse_id)
            return (
              <Card key={check.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ClipboardCheck className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>{check.checkNumber}</CardTitle>
                        <CardDescription>{warehouse?.name}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCheck(check)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingCheckId(check.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Badge variant="outline" className={getStatusBadgeClasses(check.status)}>{check.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{new Date(check.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Items Checked</p>
                      <p className="font-medium text-foreground">{check.itemsChecked}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Discrepancies</p>
                      <p className={`font-medium ${check.discrepancies > 0 ? "text-destructive" : "text-success"}`}>
                        {check.discrepancies}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium text-foreground capitalize">{check.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <AlertDialog open={!!deletingCheckId} onOpenChange={(open) => !open && setDeletingCheckId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inventory Check</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inventory check? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingCheckId) {
                  deleteInventoryCheck(deletingCheckId)
                  setDeletingCheckId(null)
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
