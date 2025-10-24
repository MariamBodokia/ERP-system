import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingDown } from "lucide-react"

const navItems = [
  { title: "KPIs", titleKa: "KPI-ები", href: "/managerial" },
  { title: "Expense Control", titleKa: "ხარჯების კონტროლი", href: "/managerial/expenses" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/managerial/reports" },
]

const expenseCategories = [
  { category: "Salaries", amount: 85000, budget: 90000, variance: -5000 },
  { category: "Office Rent", amount: 12000, budget: 12000, variance: 0 },
  { category: "Utilities", amount: 3500, budget: 3000, variance: 500 },
  { category: "Marketing", amount: 15000, budget: 12000, variance: 3000 },
]

export default function ExpenseControlPage() {
  return (
    <ModuleLayout moduleName="Managerial Accounting" moduleNameKa="მენეჯერული აღრიცხვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Expense Control</h1>
            <p className="text-muted-foreground">Monitor and control departmental expenses</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>Current month overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-foreground">₾ 115,500</div>
                <div className="text-sm text-muted-foreground">of ₾ 117,000 budget</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-success">-₾ 1,500</div>
                <div className="text-sm text-muted-foreground">Under budget</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {expenseCategories.map((expense) => (
            <Card key={expense.category}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingDown className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{expense.category}</CardTitle>
                      <CardDescription>Budget vs Actual</CardDescription>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${expense.variance <= 0 ? "text-success" : "text-destructive"}`}
                  >
                    {expense.variance <= 0 ? "" : "+"}₾ {expense.variance.toLocaleString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium text-foreground">₾ {expense.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Actual</p>
                    <p className="font-medium text-foreground">₾ {expense.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Utilization</p>
                    <p className="font-medium text-foreground">
                      {Math.round((expense.amount / expense.budget) * 100)}%
                    </p>
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
