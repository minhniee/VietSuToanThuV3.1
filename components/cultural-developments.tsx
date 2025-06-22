"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scroll, BookOpen, Brush, Landmark } from "lucide-react"

interface CulturalDevelopment {
  id: string
  title: string
  category: string
  description: string
  image: string
}

interface CulturalDevelopmentsProps {
  developments: CulturalDevelopment[]
}

export function CulturalDevelopments({ developments }: CulturalDevelopmentsProps) {
  const [selectedDevelopment, setSelectedDevelopment] = useState<CulturalDevelopment | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(developments.map((dev) => dev.category)))

  const filteredDevelopments = activeCategory
    ? developments.filter((dev) => dev.category === activeCategory)
    : developments

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "language":
        return <BookOpen className="h-4 w-4" />
      case "philosophy":
        return <Scroll className="h-4 w-4" />
      case "religion":
        return <Landmark className="h-4 w-4" />
      case "economy":
        return <Landmark className="h-4 w-4" />
      case "art":
        return <Brush className="h-4 w-4" />
      default:
        return <Scroll className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "language":
        return "Ngôn ngữ"
      case "philosophy":
        return "Triết học"
      case "religion":
        return "Tôn giáo"
      case "economy":
        return "Kinh tế"
      case "art":
        return "Nghệ thuật"
      default:
        return category
    }
  }

  return (
    <>
      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveCategory(null)}>
                Tất cả
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
                  <span className="flex items-center gap-1">
                    {getCategoryIcon(category)}
                    {getCategoryLabel(category)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredDevelopments.map((development) => (
              <Card key={development.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={development.image || "/placeholder.svg"}
                    alt={development.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(development.category)}
                      {getCategoryLabel(development.category)}
                    </span>
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{development.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{development.description}</p>
                    <Button variant="link" className="p-0 h-auto" onClick={() => setSelectedDevelopment(development)}>
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>

      <Dialog open={!!selectedDevelopment} onOpenChange={(open) => !open && setSelectedDevelopment(null)}>
        {selectedDevelopment && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedDevelopment.title}</DialogTitle>
              <DialogDescription>
                <Badge variant="outline">
                  <span className="flex items-center gap-1">
                    {getCategoryIcon(selectedDevelopment.category)}
                    {getCategoryLabel(selectedDevelopment.category)}
                  </span>
                </Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 md:grid-cols-2 mt-4">
              <div className="aspect-video relative overflow-hidden rounded-md bg-gray-100">
                <img
                  src={selectedDevelopment.image || "/placeholder.svg"}
                  alt={selectedDevelopment.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <p className="text-gray-700 whitespace-pre-line">{selectedDevelopment.description}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
