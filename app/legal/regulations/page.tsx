import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Scale } from "lucide-react"

const navItems = [
  { title: "Contracts", titleKa: "კონტრაქტები", href: "/legal" },
  { title: "Legal Entities", titleKa: "იურიდიული პირები", href: "/legal/entities" },
  { title: "Documents", titleKa: "დოკუმენტები", href: "/legal/documents" },
  { title: "Regulations", titleKa: "რეგულაციები", href: "/legal/regulations" },
]

const mockRegulations = [
  {
    id: "1",
    title: "Tax Code of Georgia - Article 123",
    category: "Tax Law",
    effectiveDate: "2024-01-01",
    status: "active",
    description: "VAT regulations for international transactions",
  },
  {
    id: "2",
    title: "Labor Code - Chapter 5",
    category: "Labor Law",
    effectiveDate: "2023-06-01",
    status: "active",
    description: "Employee rights and working conditions",
  },
]

export default function LegalRegulationsPage() {
  return (
    <ModuleLayout moduleName="Legal Management" moduleNameKa="იურიდიული მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Regulations</h1>
            <p className="text-muted-foreground">Track legal regulations and compliance requirements</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Regulation
          </Button>
        </div>

        <div className="grid gap-4">
          {mockRegulations.map((regulation) => (
            <Card key={regulation.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{regulation.title}</CardTitle>
                      <CardDescription>{regulation.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">{regulation.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium text-foreground">{regulation.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Effective Date</p>
                    <p className="font-medium text-foreground">{regulation.effectiveDate}</p>
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
