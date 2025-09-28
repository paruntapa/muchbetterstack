"use client";

import { Monitor, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

interface DashboardHeaderProps {
  onAddWebsite: () => void;
  onSignOut: () => void;
}

export function DashboardHeader({ onAddWebsite, onSignOut }: DashboardHeaderProps) {
  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Monitor className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-sky-700 dark:from-white dark:to-sky-300 bg-clip-text text-transparent">
                MuchBetterStack
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Professional Uptime Monitoring
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm"
              onClick={onAddWebsite}
              className="border-2 border-sky-200 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-900/20 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
              Add Website
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={onSignOut}
              className="border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
