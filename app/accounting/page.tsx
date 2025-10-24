"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText } from "lucide-react"
import { useDataStore } from "@/lib/data-store"

const navItems = [
  { title: "Journal Entries", titleKa: "საბუღალტრო ჩანაწერები", href: "/accounting" },
  { title: "Tax Declarations", titleKa: "საგადასახადო დეკლარაციები", href: "/accounting/tax" },
  { title: "Financial Reports", titleKa: "ფინანსური ანგარიშები", href: "/accounting/reports" },
  { title: "Bank Integration", titleKa: "საბანკო ინტეგრაცია", href: "/accounting/bank" },
]

export default function AccountingPage() {
  const { accountingEntries } = useDataStore()
  return (
    <ModuleLayout moduleName="Accounting" moduleNameKa="ბუღალტერია" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Journal Entries</h1>
            <p className="text-muted-foreground">Manage accounting transactions and entries</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>

        <div className="grid gap-4">
          {accountingEntries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{entry.entry_number}</CardTitle>
                      <CardDescription>{entry.description}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      entry.type === "income" ? "default" : entry.type === "expense" ? "destructive" : "secondary"
                    }
                  >
                    {entry.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{entry.entry_date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Debit Account</p>
                    <p className="font-medium text-foreground">{entry.debit_account}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Credit Account</p>
                    <p className="font-medium text-foreground">{entry.credit_account}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium text-foreground">
                      {entry.currency} {entry.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reference</p>
                    <p className="font-medium text-foreground">{entry.reference_doc || "N/A"}</p>
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
