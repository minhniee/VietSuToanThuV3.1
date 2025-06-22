"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen, Map, Users, Home, Target, LogOut, Settings, CreditCard, User, PiggyBank } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigationItems = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/periods", label: "Thời kỳ lịch sử", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: Target },
  { href: "/practice", label: "Luyện tập", icon: Users },
  { href: "/map", label: "Bản đồ", icon: Map },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-yellow-500" />
            <span className="hidden sm:inline">Việt Sử Toàn Thư</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-red-600"
                >
                  <IconComponent className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}

            {/* User Menu or Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/nap-tien" className="flex items-center">
                      <PiggyBank className="mr-2 h-4 w-4" />
                      <span>Nạp tiền</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Cài đặt</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/subscription" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Đăng ký</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin-report" className="flex items-center">
                      <span className="mr-2">📊</span>
                      <span>Báo cáo quản trị</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Đăng nhập</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Đăng ký</Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="h-5 w-5" />
                      {item.label}
                    </Link>
                  )
                })}
                {user && (
                  <>
                    <div className="border-t pt-4" />
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/nap-tien"
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <PiggyBank className="h-5 w-5" />
                      Nạp tiền
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      Cài đặt
                    </Link>
                    <Link
                      href="/subscription"
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <CreditCard className="h-5 w-5" />
                      Đăng ký
                    </Link>
                    <Link
                      href="/admin-report"
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="h-5 w-5">📊</span>
                      Báo cáo quản trị
                    </Link>
                    <div className="border-t pt-4" />
                    <Button variant="ghost" className="justify-start" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Đăng xuất</span>
                    </Button>
                  </>
                )}
                {!user && (
                  <>
                    <div className="border-t pt-4" />
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
