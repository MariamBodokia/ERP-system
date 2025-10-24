import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileCheck, Download } from "lucide-react"

const navItems = [
  { title: "Journal Entries", titleKa: "საბუღალტრო ჩანაწერები", href: "/accounting" },
  { title: "Tax Declarations", titleKa: "საგადასახადო დეკლარაციები", href: "/accounting/tax" },
  { title: "Financial Reports", titleKa: "ფინანსური ანგარიშები", href: "/accounting/reports" },
  { title: "Bank Integration", titleKa: "საბანკო ინტეგრაცია", href: "/accounting/bank" },
]

const mockTaxDeclarations = [
  {
    id: "1",
    declarationNumber: "VAT-2025-01",
    type: "VAT",
    period: "January 2025",
    amount: 8500,
    status: "submitted",
    dueDate: "2025-02-15",
  },
  {
    id: "2",
    declarationNumber: "INC-2024-12",
    type: "Income Tax",
    period: "December 2024",
    amount: 12000,
    status: "draft",
    dueDate: "2025-01-31",
  },
]

export default function TaxDeclarationsPage() {
  return (
    <ModuleLayout moduleName="Accounting" moduleNameKa="ბუღალტერია" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tax Declarations</h1>
            <p className="text-muted-foreground">Manage tax filings and declarations</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Declaration
          </Button>
        </div>

        <div className="grid gap-4">
          {mockTaxDeclarations.map((declaration) => (
            <Card key={declaration.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileCheck className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{declaration.declarationNumber}</CardTitle>
                      <CardDescription>
                        {declaration.type} - {declaration.period}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={declaration.status === "submitted" ? "default" : "secondary"}>
                      {declaration.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium text-foreground">₾ {declaration.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium text-foreground">{declaration.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground">{declaration.type}</p>
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
