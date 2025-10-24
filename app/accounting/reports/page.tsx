import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

const navItems = [
  { title: "Journal Entries", titleKa: "საბუღალტრო ჩანაწერები", href: "/accounting" },
  { title: "Tax Declarations", titleKa: "საგადასახადო დეკლარაციები", href: "/accounting/tax" },
  { title: "Financial Reports", titleKa: "ფინანსური ანგარიშები", href: "/accounting/reports" },
  { title: "Bank Integration", titleKa: "საბანკო ინტეგრაცია", href: "/accounting/bank" },
]

const financialStats = [
  { label: "Total Revenue", value: "₾ 245,000", change: "+23%", icon: TrendingUp, positive: true },
  { label: "Total Expenses", value: "₾ 156,000", change: "+8%", icon: TrendingDown, positive: false },
  { label: "Net Profit", value: "₾ 89,000", change: "+45%", icon: DollarSign, positive: true },
]

export default function FinancialReportsPage() {
  return (
    <ModuleLayout moduleName="Accounting" moduleNameKa="ბუღალტერია" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
            <p className="text-muted-foreground">View financial statements and analysis</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export All Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {financialStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <span className={`text-sm font-medium ${stat.positive ? "text-success" : "text-muted-foreground"}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>As of January 31, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Total Assets</span>
                  <span className="font-medium text-foreground">₾ 450,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Total Liabilities</span>
                  <span className="font-medium text-foreground">₾ 180,000</span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-semibold text-foreground">Equity</span>
                  <span className="font-semibold text-foreground">₾ 270,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>January 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Revenue</span>
                  <span className="font-medium text-success">₾ 245,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Cost of Goods Sold</span>
                  <span className="font-medium text-foreground">₾ 98,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Operating Expenses</span>
                  <span className="font-medium text-foreground">₾ 58,000</span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-semibold text-foreground">Net Profit</span>
                  <span className="font-semibold text-success">₾ 89,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleLayout>
  )
}
