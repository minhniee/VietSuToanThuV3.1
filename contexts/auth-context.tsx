"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, AuthService, type LoginCredentials, type RegisterData } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateSubscription: (level: "free" | "basic" | "premium") => Promise<{ success: boolean; error?: string }>
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const result = await AuthService.login(credentials)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return { success: result.success, error: result.error }
  }

  const register = async (data: RegisterData) => {
    const result = await AuthService.register(data)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return { success: result.success, error: result.error }
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  const updateSubscription = async (level: "free" | "basic" | "premium") => {
    if (!user) return { success: false, error: "Chưa đăng nhập" }

    const result = await AuthService.updateSubscription(user.id, level)
    if (result.success) {
      const updatedUser = AuthService.getCurrentUser()
      setUser(updatedUser)
    }
    return result
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: "Chưa đăng nhập" }

    const result = await AuthService.updateProfile(user.id, updates)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateSubscription,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
