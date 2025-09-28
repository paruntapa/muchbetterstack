"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Monitor, User, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import axios from "axios";
import { BACKEND_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const submit = async () => {
    setLoading(true)
    try {
      let response = await axios.post(`${BACKEND_URL}/user/signin`, {
          username: username,
          password: password
      })
      if(response) {
          alert('Signed in successfully!')    
      }
      localStorage.setItem("token", response.data.jwt)
      router.push('/')
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Sign in failed. Please try again.');
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-sky-600 rounded-xl p-3 shadow-md">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">MuchBetterStack</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left side - Sign in form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome back
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Sign in to your MuchBetterStack account
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 h-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                onClick={submit}
                disabled={loading}
                className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link 
                  href="/signup" 
                  className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo credentials hint */}
            <div className="mt-6 p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg">
              <p className="text-xs text-sky-600 dark:text-sky-400 text-center">
                💡 Demo: Create an account to explore the dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Feature showcase */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-sky-600">
          <div className="text-white max-w-md">
            <h2 className="text-4xl font-bold mb-8">
              Monitor with Confidence
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3 mt-1 shadow-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Real-time Monitoring</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Get instant notifications when your websites go down
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3 mt-1 shadow-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Monitor from multiple regions around the world
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/20 rounded-xl p-3 mt-1 shadow-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Detailed Analytics</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Track response times and uptime trends over time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}