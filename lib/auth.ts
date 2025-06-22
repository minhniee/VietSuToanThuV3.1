export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  lastLogin: Date
  subscription: UserSubscription
  preferences: UserPreferences
  balance: number
}

export interface UserPreferences {
  language: "vi" | "en"
  theme: "light" | "dark"
  notifications: boolean
  emailUpdates: boolean
}

export interface UserSubscription {
  level: "free" | "basic" | "premium"
  startDate: Date
  endDate?: Date
  isActive: boolean
  autoRenew: boolean
  paymentMethod?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Mock user database - in production, this would be a real database
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    name: "Người dùng Demo",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
    subscription: {
      level: "premium",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      isActive: true,
      autoRenew: true,
      paymentMethod: "Visa ****1234",
    },
    preferences: {
      language: "vi",
      theme: "light",
      notifications: true,
      emailUpdates: true,
    },
    balance: 500000,
  },
  {
    id: "2",
    email: "user@test.com",
    name: "Học viên Test",
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date(),
    subscription: {
      level: "basic",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-08-01"),
      isActive: true,
      autoRenew: false,
    },
    preferences: {
      language: "vi",
      theme: "light",
      notifications: true,
      emailUpdates: false,
    },
    balance: 100000,
  },
]

export class AuthService {
  private static currentUser: User | null = null

  static async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === credentials.email)

    if (!user) {
      return { success: false, error: "Email không tồn tại" }
    }

    // In production, you would verify the password hash
    if (credentials.password !== "password123") {
      return { success: false, error: "Mật khẩu không chính xác" }
    }

    // Update last login
    user.lastLogin = new Date()
    this.currentUser = user

    // Store in localStorage for persistence
    localStorage.setItem("currentUser", JSON.stringify(user))

    return { success: true, user }
  }

  static async register(data: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Validate data
    if (data.password !== data.confirmPassword) {
      return { success: false, error: "Mật khẩu xác nhận không khớp" }
    }

    if (mockUsers.find((u) => u.email === data.email)) {
      return { success: false, error: "Email đã được sử dụng" }
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email: data.email,
      name: data.name,
      createdAt: new Date(),
      lastLogin: new Date(),
      subscription: {
        level: "free",
        startDate: new Date(),
        isActive: true,
        autoRenew: false,
      },
      preferences: {
        language: "vi",
        theme: "light",
        notifications: true,
        emailUpdates: true,
      },
      balance: 0,
    }

    mockUsers.push(newUser)
    this.currentUser = newUser

    // Store in localStorage
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    return { success: true, user: newUser }
  }

  static logout(): void {
    this.currentUser = null
    localStorage.removeItem("currentUser")
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser
    }

    // Try to restore from localStorage
    const stored = localStorage.getItem("currentUser")
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      } catch {
        localStorage.removeItem("currentUser")
      }
    }

    return null
  }

  static async updateSubscription(
    userId: string,
    newLevel: "free" | "basic" | "premium",
  ): Promise<{ success: boolean; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) {
      return { success: false, error: "Người dùng không tồn tại" }
    }

    const now = new Date()
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 1)

    user.subscription = {
      level: newLevel,
      startDate: now,
      endDate: newLevel === "free" ? undefined : endDate,
      isActive: true,
      autoRenew: newLevel !== "free",
      paymentMethod: newLevel !== "free" ? "Visa ****1234" : undefined,
    }

    // Update current user if it's the same
    if (this.currentUser?.id === userId) {
      this.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
    }

    return { success: true }
  }

  static async updateProfile(
    userId: string,
    updates: Partial<User>,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) {
      return { success: false, error: "Người dùng không tồn tại" }
    }

    Object.assign(user, updates)

    // Update current user if it's the same
    if (this.currentUser?.id === userId) {
      this.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
    }

    return { success: true, user }
  }

  static async addBalance(userId: string, amount: number): Promise<{ success: boolean; user?: User; error?: string }> {
    const user = mockUsers.find((u) => u.id === userId)
    if (!user) return { success: false, error: "Người dùng không tồn tại" }
    user.balance += amount
    // Update current user if it's the same
    if (this.currentUser?.id === userId) {
      this.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
    }
    return { success: true, user }
  }
}
