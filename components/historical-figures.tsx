"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Calendar, Award } from "lucide-react"

interface HistoricalFigure {
  id: string
  name: string
  fullName: string
  years: string
  description: string
  achievements: string[]
  image: string
}

interface HistoricalFiguresProps {
  figures: HistoricalFigure[]
}

export function HistoricalFigures({ figures }: HistoricalFiguresProps) {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null)

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {figures.map((figure) => (
          <Card key={figure.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              <img
                src={figure.image || "/placeholder.svg"}
                alt={figure.name}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{figure.name}</h3>
                  <Badge variant="outline">{figure.years}</Badge>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3">{figure.description}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button onClick={() => setSelectedFigure(figure)} className="w-full">
                Xem chi tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedFigure} onOpenChange={(open) => !open && setSelectedFigure(null)}>
        {selectedFigure && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedFigure.name}</DialogTitle>
              <DialogDescription>{selectedFigure.fullName}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="achievements">Thành tựu</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={selectedFigure.image || "/placeholder.svg"}
                      alt={selectedFigure.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Tên đầy đủ:</span>
                      <span>{selectedFigure.fullName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Thời gian:</span>
                      <span>{selectedFigure.years}</span>
                    </div>

                    <p className="text-gray-700 whitespace-pre-line">{selectedFigure.description}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4 mt-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Thành tựu nổi bật
                </h3>

                <ul className="space-y-3">
                  {selectedFigure.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
