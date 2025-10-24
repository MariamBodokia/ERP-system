import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Factory } from "lucide-react"

const navItems = [
  { title: "Production Orders", titleKa: "წარმოების შეკვეთები", href: "/production" },
  { title: "Recipes", titleKa: "რეცეპტურები", href: "/production/recipes" },
  { title: "Cost Calculation", titleKa: "თვითღირებულება", href: "/production/cost" },
]

const mockProductionOrders = [
  {
    id: "1",
    orderNumber: "PRD-2025-001",
    product: "Laptop Assembly",
    quantity: 50,
    status: "in-progress",
    startDate: "2025-01-15",
    endDate: "2025-01-30",
  },
  {
    id: "2",
    orderNumber: "PRD-2025-002",
    product: "Office Chair Assembly",
    quantity: 100,
    status: "planned",
    startDate: "2025-02-01",
    endDate: "2025-02-15",
  },
]

export default function ProductionPage() {
  return (
    <ModuleLayout moduleName="Production Management" moduleNameKa="წარმოების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Production Orders</h1>
            <p className="text-muted-foreground">Manage manufacturing and production</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Production Order
          </Button>
        </div>

        <div className="grid gap-4">
          {mockProductionOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Factory className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{order.orderNumber}</CardTitle>
                      <CardDescription>{order.product}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={order.status === "in-progress" ? "default" : "secondary"}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium text-foreground">{order.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{order.startDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium text-foreground">{order.endDate}</p>
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
