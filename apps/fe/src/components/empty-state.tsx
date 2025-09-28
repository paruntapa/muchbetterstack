"use client";

import { Monitor, Plus, CheckCircle, Clock, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddWebsite: () => void;
}

export function EmptyState({ onAddWebsite }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="relative mb-12">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-8 w-fit mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <Monitor className="h-20 w-20 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 animate-bounce">
          <Plus className="h-6 w-6 text-white" />
        </div>
        <div className="absolute -bottom-2 -left-2 bg-purple-500 rounded-full p-2 animate-pulse">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-sky-700 to-blue-600 dark:from-white dark:via-sky-300 dark:to-blue-400 bg-clip-text text-transparent mb-6">
          Welcome to MuchBetterStack
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          The ultimate uptime monitoring solution. Track your websites' performance, 
          get instant alerts, and ensure your online presence is always <span className="font-bold text-green-600">up and running</span>.
        </p>
        
        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-3 w-fit mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">99.9% Uptime</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your websites 24/7 with real-time status checks</p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <div className="bg-sky-100 dark:bg-sky-900/30 rounded-xl p-3 w-fit mx-auto mb-4">
              <Clock className="h-8 w-8 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get response time metrics and performance insights</p>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-3 w-fit mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Instant Alerts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get notified immediately when something goes wrong</p>
          </div>
        </div>
      </div>

      <Button 
        size="lg"
        onClick={onAddWebsite}
        className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 group"
      >
        <Plus className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        Add Your First Website
      </Button>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
        Start monitoring in under 30 seconds ⚡
      </p>
    </div>
  );
}
