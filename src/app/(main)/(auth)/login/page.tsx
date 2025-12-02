"use client";

import Link from "next/link";
import { useState } from "react";
import { CompanyLoginForm, TravelerLoginForm } from "./_components";

type UserType = "traveler" | "company";

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType>("traveler");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">HandTrip</h1>
          <p className="text-gray-600">Тавтай морилно уу! Бүртгэлдээ нэвтрэнэ үү</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setUserType("traveler")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                userType === "traveler" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Жуулчин
              </div>
            </button>
            <button
              onClick={() => setUserType("company")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                userType === "company" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Компани
              </div>
            </button>
          </div>

          {userType === "traveler" ? <TravelerLoginForm /> : <CompanyLoginForm />}
        </div>

        <p className="text-center mt-6 text-gray-600">
          Бүртгэлгүй юу?{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Бүртгүүлэх
          </Link>
        </p>
      </div>
    </div>
  );
}
