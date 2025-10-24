import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Users, DollarSign } from "lucide-react"

const navItems = [
  { title: "Sales Orders", titleKa: "გაყიდვის შეკვეთები", href: "/sales" },
  { title: "Customers", titleKa: "კლიენტები", href: "/sales/customers" },
  { title: "Invoices", titleKa: "ინვოისები", href: "/sales/invoices" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/sales/reports" },
]

const salesStats = [
  { label: "Total Sales", value: "₾ 245,000", change: "+23%", icon: DollarSign },
  { label: "New Customers", value: "18", change: "+12", icon: Users },
  { label: "Avg. Order Value", value: "₾ 13,611", change: "+8%", icon: TrendingUp },
]

export default function SalesReportsPage() {
  return (
    <ModuleLayout moduleName="Sales Management" moduleNameKa="გაყიდვების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Reports</h1>
            <p className="text-muted-foreground">Analytics and insights for sales performance</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {salesStats.map((stat) => (
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

        <Card>
          <CardHeader>
            <CardTitle>Top Customers by Revenue</CardTitle>
            <CardDescription>Highest value customers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground">ABC Corporation</span>
                <span className="font-medium text-foreground">₾ 54,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">XYZ Ltd</span>
                <span className="font-medium text-foreground">₾ 32,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModuleLayout>
  )
}
