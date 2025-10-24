import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Download } from "lucide-react"

const navItems = [
  { title: "Production Orders", titleKa: "წარმოების შეკვეთები", href: "/production" },
  { title: "Recipes", titleKa: "რეცეპტურები", href: "/production/recipes" },
  { title: "Cost Calculation", titleKa: "თვითღირებულება", href: "/production/cost" },
]

const mockCostCalculations = [
  {
    id: "1",
    product: "Laptop Computer",
    materialCost: 950,
    laborCost: 150,
    overheadCost: 100,
    totalCost: 1200,
  },
  {
    id: "2",
    product: "Office Chair",
    materialCost: 180,
    laborCost: 40,
    overheadCost: 30,
    totalCost: 250,
  },
]

export default function CostCalculationPage() {
  return (
    <ModuleLayout moduleName="Production Management" moduleNameKa="წარმოების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cost Calculation</h1>
            <p className="text-muted-foreground">Calculate production costs and margins</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-4">
          {mockCostCalculations.map((calc) => (
            <Card key={calc.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Calculator className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>{calc.product}</CardTitle>
                    <CardDescription>Cost breakdown per unit</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Material Cost</span>
                    <span className="text-foreground">₾ {calc.materialCost}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Labor Cost</span>
                    <span className="text-foreground">₾ {calc.laborCost}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overhead Cost</span>
                    <span className="text-foreground">₾ {calc.overheadCost}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-3">
                    <span className="text-foreground">Total Cost</span>
                    <span className="text-foreground">₾ {calc.totalCost}</span>
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
