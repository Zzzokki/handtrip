"use client";

import Link from "next/link";
import { useState } from "react";
import { CompanyLoginForm, TravelerLoginForm } from "./_components";
import { Building2, User } from "lucide-react";

type UserType = "traveler" | "company";

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType>("traveler");

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-8 pt-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">HandTrip</h1>
          </div>
          <p className="text-gray-600 text-sm">Тавтай морилно уу! Бүртгэлдээ нэвтрэнэ үү</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setUserType("traveler")}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all duration-200 ${
                userType === "traveler" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Жуулчин
              </div>
            </button>
            <button
              onClick={() => setUserType("company")}
              className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all duration-200 ${
                userType === "company" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building2 className="w-4 h-4" />
                Компани
              </div>
            </button>
          </div>

          <div className="transition-all duration-300">{userType === "traveler" ? <TravelerLoginForm /> : <CompanyLoginForm />}</div>
        </div>

        <p className="text-center mt-5 text-sm text-gray-600">
          Бүртгэлгүй юу?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline">
            Бүртгүүлэх
          </Link>
        </p>
      </div>
    </div>
  );
}
