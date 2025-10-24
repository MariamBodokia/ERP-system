import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, BarChart3, TrendingUp, DollarSign } from "lucide-react"

const navItems = [
  { title: "KPIs", titleKa: "KPI-ები", href: "/managerial" },
  { title: "Expense Control", titleKa: "ხარჯების კონტროლი", href: "/managerial/expenses" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/managerial/reports" },
]

const executiveSummary = [
  { label: "Revenue", value: "₾ 245,000", change: "+23%", icon: DollarSign },
  { label: "Profit Margin", value: "36.3%", change: "+5.2%", icon: TrendingUp },
  { label: "ROI", value: "18.5%", change: "+2.3%", icon: BarChart3 },
]

export default function ManagerialReportsPage() {
  return (
    <ModuleLayout moduleName="Managerial Accounting" moduleNameKa="მენეჯერული აღრიცხვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Management Reports</h1>
            <p className="text-muted-foreground">Executive summaries and business intelligence</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export All Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {executiveSummary.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-success">{stat.change}</span>
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
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>Key business metrics and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Total Revenue</span>
                  <span className="font-medium text-foreground">₾ 245,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Total Expenses</span>
                  <span className="font-medium text-foreground">₾ 156,000</span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-semibold text-foreground">Net Profit</span>
                  <span className="font-semibold text-success">₾ 89,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Performance by business unit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Sales</span>
                  <span className="font-medium text-success">+23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Operations</span>
                  <span className="font-medium text-success">+12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Marketing</span>
                  <span className="font-medium text-success">+18%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleLayout>
  )
}
