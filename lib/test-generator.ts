import { topicsData } from "./topics-data"

export interface TestQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  topic: string
  subtopic?: string
}

export interface TestConfig {
  mode: "practice" | "exam"
  topics: string[]
  questionCount: number
  difficulty: "easy" | "medium" | "hard" | "mixed"
  timeLimit: number // minutes, 0 for no limit
  shuffleQuestions: boolean
  showExplanations: boolean
  allowReview: boolean
}

// Mock question database - in a real app, this would come from your backend
const questionDatabase: TestQuestion[] = [
  // Hai Bà Trưng questions
  {
    id: "hbt_001",
    question: "Khởi nghĩa Hai Bà Trưng diễn ra vào năm nào?",
    options: ["Năm 39", "Năm 40", "Năm 41", "Năm 42"],
    correctAnswer: 1,
    explanation: "Khởi nghĩa Hai Bà Trưng bắt đầu vào năm 40 sau Công nguyên tại Mê Linh.",
    difficulty: "easy",
    topic: "Khởi nghĩa Hai Bà Trưng",
    subtopic: "Thời gian diễn ra",
  },
  {
    id: "hbt_002",
    question: "Nguyên nhân trực tiếp dẫn đến khởi nghĩa Hai Bà Trưng là gì?",
    options: ["Thuế khóa nặng nề", "Tô Định giết chết Thi Sách", "Cướp đất của dân", "Ép dân làm lính"],
    correctAnswer: 1,
    explanation:
      "Tô Định giết chết Thi Sách (chồng của Trưng Trắc) là nguyên nhân trực tiếp khiến hai Bà Trưng khởi nghĩa.",
    difficulty: "medium",
    topic: "Khởi nghĩa Hai Bà Trưng",
    subtopic: "Nguyên nhân khởi nghĩa",
  },
  {
    id: "hbt_003",
    question: "Sau khi thắng lợi, Trưng Trắc lấy hiệu là gì?",
    options: ["Trưng Vương", "Nữ Hoàng", "Trưng Nữ Vương", "Mê Linh Vương"],
    correctAnswer: 2,
    explanation: "Trưng Trắc tự lập làm Vương và lấy hiệu là Trưng Nữ Vương.",
    difficulty: "easy",
    topic: "Khởi nghĩa Hai Bà Trưng",
    subtopic: "Thành lập chính quyền",
  },
  {
    id: "hbt_004",
    question: "Cuộc khởi nghĩa Hai Bà Trưng thất bại vào năm nào?",
    options: ["Năm 42", "Năm 43", "Năm 44", "Năm 45"],
    correctAnswer: 1,
    explanation: "Cuộc khởi nghĩa Hai Bà Trưng thất bại vào năm 43 sau khi bị Mã Viện đàn áp.",
    difficulty: "easy",
    topic: "Khởi nghĩa Hai Bà Trưng",
    subtopic: "Kết thúc khởi nghĩa",
  },
  {
    id: "hbt_005",
    question: "Ý nghĩa quan trọng nhất của khởi nghĩa Hai Bà Trưng là gì?",
    options: [
      "Giành được độc lập lâu dài",
      "Mở đầu truyền thống đấu tranh chống ngoại xâm",
      "Thống nhất cả nước",
      "Thiết lập chế độ phong kiến",
    ],
    correctAnswer: 1,
    explanation: "Khởi nghĩa Hai Bà Trưng mở đầu truyền thống đấu tranh anh dũng chống ngoại xâm của dân tộc Việt Nam.",
    difficulty: "hard",
    topic: "Khởi nghĩa Hai Bà Trưng",
    subtopic: "Ý nghĩa lịch sử",
  },

  // Bà Triệu questions
  {
    id: "bt_001",
    question: "Bà Triệu tên thật là gì?",
    options: ["Triệu Thị Trinh", "Triệu Thị Nhi", "Triệu Thị Lan", "Triệu Thị Mai"],
    correctAnswer: 0,
    explanation: "Bà Triệu tên thật là Triệu Thị Trinh, sinh năm 226, mất năm 248.",
    difficulty: "easy",
    topic: "Khởi nghĩa Bà Triệu",
    subtopic: "Tiểu sử",
  },
  {
    id: "bt_002",
    question: "Khởi nghĩa Bà Triệu diễn ra ở đâu?",
    options: ["Giao Chỉ", "Cửu Chân", "Nhật Nam", "Hợp Phố"],
    correctAnswer: 1,
    explanation: "Khởi nghĩa Bà Triệu diễn ra ở Cửu Chân (nay là vùng Thanh Hóa).",
    difficulty: "medium",
    topic: "Khởi nghĩa Bà Triệu",
    subtopic: "Địa điểm",
  },
  {
    id: "bt_003",
    question: "Câu nói nổi tiếng của Bà Triệu thể hiện điều gì?",
    options: ["Lòng yêu nước", "Tinh thần bất khuất", "Ý chí độc lập", "Tất cả đều đúng"],
    correctAnswer: 3,
    explanation: "Câu nói của Bà Triệu thể hiện lòng yêu nước, tinh thần bất khuất và ý chí độc lập của dân tộc.",
    difficulty: "hard",
    topic: "Khởi nghĩa Bà Triệu",
    subtopic: "Tinh thần yêu nước",
  },

  // Lý Bí questions
  {
    id: "lb_001",
    question: "Lý Bí thành lập nước nào sau khi đánh đuổi quân Lương?",
    options: ["Đại Cồ Việt", "Vạn Xuân", "Đại Việt", "Nam Việt"],
    correctAnswer: 1,
    explanation: "Lý Bí thành lập nước Vạn Xuân năm 544 sau khi đánh đuổi quân Lương.",
    difficulty: "easy",
    topic: "Khởi nghĩa Lý Bí",
    subtopic: "Thành lập nước Vạn Xuân",
  },
  {
    id: "lb_002",
    question: "Nước Vạn Xuân tồn tại trong bao lâu?",
    options: ["58 năm", "60 năm", "65 năm", "70 năm"],
    correctAnswer: 0,
    explanation: "Nước Vạn Xuân tồn tại từ 544 đến 602, tức là 58 năm.",
    difficulty: "medium",
    topic: "Khởi nghĩa Lý Bí",
    subtopic: "Thời gian tồn tại",
  },

  // Trận Bạch Đằng 938
  {
    id: "bd938_001",
    question: "Ngô Quyền đánh bại quân nước nào trong trận Bạch Đằng 938?",
    options: ["Nhà Tùy", "Nhà Đường", "Nam Hán", "Nhà Tống"],
    correctAnswer: 2,
    explanation: "Ngô Quyền đánh bại quân Nam Hán trong trận Bạch Đằng năm 938.",
    difficulty: "easy",
    topic: "Trận Bạch Đằng 938",
    subtopic: "Đối thủ",
  },
  {
    id: "bd938_002",
    question: "Chiến thuật chính của Ngô Quyền trong trận Bạch Đằng là gì?",
    options: ["Đóng cọc sông", "Phục binh", "Đánh du kích", "Bao vây"],
    correctAnswer: 0,
    explanation: "Ngô Quyền sử dụng chiến thuật đóng cọc sắt nhọn dưới sông Bạch Đằng để đánh bại quân Nam Hán.",
    difficulty: "medium",
    topic: "Trận Bạch Đằng 938",
    subtopic: "Chiến thuật",
  },
  {
    id: "bd938_003",
    question: "Ý nghĩa của chiến thắng Bạch Đằng 938 là gì?",
    options: [
      "Kết thúc thời kỳ Bắc thuộc",
      "Mở đầu thời kỳ độc lập tự chủ",
      "Khẳng định ý chí độc lập của dân tộc",
      "Tất cả đều đúng",
    ],
    correctAnswer: 3,
    explanation:
      "Chiến thắng Bạch Đằng 938 có ý nghĩa to lớn: kết thúc thời kỳ Bắc thuộc, mở đầu thời kỳ độc lập và khẳng định ý chí độc lập của dân tộc.",
    difficulty: "hard",
    topic: "Trận Bạch Đằng 938",
    subtopic: "Ý nghĩa lịch sử",
  },

  // Nhà Lý questions
  {
    id: "ly_001",
    question: "Ai là người sáng lập nhà Lý?",
    options: ["Lý Công Uẩn", "Lý Thái Tổ", "Lý Thái Tông", "Lý Thánh Tông"],
    correctAnswer: 0,
    explanation: "Lý Công Uẩn (tức Lý Thái Tổ) là người sáng lập nhà Lý năm 1009.",
    difficulty: "easy",
    topic: "Nhà Lý",
    subtopic: "Người sáng lập",
  },
  {
    id: "ly_002",
    question: "Lý Thái Tổ dời đô về đâu?",
    options: ["Hoa Lư", "Thăng Long", "Đại La", "Long Đỗ"],
    correctAnswer: 1,
    explanation: "Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long (Hà Nội ngày nay) năm 1010.",
    difficulty: "easy",
    topic: "Nhà Lý",
    subtopic: "Dời đô",
  },
  {
    id: "ly_003",
    question: "Nhà Lý tồn tại trong bao nhiều năm?",
    options: ["200 năm", "216 năm", "225 năm", "250 năm"],
    correctAnswer: 1,
    explanation: "Nhà Lý tồn tại từ 1009 đến 1225, tức là 216 năm.",
    difficulty: "medium",
    topic: "Nhà Lý",
    subtopic: "Thời gian tồn tại",
  },

  // Nhà Trần questions
  {
    id: "tran_001",
    question: "Nhà Trần đánh bại quân xâm lược nào?",
    options: ["Quân Tống", "Quân Mông-Nguyên", "Quân Minh", "Quân Thanh"],
    correctAnswer: 1,
    explanation: "Nhà Trần đánh bại quân Mông-Nguyên trong 3 cuộc chiến tranh (1258, 1285, 1287-1288).",
    difficulty: "easy",
    topic: "Nhà Trần",
    subtopic: "Chiến tranh chống ngoại xâm",
  },
  {
    id: "tran_002",
    question: "Ai là danh tướng nổi tiếng của nhà Trần?",
    options: ["Trần Hưng Đạo", "Trần Quốc Tuấn", "Trần Bình Trọng", "Tất cả đều đúng"],
    correctAnswer: 3,
    explanation:
      "Trần Hưng Đạo (tức Trần Quốc Tuấn) và Trần Bình Trọng đều là những danh tướng nổi tiếng của nhà Trần.",
    difficulty: "medium",
    topic: "Nhà Trần",
    subtopic: "Danh tướng",
  },

  // Thực dân Pháp questions
  {
    id: "phap_001",
    question: "Pháp bắt đầu xâm lược Việt Nam từ năm nào?",
    options: ["1858", "1859", "1860", "1861"],
    correctAnswer: 0,
    explanation: "Pháp bắt đầu xâm lược Việt Nam từ năm 1858 với cuộc tấn công Đà Nẵng.",
    difficulty: "easy",
    topic: "Thời kỳ Pháp thuộc",
    subtopic: "Bắt đầu xâm lược",
  },
  {
    id: "phap_002",
    question: "Hiệp ước nào đánh dấu Việt Nam hoàn toàn mất độc lập?",
    options: ["Hiệp ước Sài Gòn", "Hiệp ước Hue", "Hiệp ước Patenôtre", "Hiệp ước Harmand"],
    correctAnswer: 2,
    explanation: "Hiệp ước Patenôtre (1884) đánh dấu Việt Nam hoàn toàn mất độc lập, trở thành thuộc địa của Pháp.",
    difficulty: "medium",
    topic: "Thời kỳ Pháp thuộc",
    subtopic: "Các hiệp ước",
  },

  // Cần Vương questions
  {
    id: "cv_001",
    question: "Phong trào Cần Vương do ai khởi xướng?",
    options: ["Vua Hàm Nghi", "Phan Đình Phùng", "Tôn Thất Thuyết", "Nguyễn Thiện Thuật"],
    correctAnswer: 0,
    explanation: "Phong trào Cần Vương do vua Hàm Nghi khởi xướng với chiếu Cần Vương năm 1885.",
    difficulty: "easy",
    topic: "Phong trào Cần Vương",
    subtopic: "Người khởi xướng",
  },
  {
    id: "cv_002",
    question: "Ai là lãnh tụ tiêu biểu của phong trào Cần Vương?",
    options: ["Phan Đình Phùng", "Hoàng Hoa Thám", "Đề Thám", "Tất cả đều đúng"],
    correctAnswer: 3,
    explanation: "Phan Đình Phùng, Hoàng Hoa Thám (Đề Thám) đều là những lãnh tụ tiêu biểu của phong trào Cần Vương.",
    difficulty: "medium",
    topic: "Phong trào Cần Vương",
    subtopic: "Lãnh tụ",
  },

  // Cách mạng Tháng Tám
  {
    id: "cmt8_001",
    question: "Cách mạng Tháng Tám diễn ra vào năm nào?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    explanation: "Cách mạng Tháng Tám diễn ra vào tháng 8 năm 1945.",
    difficulty: "easy",
    topic: "Cách mạng Tháng Tám",
    subtopic: "Thời gian",
  },
  {
    id: "cmt8_002",
    question: "Ai đọc bản Tuyên ngôn độc lập ngày 2/9/1945?",
    options: ["Hồ Chí Minh", "Võ Nguyên Giáp", "Phạm Văn Đồng", "Trường Chinh"],
    correctAnswer: 0,
    explanation: "Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn độc lập tại Quảng trường Ba Đình ngày 2/9/1945.",
    difficulty: "easy",
    topic: "Cách mạng Tháng Tám",
    subtopic: "Tuyên ngôn độc lập",
  },

  // Điện Biên Phủ
  {
    id: "dbp_001",
    question: "Chiến dịch Điện Biên Phủ diễn ra khi nào?",
    options: ["1953-1954", "1954", "1954-1955", "1955"],
    correctAnswer: 1,
    explanation: "Chiến dịch Điện Biên Phủ diễn ra từ 13/3 đến 7/5/1954.",
    difficulty: "easy",
    topic: "Kháng chiến chống Pháp",
    subtopic: "Điện Biên Phủ",
  },
  {
    id: "dbp_002",
    question: "Ai là tổng chỉ huy chiến dịch Điện Biên Phủ?",
    options: ["Hồ Chí Minh", "Võ Nguyên Giáp", "Hoàng Văn Thái", "Văn Tiến Dũng"],
    correctAnswer: 1,
    explanation: "Đại tướng Võ Nguyên Giáp là tổng chỉ huy chiến dịch Điện Biên Phủ.",
    difficulty: "medium",
    topic: "Kháng chiến chống Pháp",
    subtopic: "Điện Biên Phủ",
  },

  // Add more questions for other topics...
  // This is a sample - in a real application, you'd have hundreds of questions
]

export async function generateTest(config: TestConfig): Promise<TestQuestion[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Filter questions by selected topics
  let availableQuestions = questionDatabase.filter((q) =>
    config.topics.some((topicId) => {
      const topic = topicsData.find((t) => t.id === topicId)
      return topic && (q.topic === topic.name || config.topics.includes(q.topic))
    }),
  )

  // Filter by difficulty if not mixed
  if (config.difficulty !== "mixed") {
    availableQuestions = availableQuestions.filter((q) => q.difficulty === config.difficulty)
  }

  // Check if we have enough questions
  if (availableQuestions.length < config.questionCount) {
    throw new Error(`Not enough questions available. Found ${availableQuestions.length}, need ${config.questionCount}`)
  }

  // For mixed difficulty, ensure balanced distribution
  let selectedQuestions: TestQuestion[] = []

  if (config.difficulty === "mixed") {
    const easyCount = Math.floor(config.questionCount * 0.4)
    const mediumCount = Math.floor(config.questionCount * 0.4)
    const hardCount = config.questionCount - easyCount - mediumCount

    const easyQuestions = availableQuestions.filter((q) => q.difficulty === "easy")
    const mediumQuestions = availableQuestions.filter((q) => q.difficulty === "medium")
    const hardQuestions = availableQuestions.filter((q) => q.difficulty === "hard")

    selectedQuestions = [
      ...shuffleArray(easyQuestions).slice(0, Math.min(easyCount, easyQuestions.length)),
      ...shuffleArray(mediumQuestions).slice(0, Math.min(mediumCount, mediumQuestions.length)),
      ...shuffleArray(hardQuestions).slice(0, Math.min(hardCount, hardQuestions.length)),
    ]

    // Fill remaining slots if needed
    const remaining = config.questionCount - selectedQuestions.length
    if (remaining > 0) {
      const usedIds = new Set(selectedQuestions.map((q) => q.id))
      const remainingQuestions = availableQuestions.filter((q) => !usedIds.has(q.id))
      selectedQuestions.push(...shuffleArray(remainingQuestions).slice(0, remaining))
    }
  } else {
    selectedQuestions = shuffleArray(availableQuestions).slice(0, config.questionCount)
  }

  // Shuffle questions if requested
  if (config.shuffleQuestions) {
    selectedQuestions = shuffleArray(selectedQuestions)
  }

  return selectedQuestions
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function validateTestConfig(config: TestConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (config.topics.length === 0) {
    errors.push("At least one topic must be selected")
  }

  if (config.questionCount < 25) {
    errors.push("Minimum 25 questions required")
  }

  if (config.mode === "exam" && config.timeLimit <= 0) {
    errors.push("Exam mode requires a time limit")
  }

  // Check if enough questions are available
  const availableQuestions = config.topics.reduce((total, topicId) => {
    const topic = topicsData.find((t) => t.id === topicId)
    return total + (topic?.questionCount || 0)
  }, 0)

  if (config.questionCount > availableQuestions) {
    errors.push(`Not enough questions available. Requested: ${config.questionCount}, Available: ${availableQuestions}`)
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
