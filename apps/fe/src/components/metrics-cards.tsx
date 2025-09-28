"use client";

import { CheckCircle, Clock, Globe, AlertCircle } from "lucide-react";

interface Website {
  id: string;
  url: string;
  time_added: string;
  ticks: Array<{
    id?: string;
    response_time_ms?: number;
    status: 'UP' | 'DOWN' | 'CHECKING';
    createdAt: string;
  }>;
}

interface MetricsCardsProps {
  websites: Website[];
}

export function MetricsCards({ websites }: MetricsCardsProps) {
  const uptimePercentage = websites.length > 0 
    ? Math.round((websites.filter(w => w.ticks[0]?.status === 'UP').length / websites.length) * 100)
    : 100;

  const avgResponseTime = websites.length > 0 
    ? Math.round(
        websites
          .filter(w => w.ticks[0]?.response_time_ms)
          .reduce((sum, w) => sum + (w.ticks[0]?.response_time_ms || 0), 0) / 
        websites.filter(w => w.ticks[0]?.response_time_ms).length || 0
      ) 
    : 0;

  const sitesDown = websites.filter(w => w.ticks[0]?.status === 'DOWN').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
      {/* Uptime Card */}
      <div className="group relative bg-gradient-to-br from-white to-green-50/50 dark:from-gray-800 dark:to-green-900/10 rounded-3xl p-6 shadow-xl border border-green-100 dark:border-green-900/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-7 w-7 text-white" />
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">Uptime</div>
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-2 tracking-tight">
              {uptimePercentage}%
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Overall Performance</div>
            <div className="mt-3 h-2 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${uptimePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Card */}
      <div className="group relative bg-gradient-to-br from-white to-sky-50/50 dark:from-gray-800 dark:to-sky-900/10 rounded-3xl p-6 shadow-xl border border-sky-100 dark:border-sky-900/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-7 w-7 text-white" />
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Speed</div>
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-sky-600 dark:text-sky-400 mb-2 tracking-tight">
              {avgResponseTime}ms
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Response</div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-2 bg-sky-100 dark:bg-sky-900/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full w-3/4 transition-all duration-1000 ease-out"></div>
              </div>
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">Fast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monitored Sites Card */}
      <div className="group relative bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/10 rounded-3xl p-6 shadow-xl border border-purple-100 dark:border-purple-900/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Globe className="h-7 w-7 text-white" />
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Sites</div>
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2 tracking-tight">{websites.length}</div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Being Monitored</div>
            <div className="mt-3 flex items-center gap-1">
              {[...Array(Math.min(websites.length, 5))].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
              ))}
              {websites.length > 5 && (
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 ml-1">+{websites.length - 5}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sites Down Card */}
      <div className="group relative bg-gradient-to-br from-white to-orange-50/50 dark:from-gray-800 dark:to-orange-900/10 rounded-3xl p-6 shadow-xl border border-orange-100 dark:border-orange-900/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <AlertCircle className="h-7 w-7 text-white" />
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Issues</div>
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-2 tracking-tight">
              {sitesDown}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Sites Down</div>
            <div className="mt-3 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${sitesDown > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                {sitesDown > 0 ? 'Action Required' : 'All Good'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
