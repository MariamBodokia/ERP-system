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
import { Plus, Building2, Pencil, Trash2 } from "lucide-react"
import { getStatusBadgeClasses } from "@/lib/status-colors"

const navItems = [
  { title: "Contracts", titleKa: "კონტრაქტები", href: "/legal" },
  { title: "Legal Entities", titleKa: "იურიდიული პირები", href: "/legal/entities" },
  { title: "Documents", titleKa: "დოკუმენტები", href: "/legal/documents" },
  { title: "Regulations", titleKa: "რეგულაციები", href: "/legal/regulations" },
]

const mockEntities = [
  {
    id: "1",
    name: "Tech Corp LLC",
    taxId: "123456789",
    type: "Company",
    status: "active",
    country: "Georgia",
    registrationDate: "2020-01-15",
  },
  {
    id: "2",
    name: "Property Management Inc",
    taxId: "987654321",
    type: "Company",
    status: "active",
    country: "Georgia",
    registrationDate: "2018-05-20",
  },
]

export default function LegalEntitiesPage() {
  const [entities, setEntities] = useState(mockEntities)
  const [isOpen, setIsOpen] = useState(false)
  const [editingEntity, setEditingEntity] = useState<any>(null)
  const [deletingEntityId, setDeletingEntityId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<any>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Creating new entity:", formData)
    setIsOpen(false)
    setFormData({})
  }

  const handleUpdateStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingEntity && formData.status) {
      setEntities(entities.map(entity =>
        entity.id === editingEntity.id
          ? { ...entity, status: formData.status }
          : entity
      ))
      setEditingEntity(null)
      setFormData({})
    }
  }

  return (
    <ModuleLayout moduleName="Legal Management" moduleNameKa="იურიდიული მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Legal Entities</h1>
            <p className="text-muted-foreground">Manage companies and legal persons</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Entity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Legal Entity</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Entity Name *</Label>
                    <Input
                      id="name"
                      value={formData.name || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxId">Tax ID *</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, taxId: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Entity Type *</Label>
                    <Select value={formData.type || ""} onValueChange={(value: string) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Company">Company</SelectItem>
                        <SelectItem value="LLC">LLC</SelectItem>
                        <SelectItem value="Corporation">Corporation</SelectItem>
                        <SelectItem value="Partnership">Partnership</SelectItem>
                        <SelectItem value="Sole Proprietor">Sole Proprietor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registrationDate">Registration Date</Label>
                    <Input
                      id="registrationDate"
                      type="date"
                      value={formData.registrationDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, registrationDate: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Entity
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={!!editingEntity} onOpenChange={(open) => !open && setEditingEntity(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Legal Entity</DialogTitle>
            </DialogHeader>
            {editingEntity && (
              <form onSubmit={(e) => {
                e.preventDefault()
                if (editingEntity.id) {
                  const updatedEntity = {
                    ...editingEntity,
                    ...formData
                  }
                  setEntities(entities.map(entity =>
                    entity.id === editingEntity.id ? updatedEntity : entity
                  ))
                  setEditingEntity(null)
                  setFormData({})
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editName">Name *</Label>
                  <Input
                    id="editName"
                    value={formData.name || editingEntity.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editTaxId">Tax ID *</Label>
                  <Input
                    id="editTaxId"
                    value={formData.taxId || editingEntity.taxId || ""}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editType">Type *</Label>
                  <Input
                    id="editType"
                    value={formData.type || editingEntity.type || ""}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editCountry">Country</Label>
                  <Input
                    id="editCountry"
                    value={formData.country || editingEntity.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editRegistrationDate">Registration Date</Label>
                  <Input
                    id="editRegistrationDate"
                    type="date"
                    value={formData.registrationDate || editingEntity.registrationDate || ""}
                    onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editStatus">Status</Label>
                  <Select value={formData.status || editingEntity.status || "active"} onValueChange={(value: string) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
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
          {entities.map((entity) => (
            <Card key={entity.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{entity.name}</CardTitle>
                      <CardDescription>Tax ID: {entity.taxId}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingEntity(entity)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingEntityId(entity.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className={getStatusBadgeClasses(entity.status)}>{entity.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground">{entity.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Country</p>
                    <p className="font-medium text-foreground">{entity.country}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Registration Date</p>
                    <p className="font-medium text-foreground">{entity.registrationDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={!!deletingEntityId} onOpenChange={(open) => !open && setDeletingEntityId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Legal Entity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this legal entity? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingEntityId) {
                  setEntities(entities.filter(e => e.id !== deletingEntityId))
                  setDeletingEntityId(null)
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
