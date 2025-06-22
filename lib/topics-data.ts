export interface Topic {
  id: string
  name: string
  description: string
  period: string
  questionCount: number
  subtopics?: string[]
}

export const topicsData: Topic[] = [
  {
    id: "bac-thuoc",
    name: "Thời kỳ Bắc thuộc",
    description: "Giai đoạn Việt Nam bị các triều đại phương Bắc đô hộ (179 TCN - 938)",
    period: "179 TCN - 938",
    questionCount: 180,
    subtopics: ["Khởi nghĩa Hai Bà Trưng", "Khởi nghĩa Bà Triệu", "Khởi nghĩa Lý Bí", "Trận Bạch Đằng 938"],
  },
  {
    id: "hai-ba-trung",
    name: "Khởi nghĩa Hai Bà Trưng",
    description: "Cuộc khởi nghĩa chống ách đô hộ của nhà Hán (40-43)",
    period: "40-43",
    questionCount: 45,
    subtopics: ["Nguyên nhân khởi nghĩa", "Diễn biến khởi nghĩa", "Ý nghĩa lịch sử"],
  },
  {
    id: "ba-trieu",
    name: "Khởi nghĩa Bà Triệu",
    description: "Cuộc khởi nghĩa do Triệu Thị Trinh lãnh đạo (248)",
    period: "248",
    questionCount: 35,
    subtopics: ["Tiểu sử Bà Triệu", "Diễn biến khởi nghĩa", "Tinh thần yêu nước"],
  },
  {
    id: "ly-bi",
    name: "Khởi nghĩa Lý Bí",
    description: "Cuộc khởi nghĩa thành lập nước Vạn Xuân (542-602)",
    period: "542-602",
    questionCount: 40,
    subtopics: ["Lý Bí và nước Vạn Xuân", "Triều Tiền Lý", "Ý nghĩa độc lập"],
  },
  {
    id: "bach-dang-938",
    name: "Trận Bạch Đằng 938",
    description: "Ngô Quyền đánh bại quân Nam Hán, kết thúc thời kỳ Bắc thuộc",
    period: "938",
    questionCount: 60,
    subtopics: ["Ngô Quyền", "Chiến thuật đóng cọc", "Ý nghĩa lịch sử"],
  },
  {
    id: "phong-kien",
    name: "Thời kỳ phong kiến độc lập",
    description: "Các triều đại phong kiến Việt Nam (939-1884)",
    period: "939-1884",
    questionCount: 250,
    subtopics: ["Nhà Ngô", "Nhà Đinh - Tiền Lê", "Nhà Lý", "Nhà Trần", "Nhà Hồ", "Nhà Lê", "Nhà Nguyễn"],
  },
  {
    id: "nha-ly",
    name: "Nhà Lý (1009-1225)",
    description: "Triều đại phong kiến đầu tiên của Việt Nam",
    period: "1009-1225",
    questionCount: 80,
    subtopics: ["Lý Thái Tổ", "Thăng Long", "Chế độ chính trị", "Văn hóa Phật giáo"],
  },
  {
    id: "nha-tran",
    name: "Nhà Trần (1225-1400)",
    description: "Triều đại chống giặc Mông-Nguyên",
    period: "1225-1400",
    questionCount: 90,
    subtopics: ["Trần Thái Tông", "Chiến tranh chống Mông-Nguyên", "Trần Hưng Đạo", "Trận Bạch Đằng 1288"],
  },
  {
    id: "thuc-dan-phap",
    name: "Thời kỳ Pháp thuộc",
    description: "Giai đoạn bị thực dân Pháp đô hộ (1884-1945)",
    period: "1884-1945",
    questionCount: 200,
    subtopics: [
      "Xâm lược của Pháp",
      "Phong trào Cần Vương",
      "Phan Bội Châu",
      "Phan Châu Trinh",
      "Đảng Cộng sản Việt Nam",
    ],
  },
  {
    id: "can-vuong",
    name: "Phong trào Cần Vương",
    description: "Phong trào chống Pháp cuối thế kỷ 19",
    period: "1885-1896",
    questionCount: 50,
    subtopics: ["Hàm Nghi", "Phan Đình Phùng", "Hoàng Hoa Thám", "Ý nghĩa lịch sử"],
  },
  {
    id: "dong-du",
    name: "Phong trào Đông Du",
    description: "Phong trào du học Nhật Bản của Phan Bội Châu",
    period: "1905-1908",
    questionCount: 40,
    subtopics: ["Phan Bội Châu", "Việt Nam Duy Tân Hội", "Du học sinh Nhật Bản"],
  },
  {
    id: "hien-dai",
    name: "Thời kỳ hiện đại",
    description: "Từ Cách mạng Tháng Tám đến nay (1945-nay)",
    period: "1945-nay",
    questionCount: 220,
    subtopics: [
      "Cách mạng Tháng Tám",
      "Kháng chiến chống Pháp",
      "Chiến tranh Việt Nam",
      "Thống nhất đất nước",
      "Đổi mới",
    ],
  },
  {
    id: "cach-mang-thang-tam",
    name: "Cách mạng Tháng Tám",
    description: "Cuộc cách mạng giành độc lập năm 1945",
    period: "1945",
    questionCount: 60,
    subtopics: ["Tổng khởi nghĩa", "Tuyên ngôn độc lập", "Chính phủ lâm thời"],
  },
  {
    id: "khang-chien-phap",
    name: "Kháng chiến chống Pháp",
    description: "Cuộc kháng chiến toàn quốc (1946-1954)",
    period: "1946-1954",
    questionCount: 80,
    subtopics: ["Chiến tranh Đông Dương", "Điện Biên Phủ", "Hiệp định Genève"],
  },
  {
    id: "chien-tranh-viet-nam",
    name: "Chiến tranh Việt Nam",
    description: "Cuộc chiến chống Mỹ và chính quyền Sài Gòn (1955-1975)",
    period: "1955-1975",
    questionCount: 100,
    subtopics: ["Chiến lược Mỹ", "Mặt trận Dân tộc Giải phóng", "Tết Mậu Thân 1968", "Giải phóng miền Nam"],
  },
]

// Additional lesson data for periods
export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  imageUrl: string
  videoUrl?: string | null
  duration: string
  difficulty: string
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Khái niệm thời kỳ phong kiến",
    description: "Tìm hiểu về đặc điểm và cấu trúc xã hội phong kiến Việt Nam",
    content: "Nội dung bài học về thời kỳ phong kiến...",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Thời+kỳ+phong+kiến",
    videoUrl: null,
    duration: "15 phút",
    difficulty: "Cơ bản",
  },
  {
    id: "2",
    title: "Văn hóa truyền thống Việt Nam",
    description: "Khám phá các giá trị văn hóa đặc sắc của dân tộc",
    content: "Nội dung bài học về văn hóa truyền thống...",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Văn+hóa+truyền+thống",
    videoUrl: null,
    duration: "20 phút",
    difficulty: "Trung bình",
  },
  {
    id: "3",
    title: "Lịch sử kháng chiến chống Pháp",
    description: "Tìm hiểu về cuộc kháng chiến chống thực dân Pháp xâm lược",
    content: "Nội dung bài học về lịch sử kháng chiến...",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Lịch+sử+kháng+chiến",
    videoUrl: null,
    duration: "25 phút",
    difficulty: "Nâng cao",
  },
  {
    id: "4",
    title: "Các triều đại phong kiến Việt Nam",
    description: "Tổng quan về các triều đại phong kiến trong lịch sử Việt Nam",
    content: "Nội dung bài học về các triều đại phong kiến...",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Triều+đại+phong+kiến",
    videoUrl: null,
    duration: "18 phút",
    difficulty: "Trung bình",
  },
  {
    id: "5",
    title: "Di sản văn hóa thế giới ở Việt Nam",
    description: "Giới thiệu các di sản văn hóa được UNESCO công nhận",
    content: "Nội dung bài học về di sản văn hóa...",
    imageUrl: "/placeholder.svg?height=300&width=400&text=Di+sản+văn+hóa",
    videoUrl: null,
    duration: "22 phút",
    difficulty: "Cơ bản",
  },
]

// Safe assets for fallback
export const safeAssets = {
  images: [
    "/placeholder.svg?height=400&width=600&text=Lịch+sử+Việt+Nam",
    "/placeholder.svg?height=300&width=400&text=Văn+hóa+truyền+thống",
    "/placeholder.svg?height=350&width=500&text=Di+tích+lịch+sử",
  ],
  videos: [],
  audio: [],
}
