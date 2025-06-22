"use client";

import { useAuth } from "@/contexts/auth-context";
import DepositInfo from "../components/DepositInfo";

export default function NapTienPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Vui lòng đăng nhập để nạp tiền.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
      <DepositInfo user={user} />
    </div>
  );
} 