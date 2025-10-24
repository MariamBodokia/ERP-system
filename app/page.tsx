"use client"

import Link from "next/link"
import {
  FileText,
  ShoppingCart,
  Warehouse,
  Calculator,
  Factory,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Activity,
  Settings,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"

const modules = [
  {
    titleKey: "legal" as const,
    descKey: "legalDesc" as const,
    icon: FileText,
    href: "/legal",
    color: "text-blue-500",
  },
  {
    titleKey: "procurement" as const,
    descKey: "procurementDesc" as const,
    icon: ShoppingCart,
    href: "/procurement",
    color: "text-green-500",
  },
  {
    titleKey: "warehouse" as const,
    descKey: "warehouseDesc" as const,
    icon: Warehouse,
    href: "/warehouse",
    color: "text-yellow-500",
  },
  {
    titleKey: "accounting" as const,
    descKey: "accountingDesc" as const,
    icon: Calculator,
    href: "/accounting",
    color: "text-purple-500",
  },
  {
    titleKey: "production" as const,
    descKey: "productionDesc" as const,
    icon: Factory,
    href: "/production",
    color: "text-orange-500",
  },
  {
    titleKey: "sales" as const,
    descKey: "salesDesc" as const,
    icon: TrendingUp,
    href: "/sales",
    color: "text-cyan-500",
  },
  {
    titleKey: "finance" as const,
    descKey: "financeDesc" as const,
    icon: DollarSign,
    href: "/finance",
    color: "text-emerald-500",
  },
  {
    titleKey: "hr" as const,
    descKey: "hrDesc" as const,
    icon: Users,
    href: "/hr",
    color: "text-pink-500",
  },
  {
    titleKey: "managerial" as const,
    descKey: "managerialDesc" as const,
    icon: BarChart3,
    href: "/managerial",
    color: "text-indigo-500",
  },
]

export default function HomePage() {
  const { t } = useLanguage()

  const stats = [
    { labelKey: "activeContracts" as const, value: "24", change: "+12%", icon: FileText },
    { labelKey: "purchaseOrders" as const, value: "156", change: "+8%", icon: ShoppingCart },
    { labelKey: "inventoryItems" as const, value: "1,234", change: "-3%", icon: Warehouse },
    { labelKey: "salesThisMonth" as const, value: "₾ 245K", change: "+23%", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">ERP System</h1>
                <p className="text-sm text-muted-foreground">Enterprise Resource Planning</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">{t("welcome")}</h2>
          <p className="text-muted-foreground">{t("welcomeSubtitle")}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.labelKey} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <span
                    className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-success" : "text-destructive"}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modules Grid */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">{t("systemModules")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Link key={module.href} href={module.href}>
                <Card className="bg-card border-border hover:border-primary transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <module.icon className={`h-6 w-6 ${module.color}`} />
                      <CardTitle className="text-foreground">{t(module.titleKey)}</CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">{t(module.descKey)}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
