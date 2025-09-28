"use client";

import { Clock, Globe, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface WebsiteListProps {
  websites: Website[];
  onAddWebsite: () => void;
}

export function WebsiteList({ websites, onAddWebsite }: WebsiteListProps) {
  const getStatusConfig = (status: 'UP' | 'DOWN' | 'CHECKING') => {
    switch (status) {
      case 'UP': return {
        color: 'bg-green-500',
        bgColor: 'from-green-50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/5',
        borderColor: 'border-green-200 dark:border-green-800',
        textColor: 'text-green-700 dark:text-green-300',
        badgeColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        text: 'Online',
        icon: '🟢'
      };
      case 'DOWN': return {
        color: 'bg-red-500',
        bgColor: 'from-red-50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/5',
        borderColor: 'border-red-200 dark:border-red-800',
        textColor: 'text-red-700 dark:text-red-300',
        badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        text: 'Down',
        icon: '🔴'
      };
      case 'CHECKING': return {
        color: 'bg-yellow-500',
        bgColor: 'from-yellow-50 to-amber-50/50 dark:from-yellow-900/10 dark:to-amber-900/5',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        textColor: 'text-yellow-700 dark:text-yellow-300',
        badgeColor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        text: 'Checking...',
        icon: '🟡'
      };
      default: return {
        color: 'bg-gray-500',
        bgColor: 'from-gray-50 to-slate-50/50 dark:from-gray-800 dark:to-slate-800/50',
        borderColor: 'border-gray-200 dark:border-gray-700',
        textColor: 'text-gray-700 dark:text-gray-300',
        badgeColor: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
        text: 'Unknown',
        icon: '⚪'
      };
    }
  };

  if (websites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚀</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to start monitoring?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Add your first website to begin tracking its uptime and performance.</p>
        <Button 
          onClick={onAddWebsite}
          className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Add First Website
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-sky-700 dark:from-white dark:to-sky-300 bg-clip-text text-transparent mb-2">
            Your Websites
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Monitor and manage all your endpoints
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/20 rounded-full border border-sky-200 dark:border-sky-800">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">Live Monitoring</span>
        </div>
      </div>

      <div className="space-y-4">
        {websites.map((website, index) => {
          const latestTick = website.ticks[0];
          const status = latestTick?.status || 'CHECKING';
          const statusConfig = getStatusConfig(status);
          
          return (
            <div 
              key={website.id} 
              className={`group relative bg-gradient-to-r ${statusConfig.bgColor} rounded-2xl p-6 border ${statusConfig.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className={`w-5 h-5 ${statusConfig.color} rounded-full shadow-lg ${status === 'CHECKING' ? 'animate-pulse' : ''}`}></div>
                    {status === 'UP' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                        {website.url.replace('https://', '').replace('http://', '')}
                      </h3>
                      <span className="text-lg">{statusConfig.icon}</span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Added {new Date(website.time_added).toLocaleDateString()}</span>
                      </div>
                      
                      {latestTick?.response_time_ms && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                          <span className="font-semibold">{latestTick.response_time_ms}ms response</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span className="font-medium text-sky-600 dark:text-sky-400">
                          {website.url.startsWith('https://') ? 'HTTPS' : 'HTTP'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold ${statusConfig.badgeColor} shadow-sm`}>
                    {statusConfig.text}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-sky-100 dark:hover:bg-sky-900/20"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Subtle animation background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
