"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ClipboardCheck } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const { warehouses, inventoryChecks, addInventoryCheck } = useDataStore()
  const [isAddingCheck, setIsAddingCheck] = useState(false)
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
                    <Badge variant={check.status === "completed" ? "default" : "secondary"}>{check.status}</Badge>
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
    </ModuleLayout>
  )
}
