"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import type { TranslationKey } from "@/lib/translations"

interface NavItem {
  title: string
  titleKa: string
  href: string
  titleKey?: TranslationKey
}

interface ModuleLayoutProps {
  children: ReactNode
  moduleName: string
  moduleNameKa: string
  navItems: NavItem[]
  moduleNameKey?: TranslationKey
}

export function ModuleLayout({ children, moduleName, moduleNameKa, navItems, moduleNameKey }: ModuleLayoutProps) {
  const pathname = usePathname()
  const { t, language } = useLanguage()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <Home className="h-4 w-4" />
              {t("home")}
            </Button>
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-lg text-foreground">{moduleNameKey ? t(moduleNameKey) : moduleName}</h2>
          <p className="text-sm text-muted-foreground">{language === "ka" ? moduleNameKa : moduleName}</p>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const displayTitle = item.titleKey ? t(item.titleKey) : language === "ka" ? item.titleKa : item.title

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span>{displayTitle}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
