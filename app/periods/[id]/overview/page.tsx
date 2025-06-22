import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Users, MapPin, Scroll, User } from "lucide-react"
import Link from "next/link"
import { Timeline } from "@/components/timeline"
import { HistoricalFigures } from "@/components/historical-figures"
import { CulturalDevelopments } from "@/components/cultural-developments"
import { PrimarySourcesGallery } from "@/components/primary-sources-gallery"
import { DetailedMap } from "@/components/detailed-map"

// This would typically come from a database or API
const periodsData = {
  "bac-thuoc": {
    id: "bac-thuoc",
    title: "Thời Kỳ Bắc Thuộc",
    period: "179 TCN - 938",
    description: "Giai đoạn Việt Nam bị các triều đại phương Bắc đô hộ và tiến trình đấu tranh giành độc lập.",
    overview: `Thời kỳ Bắc thuộc là giai đoạn lịch sử kéo dài hơn 1000 năm khi Việt Nam (khi đó gọi là Giao Chỉ, 
    sau đổi thành Giao Châu) bị các triều đại phong kiến phương Bắc đô hộ. Thời kỳ này bắt đầu từ năm 179 TCN khi 
    Triệu Đà thôn tính Âu Lạc và kết thúc vào năm 938 khi Ngô Quyền đánh bại quân Nam Hán trên sông Bạch Đằng.
    
    Mặc dù bị đô hộ, người Việt vẫn duy trì bản sắc văn hóa và tinh thần dân tộc thông qua nhiều cuộc khởi nghĩa 
    và đấu tranh giành độc lập. Đây cũng là thời kỳ Việt Nam tiếp thu nhiều yếu tố văn hóa, chính trị và xã hội 
    từ Trung Hoa, tạo nên nền tảng cho sự phát triển sau này.`,
    timelineEvents: [
      {
        year: "179 TCN",
        title: "Triệu Đà thôn tính Âu Lạc",
        description: "Triệu Đà, vua nước Nam Việt, đánh chiếm Âu Lạc, bắt đầu thời kỳ Bắc thuộc.",
        category: "political",
      },
      {
        year: "111 TCN",
        title: "Nhà Hán chinh phạt Nam Việt",
        description: "Quân Hán đánh bại Nam Việt, đặt Giao Chỉ bộ trực thuộc nhà Hán.",
        category: "political",
      },
      {
        year: "40-43",
        title: "Khởi nghĩa Hai Bà Trưng",
        description:
          "Trưng Trắc và Trưng Nhị lãnh đạo cuộc khởi nghĩa chống lại ách đô hộ của nhà Hán, giành độc lập trong 3 năm.",
        category: "uprising",
        location: { lat: 21.0245, lng: 105.8412 },
      },
      {
        year: "248",
        title: "Khởi nghĩa Bà Triệu",
        description: "Triệu Thị Trinh (Bà Triệu) lãnh đạo cuộc khởi nghĩa chống lại nhà Ngô (Trung Quốc) ở Cửu Chân.",
        category: "uprising",
        location: { lat: 19.8, lng: 105.7 },
      },
      {
        year: "542-546",
        title: "Khởi nghĩa Lý Bí",
        description: "Lý Bí đánh đuổi quân Lương, thành lập nước Vạn Xuân, tự xưng là Nam Việt đế.",
        category: "uprising",
        location: { lat: 21.0285, lng: 105.8542 },
      },
      {
        year: "602",
        title: "Nhà Tùy đặt Giao Châu đô hộ phủ",
        description: "Nhà Tùy thay thế nhà Lương, đặt Giao Châu đô hộ phủ để cai trị Việt Nam.",
        category: "political",
      },
      {
        year: "722",
        title: "Khởi nghĩa Mai Thúc Loan",
        description: "Mai Thúc Loan (Mai Hắc Đế) lãnh đạo cuộc khởi nghĩa chống lại nhà Đường.",
        category: "uprising",
        location: { lat: 18.3, lng: 105.9 },
      },
      {
        year: "791",
        title: "Khởi nghĩa Phùng Hưng",
        description: "Phùng Hưng đánh đuổi nhà Đường, được người dân tôn là Bố Cái Đại Vương.",
        category: "uprising",
        location: { lat: 21.02, lng: 105.83 },
      },
      {
        year: "905-906",
        title: "Khởi nghĩa Khúc Thừa Dụ",
        description: "Khúc Thừa Dụ giành quyền tự chủ, mở đầu thời kỳ tự chủ của họ Khúc.",
        category: "uprising",
      },
      {
        year: "938",
        title: "Trận Bạch Đằng",
        description: "Ngô Quyền đánh bại quân Nam Hán trên sông Bạch Đằng, kết thúc thời kỳ Bắc thuộc.",
        category: "battle",
        location: { lat: 20.9, lng: 106.8 },
      },
    ],
    figures: [
      {
        id: "trung-sisters",
        name: "Hai Bà Trưng",
        fullName: "Trưng Trắc và Trưng Nhị",
        years: "? - 43",
        description:
          "Hai chị em Trưng Trắc và Trưng Nhị là những nữ anh hùng dân tộc đầu tiên, đã lãnh đạo cuộc khởi nghĩa chống lại ách đô hộ của nhà Hán vào năm 40. Sau khi giành chiến thắng, Trưng Trắc xưng vương, đóng đô ở Mê Linh. Cuộc khởi nghĩa tuy chỉ kéo dài 3 năm nhưng đã để lại dấu ấn sâu đậm trong lịch sử đấu tranh giành độc lập của dân tộc Việt Nam.",
        achievements: [
          "Lãnh đạo cuộc khởi nghĩa đầu tiên chống ách đô hộ phương Bắc",
          "Giành độc lập trong 3 năm (40-43)",
          "Thiết lập chính quyền tự chủ với Trưng Trắc làm vua",
        ],
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "ba-trieu",
        name: "Bà Triệu",
        fullName: "Triệu Thị Trinh",
        years: "226 - 248",
        description:
          "Triệu Thị Trinh, thường được gọi là Bà Triệu, là một nữ anh hùng dân tộc đã lãnh đạo cuộc khởi nghĩa chống lại nhà Ngô (Trung Quốc) vào năm 248. Mặc dù chỉ mới 23 tuổi, bà đã thể hiện tinh thần bất khuất và lòng yêu nước mãnh liệt. Câu nói nổi tiếng của bà: 'Tôi muốn cưỡi cơn gió mạnh, đạp đường sóng dữ, chém cá kình ở biển Đông, quét sạch giặc Ngô, giành lại giang sơn, cởi ách nô lệ, chứ không chịu khom lưng làm tì thiếp người ta' đã trở thành biểu tượng cho tinh thần độc lập và tự chủ của dân tộc Việt Nam.",
        achievements: [
          "Lãnh đạo cuộc khởi nghĩa chống nhà Ngô năm 248",
          "Trở thành biểu tượng của tinh thần độc lập và bất khuất",
        ],
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "ly-bi",
        name: "Lý Bí",
        fullName: "Lý Bôn (Lý Bí)",
        years: "503 - 548",
        description:
          "Lý Bí là người lãnh đạo cuộc khởi nghĩa chống lại nhà Lương vào năm 542. Sau khi giành chiến thắng, ông đã thành lập nước Vạn Xuân và xưng là Nam Việt đế. Đây là lần đầu tiên một quốc gia độc lập được thành lập sau hơn 600 năm Bắc thuộc. Tuy nhiên, đến năm 546, quân Lương đã phản công và đánh bại Lý Bí.",
        achievements: [
          "Lãnh đạo cuộc khởi nghĩa thành công chống nhà Lương",
          "Thành lập nước Vạn Xuân (544-602)",
          "Xưng là Nam Việt đế, thiết lập chính quyền độc lập",
        ],
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        id: "ngo-quyen",
        name: "Ngô Quyền",
        fullName: "Ngô Quyền",
        years: "897 - 944",
        description:
          "Ngô Quyền là vị tướng tài ba đã đánh bại quân Nam Hán trong trận Bạch Đằng năm 938, chấm dứt thời kỳ Bắc thuộc kéo dài hơn 1000 năm. Sau chiến thắng, ông lên ngôi vua, đóng đô ở Cổ Loa và mở đầu thời kỳ độc lập tự chủ của dân tộc Việt Nam. Chiến thuật đóng cọc trên sông Bạch Đằng của ông đã trở thành một chiến thuật quân sự nổi tiếng trong lịch sử.",
        achievements: [
          "Đánh bại quân Nam Hán trong trận Bạch Đằng năm 938",
          "Chấm dứt thời kỳ Bắc thuộc kéo dài hơn 1000 năm",
          "Lên ngôi vua, mở đầu thời kỳ độc lập tự chủ",
        ],
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    culturalDevelopments: [
      {
        id: "writing-system",
        title: "Chữ Hán và Chữ Nôm",
        category: "language",
        description:
          "Trong thời kỳ Bắc thuộc, chữ Hán được du nhập vào Việt Nam và trở thành văn tự chính thức. Tuy nhiên, người Việt đã sáng tạo ra chữ Nôm - một hệ thống chữ viết dựa trên chữ Hán nhưng được điều chỉnh để phù hợp với ngôn ngữ Việt. Chữ Nôm bắt đầu xuất hiện từ thế kỷ 8-10 và trở thành phương tiện để ghi lại văn học dân gian và các tác phẩm văn học Việt Nam.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "confucianism",
        title: "Nho giáo",
        category: "philosophy",
        description:
          "Nho giáo được du nhập vào Việt Nam trong thời kỳ Bắc thuộc và dần trở thành hệ tư tưởng chính. Các giá trị như hiếu thảo, trung thành, lễ nghĩa, trí tuệ và tín nghĩa được đề cao. Nho giáo ảnh hưởng sâu sắc đến cấu trúc xã hội, hệ thống giáo dục và đạo đức của người Việt, tạo nền tảng cho xã hội phong kiến sau này.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "buddhism",
        title: "Phật giáo",
        category: "religion",
        description:
          "Phật giáo du nhập vào Việt Nam từ thế kỷ 2 SCN thông qua các nhà sư Ấn Độ và Trung Hoa. Đến thế kỷ 6, Phật giáo đã trở nên phổ biến và có ảnh hưởng lớn đến đời sống tinh thần của người Việt. Các chùa chiền được xây dựng và trở thành trung tâm văn hóa, giáo dục của cộng đồng.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "agriculture",
        title: "Nông nghiệp và Thủy lợi",
        category: "economy",
        description:
          "Trong thời kỳ Bắc thuộc, người Việt đã tiếp thu nhiều kỹ thuật canh tác tiên tiến từ Trung Hoa, đặc biệt là kỹ thuật trồng lúa nước và xây dựng hệ thống thủy lợi. Việc sử dụng trâu bò trong canh tác và các công cụ sản xuất bằng sắt đã giúp tăng năng suất nông nghiệp đáng kể.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "handicrafts",
        title: "Nghề Thủ công",
        category: "economy",
        description:
          "Các nghề thủ công như dệt vải, gốm sứ, đúc đồng, rèn sắt phát triển mạnh trong thời kỳ này. Đặc biệt, nghề làm gốm đã đạt đến trình độ cao với các sản phẩm có hoa văn tinh xảo. Các làng nghề bắt đầu hình thành và trở thành đặc trưng của nền kinh tế Việt Nam.",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    primarySources: [
      {
        id: "dai-viet-su-ky",
        title: "Đại Việt Sử Ký Toàn Thư",
        author: "Ngô Sĩ Liên",
        year: "1479",
        type: "historical-text",
        description:
          "Bộ sử biên niên chính thức của Việt Nam, ghi chép lại lịch sử từ thời kỳ huyền thoại đến thế kỷ 15. Đây là nguồn tài liệu quý giá về thời kỳ Bắc thuộc, ghi lại các sự kiện chính trị, xã hội và các cuộc khởi nghĩa.",
        excerpt:
          "Năm Canh Tý [40], mùa xuân, tháng giêng, Trưng Trắc và em gái là Trưng Nhị khởi binh đánh đuổi Tô Định. Tô Định sợ chạy về nước. Trưng Trắc tự lập làm vua, đóng đô ở Mê Linh, xưng là Trưng Nữ Vương.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "linh-nam-chich-quai",
        title: "Lĩnh Nam Chích Quái",
        author: "Trần Thế Pháp",
        year: "Thế kỷ 14",
        type: "folklore",
        description:
          "Tuyển tập các truyền thuyết và giai thoại của Việt Nam, bao gồm nhiều câu chuyện về thời kỳ Bắc thuộc. Tác phẩm này giúp hiểu thêm về văn hóa dân gian và cách người Việt nhìn nhận lịch sử của mình.",
        excerpt:
          "Bà Triệu nói: 'Tôi muốn cưỡi cơn gió mạnh, đạp đường sóng dữ, chém cá kình ở biển Đông, quét sạch giặc Ngô, giành lại giang sơn, cởi ách nô lệ, chứ không chịu khom lưng làm tì thiếp người ta'.",
        image: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "han-shu",
        title: "Hán Thư",
        author: "Ban Cố",
        year: "111",
        type: "foreign-record",
        description:
          "Bộ sử chính thức của nhà Hán, ghi chép về việc Hán chinh phạt Nam Việt và thiết lập ách đô hộ. Đây là nguồn tài liệu quan trọng từ phía Trung Hoa về thời kỳ đầu của Bắc thuộc.",
        excerpt:
          "Năm thứ tư Nguyên Thủy [111 TCN], Hán Vũ Đế sai Phục Ba tướng quân Lộ Bác Đức và Lâu Thuyền tướng quân Dương Bộc đem quân đánh Nam Việt. Tháng 8, quân Hán vào thành Phiên Ngung, bắt Lữ Gia và Triệu Kiến Đức.",
        image: "/placeholder.svg?height=300&width=500",
      },
    ],
    mapLocations: [
      {
        id: "me-linh",
        name: "Mê Linh",
        coordinates: { lat: 21.1667, lng: 105.7333 },
        description: "Quê hương và kinh đô của Hai Bà Trưng, nơi khởi phát cuộc khởi nghĩa năm 40.",
        events: ["Khởi nghĩa Hai Bà Trưng (40-43)"],
        type: "capital",
      },
      {
        id: "bach-dang",
        name: "Sông Bạch Đằng",
        coordinates: { lat: 20.9, lng: 106.8 },
        description:
          "Nơi diễn ra trận đánh lịch sử năm 938, khi Ngô Quyền đánh bại quân Nam Hán, kết thúc thời kỳ Bắc thuộc.",
        events: ["Trận Bạch Đằng (938)"],
        type: "battle",
      },
      {
        id: "luy-lau",
        name: "Luy Lâu",
        coordinates: { lat: 21.0833, lng: 106.1833 },
        description:
          "Trung tâm chính trị, kinh tế và văn hóa của Giao Châu dưới thời Bắc thuộc. Cũng là một trong những trung tâm Phật giáo đầu tiên của Việt Nam.",
        events: ["Trung tâm Phật giáo (Thế kỷ 2-6)"],
        type: "cultural",
      },
      {
        id: "co-loa",
        name: "Cổ Loa",
        coordinates: { lat: 21.1167, lng: 105.8667 },
        description: "Kinh đô cổ của nước Âu Lạc, sau là nơi Ngô Quyền đóng đô sau khi đánh bại quân Nam Hán.",
        events: ["Kinh đô Âu Lạc (Thế kỷ 3 TCN)", "Kinh đô của Ngô Quyền (939)"],
        type: "capital",
      },
      {
        id: "hat-mon",
        name: "Hát Môn",
        coordinates: { lat: 20.9833, lng: 105.5 },
        description: "Nơi diễn ra cuộc khởi nghĩa của Phùng Hưng chống lại nhà Đường vào thế kỷ 8.",
        events: ["Khởi nghĩa Phùng Hưng (791)"],
        type: "uprising",
      },
    ],
  },
  "phong-kien": {
    id: "phong-kien",
    title: "Thời Kỳ Phong Kiến Độc Lập",
    period: "939 - 1884",
    description: "Giai đoạn độc lập với nhiều cuộc chiến bảo vệ lãnh thổ và nổi loạn nội bộ.",
    // Placeholder for other periods - would be filled with similar detailed data
  },
}

export default function PeriodOverviewPage({ params }: { params: { id: string } }) {
  const period = periodsData[params.id as keyof typeof periodsData]

  if (!period) {
    return <div>Không tìm thấy thời kỳ lịch sử này</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="mb-4">
            <Link href={`/periods/${params.id}`} className="text-blue-600 hover:text-blue-800">
              ← Quay lại bài học
            </Link>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{period.title}</CardTitle>
                  <CardDescription className="text-base">{period.period}</CardDescription>
                </div>
                <Badge variant="outline" className="text-base">
                  {period.period}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-lg">Tổng quan</h3>
                  <p className="text-gray-700 whitespace-pre-line">{period.overview}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Nhiều bài học</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Thời gian: {period.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Nhiều nhân vật lịch sử</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="timeline" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Dòng thời gian</span>
            </TabsTrigger>
            <TabsTrigger value="figures" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Nhân vật</span>
            </TabsTrigger>
            <TabsTrigger value="culture" className="flex items-center gap-2">
              <Scroll className="h-4 w-4" />
              <span>Văn hóa</span>
            </TabsTrigger>
            <TabsTrigger value="sources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Tài liệu gốc</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Bản đồ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Dòng thời gian lịch sử</CardTitle>
                <CardDescription>
                  Các sự kiện quan trọng trong thời kỳ {period.title} ({period.period})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline events={period.timelineEvents} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="figures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nhân vật lịch sử tiêu biểu</CardTitle>
                <CardDescription>Những nhân vật có ảnh hưởng quan trọng trong thời kỳ {period.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <HistoricalFigures figures={period.figures} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="culture" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Phát triển văn hóa</CardTitle>
                <CardDescription>
                  Các phát triển văn hóa, xã hội và kinh tế trong thời kỳ {period.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CulturalDevelopments developments={period.culturalDevelopments} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu gốc</CardTitle>
                <CardDescription>Các tài liệu lịch sử gốc về thời kỳ {period.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <PrimarySourcesGallery sources={period.primarySources} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bản đồ lịch sử</CardTitle>
                <CardDescription>Các địa điểm lịch sử quan trọng trong thời kỳ {period.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <DetailedMap locations={period.mapLocations} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
