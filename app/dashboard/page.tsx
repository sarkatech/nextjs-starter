"use client";


import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.displayName || user?.email}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your account today.
              </p>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Info</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {user?.displayName || 'Not provided'}</p>
              <p><span className="font-medium">Email:</span> {user?.email}</p>
              <p><span className="font-medium">Email Verified:</span> {user?.emailVerified ? 'Yes' : 'No'}</p>
              <p><span className="font-medium">Account Created:</span> {user?.metadata.creationTime}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Plan:</span> Free Trial</p>
              <p><span className="font-medium">Projects:</span> 0</p>
              <p><span className="font-medium">Storage Used:</span> 0 MB</p>
              <p><span className="font-medium">Last Login:</span> {user?.metadata.lastSignInTime}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Create New Project
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400 mt-1">Your projects and activity will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
