"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, User, Quote } from "lucide-react"

interface PrimarySource {
  id: string
  title: string
  author: string
  year: string
  type: string
  description: string
  excerpt: string
  image: string
}

interface PrimarySourcesGalleryProps {
  sources: PrimarySource[]
}

export function PrimarySourcesGallery({ sources }: PrimarySourcesGalleryProps) {
  const [selectedSource, setSelectedSource] = useState<PrimarySource | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)

  const types = Array.from(new Set(sources.map((source) => source.type)))

  const filteredSources = activeType ? sources.filter((source) => source.type === activeType) : sources

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case "historical-text":
        return <BookOpen className="h-4 w-4" />
      case "folklore":
        return <Quote className="h-4 w-4" />
      case "foreign-record":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getSourceTypeLabel = (type: string) => {
    switch (type) {
      case "historical-text":
        return "Sử liệu"
      case "folklore":
        return "Truyền thuyết"
      case "foreign-record":
        return "Tài liệu nước ngoài"
      default:
        return type
    }
  }

  return (
    <>
      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveType(null)}>
                Tất cả
              </TabsTrigger>
              {types.map((type) => (
                <TabsTrigger key={type} value={type} onClick={() => setActiveType(type)}>
                  <span className="flex items-center gap-1">
                    {getSourceTypeIcon(type)}
                    {getSourceTypeLabel(type)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredSources.map((source) => (
              <Card key={source.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={source.image || "/placeholder.svg"}
                    alt={source.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    <span className="flex items-center gap-1">
                      {getSourceTypeIcon(source.type)}
                      {getSourceTypeLabel(source.type)}
                    </span>
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{source.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{source.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{source.year}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{source.description}</p>
                    <Button variant="link" className="p-0 h-auto" onClick={() => setSelectedSource(source)}>
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>

      <Dialog open={!!selectedSource} onOpenChange={(open) => !open && setSelectedSource(null)}>
        {selectedSource && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedSource.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{selectedSource.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedSource.year}</span>
                  </div>
                  <Badge variant="outline">
                    <span className="flex items-center gap-1">
                      {getSourceTypeIcon(selectedSource.type)}
                      {getSourceTypeLabel(selectedSource.type)}
                    </span>
                  </Badge>
                </div>
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="excerpt">Trích đoạn</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="aspect-video relative overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={selectedSource.image || "/placeholder.svg"}
                      alt={selectedSource.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div>
                    <p className="text-gray-700 whitespace-pre-line">{selectedSource.description}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="excerpt" className="space-y-4 mt-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <Quote className="h-8 w-8 text-gray-400 mb-4" />
                  <p className="text-gray-700 italic whitespace-pre-line">{selectedSource.excerpt}</p>
                  <div className="mt-4 text-right text-sm text-gray-500">
                    — Trích từ {selectedSource.title}, {selectedSource.year}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
