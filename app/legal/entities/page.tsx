import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Building2 } from "lucide-react"

const navItems = [
  { title: "Contracts", titleKa: "კონტრაქტები", href: "/legal" },
  { title: "Legal Entities", titleKa: "იურიდიული პირები", href: "/legal/entities" },
  { title: "Documents", titleKa: "დოკუმენტები", href: "/legal/documents" },
  { title: "Regulations", titleKa: "რეგულაციები", href: "/legal/regulations" },
]

const mockEntities = [
  {
    id: "1",
    name: "Tech Corp LLC",
    taxId: "123456789",
    type: "Company",
    status: "active",
    country: "Georgia",
    registrationDate: "2020-01-15",
  },
  {
    id: "2",
    name: "Property Management Inc",
    taxId: "987654321",
    type: "Company",
    status: "active",
    country: "Georgia",
    registrationDate: "2018-05-20",
  },
]

export default function LegalEntitiesPage() {
  return (
    <ModuleLayout moduleName="Legal Management" moduleNameKa="იურიდიული მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Legal Entities</h1>
            <p className="text-muted-foreground">Manage companies and legal persons</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Entity
          </Button>
        </div>

        <div className="grid gap-4">
          {mockEntities.map((entity) => (
            <Card key={entity.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{entity.name}</CardTitle>
                      <CardDescription>Tax ID: {entity.taxId}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">{entity.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground">{entity.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Country</p>
                    <p className="font-medium text-foreground">{entity.country}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Registration Date</p>
                    <p className="font-medium text-foreground">{entity.registrationDate}</p>
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
