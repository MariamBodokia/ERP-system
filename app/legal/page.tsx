"use client"

import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Pencil, Trash2 } from "lucide-react"
import { useDataStore } from "@/lib/data-store"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Contract } from "@/lib/db-schema"
import { useLanguage } from "@/lib/language-context"
import { getStatusBadgeClasses } from "@/lib/status-colors"

const navItems = [
  { title: "Contracts", titleKa: "კონტრაქტები", href: "/legal", titleKey: "contracts" as const },
  { title: "Legal Entities", titleKa: "იურიდიული პირები", href: "/legal/entities", titleKey: "legalEntities" as const },
  { title: "Documents", titleKa: "დოკუმენტები", href: "/legal/documents", titleKey: "documents" as const },
  { title: "Regulations", titleKa: "რეგულაციები", href: "/legal/regulations", titleKey: "regulations" as const },
]

export default function LegalPage() {
  const { t } = useLanguage()
  const { contracts, addContract, updateContract, deleteContract } = useDataStore()
  const [isAddingContract, setIsAddingContract] = useState(false)
  const [editingContract, setEditingContract] = useState<Contract | null>(null)
  const [deletingContractId, setDeletingContractId] = useState<string | null>(null)
  const [newContract, setNewContract] = useState<Partial<Contract>>({})

  const handleAddContract = () => {
    if (!newContract.title || !newContract.contract_number || !newContract.type || !newContract.amount || !newContract.currency) return

    // Set default dates: start_date is today, end_date is 1 year from now
    const startDate = newContract.start_date || new Date().toISOString().split('T')[0]
    const endDate = newContract.end_date || new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    try {
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
        start_date: startDate,
        end_date: endDate,
        payment_terms: newContract.payment_terms || 'Net 30',
        created_by: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      setIsAddingContract(false)
      setNewContract({})
    } catch (error) {
      console.error("Failed to create contract:", error)
    }
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

        <Dialog open={!!editingContract} onOpenChange={(open) => !open && setEditingContract(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Contract</DialogTitle>
            </DialogHeader>
            {editingContract && (
              <form onSubmit={(e) => {
                e.preventDefault()
                if (editingContract.id) {
                  updateContract(editingContract.id, newContract as any)
                  setEditingContract(null)
                  setNewContract({})
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editTitle">Title *</Label>
                  <Input
                    id="editTitle"
                    value={newContract.title || editingContract.title || ""}
                    onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editContractNumber">Contract Number *</Label>
                  <Input
                    id="editContractNumber"
                    value={newContract.contract_number || editingContract.contract_number || ""}
                    onChange={(e) => setNewContract({ ...newContract, contract_number: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editType">Contract Type *</Label>
                  <Select
                    value={newContract.type || editingContract.type || ""}
                    onValueChange={(value) => setNewContract({ ...newContract, type: value as Contract['type'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Purchase">Purchase</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                      <SelectItem value="Employment">Employment</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editAmount">Amount *</Label>
                  <Input
                    id="editAmount"
                    type="number"
                    step="0.01"
                    value={newContract.amount || editingContract.amount || ""}
                    onChange={(e) => setNewContract({ ...newContract, amount: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editCurrency">Currency *</Label>
                  <Select
                    value={newContract.currency || editingContract.currency || ""}
                    onValueChange={(value) => setNewContract({ ...newContract, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GEL">GEL</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPaymentTerms">Payment Terms</Label>
                  <Input
                    id="editPaymentTerms"
                    value={newContract.payment_terms || editingContract.payment_terms || ""}
                    onChange={(e) => setNewContract({ ...newContract, payment_terms: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select value={newContract.status || editingContract.status || "draft"} onValueChange={(value: string) => setNewContract({ ...newContract, status: value as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>

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
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingContract(contract)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingContractId(contract.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className={getStatusBadgeClasses(contract.status)}>
                      {contract.status}
                    </Badge>
                  </div>
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

      <AlertDialog open={!!deletingContractId} onOpenChange={(open) => !open && setDeletingContractId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contract</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contract? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingContractId) {
                  deleteContract(deletingContractId)
                  setDeletingContractId(null)
                }
              }}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </ModuleLayout>
  )
}