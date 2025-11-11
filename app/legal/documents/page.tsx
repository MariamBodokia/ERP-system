"use client"

import { useState } from "react"
import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, FileText, Download } from "lucide-react"

const navItems = [
  { title: "Contracts", titleKa: "კონტრაქტები", href: "/legal" },
  { title: "Legal Entities", titleKa: "იურიდიული პირები", href: "/legal/entities" },
  { title: "Documents", titleKa: "დოკუმენტები", href: "/legal/documents" },
  { title: "Regulations", titleKa: "რეგულაციები", href: "/legal/regulations" },
]

const mockDocuments = [
  {
    id: "1",
    name: "Software License Agreement - Signed",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2025-01-01",
    relatedTo: "CNT-2025-001",
  },
  {
    id: "2",
    name: "Office Lease Contract",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "2025-01-15",
    relatedTo: "CNT-2025-002",
  },
]

export default function LegalDocumentsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<any>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Uploading document:", formData)
    setIsOpen(false)
    setFormData({})
  }

  const handleDownload = (doc: any) => {
    // Create a sample file content based on document type
    const content = `Document: ${doc.name}
Type: ${doc.type}
Size: ${doc.size}
Upload Date: ${doc.uploadDate}
Related To: ${doc.relatedTo}

This is a sample document content.
In a real application, this would be the actual file content.
`
    
    // Determine MIME type and file extension based on document type
    let mimeType = 'text/plain'
    let fileExtension = '.txt'
    
    if (doc.type.toLowerCase() === 'pdf') {
      mimeType = 'application/pdf'
      fileExtension = '.pdf'
    } else if (doc.type.toLowerCase() === 'docx' || doc.type.toLowerCase() === 'word') {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      fileExtension = '.docx'
    } else if (doc.type.toLowerCase() === 'xlsx' || doc.type.toLowerCase() === 'excel') {
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      fileExtension = '.xlsx'
    } else if (doc.type.toLowerCase() === 'pptx' || doc.type.toLowerCase() === 'powerpoint') {
      mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      fileExtension = '.pptx'
    } else if (doc.type.toLowerCase() === 'csv') {
      mimeType = 'text/csv'
      fileExtension = '.csv'
    }
    
    // Create blob and download
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = doc.name.replace(/\s+/g, '_') + fileExtension
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <ModuleLayout moduleName="Legal Management" moduleNameKa="იურიდიული მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground">Manage legal documents and files</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="documentName">Document Name *</Label>
                  <Input
                    id="documentName"
                    value={formData.documentName || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, documentName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Select File *</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, file: e.target.files?.[0] })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relatedTo">Related to Contract (Optional)</Label>
                  <Input
                    id="relatedTo"
                    placeholder="e.g., CNT-2025-001"
                    value={formData.relatedTo || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, relatedTo: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Upload Document
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {mockDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>{doc.name}</CardTitle>
                      <CardDescription>Related to: {doc.relatedTo}</CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 bg-transparent"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium text-foreground">{doc.type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p className="font-medium text-foreground">{doc.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Upload Date</p>
                    <p className="font-medium text-foreground">{doc.uploadDate}</p>
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
