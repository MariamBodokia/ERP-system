import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, AlertCircle } from "lucide-react"

const navItems = [
  { title: "Financial Planning", titleKa: "ფინანსური დაგეგმვა", href: "/finance" },
  { title: "Analysis", titleKa: "ანალიზი", href: "/finance/analysis" },
  { title: "Debts & Obligations", titleKa: "დავალიანებები", href: "/finance/debts" },
]

const mockDebts = [
  {
    id: "1",
    creditor: "Bank of Georgia",
    type: "Loan",
    amount: 150000,
    outstanding: 120000,
    dueDate: "2025-12-31",
    status: "current",
  },
  {
    id: "2",
    creditor: "Global Tech Supplies",
    type: "Payable",
    amount: 15000,
    outstanding: 15000,
    dueDate: "2025-02-10",
    status: "overdue",
  },
]

export default function DebtsPage() {
  return (
    <ModuleLayout moduleName="Finance Management" moduleNameKa="ფინანსების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Debts & Obligations</h1>
            <p className="text-muted-foreground">Track liabilities and payment obligations</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Record Payment
          </Button>
        </div>

        <div className="grid gap-4">
          {mockDebts.map((debt) => (
            <Card key={debt.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle
                      className={`h-5 w-5 ${debt.status === "overdue" ? "text-destructive" : "text-primary"}`}
                    />
                    <div>
                      <CardTitle>{debt.creditor}</CardTitle>
                      <CardDescription>{debt.type}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={debt.status === "overdue" ? "destructive" : "default"}>{debt.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Original Amount</p>
                    <p className="font-medium text-foreground">₾ {debt.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Outstanding</p>
                    <p className="font-medium text-foreground">₾ {debt.outstanding.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium text-foreground">{debt.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Progress</p>
                    <p className="font-medium text-foreground">
                      {Math.round(((debt.amount - debt.outstanding) / debt.amount) * 100)}% paid
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
