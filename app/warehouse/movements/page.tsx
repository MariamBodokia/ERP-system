"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoveRight } from "lucide-react"
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

interface Movement {
  id: string
  item_id: string
  from_warehouse_id: string
  to_warehouse_id: string
  quantity: number
  date: string
  status: "pending" | "completed" | "cancelled"
}

export default function WarehouseMovementsPage() {
  const { inventory, warehouses, addMovement } = useDataStore()
  const [isAddingMovement, setIsAddingMovement] = useState(false)
  const [newMovement, setNewMovement] = useState<Partial<Movement>>({})

  const handleAddMovement = () => {
    if (!newMovement.item_id || !newMovement.from_warehouse_id || 
        !newMovement.to_warehouse_id || !newMovement.quantity) return

    addMovement({
      id: Date.now().toString(),
      item_id: newMovement.item_id,
      from_warehouse_id: newMovement.from_warehouse_id,
      to_warehouse_id: newMovement.to_warehouse_id,
      quantity: Number(newMovement.quantity),
      date: new Date().toISOString(),
      status: "pending"
    })
    setIsAddingMovement(false)
    setNewMovement({})
  }

  return (
    <ModuleLayout moduleName="Warehouse Management" moduleNameKa="საწყობის მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Stock Movements</h1>
            <p className="text-muted-foreground">Track inventory transfers between warehouses</p>
          </div>
          <Dialog open={isAddingMovement} onOpenChange={setIsAddingMovement}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Movement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Movement</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="item">Item</Label>
                  <Select
                    value={newMovement.item_id}
                    onValueChange={(value) => setNewMovement({ ...newMovement, item_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventory.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="from">From Warehouse</Label>
                  <Select
                    value={newMovement.from_warehouse_id}
                    onValueChange={(value) => setNewMovement({ ...newMovement, from_warehouse_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source warehouse" />
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
                  <Label htmlFor="to">To Warehouse</Label>
                  <Select
                    value={newMovement.to_warehouse_id}
                    onValueChange={(value) => setNewMovement({ ...newMovement, to_warehouse_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination warehouse" />
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
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newMovement.quantity || ''}
                    onChange={(e) => setNewMovement({ ...newMovement, quantity: Number(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={handleAddMovement}>Create Movement</Button>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {(useDataStore.getState().movements || []).map((movement: Movement) => {
            const item = inventory.find(i => i.id === movement.item_id)
            const fromWarehouse = warehouses.find(w => w.id === movement.from_warehouse_id)
            const toWarehouse = warehouses.find(w => w.id === movement.to_warehouse_id)

            return (
              <Card key={movement.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <MoveRight className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>{item?.name}</CardTitle>
                        <CardDescription>Quantity: {movement.quantity}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={
                      movement.status === 'completed' ? 'default' :
                      movement.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {movement.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">From</p>
                      <p className="font-medium text-foreground">{fromWarehouse?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">To</p>
                      <p className="font-medium text-foreground">{toWarehouse?.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium text-foreground">{movement.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{new Date(movement.date).toLocaleDateString()}</p>
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
