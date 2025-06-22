import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Khám Phá{" "}
            <span className="bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              Lịch Sử Việt Nam
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
            Hành trình qua 4000 năm lịch sử dân tộc với những câu chuyện hấp dẫn, bài học tương tác và trải nghiệm học
            tập hiện đại.
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Link href="/periods">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700"
              >
                <BookOpen className="h-5 w-5" />
                Bắt Đầu Học
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/practice">
              <Button size="lg" variant="outline" className="gap-2 border-amber-600 text-amber-600 hover:bg-amber-50">
                <Users className="h-5 w-5" />
                Luyện Tập
              </Button>
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="text-3xl font-bold text-amber-600">4000+</div>
              <div className="text-sm text-gray-600">Năm Lịch Sử</div>
            </div>
            <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="text-3xl font-bold text-red-600">100+</div>
              <div className="text-sm text-gray-600">Bài Học</div>
            </div>
            <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-sm text-gray-600">Sự Kiện Quan Trọng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-amber-200/30 to-red-200/30 blur-3xl"></div>
      </div>
    </section>
  )
}
