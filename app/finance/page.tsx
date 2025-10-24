import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

const navItems = [
  { title: "Financial Planning", titleKa: "ფინანსური დაგეგმვა", href: "/finance" },
  { title: "Analysis", titleKa: "ანალიზი", href: "/finance/analysis" },
  { title: "Debts & Obligations", titleKa: "დავალიანებები", href: "/finance/debts" },
]

const budgetItems = [
  { category: "Operations", budgeted: 150000, actual: 142000, variance: -8000 },
  { category: "Marketing", budgeted: 50000, actual: 55000, variance: 5000 },
  { category: "R&D", budgeted: 80000, actual: 78000, variance: -2000 },
]

export default function FinancePage() {
  return (
    <ModuleLayout moduleName="Finance Management" moduleNameKa="ფინანსების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Planning</h1>
            <p className="text-muted-foreground">Budget planning and financial forecasting</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Budget
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-success">+5%</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">₾ 280,000</div>
              <div className="text-sm text-muted-foreground">Total Budget</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-success">-2%</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">₾ 275,000</div>
              <div className="text-sm text-muted-foreground">Actual Spend</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium text-success">98%</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">₾ 5,000</div>
              <div className="text-sm text-muted-foreground">Remaining</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual</CardTitle>
            <CardDescription>Comparison by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetItems.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{item.category}</span>
                    <span className={`font-medium ${item.variance < 0 ? "text-success" : "text-destructive"}`}>
                      {item.variance < 0 ? "" : "+"}₾ {item.variance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Budgeted: ₾ {item.budgeted.toLocaleString()}</span>
                    <span>Actual: ₾ {item.actual.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ModuleLayout>
  )
}
