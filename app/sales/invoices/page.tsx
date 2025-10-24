import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Download } from "lucide-react"

const navItems = [
  { title: "Sales Orders", titleKa: "გაყიდვის შეკვეთები", href: "/sales" },
  { title: "Customers", titleKa: "კლიენტები", href: "/sales/customers" },
  { title: "Invoices", titleKa: "ინვოისები", href: "/sales/invoices" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/sales/reports" },
]

const mockInvoices = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    customer: "ABC Corporation",
    amount: 54000,
    currency: "GEL",
    issueDate: "2025-01-18",
    dueDate: "2025-02-17",
    status: "paid",
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    customer: "XYZ Ltd",
    amount: 32000,
    currency: "GEL",
    issueDate: "2025-01-20",
    dueDate: "2025-02-19",
    status: "pending",
  },
]

export default function InvoicesPage() {
  return (
    <ModuleLayout moduleName="Sales Management" moduleNameKa="გაყიდვების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
            <p className="text-muted-foreground">Manage customer invoices and payments</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>

        <div className="grid gap-4">
          {mockInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{invoice.invoiceNumber}</CardTitle>
                      <CardDescription>{invoice.customer}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>{invoice.status}</Badge>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium text-foreground">
                      {invoice.currency} {invoice.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Issue Date</p>
                    <p className="font-medium text-foreground">{invoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium text-foreground">{invoice.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium text-foreground capitalize">{invoice.status}</p>
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
