import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, User } from "lucide-react"

const navItems = [
  { title: "Employees", titleKa: "თანამშრომლები", href: "/hr" },
  { title: "Payroll", titleKa: "ხელფასები", href: "/hr/payroll" },
  { title: "Attendance", titleKa: "დასწრება", href: "/hr/attendance" },
  { title: "Performance", titleKa: "შეფასება", href: "/hr/performance" },
]

const mockEmployees = [
  {
    id: "1",
    name: "Giorgi Beridze",
    position: "Senior Developer",
    department: "IT",
    email: "giorgi.b@company.ge",
    status: "active",
    hireDate: "2022-03-15",
  },
  {
    id: "2",
    name: "Nino Kapanadze",
    position: "Accountant",
    department: "Finance",
    email: "nino.k@company.ge",
    status: "active",
    hireDate: "2021-06-01",
  },
]

export default function HRPage() {
  return (
    <ModuleLayout moduleName="Human Resources" moduleNameKa="ადამიანური რესურსები" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground">Manage employee information and records</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Employee
          </Button>
        </div>

        <div className="grid gap-4">
          {mockEmployees.map((employee) => (
            <Card key={employee.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{employee.name}</CardTitle>
                      <CardDescription>{employee.email}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">{employee.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Position</p>
                    <p className="font-medium text-foreground">{employee.position}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Department</p>
                    <p className="font-medium text-foreground">{employee.department}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Hire Date</p>
                    <p className="font-medium text-foreground">{employee.hireDate}</p>
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
