"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Store } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Warehouse } from "@/lib/db-schema"
import { useState } from "react"

const navItems = [
  { title: "Overview", titleKa: "მიმოხილვა", href: "/warehouse" },
  { title: "Inventory Check", titleKa: "მარაგების შემოწმება", href: "/warehouse/inventory-check" },
  { title: "Locations", titleKa: "მდებარეობები", href: "/warehouse/locations" },
  { title: "Movements", titleKa: "მოძრაობები", href: "/warehouse/movements" },
]

export default function WarehouseLocationsPage() {
  const { warehouses, addWarehouse } = useDataStore()
  const [isAddingWarehouse, setIsAddingWarehouse] = useState(false)
  const [newWarehouse, setNewWarehouse] = useState<Partial<Warehouse>>({})

  const handleAddWarehouse = () => {
    if (!newWarehouse.name || !newWarehouse.location || !newWarehouse.type) return

    addWarehouse({
      id: Date.now().toString(),
      name: newWarehouse.name,
      location: newWarehouse.location,
      type: newWarehouse.type as "main" | "regional" | "retail",
      status: "active",
      created_at: new Date().toISOString()
    })
    setIsAddingWarehouse(false)
    setNewWarehouse({})
  }

  return (
    <ModuleLayout moduleName="Warehouse Management" moduleNameKa="საწყობის მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Warehouses</h1>
            <p className="text-muted-foreground">Manage warehouse locations</p>
          </div>
          <Dialog open={isAddingWarehouse} onOpenChange={setIsAddingWarehouse}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Warehouse
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Warehouse Location</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="name">Warehouse Name</Label>
                  <Input
                    id="name"
                    value={newWarehouse.name || ''}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newWarehouse.location || ''}
                    onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newWarehouse.type}
                    onValueChange={(value) => setNewWarehouse({ ...newWarehouse, type: value as "main" | "regional" | "retail" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddWarehouse}>Add Warehouse</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {warehouses.map((warehouse) => (
            <Card key={warehouse.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Store className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{warehouse.name}</CardTitle>
                      <CardDescription>{warehouse.location}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={warehouse.status === 'active' ? 'default' : 'destructive'}>
                    {warehouse.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground capitalize">{warehouse.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium text-foreground">{new Date(warehouse.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ModuleLayout>
  )
}
