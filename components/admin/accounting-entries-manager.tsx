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
import { Textarea } from "@/components/ui/textarea"
import { useDataStore } from "@/lib/data-store"
import type { AccountingEntry } from "@/lib/db-schema"

export function AccountingEntriesManager() {
  const { accountingEntries, addAccountingEntry, updateAccountingEntry, deleteAccountingEntry } = useDataStore()
  const [isOpen, setIsOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<AccountingEntry | null>(null)
  const [formData, setFormData] = useState<Partial<AccountingEntry>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingEntry) {
      updateAccountingEntry(editingEntry.id, formData)
    } else {
      const newEntry: AccountingEntry = {
        id: Date.now().toString(),
        entry_number: formData.entry_number || "",
        entry_date: formData.entry_date || new Date().toISOString().split("T")[0],
        type: formData.type || "expense",
        debit_account: formData.debit_account || "",
        credit_account: formData.credit_account || "",
        amount: formData.amount || 0,
        currency: formData.currency || "GEL",
        description: formData.description || "",
        reference_doc: formData.reference_doc,
        created_by: "admin",
        created_at: new Date().toISOString(),
      }
      addAccountingEntry(newEntry)
    }
    setIsOpen(false)
    setEditingEntry(null)
    setFormData({})
  }

  const handleEdit = (entry: AccountingEntry) => {
    setEditingEntry(entry)
    setFormData(entry)
    setIsOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this accounting entry?")) {
      deleteAccountingEntry(id)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Accounting Entries Management</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingEntry(null)
                  setFormData({})
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingEntry ? "Edit Accounting Entry" : "Add New Accounting Entry"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Entry Number</Label>
                    <Input
                      value={formData.entry_number || ""}
                      onChange={(e) => setFormData({ ...formData, entry_number: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Entry Date</Label>
                    <Input
                      type="date"
                      value={formData.entry_date || ""}
                      onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.amount || ""}
                      onChange={(e) => setFormData({ ...formData, amount: Number.parseFloat(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Debit Account</Label>
                    <Input
                      value={formData.debit_account || ""}
                      onChange={(e) => setFormData({ ...formData, debit_account: e.target.value })}
                      placeholder="e.g., 1010"
                      required
                    />
                  </div>
                  <div>
                    <Label>Credit Account</Label>
                    <Input
                      value={formData.credit_account || ""}
                      onChange={(e) => setFormData({ ...formData, credit_account: e.target.value })}
                      placeholder="e.g., 4100"
                      required
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
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
                  <div>
                    <Label>Reference Document</Label>
                    <Input
                      value={formData.reference_doc || ""}
                      onChange={(e) => setFormData({ ...formData, reference_doc: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingEntry ? "Update" : "Create"}</Button>
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
              <TableHead>Entry #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Debit</TableHead>
              <TableHead>Credit</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountingEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.entry_number}</TableCell>
                <TableCell>{entry.entry_date}</TableCell>
                <TableCell className="capitalize">{entry.type}</TableCell>
                <TableCell>{entry.debit_account}</TableCell>
                <TableCell>{entry.credit_account}</TableCell>
                <TableCell>
                  {entry.amount.toLocaleString()} {entry.currency}
                </TableCell>
                <TableCell className="max-w-xs truncate">{entry.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(entry)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(entry.id)}>
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
