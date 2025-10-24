import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const navItems = [
  { title: "Employees", titleKa: "თანამშრომლები", href: "/hr" },
  { title: "Payroll", titleKa: "ხელფასები", href: "/hr/payroll" },
  { title: "Attendance", titleKa: "დასწრება", href: "/hr/attendance" },
  { title: "Performance", titleKa: "შეფასება", href: "/hr/performance" },
]

const mockAttendance = [
  {
    id: "1",
    employee: "Giorgi Beridze",
    date: "2025-01-20",
    checkIn: "09:00",
    checkOut: "18:00",
    hours: 9,
    status: "present",
  },
  {
    id: "2",
    employee: "Nino Kapanadze",
    date: "2025-01-20",
    checkIn: "09:15",
    checkOut: "17:45",
    hours: 8.5,
    status: "present",
  },
]

export default function AttendancePage() {
  return (
    <ModuleLayout moduleName="Human Resources" moduleNameKa="ადამიანური რესურსები" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground">Track employee attendance and working hours</p>
          </div>
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>

        <div className="grid gap-4">
          {mockAttendance.map((record) => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{record.employee}</CardTitle>
                      <CardDescription>{record.date}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">{record.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Check In</p>
                    <p className="font-medium text-foreground">{record.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Check Out</p>
                    <p className="font-medium text-foreground">{record.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Hours Worked</p>
                    <p className="font-medium text-foreground">{record.hours}h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium text-foreground capitalize">{record.status}</p>
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
