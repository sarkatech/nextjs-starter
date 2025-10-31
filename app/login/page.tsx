"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { getTokens } from "next-firebase-auth-edge/next/tokens";

export default function LoginPage() {
  const { loginWithGoogle, isAuthenticated, loading, error } = useAuth();
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"otp" | "password">("otp");
  const [email, setEmail] = useState("");

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    try {
      if (result?.user) {
        const idToken = await result.user.getIdToken();
        const tokens = { idToken }; // You may need to fetch refreshToken if needed

        // If you need to use getTokens, pass cookies (not user object) as in middleware.ts
        // Example: const tokens = await getTokens({} as RequestCookies, { ...config });
        setCookie("__session", tokens.idToken);

        router.push("/app"); // redirige al dashboard
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email/password or OTP authentication
    console.log("Email submitted:", email);
    alert("not implemented yet");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Login</h1>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex mb-8 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setAuthMethod("otp")}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-semibold transition-all ${
              authMethod === "otp"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            One-time password
          </button>
          <button
            onClick={() => setAuthMethod("password")}
            className={`flex-1 py-3 px-6 rounded-full text-sm font-semibold transition-all ${
              authMethod === "password"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Password
          </button>
        </div>

        {/* Email Input Form */}
        <form onSubmit={handleEmailSubmit} className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Work email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            required
          />

          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Send
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-blue-600 font-semibold">
              Login With Google
            </span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
