import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp } from "lucide-react"

const navItems = [
  { title: "Financial Planning", titleKa: "ფინანსური დაგეგმვა", href: "/finance" },
  { title: "Analysis", titleKa: "ანალიზი", href: "/finance/analysis" },
  { title: "Debts & Obligations", titleKa: "დავალიანებები", href: "/finance/debts" },
]

const financialMetrics = [
  { metric: "ROI (Return on Investment)", value: "18.5%", trend: "+2.3%" },
  { metric: "IRR (Internal Rate of Return)", value: "22.1%", trend: "+1.8%" },
  { metric: "NPV (Net Present Value)", value: "₾ 125,000", trend: "+₾ 15,000" },
  { metric: "Working Capital", value: "₾ 95,000", trend: "+₾ 8,000" },
  { metric: "Payback Period", value: "2.3 years", trend: "-0.2 years" },
]

export default function FinanceAnalysisPage() {
  return (
    <ModuleLayout moduleName="Finance Management" moduleNameKa="ფინანსების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Analysis</h1>
            <p className="text-muted-foreground">Key financial metrics and performance indicators</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Analysis
          </Button>
        </div>

        <div className="grid gap-4">
          {financialMetrics.map((item) => (
            <Card key={item.metric}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{item.metric}</CardTitle>
                      <CardDescription>Current period performance</CardDescription>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-success">{item.trend}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ModuleLayout>
  )
}
