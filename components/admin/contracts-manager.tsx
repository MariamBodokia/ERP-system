"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDataStore } from "@/lib/data-store"
import type { Contract } from "@/lib/db-schema"
import { useLanguage } from "@/lib/language-context"
import ErrorBoundary from "@/components/error-boundary"

export function ContractsManager() {
  const { t } = useLanguage()
  const { contracts, addContract, updateContract, deleteContract } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingContract, setEditingContract] = useState<Contract | null>(null)
  const [formData, setFormData] = useState<Partial<Contract>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingContract) {
      updateContract(editingContract.id, formData)
    } else {
      const newContract: Contract = {
        id: Date.now().toString(),
        contract_number: formData.contract_number || "",
        title: formData.title || "",
        type: formData.type || "sales",
        status: formData.status || "draft",
        party_buyer: formData.party_buyer || "",
        party_seller: formData.party_seller || "",
        amount: formData.amount || 0,
        currency: formData.currency || "GEL",
        start_date: formData.start_date || new Date().toISOString().split("T")[0],
        end_date: formData.end_date || new Date().toISOString().split("T")[0],
        payment_terms: formData.payment_terms || "",
        created_by: "admin",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      addContract(newContract)
    }
    setIsOpen(false)
    setEditingContract(null)
    setFormData({})
  }

  const handleEdit = (contract: Contract) => {
    setEditingContract(contract)
    setFormData(contract)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm(t("confirmContractDelete"))) {
      deleteContract(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("legalManagement")}</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingContract(null)
                  setFormData({})
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t("newContract")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingContract ? t("edit") : t("newContract")}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t("contractNumber")}</Label>
                    <Input
                      value={formData.contract_number || ""}
                      onChange={(e) => setFormData({ ...formData, contract_number: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t("title")}</Label>
                    <Input
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t("type")}</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">{t("sales")}</SelectItem>
                        <SelectItem value="purchase">{t("purchase")}</SelectItem>
                        <SelectItem value="service">{t("service")}</SelectItem>
                        <SelectItem value="lease">{t("lease")}</SelectItem>
                        <SelectItem value="license">{t("license")}</SelectItem>
                        <SelectItem value="partnership">{t("partnership")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t("status")}</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectStatus")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">{t("draft")}</SelectItem>
                        <SelectItem value="active">{t("active")}</SelectItem>
                        <SelectItem value="expired">{t("expired")}</SelectItem>
                        <SelectItem value="cancelled">{t("cancelled")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t("buyer")}</Label>
                    <Input
                      value={formData.party_buyer || ""}
                      onChange={(e) => setFormData({ ...formData, party_buyer: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t("seller")}</Label>
                    <Input
                      value={formData.party_seller || ""}
                      onChange={(e) => setFormData({ ...formData, party_seller: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 col-span-2 gap-4">
                    <div>
                      <Label>{t("amount")}</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.amount || ""}
                        onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <Label>{t("currency")}</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => setFormData({ ...formData, currency: value })}
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
                  <div>
                    <Label>{t("startDate")}</Label>
                    <Input
                      type="date"
                      value={formData.start_date || ""}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t("endDate")}</Label>
                    <Input
                      type="date"
                      value={formData.end_date || ""}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>{t("paymentTerms")}</Label>
                    <Input
                      value={formData.payment_terms || ""}
                      onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button type="submit">{editingContract ? t("update") : t("create")}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("contractNumber")}</TableHead>
              <TableHead>{t("title")}</TableHead>
              <TableHead>{t("type")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("amount")}</TableHead>
              <TableHead>{t("startDate")}</TableHead>
              <TableHead>{t("endDate")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.contract_number}</TableCell>
                <TableCell>{contract.title}</TableCell>
                <TableCell className="capitalize">{contract.type}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      contract.status === "active"
                        ? "bg-green-500/10 text-green-500"
                        : contract.status === "draft"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {t(contract.status)}
                  </span>
                </TableCell>
                <TableCell>
                  {contract.currency} {contract.amount.toLocaleString()}
                </TableCell>
                <TableCell>{contract.start_date}</TableCell>
                <TableCell>{contract.end_date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(contract)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(contract.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}