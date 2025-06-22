import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-yellow-500" />
              <span className="font-bold text-lg">Lịch Sử Việt Nam</span>
            </div>
            <p className="text-gray-400 text-sm">
              Khám phá và học hỏi về lịch sử dân tộc Việt Nam qua các bài học tương tác và nội dung phong phú.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Thời kỳ lịch sử</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/periods/bac-thuoc" className="hover:text-white">
                  Thời kỳ Bắc thuộc
                </Link>
              </li>
              <li>
                <Link href="/periods/phong-kien" className="hover:text-white">
                  Phong kiến độc lập
                </Link>
              </li>
              <li>
                <Link href="/periods/thuc-dan" className="hover:text-white">
                  Thực dân Pháp
                </Link>
              </li>
              <li>
                <Link href="/periods/hien-dai" className="hover:text-white">
                  Thời kỳ hiện đại
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tính năng</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/periods" className="hover:text-white">
                  Bài học tương tác
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white">
                  Bản đồ lịch sử
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Quiz và kiểm tra
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Video và audio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@lichsuvietnam.edu.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+84 24 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Lịch Sử Việt Nam. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
