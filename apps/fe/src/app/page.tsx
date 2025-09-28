"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Monitor, Globe, TrendingUp, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard-header";
import { MetricsCards } from "@/components/metrics-cards";
import { WebsiteList } from "@/components/website-list";
import { LoadingDashboard } from "@/components/loading-dashboard";
import { EmptyState } from "@/components/empty-state";
import { AddWebsiteModal } from "@/components/add-website-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { BACKEND_URL } from "@/lib/utils";

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

export default function Home() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
  const router = useRouter();

  // Check authentication and load data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      loadWebsites();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  const loadWebsites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/websites`, {
        headers: {
          Authorization: token
        }
      });

      // Handle the response data
      if (response.data && response.data.websites) {
        setWebsites(response.data.websites.map((w: any) => ({
          id: w.id,
          url: w.url,
          time_added: w.time_added,
          ticks: w.ticks && w.ticks.length > 0 ? w.ticks.map((tick: any) => ({
            id: tick.id,
            status: tick.status,
            response_time_ms: tick.response_time_ms,
            createdAt: tick.createdAt
          })) : [{
            id: 'default',
            status: 'CHECKING' as 'UP' | 'DOWN' | 'CHECKING',
            response_time_ms: 0,
            createdAt: new Date().toISOString()
          }]
        })));
      } else {
        setWebsites([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to load websites:', error);
      // If it's an auth error, sign out the user
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
      setWebsites([]);
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setWebsites([]);
    router.push('/signin');
  };

  const handleAddWebsite = async (url: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BACKEND_URL}/website`, 
        { url },
        { headers: { Authorization: token } }
      );
      
      // Refresh websites list
      await loadWebsites();
    } catch (error) {
      console.error('Failed to add website:', error);
      throw error;
    }
  };

  // Landing page for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="mb-20">
              <div className="flex justify-center mb-8">
                <div className="bg-sky-600 rounded-2xl p-4 shadow-lg">
                  <Monitor className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h1 className="text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                MuchBetterStack
              </h1>
              
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
                Professional uptime monitoring for your websites and APIs. 
                Get instant alerts, detailed analytics, and complete peace of mind.
              </p>
              
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  size="lg" 
                  className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link href="/signup">
                    <Eye className="mr-2 h-5 w-5" />
                    Start Free Trial
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-sky-600 hover:text-sky-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all"
                  asChild
                >
                  <Link href="/signin">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="bg-sky-600 rounded-xl p-4 w-fit mx-auto mb-6 shadow-md">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Global Monitoring</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">Monitor from multiple regions worldwide for accurate uptime data</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="bg-green-600 rounded-xl p-4 w-fit mx-auto mb-6 shadow-md">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Real-time Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">Get detailed insights with response times and performance metrics</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="bg-purple-600 rounded-xl p-4 w-fit mx-auto mb-6 shadow-md">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instant Alerts</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">Get notified immediately when your websites go down</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Trusted by developers worldwide</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-sky-600 dark:text-sky-400 mb-2">99.9%</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">Average Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1M+</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">Checks Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50ms</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">10k+</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300 font-medium">Websites Monitored</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DashboardHeader 
        onAddWebsite={() => setShowAddWebsiteModal(true)}
        onSignOut={handleSignOut}
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <LoadingDashboard />
        ) : websites.length === 0 ? (
          <EmptyState onAddWebsite={() => setShowAddWebsiteModal(true)} />
        ) : (
          // Dashboard with websites (when you have data)
          <>
            <MetricsCards websites={websites} />

            <WebsiteList 
              websites={websites} 
              onAddWebsite={() => setShowAddWebsiteModal(true)} 
            />
          </>
        )}
      </div>

      {/* Add Website Modal */}
      <AddWebsiteModal
        isOpen={showAddWebsiteModal}
        onClose={() => setShowAddWebsiteModal(false)}
        onAdd={async (url: string) => {
          await handleAddWebsite(url);
          setShowAddWebsiteModal(false);
        }}
      />
    </div>
  );
}
