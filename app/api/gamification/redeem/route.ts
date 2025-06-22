import { type NextRequest, NextResponse } from "next/server"

interface RedemptionRequest {
  userId: string
  giftId: string
  shippingInfo?: {
    fullName: string
    email: string
    phone: string
    address: string
    notes?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: RedemptionRequest = await request.json()
    const { userId, giftId, shippingInfo } = body

    // Here you would:
    // 1. Validate user has enough points
    // 2. Check gift availability
    // 3. Deduct points from user account
    // 4. Create redemption record
    // 5. Send confirmation email
    // 6. For physical gifts, create shipping order

    // Mock redemption process
    const redemptionId = `redemption_${Date.now()}`

    return NextResponse.json({
      success: true,
      redemptionId,
      message: "Gift redeemed successfully",
      estimatedDelivery: "3-5 days",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to redeem gift" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 })
  }

  // Mock redemption history
  const redemptions = [
    {
      id: "redemption_1",
      giftName: "Sách Lịch Sử Việt Nam",
      pointsSpent: 2000,
      status: "delivered",
      redeemedAt: "2024-01-15",
      deliveredAt: "2024-01-18",
    },
    {
      id: "redemption_2",
      giftName: "Voucher Cà phê 100k",
      pointsSpent: 800,
      status: "processing",
      redeemedAt: "2024-01-20",
    },
  ]

  return NextResponse.json({
    success: true,
    data: redemptions,
  })
}
