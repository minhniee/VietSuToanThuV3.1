import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getPeriodById, getLessonByIds } from "@/lib/periods-data"
import { Clock, BookOpen, ArrowLeft, ArrowRight, Brain, ExternalLink } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ImageWithFallback } from "../../../../components/ImageWithFallback"

export default async function LessonPage({ params }: { params: { id: string; lessonId: string } }) {
  const period = await getPeriodById(params.id)

  if (!period) {
    return notFound()
  }

  const lessonId = Number.parseInt(params.lessonId)
  const lesson = await getLessonByIds(params.id, lessonId)

  if (!lesson) {
    return notFound()
  }

  // Find previous and next lessons
  const currentIndex = period.lessons.findIndex((l) => l.id === lessonId)
  const prevLesson = currentIndex > 0 ? period.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < period.lessons.length - 1 ? period.lessons[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Link href={`/periods/${params.id}`} className="text-blue-600 hover:text-blue-800">
            ← Quay lại danh sách bài học
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                    <CardDescription className="text-base">{lesson.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video or Image Content */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                  {lesson.hasVideo && lesson.videoUrl ? (
                    <iframe
                      src={lesson.videoUrl}
                      title={`Video bài học: ${lesson.title}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : lesson.imageUrl ? (
                    <ImageWithFallback
                      src={lesson.imageUrl}
                      alt={`Hình ảnh minh họa: ${lesson.title}`}
                      className="object-cover"
                    />
                  ) : (
                    <ImageWithFallback
                      src="/placeholder.svg?height=400&width=600&text=Hình+ảnh+bài+học"
                      alt="Hình ảnh minh họa bài học"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Mind Map Section */}
                {lesson.mindMapUrl && (
                  <Card className="border-2 border-dashed border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700">
                        <Brain className="h-5 w-5" />
                        Sơ đồ tư duy (Mind Map)
                      </CardTitle>
                      <CardDescription>
                        Xem sơ đồ tư duy để hiểu rõ hơn về cấu trúc và mối liên hệ của bài học
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white border">
                        <ImageWithFallback
                          src={lesson.mindMapUrl || "/placeholder.svg"}
                          alt={`Sơ đồ tư duy: ${lesson.title}`}
                          className="object-contain p-4"
                        />
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href={lesson.mindMapUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Xem toàn màn hình
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Lesson Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Nội dung bài học
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {lesson.content ? (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Giới thiệu</h3>
                          <p className="text-gray-700 leading-relaxed">{lesson.content.introduction}</p>
                        </div>

                        <Separator />

                        {lesson.content.sections.map((section, index) => (
                          <div key={index}>
                            <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{section.content}</p>
                          </div>
                        ))}

                        <Separator />

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Điểm quan trọng cần nhớ</h3>
                          <ul className="space-y-2">
                            {lesson.content.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Giới thiệu</h3>
                          <p className="text-gray-700 leading-relaxed">
                            Đây là nội dung chi tiết của bài học {lesson.title}. Nội dung này sẽ được cập nhật với thông
                            tin chi tiết về sự kiện lịch sử.
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Bối cảnh lịch sử</h3>
                          <p className="text-gray-700 leading-relaxed">
                            Bối cảnh lịch sử của thời kỳ này bao gồm các yếu tố chính trị, kinh tế, xã hội và văn hóa đã
                            ảnh hưởng đến các sự kiện diễn ra.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Diễn biến chính</h3>
                          <p className="text-gray-700 leading-relaxed">
                            Các sự kiện chính diễn ra trong thời kỳ này bao gồm các cuộc chiến tranh, cải cách, phong
                            trào xã hội và các quyết định chính trị quan trọng.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Ý nghĩa lịch sử</h3>
                          <p className="text-gray-700 leading-relaxed">
                            Những sự kiện này có ý nghĩa quan trọng đối với tiến trình lịch sử Việt Nam, ảnh hưởng đến
                            sự phát triển của đất nước trong các giai đoạn tiếp theo.
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between pt-4">
                  {prevLesson ? (
                    <Button asChild variant="outline" className="gap-2">
                      <Link href={`/periods/${params.id}/lessons/${prevLesson.id}`}>
                        <ArrowLeft className="h-4 w-4" />
                        Bài trước
                      </Link>
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  {nextLesson ? (
                    <Button asChild className="gap-2">
                      <Link href={`/periods/${params.id}/lessons/${nextLesson.id}`}>
                        Bài tiếp theo
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="gap-2">
                      <Link href={`/periods/${params.id}`}>
                        Hoàn thành
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin bài học</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Thời lượng: {lesson.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span>Thuộc thời kỳ: {period.title}</span>
                </div>

                {lesson.hasQuiz && (
                  <Button asChild className="w-full">
                    <Link href={`/periods/${params.id}/lessons/${lesson.id}/quiz`}>Làm bài kiểm tra</Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bài học liên quan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {period.lessons
                  .filter((l) => l.id !== lessonId)
                  .slice(0, 3)
                  .map((relatedLesson) => (
                    <div key={relatedLesson.id} className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                        {relatedLesson.id}
                      </div>
                      <div>
                        <Link
                          href={`/periods/${params.id}/lessons/${relatedLesson.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800"
                        >
                          {relatedLesson.title}
                        </Link>
                        <p className="text-xs text-gray-500">{relatedLesson.duration}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
