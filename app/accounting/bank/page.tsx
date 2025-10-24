import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Building2, RefreshCw } from "lucide-react"

const navItems = [
  { title: "Journal Entries", titleKa: "საბუღალტრო ჩანაწერები", href: "/accounting" },
  { title: "Tax Declarations", titleKa: "საგადასახადო დეკლარაციები", href: "/accounting/tax" },
  { title: "Financial Reports", titleKa: "ფინანსური ანგარიშები", href: "/accounting/reports" },
  { title: "Bank Integration", titleKa: "საბანკო ინტეგრაცია", href: "/accounting/bank" },
]

const mockBankAccounts = [
  {
    id: "1",
    bankName: "Bank of Georgia",
    accountNumber: "GE29NB0000000101904917",
    currency: "GEL",
    balance: 125000,
    status: "active",
    lastSync: "2025-01-20 14:30",
  },
  {
    id: "2",
    bankName: "TBC Bank",
    accountNumber: "GE15TB7194336080100003",
    currency: "USD",
    balance: 45000,
    status: "active",
    lastSync: "2025-01-20 14:28",
  },
]

export default function BankIntegrationPage() {
  return (
    <ModuleLayout moduleName="Accounting" moduleNameKa="ბუღალტერია" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bank Integration</h1>
            <p className="text-muted-foreground">Connect and sync bank accounts</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Connect Bank Account
          </Button>
        </div>

        <div className="grid gap-4">
          {mockBankAccounts.map((account) => (
            <Card key={account.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{account.bankName}</CardTitle>
                      <CardDescription>{account.accountNumber}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{account.status}</Badge>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <RefreshCw className="h-4 w-4" />
                      Sync
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Balance</p>
                    <p className="font-medium text-foreground text-lg">
                      {account.currency} {account.balance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Currency</p>
                    <p className="font-medium text-foreground">{account.currency}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Sync</p>
                    <p className="font-medium text-foreground">{account.lastSync}</p>
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
