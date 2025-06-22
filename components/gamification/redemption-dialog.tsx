"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Gift, Coins } from "lucide-react"

interface GiftProps {
  id: string
  name: string
  description: string
  points: number
  category: string
  estimatedDelivery: string
  stock: number
}

interface RedemptionDialogProps {
  gift: GiftProps
  userPoints: number
}

export function RedemptionDialog({ gift, userPoints }: RedemptionDialogProps) {
  const [step, setStep] = useState<"confirm" | "form" | "success">("confirm")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  const handleRedeem = () => {
    if (gift.category === "virtual") {
      // For virtual gifts, skip form and go directly to success
      setStep("success")
    } else {
      // For physical gifts, show form
      setStep("form")
    }
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the redemption request to your backend
    setStep("success")
  }

  const remainingPoints = userPoints - gift.points

  if (step === "success") {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Gift className="h-8 w-8 text-green-600" />
        </div>
        <DialogHeader>
          <DialogTitle>Đổi quà thành công!</DialogTitle>
          <DialogDescription>
            Bạn đã đổi thành công <strong>{gift.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {gift.category === "virtual"
              ? "Quà ảo đã được thêm vào tài khoản của bạn"
              : `Quà sẽ được giao trong ${gift.estimatedDelivery}`}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Coins className="h-4 w-4" />
            <span>Điểm còn lại: {remainingPoints.toLocaleString()}</span>
          </div>
        </div>
      </div>
    )
  }

  if (step === "form") {
    return (
      <div className="space-y-4">
        <DialogHeader>
          <DialogTitle>Thông tin giao hàng</DialogTitle>
          <DialogDescription>Vui lòng điền thông tin để chúng tôi giao quà cho bạn</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ giao hàng *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Ghi chú thêm về việc giao hàng..."
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setStep("confirm")} className="flex-1">
              Quay lại
            </Button>
            <Button type="submit" className="flex-1">
              Xác nhận đổi quà
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Xác nhận đổi quà</DialogTitle>
        <DialogDescription>Bạn có chắc chắn muốn đổi quà này không?</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 border rounded-lg">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <Gift className="h-8 w-8 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{gift.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{gift.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>Giao hàng: {gift.estimatedDelivery}</span>
              <Badge variant="outline">{gift.points} điểm</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Điểm hiện tại:</span>
            <span className="font-semibold">{userPoints.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Giá quà:</span>
            <span className="font-semibold text-red-600">-{gift.points.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Điểm còn lại:</span>
            <span>{remainingPoints.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Hủy
          </Button>
          <Button onClick={handleRedeem} className="flex-1">
            Xác nhận đổi
          </Button>
        </div>
      </div>
    </div>
  )
}
