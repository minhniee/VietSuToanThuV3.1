export interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  type: string
  completed: boolean
  hasQuiz: boolean
  hasVideo: boolean
  videoUrl?: string
  imageUrl?: string
  mindMapUrl?: string
  content?: {
    introduction: string
    sections: Array<{
      title: string
      content: string
    }>
    keyPoints: string[]
  }
}

export interface Period {
  id: string
  title: string
  period: string
  description: string
  overview: string
  lessons: Lesson[]
  completedLessons?: number
  duration?: string
  difficulty?: string
  topics?: string[]
  icon?: string
  color?: string
  events?: string[]
}

// export const periodsData: Period[] = [
//   {
//     id: "bac-thuoc",
//     title: "Thời Kỳ Bắc Thuộc",
//     period: "179 TCN - 938",
//     description: "Giai đoạn Việt Nam bị các triều đại phương Bắc đô hộ và tiến trình đấu tranh giành độc lập.",
//     overview:
//       "Thời kỳ Bắc thuộc là giai đoạn dài nhất trong lịch sử Việt Nam, kéo dài hơn 1000 năm. Đây là thời kỳ dân tộc Việt Nam chịu sự đô hộ của các triều đại phong kiến phương Bắc nhưng cũng là thời kỳ có nhiều cuộc đấu tranh anh dũng để giành lại độc lập.",
//     icon: "Crown",
//     color: "bg-blue-500",
//     lessons: [
//       {
//         id: 1,
//         title: "Bối cảnh lịch sử và sự hình thành ách đô hộ",
//         description: "Tìm hiểu về hoàn cảnh lịch sử dẫn đến việc Việt Nam bị Trung Quốc đô hộ.",
//         duration: "45 phút",
//         type: "lesson",
//         completed: false,
//         hasQuiz: true,
//         hasVideo: true,
//         videoUrl: "https://www.youtube.com/embed/QPwbQUZRMFo",
//         mindMapUrl: "/placeholder.svg?height=300&width=400&text=Mind+Map+Bối+cảnh+Bắc+thuộc",
//         content: {
//           introduction: "Thời kỳ Bắc thuộc bắt đầu từ năm 179 TCN khi nhà Triệu bị nhà Hán tiêu diệt...",
//           sections: [
//             {
//               title: "Nguyên nhân dẫn đến Bắc thuộc",
//               content: "Sự suy yếu của các nước phong kiến Việt Nam cổ đại và sự mở rộng của đế chế Trung Hoa...",
//             },
//             {
//               title: "Quá trình thiết lập ách đô hộ",
//               content: "Nhà Hán đã từng bước thiết lập bộ máy cai trị và áp đặt chế độ đô hộ...",
//             },
//           ],
//           keyPoints: ["Bắt đầu từ năm 179 TCN", "Kéo dài hơn 1000 năm", "Ảnh hưởng sâu sắc đến văn hóa Việt Nam"],
//         },
//       },
//       {
//         id: 2,
//         title: "Khởi nghĩa Hai Bà Trưng (40-43)",
//         description: "Cuộc khởi nghĩa đầu tiên chống ách đô hộ của nhà Hán.",
//         duration: "60 phút",
//         type: "lesson",
//         completed: false,
//         hasQuiz: true,
//         hasVideo: true,
//         videoUrl: "https://www.youtube.com/embed/FC5Rf5daGz0",
//         mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Hai+Bà+Trưng",
//         content: {
//           introduction:
//             "Khởi nghĩa Hai Bà Trưng là cuộc khởi nghĩa đầu tiên có quy mô lớn của người Việt chống lại ách đô hộ của nhà Hán...",
//           sections: [
//             {
//               title: "Bối cảnh khởi nghĩa",
//               content: "Vào thế kỷ I sau Công nguyên, chính sách cai trị khắc nghiệt của quan lại Hán...",
//             },
//             {
//               title: "Diễn biến khởi nghĩa",
//               content: "Năm 40, hai Bà Trưng khởi nghĩa tại Mê Linh và nhanh chóng lan rộng...",
//             },
//           ],
//           keyPoints: ["Khởi nghĩa năm 40 sau CN", "Do Trưng Trắc và Trưng Nhị lãnh đạo", "Giải phóng 65 thành trì"],
//         },
//       },
//       {
//         id: 3,
//         title: "Khởi nghĩa Bà Triệu (248)",
//         description: "Tinh thần bất khuất của người phụ nữ Việt Nam chống lại nhà Ngô.",
//         duration: "45 phút",
//         type: "lesson",
//         completed: false,
//         hasQuiz: true,
//         hasVideo: false,
//         imageUrl: "/placeholder.svg?height=400&width=600&text=Bà+Triệu+Khởi+Nghĩa",
//         mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Bà+Triệu",
//         content: {
//           introduction: "Bà Triệu, tên thật là Triệu Thị Trinh, là một nữ anh hùng dân tộc...",
//           sections: [
//             {
//               title: "Cuộc đời Bà Triệu",
//               content: "Sinh năm 226, quê ở Cổ Loa, Đông Anh, Hà Nội...",
//             },
//             {
//               title: "Cuộc khởi nghĩa",
//               content: "Năm 248, Bà Triệu cùng anh trai Triệu Quốc Đạt khởi nghĩa...",
//             },
//           ],
//           keyPoints: ["Khởi nghĩa năm 248", "Biểu tượng của tinh thần bất khuất", "Ảnh hưởng đến các thế hệ sau"],
//         },
//       },
//     ],
//     completedLessons: 0,
//     duration: "8 giờ",
//     difficulty: "Cơ bản",
//     topics: ["Khởi nghĩa Hai Bà Trưng", "Khởi nghĩa Bà Triệu", "Khởi nghĩa Lý Bí", "Trận Bạch Đằng"],
//     events: ["Khởi nghĩa Hai Bà Trưng", "Khởi nghĩa Bà Triệu", "Khởi nghĩa Lý Bí"],
//   },
//   {
//     id: "phong-kien",
//     title: "Thời Kỳ Phong Kiến Độc Lập",
//     period: "939 - 1884",
//     description: "Giai đoạn độc lập với nhiều cuộc chiến bảo vệ lãnh thổ và nổi loạn nội bộ.",
//     overview:
//       "Thời kỳ phong kiến độc lập kéo dài gần 1000 năm, từ sau chiến thắng Bạch Đằng năm 938 của Ngô Quyền đến khi Pháp xâm lược năm 1884.",
//     icon: "Sword",
//     color: "bg-red-500",
//     lessons: [
//       {
//         id: 1,
//         title: "Nhà Ngô và công cuộc xây dựng quốc gia độc lập (939-965)",
//         description: "Ngô Quyền và những nỗ lực đầu tiên xây dựng nền độc lập sau thời kỳ Bắc thuộc.",
//         duration: "45 phút",
//         type: "lesson",
//         completed: false,
//         hasQuiz: true,
//         hasVideo: true,
//         videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//         mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Nhà+Ngô",
//         content: {
//           introduction: "Sau chiến thắng Bạch Đằng năm 938, Ngô Quyền đã thiết lập nền độc lập đầu tiên...",
//           sections: [
//             {
//               title: "Chiến thắng Bạch Đằng",
//               content: "Ngô Quyền sử dụng chiến thuật cọc nhọn dưới sông để đánh bại quân Nam Hán...",
//             },
//             {
//               title: "Xây dựng nhà nước",
//               content: "Thiết lập kinh đô tại Cổ Loa và tổ chức bộ máy nhà nước...",
//             },
//           ],
//           keyPoints: ["Chiến thắng Bạch Đằng năm 938", "Kết thúc thời kỳ Bắc thuộc", "Thiết lập nền độc lập đầu tiên"],
//         },
//       },
//       {
//         id: 2,
//         title: "Nhà Đinh và Tiền Lê (968-1009)",
//         description: "Đinh Bộ Lĩnh thống nhất đất nước, Lê Hoàn đánh bại quân Tống.",
//         duration: "50 phút",
//         type: "lesson",
//         completed: false,
//         hasQuiz: true,
//         hasVideo: false,
//         imageUrl: "/placeholder.svg?height=400&width=600&text=Đinh+Tiên+Hoàng",
//         mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Đinh+Tiền+Lê",
//         content: {
//           introduction: "Sau thời kỳ loạn 12 sứ quân, Đinh Bộ Lĩnh đã thống nhất đất nước...",
//           sections: [
//             {
//               title: "Đinh Bộ Lĩnh thống nhất đất nước",
//               content: "Đánh bại 12 sứ quân và tự xưng là Đinh Tiên Hoàng...",
//             },
//             {
//               title: "Lê Hoàn và cuộc kháng chiến chống Tống",
//               content: "Năm 981, Lê Hoàn đánh bại quân Tống xâm lược...",
//             },
//           ],
//           keyPoints: ["Thống nhất đất nước năm 968", "Thiết lập quốc hiệu Đại Cồ Việt", "Đánh bại quân Tống năm 981"],
//         },
//       },
//     ],
//     completedLessons: 0,
//     duration: "15 giờ",
//     difficulty: "Trung bình",
//     topics: ["Nhà Ngô", "Nhà Đinh - Tiền Lê", "Nhà Lý", "Nhà Trần"],
//     events: ["Chiến thắng Bạch Đằng", "Chiến tranh chống Tống"],
//   },
// ]
export const periodsData: Period[] = [
  {
    id: "bac-thuoc",
    title: "Thời Kỳ Bắc Thuộc",
    period: "179 TCN - 938",
    description: "Giai đoạn Việt Nam bị các triều đại phương Bắc đô hộ và tiến trình đấu tranh giành độc lập.",
    overview:
      "Thời kỳ Bắc thuộc là giai đoạn dài nhất trong lịch sử Việt Nam, kéo dài hơn 1000 năm. Đây là thời kỳ dân tộc Việt Nam chịu sự đô hộ của các triều đại phong kiến phương Bắc nhưng cũng là thời kỳ có nhiều cuộc đấu tranh anh dũng để giành lại độc lập[7].",
    icon: "Crown",
    color: "bg-blue-500",
    lessons: [
      {
        id: 1,
        title: "Bối cảnh lịch sử và sự hình thành ách đô hộ",
        description: "Tìm hiểu về hoàn cảnh lịch sử dẫn đến việc Việt Nam bị Trung Quốc đô hộ.",
        duration: "45 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/QPwbQUZRMFo",
        mindMapUrl: "/NotebookLM Mind Map.png",
        content: {
          introduction: "Thời kỳ Bắc thuộc bắt đầu từ năm 179 TCN khi nhà Triệu bị nhà Hán tiêu diệt, mở ra hơn 1000 năm đô hộ và đồng hóa văn hóa[7].",
          sections: [
            {
              title: "Nguyên nhân dẫn đến Bắc thuộc",
              content: "Sự suy yếu của các nước phong kiến Việt Nam cổ đại và sự mở rộng của đế chế Trung Hoa dẫn tới việc mất nước[7].",
            },
            {
              title: "Quá trình thiết lập ách đô hộ",
              content: "Các triều đại phương Bắc từng bước thiết lập bộ máy cai trị và áp đặt chế độ đô hộ lên đất Việt[7].",
            },
          ],
          keyPoints: ["Bắt đầu từ năm 179 TCN", "Kéo dài hơn 1000 năm", "Ảnh hưởng sâu sắc đến văn hóa Việt Nam"],
        },
      },
      {
        id: 2,
        title: "Khởi nghĩa Hai Bà Trưng (40-43)",
        description: "Cuộc khởi nghĩa đầu tiên chống ách đô hộ của nhà Hán.",
        duration: "60 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/nk3D-CfjIOk?si=TdfKq57a_IhMXm8m",
        mindMapUrl: "/trung_trac_trung_nhi_mm.png",
        content: {
          introduction:
            "Khởi nghĩa Hai Bà Trưng là cuộc khởi nghĩa đầu tiên có quy mô lớn của người Việt chống lại ách đô hộ của nhà Hán, giải phóng được 65 thành trì[7].",
          sections: [
            {
              title: "Bối cảnh khởi nghĩa",
              content: "Chính sách cai trị khắc nghiệt của quan lại Hán dẫn đến sự phẫn nộ của nhân dân[7].",
            },
            {
              title: "Diễn biến khởi nghĩa",
              content: "Năm 40, hai Bà Trưng khởi nghĩa tại Mê Linh, nhanh chóng lan rộng khắp vùng Bắc Bộ[7].",
            },
          ],
          keyPoints: ["Khởi nghĩa năm 40 sau CN", "Do Trưng Trắc và Trưng Nhị lãnh đạo", "Giải phóng 65 thành trì"],
        },
      },
      {
        id: 3,
        title: "Khởi nghĩa Bà Triệu (248)",
        description: "Tinh thần bất khuất của người phụ nữ Việt Nam chống lại nhà Ngô.",
        duration: "45 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/6SVQ12dXV3c?si=446MB_cmNHlKPoOC",
        imageUrl: "/placeholder.svg?height=400&width=600&text=Bà+Triệu+Khởi+Nghĩa",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Bà+Triệu",
        content: {
          introduction: "Bà Triệu, tên thật là Triệu Thị Trinh, là một nữ anh hùng dân tộc, lãnh đạo cuộc khởi nghĩa chống nhà Ngô[7].",
          sections: [
            {
              title: "Cuộc đời Bà Triệu",
              content: "Sinh năm 226, quê ở Cổ Loa, Đông Anh, Hà Nội, nổi tiếng với câu nói bất hủ về chí khí độc lập[7].",
            },
            {
              title: "Cuộc khởi nghĩa",
              content: "Năm 248, Bà Triệu cùng anh trai Triệu Quốc Đạt khởi nghĩa, dù thất bại nhưng để lại dấu ấn lớn trong lịch sử[7].",
            },
          ],
          keyPoints: ["Khởi nghĩa năm 248", "Biểu tượng của tinh thần bất khuất", "Ảnh hưởng đến các thế hệ sau"],
        },
      },
    ],
    completedLessons: 0,
    duration: "8 giờ",
    difficulty: "Cơ bản",
    topics: ["Khởi nghĩa Hai Bà Trưng", "Khởi nghĩa Bà Triệu", "Khởi nghĩa Lý Bí", "Trận Bạch Đằng"],
    events: ["Khởi nghĩa Hai Bà Trưng", "Khởi nghĩa Bà Triệu", "Khởi nghĩa Lý Bí"],
  },
  {
    id: "phong-kien",
    title: "Thời Kỳ Phong Kiến Độc Lập",
    period: "939 - 1884",
    description: "Giai đoạn độc lập với nhiều cuộc chiến bảo vệ lãnh thổ và nổi loạn nội bộ.",
    overview:
      "Thời kỳ phong kiến độc lập kéo dài gần 1000 năm, từ sau chiến thắng Bạch Đằng năm 938 của Ngô Quyền đến khi Pháp xâm lược năm 1884. Đây là thời kỳ phát triển rực rỡ của văn hóa, giáo dục, khoa học và nghệ thuật Việt Nam, đồng thời cũng là thời kỳ diễn ra nhiều cuộc chiến tranh giữ nước và mở rộng lãnh thổ[7].",
    icon: "Sword",
    color: "bg-red-500",
    lessons: [
      {
        id: 1,
        title: "Nhà Ngô và công cuộc xây dựng quốc gia độc lập (939-965)",
        description: "Ngô Quyền và những nỗ lực đầu tiên xây dựng nền độc lập sau thời kỳ Bắc thuộc.",
        duration: "45 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/sB6bKq2QsdE?si=Ai1OevU5pEUvkbzU",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Nhà+Ngô",
        content: {
          introduction: "Sau chiến thắng Bạch Đằng năm 938, Ngô Quyền đã thiết lập nền độc lập đầu tiên, mở ra thời kỳ tự chủ của dân tộc Việt Nam[7].",
          sections: [
            {
              title: "Chiến thắng Bạch Đằng",
              content: "Ngô Quyền sử dụng chiến thuật cọc nhọn dưới sông để đánh bại quân Nam Hán, kết thúc hơn 1000 năm Bắc thuộc[7].",
            },
            {
              title: "Xây dựng nhà nước",
              content: "Thiết lập kinh đô tại Cổ Loa và tổ chức bộ máy nhà nước sơ khai[7].",
            },
          ],
          keyPoints: ["Chiến thắng Bạch Đằng năm 938", "Kết thúc thời kỳ Bắc thuộc", "Thiết lập nền độc lập đầu tiên"],
        },
      },
      {
        id: 2,
        title: "Nhà Đinh và Tiền Lê (968-1009)",
        description: "Đinh Bộ Lĩnh thống nhất đất nước, Lê Hoàn đánh bại quân Tống.",
        duration: "50 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/T3ewSJCiKSM?si=MvnHV1vR_leIH4PE",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Đinh+Tiền+Lê",
        content: {
          introduction: "Sau thời kỳ loạn 12 sứ quân, Đinh Bộ Lĩnh đã thống nhất đất nước, lập nên nhà Đinh và đặt quốc hiệu là Đại Cồ Việt[7].",
          sections: [
            {
              title: "Đinh Bộ Lĩnh thống nhất đất nước",
              content: "Đánh bại 12 sứ quân và tự xưng là Đinh Tiên Hoàng, thiết lập nền quân chủ tập quyền[7].",
            },
            {
              title: "Lê Hoàn và cuộc kháng chiến chống Tống",
              content: "Năm 981, Lê Hoàn đánh bại quân Tống xâm lược, củng cố nền độc lập[7].",
            },
          ],
          keyPoints: ["Thống nhất đất nước năm 968", "Thiết lập quốc hiệu Đại Cồ Việt", "Đánh bại quân Tống năm 981"],
        },
      },
    ],
    completedLessons: 0,
    duration: "15 giờ",
    difficulty: "Trung bình",
    topics: ["Nhà Ngô", "Nhà Đinh - Tiền Lê", "Nhà Lý", "Nhà Trần"],
    events: ["Chiến thắng Bạch Đằng", "Chiến tranh chống Tống"],
  },
  {
    id: "phap-thuoc",
    title: "Thời Kỳ Thực Dân Pháp",
    period: "1884 - 1945",
    description: "Giai đoạn Việt Nam bị thực dân Pháp đô hộ, phong trào đấu tranh giành độc lập phát triển mạnh mẽ.",
    overview:
      "Thời kỳ Thực dân Pháp bắt đầu từ khi triều đình nhà Nguyễn ký Hòa ước Giáp Thân (1884), chính thức trở thành thuộc địa của Pháp, kéo dài đến Cách mạng tháng Tám năm 1945. Đây là giai đoạn nhân dân Việt Nam chịu sự áp bức, bóc lột của thực dân Pháp nhưng cũng là thời kỳ phát triển mạnh các phong trào yêu nước, tiêu biểu như phong trào Đông Du, Duy Tân, Việt Nam Quốc Dân Đảng, và đặc biệt là sự ra đời của Đảng Cộng sản Việt Nam năm 1930[1][3][4].",
    icon: "Flag",
    color: "bg-yellow-600",
    lessons: [
      {
        id: 1,
        title: "Bối cảnh xâm lược và thiết lập ách đô hộ",
        description: "Tìm hiểu về nguyên nhân, diễn biến quá trình Pháp xâm lược Việt Nam.",
        duration: "45 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/JQaoq9IPW6M",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Pháp+thuộc",
        content: {
          introduction: "Từ giữa thế kỷ XIX, triều đình nhà Nguyễn suy yếu, thực dân Pháp lợi dụng cơ hội tấn công, bắt đầu từ Đà Nẵng năm 1858, đến 1884 thì hoàn toàn kiểm soát Việt Nam[1][4].",
          sections: [
            {
              title: "Nguyên nhân xâm lược",
              content: "Khủng hoảng nội bộ, chính sách bế quan tỏa cảng, dã tâm xâm lược của Pháp[4].",
            },
            {
              title: "Thiết lập chế độ thuộc địa",
              content: "Việt Nam bị chia thành ba xứ: Bắc Kỳ, Trung Kỳ (bảo hộ) và Nam Kỳ (thuộc địa), chịu sự cai trị khắc nghiệt của thực dân Pháp[3].",
            },
          ],
          keyPoints: [
            "Bắt đầu từ Hòa ước Giáp Thân 1884",
            "Việt Nam bị chia cắt ba xứ",
            "Phong trào yêu nước phát triển mạnh"
          ],
        },
      },
      {
        id: 2,
        title: "Phong trào đấu tranh giành độc lập",
        description: "Các phong trào yêu nước, cách mạng nổi bật thời Pháp thuộc.",
        duration: "60 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: false,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Phong+trào+đấu+tranh",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Đấu+tranh+Pháp+thuộc",
        content: {
          introduction: "Dưới ách đô hộ, các phong trào yêu nước liên tục bùng nổ, từ phong trào Cần Vương, Đông Du, Duy Tân đến sự ra đời của Đảng Cộng sản Việt Nam năm 1930[1][3][4].",
          sections: [
            {
              title: "Phong trào Cần Vương",
              content: "Kêu gọi văn thân, sĩ phu đứng lên cứu nước dưới danh nghĩa vua Hàm Nghi[1].",
            },
            {
              title: "Phong trào Đông Du, Duy Tân",
              content: "Khuyến khích học tập, canh tân đất nước, tìm đường cứu nước mới[1][4].",
            },
            {
              title: "Đảng Cộng sản Việt Nam ra đời",
              content: "Ngày 3/2/1930, Đảng Cộng sản Việt Nam thành lập, lãnh đạo cách mạng giải phóng dân tộc[1][3].",
            },
          ],
          keyPoints: [
            "Phong trào Cần Vương, Đông Du, Duy Tân",
            "Đảng Cộng sản Việt Nam ra đời năm 1930",
            "Chuẩn bị cho Cách mạng tháng Tám 1945"
          ],
        },
      },
    ],
    completedLessons: 0,
    duration: "10 giờ",
    difficulty: "Trung bình",
    topics: ["Phong trào Cần Vương", "Đông Du", "Duy Tân", "Đảng Cộng sản Việt Nam"],
    events: ["Hòa ước Giáp Thân", "Phong trào Cần Vương", "Đảng Cộng sản Việt Nam ra đời"],
  },
  {
    id: "hien-dai",
    title: "Thời Kỳ Hiện Đại",
    period: "1945 - nay",
    description: "Từ Cách mạng tháng Tám, nước Việt Nam Dân chủ Cộng hòa ra đời, trải qua hai cuộc kháng chiến và công cuộc xây dựng đất nước.",
    overview:
      "Thời kỳ hiện đại bắt đầu từ Cách mạng tháng Tám năm 1945, khi Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Giai đoạn này nổi bật với hai cuộc kháng chiến chống Pháp (1945-1954), chống Mỹ (1954-1975), thống nhất đất nước, sau đó là công cuộc đổi mới, hội nhập và phát triển kinh tế, xã hội, văn hóa, khoa học kỹ thuật[8][11][12].",
    icon: "Star",
    color: "bg-green-600",
    lessons: [
      {
        id: 1,
        title: "Cách mạng tháng Tám và Tuyên ngôn Độc lập",
        description: "Sự kiện khai sinh nước Việt Nam Dân chủ Cộng hòa.",
        duration: "45 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/HKvIjkS1SiI",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+CMT8",
        content: {
          introduction: "Tháng 8/1945, dưới sự lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh, nhân dân ta tổng khởi nghĩa giành chính quyền trên cả nước, ngày 2/9/1945 đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa[11][13].",
          sections: [
            {
              title: "Bối cảnh lịch sử",
              content: "Nhật đảo chính Pháp, phát xít Nhật đầu hàng Đồng minh, tạo thời cơ cho cách mạng bùng nổ[11][13].",
            },
            {
              title: "Ý nghĩa lịch sử",
              content: "Chấm dứt chế độ phong kiến và thực dân, mở ra kỷ nguyên độc lập, tự do cho dân tộc[11][13].",
            },
          ],
          keyPoints: [
            "Cách mạng tháng Tám thành công",
            "Tuyên ngôn Độc lập 2/9/1945",
            "Nước Việt Nam Dân chủ Cộng hòa ra đời"
          ],
        },
      },
      {
        id: 2,
        title: "Kháng chiến chống Pháp (1945-1954)",
        description: "Cuộc kháng chiến giải phóng dân tộc, kết thúc bằng chiến thắng Điện Biên Phủ.",
        duration: "60 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/se1AI0sZVZw?si=Yq3bWt7wwJYkLWR6",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+KC+Pháp",
        content: {
          introduction: "Sau ngày độc lập, thực dân Pháp quay trở lại xâm lược, nhân dân ta tiến hành cuộc kháng chiến 9 năm, kết thúc bằng chiến thắng Điện Biên Phủ năm 1954[8][12].",
          sections: [
            {
              title: "Diễn biến chính",
              content: "Từ 1946 đến 1954, quân dân Việt Nam chiến đấu kiên cường, nổi bật là chiến dịch Điện Biên Phủ[8][12].",
            },
            {
              title: "Kết quả và ý nghĩa",
              content: "Hiệp định Genève 1954 ký kết, miền Bắc hoàn toàn giải phóng, miền Nam tiếp tục đấu tranh[8][12].",
            },
          ],
          keyPoints: [
            "Kháng chiến 9 năm chống Pháp",
            "Chiến thắng Điện Biên Phủ 1954",
            "Hiệp định Genève chia cắt đất nước"
          ],
        },
      },
      {
        id: 3,
        title: "Kháng chiến chống Mỹ (1954-1975) và thống nhất đất nước",
        description: "Cuộc chiến tranh giải phóng miền Nam, thống nhất đất nước.",
        duration: "60 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/embed/mZ99SMWT61w?si=7IzrjorqC3wjpYoq",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+KC+Mỹ",
        content: {
          introduction: "Miền Nam tiếp tục đấu tranh chống Mỹ và chính quyền Sài Gòn, kết thúc bằng Đại thắng mùa Xuân 1975, thống nhất đất nước[8][12][14].",
          sections: [
            {
              title: "Diễn biến chính",
              content: "Các chiến dịch lớn như Mậu Thân 1968, chiến dịch Hồ Chí Minh 1975[8][12][14].",
            },
            {
              title: "Ý nghĩa lịch sử",
              content: "Thống nhất đất nước, mở ra thời kỳ xây dựng và phát triển mới[8][12][14].",
            },
          ],
          keyPoints: [
            "Kháng chiến chống Mỹ cứu nước",
            "Giải phóng miền Nam 30/4/1975",
            "Thống nhất đất nước"
          ],
        },
      },
      {
        id: 4,
        title: "Đổi mới và hội nhập (1986 - nay)",
        description: "Giai đoạn đổi mới toàn diện, phát triển kinh tế - xã hội và hội nhập quốc tế.",
        duration: "45 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: false,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Đổi+mới+hội+nhập",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Đổi+mới",
        content: {
          introduction: "Đại hội VI (1986) khởi xướng công cuộc đổi mới, chuyển sang nền kinh tế thị trường định hướng xã hội chủ nghĩa, mở cửa hội nhập quốc tế, đạt nhiều thành tựu về kinh tế, xã hội, khoa học kỹ thuật[8][12].",
          sections: [
            {
              title: "Các mốc đổi mới",
              content: "Đổi mới kinh tế, cải cách hành chính, hội nhập ASEAN, WTO, phát triển giáo dục, khoa học kỹ thuật[8][12].",
            },
            {
              title: "Thành tựu nổi bật",
              content: "Tăng trưởng kinh tế, xóa đói giảm nghèo, nâng cao vị thế quốc tế của Việt Nam[8][12].",
            },
          ],
          keyPoints: [
            "Đổi mới kinh tế từ 1986",
            "Hội nhập quốc tế",
            "Phát triển toàn diện đất nước"
          ],
        },
      },
    ],
    completedLessons: 0,
    duration: "16 giờ",
    difficulty: "Nâng cao",
    topics: ["Cách mạng tháng Tám", "Kháng chiến chống Pháp", "Kháng chiến chống Mỹ", "Đổi mới và hội nhập"],
    events: ["Cách mạng tháng Tám", "Điện Biên Phủ", "Giải phóng miền Nam", "Đổi mới"],
  }, {
    id: "thuc-dan",
    title: "Thời Kỳ Thực Dân Pháp",
    period: "1884 - 1945",
    description: "Giai đoạn Việt Nam bị thực dân Pháp đô hộ, phong trào đấu tranh giành độc lập phát triển mạnh mẽ.",
    overview:
      "Thời kỳ Thực dân Pháp bắt đầu từ khi triều đình nhà Nguyễn ký Hòa ước Giáp Thân (1884), chính thức trở thành thuộc địa của Pháp, kéo dài đến Cách mạng tháng Tám năm 1945. Đây là giai đoạn nhân dân Việt Nam chịu sự áp bức, bóc lột của thực dân Pháp nhưng cũng là thời kỳ phát triển mạnh các phong trào yêu nước, tiêu biểu như phong trào Đông Du, Duy Tân, Việt Nam Quốc Dân Đảng, và đặc biệt là sự ra đời của Đảng Cộng sản Việt Nam năm 1930[6][8][5].",
    icon: "Flag",
    color: "bg-yellow-600",
    lessons: [
      {
        id: 1,
        title: "Bối cảnh xâm lược và thiết lập ách đô hộ",
        description: "Tìm hiểu về nguyên nhân, diễn biến quá trình Pháp xâm lược Việt Nam.",
        duration: "45 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: true,
        videoUrl: "https://www.youtube.com/watch?v=JQaoq9IPW6M",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Pháp+thuộc",
        content: {
          introduction: "Từ giữa thế kỷ XIX, triều đình nhà Nguyễn suy yếu, thực dân Pháp lợi dụng cơ hội tấn công, bắt đầu từ Đà Nẵng năm 1858, đến 1884 thì hoàn toàn kiểm soát Việt Nam[6][8].",
          sections: [
            {
              title: "Nguyên nhân xâm lược",
              content: "Khủng hoảng nội bộ, chính sách bế quan tỏa cảng, dã tâm xâm lược của Pháp[8].",
            },
            {
              title: "Thiết lập chế độ thuộc địa",
              content: "Việt Nam bị chia thành ba xứ: Bắc Kỳ, Trung Kỳ (bảo hộ) và Nam Kỳ (thuộc địa), chịu sự cai trị khắc nghiệt của thực dân Pháp[5].",
            },
          ],
          keyPoints: [
            "Bắt đầu từ Hòa ước Giáp Thân 1884",
            "Việt Nam bị chia cắt ba xứ",
            "Phong trào yêu nước phát triển mạnh"
          ],
        },
      },
      {
        id: 2,
        title: "Phong trào đấu tranh giành độc lập",
        description: "Các phong trào yêu nước, cách mạng nổi bật thời Pháp thuộc.",
        duration: "60 phút",
        type: "lesson",
        completed: false,
        hasQuiz: true,
        hasVideo: false,
        imageUrl: "/placeholder.svg?height=400&width=600&text=Phong+trào+đấu+tranh",
        mindMapUrl: "/placeholder.svg?height=600&width=800&text=Mind+Map+Đấu+tranh+Pháp+thuộc",
        content: {
          introduction: "Dưới ách đô hộ, các phong trào yêu nước liên tục bùng nổ, từ phong trào Cần Vương, Đông Du, Duy Tân đến sự ra đời của Đảng Cộng sản Việt Nam năm 1930[7][5].",
          sections: [
            {
              title: "Phong trào Cần Vương",
              content: "Kêu gọi văn thân, sĩ phu đứng lên cứu nước dưới danh nghĩa vua Hàm Nghi[7].",
            },
            {
              title: "Phong trào Đông Du, Duy Tân",
              content: "Khuyến khích học tập, canh tân đất nước, tìm đường cứu nước mới[7][8].",
            },
            {
              title: "Đảng Cộng sản Việt Nam ra đời",
              content: "Ngày 3/2/1930, Đảng Cộng sản Việt Nam thành lập, lãnh đạo cách mạng giải phóng dân tộc[5][7].",
            },
          ],
          keyPoints: [
            "Phong trào Cần Vương, Đông Du, Duy Tân",
            "Đảng Cộng sản Việt Nam ra đời năm 1930",
            "Chuẩn bị cho Cách mạng tháng Tám 1945"
          ],
        },
      },
    ],
    completedLessons: 0,
    duration: "10 giờ",
    difficulty: "Trung bình",
    topics: ["Phong trào Cần Vương", "Đông Du", "Duy Tân", "Đảng Cộng sản Việt Nam"],
    events: ["Hòa ước Giáp Thân", "Phong trào Cần Vương", "Đảng Cộng sản Việt Nam ra đời"],
  },
]


export function getPeriodById(id: string): Period | undefined {
  return periodsData.find((period) => period.id === id)
}

export function getAllPeriods(): Period[] {
  return periodsData
}

export function getLessonsByPeriodId(periodId: string): Lesson[] {
  const period = getPeriodById(periodId)
  return period ? period.lessons : []
}

export function getLessonByIds(periodId: string, lessonId: number): Lesson | undefined {
  const lessons = getLessonsByPeriodId(periodId)
  return lessons.find((lesson) => lesson.id === lessonId)
}
