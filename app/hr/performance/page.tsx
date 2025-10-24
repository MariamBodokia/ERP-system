import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Award } from "lucide-react"

const navItems = [
  { title: "Employees", titleKa: "თანამშრომლები", href: "/hr" },
  { title: "Payroll", titleKa: "ხელფასები", href: "/hr/payroll" },
  { title: "Attendance", titleKa: "დასწრება", href: "/hr/attendance" },
  { title: "Performance", titleKa: "შეფასება", href: "/hr/performance" },
]

const mockPerformance = [
  {
    id: "1",
    employee: "Giorgi Beridze",
    period: "Q4 2024",
    rating: 4.5,
    goals: 8,
    completed: 7,
    status: "excellent",
  },
  {
    id: "2",
    employee: "Nino Kapanadze",
    period: "Q4 2024",
    rating: 4.2,
    goals: 6,
    completed: 6,
    status: "excellent",
  },
]

export default function PerformancePage() {
  return (
    <ModuleLayout moduleName="Human Resources" moduleNameKa="ადამიანური რესურსები" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Performance Reviews</h1>
            <p className="text-muted-foreground">Track employee performance and goals</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Review
          </Button>
        </div>

        <div className="grid gap-4">
          {mockPerformance.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{review.employee}</CardTitle>
                      <CardDescription>{review.period}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">{review.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <p className="font-medium text-foreground text-lg">{review.rating}/5.0</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Goals Set</p>
                    <p className="font-medium text-foreground">{review.goals}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-medium text-success">{review.completed}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completion Rate</p>
                    <p className="font-medium text-foreground">
                      {Math.round((review.completed / review.goals) * 100)}%
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
