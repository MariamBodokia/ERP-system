import { ModuleLayout } from "@/components/module-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen } from "lucide-react"

const navItems = [
  { title: "Production Orders", titleKa: "წარმოების შეკვეთები", href: "/production" },
  { title: "Recipes", titleKa: "რეცეპტურები", href: "/production/recipes" },
  { title: "Cost Calculation", titleKa: "თვითღირებულება", href: "/production/cost" },
]

const mockRecipes = [
  {
    id: "1",
    name: "Laptop Assembly Recipe",
    product: "Laptop Computer",
    materials: [
      { name: "Motherboard", quantity: 1, unit: "pcs" },
      { name: "RAM 16GB", quantity: 2, unit: "pcs" },
      { name: "SSD 512GB", quantity: 1, unit: "pcs" },
    ],
  },
  {
    id: "2",
    name: "Office Chair Assembly",
    product: "Office Chair",
    materials: [
      { name: "Chair Base", quantity: 1, unit: "pcs" },
      { name: "Seat Cushion", quantity: 1, unit: "pcs" },
      { name: "Backrest", quantity: 1, unit: "pcs" },
    ],
  },
]

export default function RecipesPage() {
  return (
    <ModuleLayout moduleName="Production Management" moduleNameKa="წარმოების მართვა" navItems={navItems}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Production Recipes</h1>
            <p className="text-muted-foreground">Manage bills of materials and recipes</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Recipe
          </Button>
        </div>

        <div className="grid gap-4">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>Product: {recipe.product}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Materials:</p>
                  {recipe.materials.map((material, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{material.name}</span>
                      <span className="text-foreground">
                        {material.quantity} {material.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ModuleLayout>
  )
}
