"use client"
import Link from "next/link"
import { Home, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/language-context"
import { ContractsManager } from "@/components/admin/contracts-manager"
import { SuppliersManager } from "@/components/admin/suppliers-manager"
import { InventoryManager } from "@/components/admin/inventory-manager"
import { WarehousesManager } from "@/components/admin/warehouses-manager"
import { CustomersManager } from "@/components/admin/customers-manager"
import { PurchaseOrdersManager } from "@/components/admin/purchase-orders-manager"
import { SalesOrdersManager } from "@/components/admin/sales-orders-manager"
import { AccountingEntriesManager } from "@/components/admin/accounting-entries-manager"
import { ValidationTester } from "@/components/admin/validation-tester"

export default function AdminPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t("adminPanel")}</h1>
                <p className="text-sm text-muted-foreground">{t("adminDescription")}</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                {t("home")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{t("dataManagement")}</h2>
          <p className="text-muted-foreground">
            {t("dataManagementDescription")}
          </p>
        </div>

        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 mb-8">
            <TabsTrigger value="contracts">{t("contracts")}</TabsTrigger>
            <TabsTrigger value="suppliers">{t("suppliers")}</TabsTrigger>
            <TabsTrigger value="purchase-orders">{t("purchaseOrders")}</TabsTrigger>
            <TabsTrigger value="inventory">{t("inventory")}</TabsTrigger>
            <TabsTrigger value="warehouses">{t("warehouses")}</TabsTrigger>
            <TabsTrigger value="customers">{t("customers")}</TabsTrigger>
            <TabsTrigger value="sales-orders">{t("salesOrders")}</TabsTrigger>
            <TabsTrigger value="accounting">{t("accounting")}</TabsTrigger>
            <TabsTrigger value="validation">{t("validationTester")}</TabsTrigger>
          </TabsList>

          <TabsContent value="contracts">
            <ContractsManager />
          </TabsContent>

          <TabsContent value="suppliers">
            <SuppliersManager />
          </TabsContent>

          <TabsContent value="purchase-orders">
            <PurchaseOrdersManager />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManager />
          </TabsContent>

          <TabsContent value="warehouses">
            <WarehousesManager />
          </TabsContent>

          <TabsContent value="customers">
            <CustomersManager />
          </TabsContent>

          <TabsContent value="sales-orders">
            <SalesOrdersManager />
          </TabsContent>

          <TabsContent value="accounting">
            <AccountingEntriesManager />
          </TabsContent>

          <TabsContent value="validation">
            <ValidationTester />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
