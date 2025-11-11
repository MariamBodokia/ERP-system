"use client"

import { useState } from "react"
import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Scale, Pencil, Trash2 } from "lucide-react"
import { getStatusBadgeClasses } from "@/lib/status-colors"

const navItems = [
  { title: "Contracts", titleKa: "კონტრაქტები", href: "/legal" },
  { title: "Legal Entities", titleKa: "იურიდიული პირები", href: "/legal/entities" },
  { title: "Documents", titleKa: "დოკუმენტები", href: "/legal/documents" },
  { title: "Regulations", titleKa: "რეგულაციები", href: "/legal/regulations" },
]

const mockRegulations = [
  {
    id: "1",
    title: "Tax Code of Georgia - Article 123",
    category: "Tax Law",
    effectiveDate: "2024-01-01",
    status: "active",
    description: "VAT regulations for international transactions",
  },
  {
    id: "2",
    title: "Labor Code - Chapter 5",
    category: "Labor Law",
    effectiveDate: "2023-06-01",
    status: "active",
    description: "Employee rights and working conditions",
  },
]

export default function LegalRegulationsPage() {
  const [regulations, setRegulations] = useState(mockRegulations)
  const [isOpen, setIsOpen] = useState(false)
  const [editingRegulation, setEditingRegulation] = useState<any>(null)
  const [deletingRegulationId, setDeletingRegulationId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<any>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Adding regulation:", formData)
    setIsOpen(false)
    setFormData({})
  }

  const handleUpdateStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingRegulation && formData.status) {
      setRegulations(regulations.map(regulation =>
        regulation.id === editingRegulation.id
          ? { ...regulation, status: formData.status }
          : regulation
      ))
      setEditingRegulation(null)
      setFormData({})
    }
  }

  return (
    <ModuleLayout moduleName="Legal Management" moduleNameKa="იურიდიული მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Regulations</h1>
            <p className="text-muted-foreground">Track legal regulations and compliance requirements</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Regulation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Regulation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Regulation Title *</Label>
                    <Input
                      id="title"
                      value={formData.title || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category || ""} onValueChange={(value: string) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tax Law">Tax Law</SelectItem>
                        <SelectItem value="Labor Law">Labor Law</SelectItem>
                        <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                        <SelectItem value="Contract Law">Contract Law</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="effectiveDate">Effective Date *</Label>
                    <Input
                      id="effectiveDate"
                      type="date"
                      value={formData.effectiveDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, effectiveDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status || "active"} onValueChange={(value: string) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter regulation details"
                    value={formData.description || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="h-24"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Regulation
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={!!editingRegulation} onOpenChange={(open) => !open && setEditingRegulation(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Regulation</DialogTitle>
            </DialogHeader>
            {editingRegulation && (
              <form onSubmit={(e) => {
                e.preventDefault()
                if (editingRegulation.id) {
                  const updatedRegulation = {
                    ...editingRegulation,
                    ...formData
                  }
                  setRegulations(regulations.map(regulation =>
                    regulation.id === editingRegulation.id ? updatedRegulation : regulation
                  ))
                  setEditingRegulation(null)
                  setFormData({})
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editTitle">Title *</Label>
                  <Input
                    id="editTitle"
                    value={formData.title || editingRegulation.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editCategory">Category *</Label>
                  <Input
                    id="editCategory"
                    value={formData.category || editingRegulation.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEffectiveDate">Effective Date *</Label>
                  <Input
                    id="editEffectiveDate"
                    type="date"
                    value={formData.effectiveDate || editingRegulation.effectiveDate || ""}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status *</Label>
                  <Select value={formData.status || editingRegulation.status || "active"} onValueChange={(value: string) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editDescription">Description *</Label>
                  <Textarea
                    id="editDescription"
                    placeholder="Enter regulation details"
                    value={formData.description || editingRegulation.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="h-24"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {regulations.map((regulation) => (
            <Card key={regulation.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{regulation.title}</CardTitle>
                      <CardDescription>{regulation.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingRegulation(regulation)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingRegulationId(regulation.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className={getStatusBadgeClasses(regulation.status)}>{regulation.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium text-foreground">{regulation.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Effective Date</p>
                    <p className="font-medium text-foreground">{regulation.effectiveDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={!!deletingRegulationId} onOpenChange={(open) => !open && setDeletingRegulationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Regulation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this regulation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingRegulationId) {
                  setRegulations(regulations.filter(r => r.id !== deletingRegulationId))
                  setDeletingRegulationId(null)
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
