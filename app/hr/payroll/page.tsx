import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, DollarSign } from "lucide-react"

const navItems = [
  { title: "Employees", titleKa: "თანამშრომლები", href: "/hr" },
  { title: "Payroll", titleKa: "ხელფასები", href: "/hr/payroll" },
  { title: "Attendance", titleKa: "დასწრება", href: "/hr/attendance" },
  { title: "Performance", titleKa: "შეფასება", href: "/hr/performance" },
]

const mockPayroll = [
  {
    id: "1",
    employee: "Giorgi Beridze",
    period: "January 2025",
    baseSalary: 3500,
    bonus: 500,
    deductions: 350,
    netSalary: 3650,
    status: "paid",
  },
  {
    id: "2",
    employee: "Nino Kapanadze",
    period: "January 2025",
    baseSalary: 2800,
    bonus: 200,
    deductions: 280,
    netSalary: 2720,
    status: "pending",
  },
]

export default function PayrollPage() {
  return (
    <ModuleLayout moduleName="Human Resources" moduleNameKa="ადამიანური რესურსები" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payroll</h1>
            <p className="text-muted-foreground">Manage employee salaries and payments</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Process Payroll
          </Button>
        </div>

        <div className="grid gap-4">
          {mockPayroll.map((payroll) => (
            <Card key={payroll.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{payroll.employee}</CardTitle>
                      <CardDescription>{payroll.period}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={payroll.status === "paid" ? "default" : "secondary"}>{payroll.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Base Salary</p>
                    <p className="font-medium text-foreground">₾ {payroll.baseSalary}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bonus</p>
                    <p className="font-medium text-success">+₾ {payroll.bonus}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deductions</p>
                    <p className="font-medium text-destructive">-₾ {payroll.deductions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Net Salary</p>
                    <p className="font-medium text-foreground text-lg">₾ {payroll.netSalary}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium text-foreground capitalize">{payroll.status}</p>
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
