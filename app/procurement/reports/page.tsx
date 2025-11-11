"use client"

import { useState } from "react"
import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, DollarSign, Package } from "lucide-react"

const navItems = [
  { title: "Purchase Orders", titleKa: "შესყიდვის შეკვეთები", href: "/procurement" },
  { title: "Suppliers", titleKa: "მიმწოდებლები", href: "/procurement/suppliers" },
  { title: "Reports", titleKa: "ანგარიშები", href: "/procurement/reports" },
]

const stats = [
  { label: "Total Spend", value: "₾ 40,000", change: "+15%", icon: DollarSign },
  { label: "Active Orders", value: "12", change: "+3", icon: Package },
  { label: "Avg. Order Value", value: "₾ 3,333", change: "+8%", icon: TrendingUp },
]

export default function ProcurementReportsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<any>>({})

  // Map report type values to display names
  const reportTypeNames: { [key: string]: string } = {
    spending: "Spending Summary",
    orders: "Purchase Orders",
    suppliers: "Supplier Performance",
    delivery: "Delivery Analysis",
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Create sample report data
    const reportData = {
      type: formData.reportType || "spending",
      format: formData.format || "pdf",
      startDate: formData.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: formData.endDate || new Date().toISOString().split('T')[0],
      generatedAt: new Date().toLocaleString(),
      totalSpend: "₾ 40,000",
      activeOrders: 12,
      avgOrderValue: "₾ 3,333",
    }

    const selectedFormat = formData.format || "pdf"
    const reportType = reportTypeNames[formData.reportType || "spending"]
    const fileName = `${reportType}-${reportData.startDate}-to-${reportData.endDate}`

    if (selectedFormat === "csv") {
      // Generate CSV content
      const csvContent = `Procurement Report
Report Type: ${reportData.type}
Generated: ${reportData.generatedAt}
Period: ${reportData.startDate} to ${reportData.endDate}

Summary Metrics
Total Spend,${reportData.totalSpend}
Active Orders,${reportData.activeOrders}
Average Order Value,${reportData.avgOrderValue}

Spending by Supplier
Supplier Name,Amount
Global Tech Supplies,₾ 15,000
Euro Parts GmbH,€ 25,000
`
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${fileName}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } else if (selectedFormat === "excel") {
      // Generate Excel content (XML format)
      const excelContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Created>${new Date().toISOString()}</Created>
 </DocumentProperties>
 <Worksheet ss:Name="Report">
  <Table>
   <Row><Cell ss:StyleID="s62"><Data ss:Type="String">Procurement Report</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Report Type:</Data></Cell><Cell><Data ss:Type="String">${reportData.type}</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Generated:</Data></Cell><Cell><Data ss:Type="String">${reportData.generatedAt}</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Period:</Data></Cell><Cell><Data ss:Type="String">${reportData.startDate} to ${reportData.endDate}</Data></Cell></Row>
   <Row/>
   <Row><Cell ss:StyleID="s62"><Data ss:Type="String">Summary Metrics</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Total Spend</Data></Cell><Cell><Data ss:Type="String">${reportData.totalSpend}</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Active Orders</Data></Cell><Cell><Data ss:Type="Number">${reportData.activeOrders}</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Average Order Value</Data></Cell><Cell><Data ss:Type="String">${reportData.avgOrderValue}</Data></Cell></Row>
   <Row/>
   <Row><Cell ss:StyleID="s62"><Data ss:Type="String">Spending by Supplier</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Supplier Name</Data></Cell><Cell><Data ss:Type="String">Amount</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Global Tech Supplies</Data></Cell><Cell><Data ss:Type="String">₾ 15,000</Data></Cell></Row>
   <Row><Cell><Data ss:Type="String">Euro Parts GmbH</Data></Cell><Cell><Data ss:Type="String">€ 25,000</Data></Cell></Row>
  </Table>
 </Worksheet>
</Workbook>`
      const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${fileName}.xls`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } else if (selectedFormat === "pdf") {
      // Generate PDF content (simple text-based PDF)
      const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 450 >>
stream
BT
/F1 12 Tf
50 750 Td
(Procurement Report) Tj
0 -20 Td
(Report Type: ${reportData.type}) Tj
0 -20 Td
(Generated: ${reportData.generatedAt}) Tj
0 -20 Td
(Period: ${reportData.startDate} to ${reportData.endDate}) Tj
0 -40 Td
(Summary Metrics) Tj
0 -20 Td
(Total Spend: ${reportData.totalSpend}) Tj
0 -20 Td
(Active Orders: ${reportData.activeOrders}) Tj
0 -20 Td
(Average Order Value: ${reportData.avgOrderValue}) Tj
0 -40 Td
(Spending by Supplier) Tj
0 -20 Td
(Global Tech Supplies - 15,000 GEL) Tj
0 -20 Td
(Euro Parts GmbH - 25,000 EUR) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000253 00000 n 
0000000336 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
835
%%EOF`
      const blob = new Blob([pdfContent], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${fileName}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }

    console.log("Exporting report:", reportData)
    setIsOpen(false)
    setFormData({})
  }

  return (
    <ModuleLayout moduleName="Procurement" moduleNameKa="შესყიდვები" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Procurement Reports</h1>
            <p className="text-muted-foreground">Analytics and insights for procurement activities</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Export Procurement Report</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Report Type *</Label>
                    <Select value={formData.reportType || ""} onValueChange={(value: string) => setFormData({ ...formData, reportType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spending">Spending Summary</SelectItem>
                        <SelectItem value="orders">Purchase Orders</SelectItem>
                        <SelectItem value="suppliers">Supplier Performance</SelectItem>
                        <SelectItem value="delivery">Delivery Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="format">Export Format *</Label>
                    <Select value={formData.format || "pdf"} onValueChange={(value: string) => setFormData({ ...formData, format: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Export Report
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-success">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Spending by Supplier</CardTitle>
            <CardDescription>Top suppliers by total purchase amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Global Tech Supplies</span>
                <span className="font-medium text-foreground">₾ 15,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Euro Parts GmbH</span>
                <span className="font-medium text-foreground">€ 25,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModuleLayout>
  )
}
