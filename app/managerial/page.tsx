import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Target } from "lucide-react"

const navItems = [
  { title: "KPIs", titleKa: "KPI-ები", href: "/managerial" },
  { title: "Expense Control", titleKa: "ხარჯების კონტროლი", href: "/managerial/expenses" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/managerial/reports" },
]

const mockKPIs = [
  {
    id: "1",
    name: "Revenue Growth",
    target: 20,
    actual: 23,
    unit: "%",
    status: "exceeding",
    period: "Q1 2025",
  },
  {
    id: "2",
    name: "Customer Satisfaction",
    target: 4.5,
    actual: 4.3,
    unit: "/5",
    status: "on-track",
    period: "Q1 2025",
  },
  {
    id: "3",
    name: "Operating Margin",
    target: 15,
    actual: 12,
    unit: "%",
    status: "below-target",
    period: "Q1 2025",
  },
]

export default function ManagerialPage() {
  return (
    <ModuleLayout moduleName="Managerial Accounting" moduleNameKa="მენეჯერული აღრიცხვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Key Performance Indicators</h1>
            <p className="text-muted-foreground">Track and monitor business KPIs</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New KPI
          </Button>
        </div>

        <div className="grid gap-4">
          {mockKPIs.map((kpi) => (
            <Card key={kpi.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{kpi.name}</CardTitle>
                      <CardDescription>{kpi.period}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      kpi.status === "exceeding" ? "default" : kpi.status === "on-track" ? "secondary" : "destructive"
                    }
                  >
                    {kpi.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-medium text-foreground">
                      {kpi.target}
                      {kpi.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Actual</p>
                    <p
                      className={`font-medium text-lg ${
                        kpi.actual >= kpi.target ? "text-success" : "text-destructive"
                      }`}
                    >
                      {kpi.actual}
                      {kpi.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Achievement</p>
                    <p className="font-medium text-foreground">{Math.round((kpi.actual / kpi.target) * 100)}%</p>
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
