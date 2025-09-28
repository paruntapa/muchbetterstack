"use client";

export function LoadingDashboard() {
  return (
    <div className="flex flex-col justify-center items-center h-96">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-200 dark:border-sky-800"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-sky-600 dark:border-t-sky-400 absolute top-0"></div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Loading Dashboard</h3>
        <p className="text-gray-600 dark:text-gray-400 animate-pulse">Fetching your website status...</p>
      </div>
    </div>
  );
}
