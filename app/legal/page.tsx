"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Contract } from "@/lib/db-schema"
import { useLanguage } from "@/lib/language-context"

const navItems = [
  { title: "Contracts", titleKa: "კონტრაქტები", href: "/legal", titleKey: "contracts" as const },
  { title: "Legal Entities", titleKa: "იურიდიული პირები", href: "/legal/entities", titleKey: "legalEntities" as const },
  { title: "Documents", titleKa: "დოკუმენტები", href: "/legal/documents", titleKey: "documents" as const },
  { title: "Regulations", titleKa: "რეგულაციები", href: "/legal/regulations", titleKey: "regulations" as const },
]

export default function LegalPage() {
  const { t } = useLanguage()
  const { contracts, addContract } = useDataStore()
  const [isAddingContract, setIsAddingContract] = useState(false)
  const [newContract, setNewContract] = useState<Partial<Contract>>({})

  const handleAddContract = () => {
    if (!newContract.title || !newContract.contract_number || !newContract.type || !newContract.amount || !newContract.currency) return

    addContract({
      id: Date.now().toString(),
      contract_number: newContract.contract_number,
      title: newContract.title,
      type: newContract.type as Contract['type'],
      status: 'draft',
      party_buyer: newContract.party_buyer || '',
      party_seller: newContract.party_seller || '',
      amount: Number(newContract.amount),
      currency: newContract.currency,
      start_date: newContract.start_date || new Date().toISOString().split('T')[0],
      end_date: newContract.end_date || new Date().toISOString().split('T')[0],
      payment_terms: newContract.payment_terms || 'Net 30',
      created_by: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    setIsAddingContract(false)
    setNewContract({})
  }

  return (
    <ModuleLayout
      moduleName="Legal Management"
      moduleNameKa="იურიდიული მართვა"
      moduleNameKey="legalManagement"
      navItems={navItems}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("contracts")}</h1>
            <p className="text-muted-foreground">{t("manageContracts")}</p>
          </div>
          <Dialog open={isAddingContract} onOpenChange={setIsAddingContract}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t("newContract")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("newContract")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="title">{t("details")}</Label>
                    <Input
                      id="title"
                      value={newContract.title || ''}
                      onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contract_number">{t("contractNumber")}</Label>
                    <Input
                      id="contract_number"
                      value={newContract.contract_number || ''}
                      onChange={(e) => setNewContract({ ...newContract, contract_number: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">{t("contractType")}</Label>
                    <Select
                      value={newContract.type}
                      onValueChange={(value) => setNewContract({ ...newContract, type: value as Contract['type'] })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("contractType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">{t("sales")}</SelectItem>
                        <SelectItem value="purchase">{t("procurement")}</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="lease">Lease</SelectItem>
                        <SelectItem value="license">License</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">{t("amount")}</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newContract.amount || ''}
                      onChange={(e) => setNewContract({ ...newContract, amount: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">{t("currency")}</Label>
                    <Select
                      value={newContract.currency}
                      onValueChange={(value) => setNewContract({ ...newContract, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCurrency")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GEL">GEL</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddContract} className="w-full">{t("newContract")}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{contract.title}</CardTitle>
                      <CardDescription>{contract.contract_number}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      contract.status === "active" ? "default" : contract.status === "draft" ? "secondary" : "outline"
                    }
                  >
                    {contract.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t("type")}</p>
                    <p className="font-medium text-foreground">{contract.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("amount")}</p>
                    <p className="font-medium text-foreground">
                      {contract.currency} {contract.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("startDate")}</p>
                    <p className="font-medium text-foreground">{contract.start_date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("endDate")}</p>
                    <p className="font-medium text-foreground">{contract.end_date}</p>
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