import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  return (
    <ModuleLayout moduleName="Legal Management" moduleNameKa="იურიდიული მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground">Manage legal documents and files</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Upload Document
          </Button>
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
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
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
