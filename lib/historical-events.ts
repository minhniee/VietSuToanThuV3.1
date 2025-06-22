export interface HistoricalFigure {
  id: string
  name: string
  role: string
  description: string
  birthYear?: number
  deathYear?: number
  imageUrl?: string
}

export interface HistoricalLocation {
  id: string
  name: string
  modernName?: string
  coordinates?: { lat: number; lng: number }
  description: string
}

export interface HistoricalEvent {
  id: string
  title: string
  period: string
  startDate: string
  endDate?: string
  description: string
  shortDescription: string
  location: HistoricalLocation
  keyFigures: HistoricalFigure[]
  causes: string[]
  events: {
    date: string
    description: string
  }[]
  outcomes: string[]
  significance: string
  imageUrl?: string
  subscriptionLevel: "free" | "basic" | "premium"
}

export const historicalEvents: HistoricalEvent[] = [
  {
    id: "khoi-nghia-hai-ba-trung",
    title: "Khởi nghĩa Hai Bà Trưng",
    period: "Thời kỳ Bắc thuộc",
    startDate: "40",
    endDate: "43",
    shortDescription: "Cuộc khởi nghĩa đầu tiên chống ách đô hộ của nhà Hán",
    description: `Khởi nghĩa Hai Bà Trưng là cuộc khởi nghĩa của người Việt chống lại ách đô hộ của nhà Hán, 
    do hai chị em Trưng Trắc và Trưng Nhị lãnh đạo. Đây là cuộc khởi nghĩa đầu tiên trong lịch sử Việt Nam 
    có quy mô lớn và được ghi nhận rõ ràng trong sử sách. Cuộc khởi nghĩa bùng nổ vào năm 40 sau Công nguyên 
    và kéo dài đến năm 43, khi quân Hán do Mã Viện chỉ huy đã đàn áp thành công cuộc nổi dậy.`,
    location: {
      id: "me-linh",
      name: "Mê Linh",
      modernName: "Hà Nội",
      coordinates: { lat: 21.1667, lng: 105.7333 },
      description: "Quê hương và kinh đô của Hai Bà Trưng, nơi khởi phát cuộc khởi nghĩa năm 40.",
    },
    keyFigures: [
      {
        id: "trung-trac",
        name: "Trưng Trắc",
        role: "Lãnh đạo cuộc khởi nghĩa",
        description:
          "Chị cả trong hai chị em, là người khởi xướng và lãnh đạo cuộc khởi nghĩa sau khi chồng bà là Thi Sách bị Tô Định giết hại.",
        birthYear: 12,
        deathYear: 43,
      },
      {
        id: "trung-nhi",
        name: "Trưng Nhị",
        role: "Đồng lãnh đạo",
        description: "Em gái của Trưng Trắc, cùng chị lãnh đạo cuộc khởi nghĩa chống lại nhà Hán.",
        birthYear: 14,
        deathYear: 43,
      },
      {
        id: "to-dinh",
        name: "Tô Định",
        role: "Thái thú Giao Chỉ",
        description:
          "Quan lại nhà Hán cai trị vùng Giao Chỉ, nổi tiếng với chính sách hà khắc và đã giết chết Thi Sách.",
        deathYear: 43,
      },
      {
        id: "ma-vien",
        name: "Mã Viện",
        role: "Tướng nhà Hán",
        description: "Tướng lĩnh nhà Hán được cử đến đàn áp cuộc khởi nghĩa Hai Bà Trưng.",
        birthYear: -14,
        deathYear: 49,
      },
    ],
    causes: [
      "Chính sách cai trị hà khắc của nhà Hán",
      "Thuế khóa nặng nề và lao dịch quá mức",
      "Tô Định giết chết Thi Sách - chồng của Trưng Trắc",
      "Ý thức dân tộc và tinh thần độc lập của người Việt",
    ],
    events: [
      {
        date: "Đầu năm 40",
        description: "Trưng Trắc và Trưng Nhị phất cờ khởi nghĩa tại Mê Linh",
      },
      {
        date: "Giữa năm 40",
        description: "Nghĩa quân giải phóng 65 thành trì từ Cửu Chân đến Hợp Phố",
      },
      {
        date: "Cuối năm 40",
        description: "Trưng Trắc xưng Vương, đóng đô ở Mê Linh",
      },
      {
        date: "Năm 42",
        description: "Nhà Hán cử Mã Viện đem quân sang đàn áp",
      },
      {
        date: "Năm 43",
        description: "Cuộc khởi nghĩa thất bại, Hai Bà Trưng tuẫn tiết",
      },
    ],
    outcomes: [
      "Cuộc khởi nghĩa thất bại sau 3 năm giành độc lập",
      "Hai Bà Trưng tuẫn tiết tại sông Hát Giang",
      "Nhà Hán tái lập ách đô hộ với chính sách cai trị chặt chẽ hơn",
      "Mã Viện cho dựng trụ đồng làm ranh giới phía nam của nhà Hán",
    ],
    significance:
      "Khởi nghĩa Hai Bà Trưng là biểu tượng của tinh thần đấu tranh giành độc lập và chống ngoại xâm của dân tộc Việt Nam. Đây là cuộc khởi nghĩa đầu tiên được ghi nhận trong lịch sử và đặc biệt do phụ nữ lãnh đạo, thể hiện vai trò quan trọng của phụ nữ Việt Nam trong lịch sử dân tộc.",
    subscriptionLevel: "free",
  },
  {
    id: "khoi-nghia-ba-trieu",
    title: "Khởi nghĩa Bà Triệu",
    period: "Thời kỳ Bắc thuộc",
    startDate: "248",
    endDate: "248",
    shortDescription: "Cuộc khởi nghĩa do Triệu Thị Trinh lãnh đạo chống lại ách đô hộ của nhà Ngô",
    description: `Khởi nghĩa Bà Triệu là cuộc khởi nghĩa do Triệu Thị Trinh (Bà Triệu) lãnh đạo chống lại ách đô hộ của nhà Ngô (Trung Quốc) vào năm 248. Mặc dù chỉ kéo dài vài tháng, cuộc khởi nghĩa này đã để lại dấu ấn sâu đậm trong lịch sử đấu tranh giành độc lập của dân tộc Việt Nam và trở thành biểu tượng của tinh thần bất khuất, kiên cường.`,
    location: {
      id: "cuu-chan",
      name: "Cửu Chân",
      modernName: "Thanh Hóa",
      coordinates: { lat: 19.8, lng: 105.7 },
      description: "Vùng đất nay thuộc tỉnh Thanh Hóa, nơi Bà Triệu phất cờ khởi nghĩa.",
    },
    keyFigures: [
      {
        id: "ba-trieu",
        name: "Triệu Thị Trinh",
        role: "Lãnh đạo cuộc khởi nghĩa",
        description:
          "Còn được gọi là Bà Triệu, sinh năm 226, mất năm 248. Nổi tiếng với câu nói: 'Tôi muốn cưỡi cơn gió mạnh, đạp đường sóng dữ, chém cá kình ở biển Đông, quét sạch giặc Ngô, giành lại giang sơn, cởi ách nô lệ, chứ không chịu khom lưng làm tì thiếp người ta'.",
        birthYear: 226,
        deathYear: 248,
      },
      {
        id: "trieu-quoc-dat",
        name: "Triệu Quốc Đạt",
        role: "Anh trai Bà Triệu",
        description:
          "Anh trai của Bà Triệu, người đã khuyên em gái không nên khởi nghĩa nhưng sau đó đã ủng hộ và giúp đỡ em gái trong cuộc khởi nghĩa.",
      },
      {
        id: "lu-yin",
        name: "Lục Dận",
        role: "Thái thú Giao Châu",
        description: "Quan lại nhà Ngô cai trị vùng Giao Châu, người đã đàn áp cuộc khởi nghĩa của Bà Triệu.",
      },
    ],
    causes: [
      "Chính sách cai trị hà khắc của nhà Ngô",
      "Thuế khóa nặng nề và lao dịch quá mức",
      "Tinh thần yêu nước và ý thức dân tộc của người Việt",
      "Ảnh hưởng từ các cuộc khởi nghĩa trước đó, đặc biệt là khởi nghĩa Hai Bà Trưng",
    ],
    events: [
      {
        date: "Đầu năm 248",
        description: "Bà Triệu tập hợp nghĩa quân tại núi Tùng (Thanh Hóa)",
      },
      {
        date: "Giữa năm 248",
        description: "Nghĩa quân giành được nhiều thắng lợi, làm chủ vùng Cửu Chân",
      },
      {
        date: "Tháng 8 năm 248",
        description: "Nhà Ngô cử quân đàn áp dưới sự chỉ huy của Lục Dận",
      },
      {
        date: "Tháng 10 năm 248",
        description: "Cuộc khởi nghĩa thất bại, Bà Triệu tuẫn tiết tại núi Tùng",
      },
    ],
    outcomes: [
      "Cuộc khởi nghĩa thất bại sau vài tháng kháng cự",
      "Bà Triệu tuẫn tiết tại núi Tùng",
      "Nhà Ngô tăng cường kiểm soát vùng Cửu Chân",
      "Tinh thần đấu tranh của người Việt tiếp tục được nuôi dưỡng",
    ],
    significance:
      "Khởi nghĩa Bà Triệu là biểu tượng của tinh thần bất khuất và ý chí độc lập của dân tộc Việt Nam. Đặc biệt, đây là cuộc khởi nghĩa thứ hai trong lịch sử do phụ nữ lãnh đạo, tiếp nối truyền thống của Hai Bà Trưng và khẳng định vai trò quan trọng của phụ nữ Việt Nam trong lịch sử dân tộc.",
    subscriptionLevel: "free",
  },
  {
    id: "khoi-nghia-ly-bi",
    title: "Khởi nghĩa Lý Bí",
    period: "Thời kỳ Bắc thuộc",
    startDate: "542",
    endDate: "546",
    shortDescription: "Cuộc khởi nghĩa thành công đầu tiên giành được độc lập tạm thời và thành lập nước Vạn Xuân",
    description: `Khởi nghĩa Lý Bí là cuộc khởi nghĩa chống lại ách đô hộ của nhà Lương (Trung Quốc) do Lý Bí lãnh đạo. Đây là cuộc khởi nghĩa thành công đầu tiên sau hơn 500 năm Bắc thuộc, giúp thành lập nước Vạn Xuân độc lập tồn tại từ năm 544 đến năm 602. Lý Bí đã xưng vương, lấy hiệu là Nam Việt Đế và đặt quốc hiệu là Vạn Xuân, mở đầu thời kỳ độc lập tự chủ ngắn ngủi trước khi bị nhà Tùy đánh bại.`,
    location: {
      id: "long-bien",
      name: "Long Biên",
      modernName: "Hà Nội",
      coordinates: { lat: 21.0285, lng: 105.8542 },
      description: "Trung tâm chính trị của vùng Giao Châu, nơi Lý Bí phất cờ khởi nghĩa.",
    },
    keyFigures: [
      {
        id: "ly-bi",
        name: "Lý Bí",
        role: "Lãnh đạo cuộc khởi nghĩa",
        description:
          "Còn được gọi là Lý Bôn, vốn là một viên quan nhà Lương. Ông đã từ quan và lãnh đạo cuộc khởi nghĩa, sau đó xưng vương, lập nên nước Vạn Xuân.",
        birthYear: 503,
        deathYear: 548,
      },
      {
        id: "trieu-quang-phuc",
        name: "Triệu Quang Phục",
        role: "Tướng lĩnh và người kế vị",
        description:
          "Tướng lĩnh dưới trướng Lý Bí, sau này kế vị trị vì nước Vạn Xuân sau khi Lý Bí thất bại trước quân Lương.",
        deathYear: 571,
      },
      {
        id: "tien-tu-nam",
        name: "Tiền Tư Nam",
        role: "Tướng nhà Lương",
        description: "Tướng lĩnh nhà Lương được cử đến đàn áp cuộc khởi nghĩa của Lý Bí.",
      },
    ],
    causes: [
      "Chính sách cai trị hà khắc của nhà Lương",
      "Thuế khóa nặng nề và lao dịch quá mức",
      "Tham nhũng và bóc lột của quan lại nhà Lương",
      "Tinh thần độc lập và ý thức dân tộc của người Việt",
    ],
    events: [
      {
        date: "Năm 542",
        description: "Lý Bí phất cờ khởi nghĩa tại Long Biên",
      },
      {
        date: "Năm 543",
        description: "Nghĩa quân đánh đuổi Thái thú Tiêu Tư",
      },
      {
        date: "Năm 544",
        description: "Lý Bí xưng vương, lập nước Vạn Xuân, đóng đô ở Long Biên",
      },
      {
        date: "Năm 545",
        description: "Nhà Lương cử Tiền Tư Nam và Dương Sân đem quân sang đàn áp",
      },
      {
        date: "Năm 546",
        description: "Lý Bí thất bại trong trận Chu Diên, rút về Cửu Chân",
      },
      {
        date: "Năm 548",
        description: "Lý Bí mất, Triệu Quang Phục kế vị",
      },
    ],
    outcomes: [
      "Thành lập nước Vạn Xuân độc lập (544-602)",
      "Xây dựng hệ thống chính trị và quân sự độc lập",
      "Phát triển văn hóa dân tộc",
      "Mặc dù Lý Bí thất bại, Triệu Quang Phục tiếp tục duy trì nước Vạn Xuân",
    ],
    significance:
      "Khởi nghĩa Lý Bí và việc thành lập nước Vạn Xuân là dấu mốc quan trọng trong lịch sử Việt Nam, đánh dấu lần đầu tiên người Việt giành được độc lập sau hơn 500 năm Bắc thuộc. Mặc dù nước Vạn Xuân chỉ tồn tại trong thời gian ngắn, nhưng đã chứng minh khả năng tự chủ và quyết tâm giành độc lập của dân tộc Việt Nam.",
    subscriptionLevel: "basic",
  },
  {
    id: "tran-bach-dang-938",
    title: "Trận Bạch Đằng 938",
    period: "Thời kỳ Bắc thuộc",
    startDate: "938",
    endDate: "938",
    shortDescription: "Chiến thắng lịch sử của Ngô Quyền trước quân Nam Hán, kết thúc thời kỳ Bắc thuộc",
    description: `Trận Bạch Đằng năm 938 là trận đánh lịch sử giữa quân đội Việt Nam dưới sự chỉ huy của Ngô Quyền và quân Nam Hán do Lưu Hoằng Tháo chỉ huy. Với chiến thuật đóng cọc nhọn dưới lòng sông Bạch Đằng, Ngô Quyền đã đánh bại hoàn toàn quân Nam Hán, kết thúc thời kỳ Bắc thuộc kéo dài hơn 1000 năm và mở ra thời kỳ độc lập tự chủ của dân tộc Việt Nam.`,
    location: {
      id: "bach-dang",
      name: "Sông Bạch Đằng",
      modernName: "Quảng Ninh, Hải Phòng",
      coordinates: { lat: 20.9, lng: 106.8 },
      description: "Con sông nằm giữa tỉnh Quảng Ninh và thành phố Hải Phòng ngày nay, nơi di���n ra trận đánh lịch sử.",
    },
    keyFigures: [
      {
        id: "ngo-quyen",
        name: "Ngô Quyền",
        role: "Chỉ huy quân đội Việt Nam",
        description:
          "Vốn là tướng của Dương Đình Nghệ, sau khi Dương Đình Nghệ bị Kiều Công Tiễn giết hại, Ngô Quyền đã đánh bại Kiều Công Tiễn và sau đó đánh bại quân Nam Hán, lên ngôi vua, mở đầu thời kỳ độc lập tự chủ.",
        birthYear: 897,
        deathYear: 944,
      },
      {
        id: "luu-hoang-thao",
        name: "Lưu Hoằng Tháo",
        role: "Chỉ huy quân Nam Hán",
        description: "Con trai của Lưu Cung - vua Nam Hán, chỉ huy đội quân xâm lược và bị giết trong trận Bạch Đằng.",
        deathYear: 938,
      },
      {
        id: "kieu-cong-tien",
        name: "Kiều Công Tiễn",
        role: "Kẻ phản bội",
        description: "Giết chết Dương Đình Nghệ và cầu cứu quân Nam Hán, sau bị Ngô Quyền đánh bại.",
        deathYear: 938,
      },
    ],
    causes: [
      "Kiều Công Tiễn giết Dương Đình Nghệ và cầu cứu quân Nam Hán",
      "Vua Nam Hán là Lưu Cung muốn thôn tính Giao Châu",
      "Ngô Quyền muốn trả thù cho Dương Đình Nghệ và giành độc lập cho đất nước",
    ],
    events: [
      {
        date: "Đầu năm 938",
        description: "Kiều Công Tiễn giết Dương Đình Nghệ và cầu cứu quân Nam Hán",
      },
      {
        date: "Giữa năm 938",
        description: "Ngô Quyền đánh bại và giết Kiều Công Tiễn",
      },
      {
        date: "Cuối năm 938",
        description: "Ngô Quyền cho đóng cọc nhọn dưới lòng sông Bạch Đằng",
      },
      {
        date: "Cuối năm 938",
        description: "Quân Nam Hán do Lưu Hoằng Tháo chỉ huy tiến vào xâm lược",
      },
      {
        date: "Cuối năm 938",
        description: "Ngô Quyền dụ địch vào sông Bạch Đằng khi thủy triều lên, sau đó đánh úp khi thủy triều rút",
      },
      {
        date: "Cuối năm 938",
        description: "Quân Nam Hán đại bại, Lưu Hoằng Tháo tử trận",
      },
    ],
    outcomes: [
      "Quân Nam Hán đại bại, Lưu Hoằng Tháo tử trận",
      "Kết thúc thời kỳ Bắc thuộc kéo dài hơn 1000 năm",
      "Ngô Quyền lên ngôi vua, đóng đô ở Cổ Loa",
      "Mở đầu thời kỳ độc lập tự chủ của dân tộc Việt Nam",
    ],
    significance:
      "Trận Bạch Đằng năm 938 là một trong những trận đánh quan trọng nhất trong lịch sử Việt Nam, đánh dấu sự kết thúc của thời kỳ Bắc thuộc kéo dài hơn 1000 năm và mở đầu thời kỳ độc lập tự chủ. Chiến thắng này không chỉ thể hiện tài năng quân sự xuất chúng của Ngô Quyền mà còn là minh chứng cho ý chí độc lập, tự chủ của dân tộc Việt Nam.",
    subscriptionLevel: "free",
  },
  {
    id: "chien-thang-chi-lang-1427",
    title: "Chiến thắng Chi Lăng - Xương Giang 1427",
    period: "Thời kỳ phong kiến độc lập",
    startDate: "1427-09",
    endDate: "1427-12",
    shortDescription: "Chiến thắng quyết định của quân đội Đại Việt dưới sự chỉ huy của Lê Lợi trước quân Minh",
    description: `Chiến thắng Chi Lăng - Xương Giang là một trong những chiến thắng quyết định của nghĩa quân Lam Sơn do Lê Lợi lãnh đạo trong cuộc kháng chiến chống quân Minh xâm lược. Diễn ra vào cuối năm 1427, chiến dịch này đã tiêu diệt hoàn toàn đạo quân viện trợ của nhà Minh do Liễu Thăng chỉ huy tại ải Chi Lăng và thành Xương Giang, buộc quân Minh phải rút khỏi Đại Việt, công nhận nền độc lập của Đại Việt.`,
    location: {
      id: "chi-lang",
      name: "Ải Chi Lăng",
      modernName: "Lạng Sơn",
      coordinates: { lat: 21.6667, lng: 106.6333 },
      description: "Ải Chi Lăng nằm trên đường từ biên giới Trung Quốc vào Đại Việt, thuộc tỉnh Lạng Sơn ngày nay.",
    },
    keyFigures: [
      {
        id: "le-loi",
        name: "Lê Lợi",
        role: "Thủ lĩnh nghĩa quân Lam Sơn",
        description:
          "Người lãnh đạo cuộc khởi nghĩa Lam Sơn (1418-1427) chống lại ách đô hộ của nhà Minh, sau trở thành vua Lê Thái Tổ, sáng lập triều đại nhà Hậu Lê.",
        birthYear: 1385,
        deathYear: 1433,
      },
      {
        id: "nguyen-trai",
        name: "Nguyễn Trãi",
        role: "Mưu sĩ",
        description:
          "Nhà chiến lược, nhà văn hóa lớn, người đã giúp Lê Lợi hoạch định chiến lược 'Lấy đại nghĩa thắng hung tàn, lấy chí nhân thay cường bạo'.",
        birthYear: 1380,
        deathYear: 1442,
      },
      {
        id: "lieu-thang",
        name: "Liễu Thăng",
        role: "Tướng nhà Minh",
        description: "Chỉ huy đạo quân viện trợ của nhà Minh, bị giết tại ải Chi Lăng.",
        deathYear: 1427,
      },
      {
        id: "moc-thanh",
        name: "Mộc Thạnh",
        role: "Tướng nhà Minh",
        description: "Chỉ huy đạo quân thứ hai của nhà Minh, bị đánh bại và phải rút chạy.",
        deathYear: 1430,
      },
    ],
    causes: [
      "Nhà Minh xâm lược và đô hộ Đại Việt từ năm 1407",
      "Chính sách đồng hóa và bóc lột của nhà Minh",
      "Cuộc khởi nghĩa Lam Sơn do Lê Lợi lãnh đạo từ năm 1418",
      "Nhà Minh cử Liễu Thăng và Mộc Thạnh đem quân sang đàn áp",
    ],
    events: [
      {
        date: "Tháng 9/1427",
        description: "Liễu Thăng dẫn quân từ Quảng Tây tiến vào Đại Việt",
      },
      {
        date: "Tháng 10/1427",
        description: "Quân Đại Việt do Lê Lợi chỉ huy phục kích tại ải Chi Lăng",
      },
      {
        date: "20/10/1427",
        description: "Liễu Thăng tử trận tại Chi Lăng",
      },
      {
        date: "Tháng 11/1427",
        description: "Quân Đại Việt tiêu diệt hoàn toàn đạo quân của Liễu Thăng",
      },
      {
        date: "Tháng 12/1427",
        description: "Quân Đại Việt bao vây và chiếm thành Xương Giang, đánh bại đạo quân của Mộc Thạnh",
      },
      {
        date: "Cuối năm 1427",
        description: "Vương Thông đầu hàng, quân Minh rút khỏi Đại Việt",
      },
    ],
    outcomes: [
      "Tiêu diệt hoàn toàn đạo quân của Liễu Thăng",
      "Đánh bại đạo quân của Mộc Thạnh",
      "Buộc Vương Thông đầu hàng và rút quân",
      "Nhà Minh công nhận nền độc lập của Đại Việt",
      "Kết thúc thời kỳ Bắc thuộc lần thứ tư (1407-1427)",
    ],
    significance:
      "Chiến thắng Chi Lăng - Xương Giang là một trong những chiến thắng vẻ vang nhất trong lịch sử chống ngoại xâm của dân tộc Việt Nam. Chiến thắng này không chỉ kết thúc ách đô hộ của nhà Minh mà còn khẳng định nền độc lập, tự chủ của Đại Việt, mở ra thời kỳ phát triển mới dưới triều đại nhà Hậu Lê.",
    subscriptionLevel: "basic",
  },
  {
    id: "chien-thang-dong-da-1789",
    title: "Chiến thắng Đống Đa 1789",
    period: "Thời kỳ phong kiến độc lập",
    startDate: "1789-01-25",
    endDate: "1789-01-30",
    shortDescription: "Chiến thắng của quân Tây Sơn dưới sự chỉ huy của Nguyễn Huệ trước quân Thanh xâm lược",
    description: `Chiến thắng Đống Đa là chiến thắng lịch sử của quân đội Tây Sơn dưới sự chỉ huy của Nguyễn Huệ (Quang Trung) trước quân Thanh xâm lược vào dịp Tết Kỷ Dậu (1789). Với chiến thuật táo bạo và bất ngờ, Nguyễn Huệ đã lãnh đạo quân Tây Sơn tiến quân thần tốc từ Nghệ An ra Thăng Long, đánh bại hoàn toàn đạo quân 29 vạn của nhà Thanh chỉ trong vòng 5 ngày, bảo vệ nền độc lập của đất nước.`,
    location: {
      id: "dong-da",
      name: "Đống Đa",
      modernName: "Hà Nội",
      coordinates: { lat: 21.0167, lng: 105.8167 },
      description: "Khu vực thuộc Hà Nội ngày nay, nơi diễn ra trận đánh quyết định giữa quân Tây Sơn và quân Thanh.",
    },
    keyFigures: [
      {
        id: "nguyen-hue",
        name: "Nguyễn Huệ (Quang Trung)",
        role: "Hoàng đế Tây Sơn",
        description:
          "Em trai của Nguyễn Nhạc, một trong ba anh em nhà Tây Sơn, người đã lãnh đạo quân Tây Sơn đánh bại quân Thanh. Ông lên ngôi hoàng đế với niên hiệu Quang Trung.",
        birthYear: 1753,
        deathYear: 1792,
      },
      {
        id: "ton-si-nghi",
        name: "Tôn Sĩ Nghị",
        role: "Tổng đốc Lưỡng Quảng",
        description: "Chỉ huy quân Thanh xâm lược Đại Việt, bị đánh bại và phải chạy trốn về nước.",
        deathYear: 1802,
      },
      {
        id: "nguyen-anh",
        name: "Nguyễn Ánh",
        role: "Chúa Nguyễn",
        description:
          "Người đã cầu cứu quân Thanh để chống lại nhà Tây Sơn, sau trở thành vua Gia Long, sáng lập triều Nguyễn.",
        birthYear: 1762,
        deathYear: 1820,
      },
    ],
    causes: [
      "Nguyễn Ánh cầu cứu nhà Thanh để chống lại nhà Tây Sơn",
      "Nhà Thanh muốn can thiệp vào nội bộ Đại Việt",
      "Nhà Thanh cử Tôn Sĩ Nghị đem 29 vạn quân sang xâm lược",
      "Nguyễn Huệ quyết tâm bảo vệ nền độc lập của đất nước",
    ],
    events: [
      {
        date: "Cuối năm 1788",
        description: "Quân Thanh do Tôn Sĩ Nghị chỉ huy tiến vào Đại Việt, chiếm Thăng Long",
      },
      {
        date: "22/12/1788 (âm lịch)",
        description: "Nguyễn Huệ lên ngôi hoàng đế, lấy niên hiệu là Quang Trung",
      },
      {
        date: "25/12/1788 (âm lịch)",
        description: "Quang Trung xuất quân từ Nghệ An ra Bắc",
      },
      {
        date: "30/12/1788 (âm lịch)",
        description: "Quân Tây Sơn đánh trận Hà Hồi và Ngọc Hồi",
      },
      {
        date: "Mùng 5 Tết Kỷ Dậu (30/1/1789)",
        description: "Quân Tây Sơn đánh trận Đống Đa, đại phá quân Thanh",
      },
      {
        date: "Mùng 7 Tết Kỷ Dậu (1/2/1789)",
        description: "Quang Trung kéo quân vào Thăng Long",
      },
    ],
    outcomes: [
      "Đánh bại hoàn toàn quân Thanh xâm lược",
      "Tôn Sĩ Nghị phải chạy trốn về nước",
      "Bảo vệ nền độc lập của đất nước",
      "Khẳng định vị thế của nhà Tây Sơn",
      "Mở ra thời kỳ cải cách dưới triều đại Quang Trung",
    ],
    significance:
      "Chiến thắng Đống Đa là một trong những chiến thắng vẻ vang nhất trong lịch sử chống ngoại xâm của dân tộc Việt Nam. Chiến thắng này không chỉ bảo vệ nền độc lập của đất nước mà còn thể hiện tài năng quân sự xuất chúng của Nguyễn Huệ và tinh thần yêu nước, đoàn kết của nhân dân Việt Nam.",
    subscriptionLevel: "basic",
  },
  {
    id: "dien-bien-phu-1954",
    title: "Chiến dịch Điện Biên Phủ 1954",
    period: "Thời kỳ hiện đại",
    startDate: "1954-03-13",
    endDate: "1954-05-07",
    shortDescription:
      "Chiến thắng quyết định của quân đội Việt Nam dưới sự chỉ huy của Đại tướng Võ Nguyên Giáp trước quân đội Pháp",
    description: `Chiến dịch Điện Biên Phủ là chiến dịch quân sự lớn nhất của Quân đội Nhân dân Việt Nam trong cuộc kháng chiến chống Pháp (1945-1954). Diễn ra từ ngày 13/3 đến ngày 7/5/1954, chiến dịch đã kết thúc bằng chiến thắng hoàn toàn của quân đội Việt Nam dưới sự chỉ huy của Đại tướng Võ Nguyên Giáp trước tập đoàn cứ điểm Điện Biên Phủ của quân đội Pháp. Chiến thắng này đã buộc Pháp phải ký Hiệp định Genève, chấm dứt chiến tranh và công nhận độc lập, chủ quyền của Việt Nam.`,
    location: {
      id: "dien-bien-phu",
      name: "Điện Biên Phủ",
      modernName: "Điện Biên",
      coordinates: { lat: 21.3833, lng: 103.0167 },
      description: "Thung lũng nằm ở tỉnh Điện Biên, Tây Bắc Việt Nam, nơi diễn ra chiến dịch lịch sử.",
    },
    keyFigures: [
      {
        id: "vo-nguyen-giap",
        name: "Võ Nguyên Giáp",
        role: "Tổng tư lệnh Quân đội Nhân dân Việt Nam",
        description: "Đại tướng, người chỉ huy chiến dịch Điện Biên Phủ, được mệnh danh là 'Vị tướng huyền thoại'.",
        birthYear: 1911,
        deathYear: 2013,
      },
      {
        id: "ho-chi-minh",
        name: "Hồ Chí Minh",
        role: "Chủ tịch nước Việt Nam Dân chủ Cộng hòa",
        description:
          "Người lãnh đạo cuộc kháng chiến chống Pháp, người đưa ra quyết định chiến lược tấn công Điện Biên Phủ.",
        birthYear: 1890,
        deathYear: 1969,
      },
      {
        id: "henri-navarre",
        name: "Henri Navarre",
        role: "Tổng chỉ huy quân đội Pháp tại Đông Dương",
        description: "Người đề ra kế hoạch Navarre và quyết định xây dựng tập đoàn cứ điểm Điện Biên Phủ.",
        birthYear: 1898,
        deathYear: 1983,
      },
      {
        id: "christian-de-castries",
        name: "Christian de Castries",
        role: "Chỉ huy tập đoàn cứ điểm Điện Biên Phủ",
        description:
          "Đại tá quân đội Pháp, người chỉ huy trực tiếp tập đoàn cứ điểm Điện Biên Phủ và bị bắt làm tù binh sau khi thất bại.",
        birthYear: 1902,
        deathYear: 1991,
      },
    ],
    causes: [
      "Pháp muốn giành lại thế chủ động trong cuộc chiến tranh Đông Dương",
      "Kế hoạch Navarre nhằm tiêu diệt chủ lực quân đội Việt Nam",
      "Pháp xây dựng tập đoàn cứ điểm Điện Biên Phủ để ngăn chặn quân đội Việt Nam tiến vào Lào",
      "Việt Nam quyết tâm giành chiến thắng quyết định để kết thúc chiến tranh",
    ],
    events: [
      {
        date: "20/11/1953",
        description: "Quân Pháp nhảy dù xuống Điện Biên Phủ, bắt đầu xây dựng tập đoàn cứ điểm",
      },
      {
        date: "Tháng 1-2/1954",
        description: "Quân đội Việt Nam huy động lực lượng, vũ khí tiến về Điện Biên Phủ",
      },
      {
        date: "13/3/1954",
        description: "Bắt đầu chiến dịch với trận đánh vào cứ điểm Him Lam",
      },
      {
        date: "14-17/3/1954",
        description: "Quân đội Việt Nam tiêu diệt các cứ điểm phía Bắc: Him Lam, Độc Lập, Bản Kéo",
      },
      {
        date: "30/3-26/4/1954",
        description: "Giai đoạn giằng co, quân đội Việt Nam siết chặt vòng vây",
      },
      {
        date: "1-7/5/1954",
        description: "Tổng công kích, tiêu diệt hoàn toàn tập đoàn cứ điểm Điện Biên Phủ",
      },
      {
        date: "7/5/1954",
        description: "Tướng De Castries đầu hàng, kết thúc chiến dịch",
      },
    ],
    outcomes: [
      "Tiêu diệt và bắt sống toàn bộ quân Pháp tại Điện Biên Phủ (16.200 quân)",
      "Buộc Pháp phải ký Hiệp định Genève (21/7/1954)",
      "Chấm dứt chiến tranh và công nhận độc lập, chủ quyền của Việt Nam",
      "Miền Bắc Việt Nam được giải phóng hoàn toàn",
      "Mở ra thời kỳ xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh thống nhất đất nước",
    ],
    significance:
      "Chiến thắng Điện Biên Phủ là một trong những chiến thắng vĩ đại nhất trong lịch sử dân tộc Việt Nam và lịch sử thế giới. Chiến thắng này không chỉ kết thúc ách đô hộ của thực dân Pháp tại Việt Nam mà còn mở ra cao trào giải phóng dân tộc trên toàn thế giới, góp phần làm sụp đổ hệ thống thuộc địa của chủ nghĩa đế quốc.",
    subscriptionLevel: "premium",
  },
  {
    id: "giai-phong-mien-nam-1975",
    title: "Chiến dịch Hồ Chí Minh 1975",
    period: "Thời kỳ hiện đại",
    startDate: "1975-04-26",
    endDate: "1975-04-30",
    shortDescription:
      "Chiến dịch quân sự cuối cùng của Quân đội Nhân dân Việt Nam, giải phóng hoàn toàn miền Nam, thống nhất đất nước",
    description: `Chiến dịch Hồ Chí Minh là chiến dịch quân sự cuối cùng của Quân đội Nhân dân Việt Nam trong cuộc kháng chiến chống Mỹ, cứu nước. Diễn ra từ ngày 26/4 đến ngày 30/4/1975, chiến dịch đã kết thúc bằng việc giải phóng hoàn toàn Sài Gòn - thủ đô của chính quyền Việt Nam Cộng hòa, chấm dứt sự hiện diện quân sự của Mỹ tại Việt Nam và thống nhất đất nước sau hơn 20 năm chia cắt.`,
    location: {
      id: "sai-gon",
      name: "Sài Gòn",
      modernName: "Thành phố Hồ Chí Minh",
      coordinates: { lat: 10.7756, lng: 106.7019 },
      description: "Thủ đô của chính quyền Việt Nam Cộng hòa, nay là Thành phố Hồ Chí Minh.",
    },
    keyFigures: [
      {
        id: "van-tien-dung",
        name: "Văn Tiến Dũng",
        role: "Tổng tư lệnh chiến dịch",
        description:
          "Đại tướng, Tổng tham mưu trưởng Quân đội Nhân dân Việt Nam, người chỉ huy trực tiếp chiến dịch Hồ Chí Minh.",
        birthYear: 1917,
        deathYear: 2002,
      },
      {
        id: "le-duc-tho",
        name: "Lê Đức Thọ",
        role: "Đại diện Bộ Chính trị",
        description:
          "Ủy viên Bộ Chính trị, người đại diện Bộ Chính trị tại chiến trường miền Nam trong chiến dịch Hồ Chí Minh.",
        birthYear: 1911,
        deathYear: 1990,
      },
      {
        id: "duong-van-minh",
        name: "Dương Văn Minh",
        role: "Tổng thống Việt Nam Cộng hòa",
        description:
          "Tổng thống cuối cùng của Việt Nam Cộng hòa, người tuyên bố đầu hàng vô điều kiện vào ngày 30/4/1975.",
        birthYear: 1916,
        deathYear: 2001,
      },
      {
        id: "nguyen-van-thieu",
        name: "Nguyễn Văn Thiệu",
        role: "Cựu Tổng thống Việt Nam Cộng hòa",
        description:
          "Tổng thống Việt Nam Cộng hòa từ 1967 đến 1975, đã từ chức và rời khỏi Việt Nam trước khi Sài Gòn thất thủ.",
        birthYear: 1923,
        deathYear: 2001,
      },
    ],
    causes: [
      "Hiệp định Paris 1973 không được thực thi nghiêm túc",
      "Mỹ cắt giảm viện trợ cho chính quyền Việt Nam Cộng hòa",
      "Quân đội Việt Nam Cộng hòa suy yếu sau chiến dịch Tây Nguyên và Huế-Đà Nẵng",
      "Việt Nam quyết tâm giải phóng hoàn toàn miền Nam, thống nhất đất nước",
    ],
    events: [
      {
        date: "Tháng 3/1975",
        description: "Chiến dịch Tây Nguyên và Huế-Đà Nẵng thành công",
      },
      {
        date: "14/4/1975",
        description: "Bộ Chính trị quyết định mở chiến dịch giải phóng Sài Gòn, lấy tên là chiến dịch Hồ Chí Minh",
      },
      {
        date: "21/4/1975",
        description: "Nguyễn Văn Thiệu từ chức Tổng thống Việt Nam Cộng hòa",
      },
      {
        date: "26/4/1975",
        description: "Bắt đầu chiến dịch Hồ Chí Minh",
      },
      {
        date: "28/4/1975",
        description: "Quân giải phóng tiến vào vòng ngoại vi Sài Gòn",
      },
      {
        date: "30/4/1975, 10:45",
        description: "Xe tăng quân giải phóng tiến vào Dinh Độc Lập",
      },
      {
        date: "30/4/1975, 11:30",
        description: "Dương Văn Minh tuyên bố đầu hàng vô điều kiện",
      },
    ],
    outcomes: [
      "Giải phóng hoàn toàn miền Nam Việt Nam",
      "Chấm dứt sự hiện diện quân sự của Mỹ tại Việt Nam",
      "Thống nhất đất nước sau hơn 20 năm chia cắt",
      "Kết thúc 30 năm chiến tranh giải phóng dân tộc",
      "Mở ra thời kỳ xây dựng và phát triển đất nước thống nhất",
    ],
    significance:
      "Chiến thắng 30/4/1975 là một trong những sự kiện vĩ đại nhất trong lịch sử dân tộc Việt Nam. Chiến thắng này không chỉ kết thúc 30 năm chiến tranh giải phóng dân tộc mà còn mở ra thời kỳ mới - thời kỳ hòa bình, độc lập, thống nhất và xây dựng đất nước. Đây cũng là chiến thắng có ý nghĩa quốc tế to lớn, góp phần vào phong trào giải phóng dân tộc trên toàn thế giới.",
    subscriptionLevel: "premium",
  },
]

export function getHistoricalEventById(id: string): HistoricalEvent | undefined {
  return historicalEvents.find((event) => event.id === id)
}

export function getHistoricalEventsByPeriod(period: string): HistoricalEvent[] {
  return historicalEvents.filter((event) => event.period === period)
}

export function getHistoricalEventsBySubscriptionLevel(level: "free" | "basic" | "premium"): HistoricalEvent[] {
  // Return events that are accessible to the given subscription level
  // Premium users can access all events
  // Basic users can access basic and free events
  // Free users can only access free events

  if (level === "premium") {
    return historicalEvents
  } else if (level === "basic") {
    return historicalEvents.filter((event) => event.subscriptionLevel === "free" || event.subscriptionLevel === "basic")
  } else {
    return historicalEvents.filter((event) => event.subscriptionLevel === "free")
  }
}

export function searchHistoricalEvents(query: string): HistoricalEvent[] {
  const lowercaseQuery = query.toLowerCase()
  return historicalEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.period.toLowerCase().includes(lowercaseQuery) ||
      event.keyFigures.some((figure) => figure.name.toLowerCase().includes(lowercaseQuery)),
  )
}
