"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Plus } from "lucide-react";

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (url: string) => Promise<void>;
}

export function AddWebsiteModal({ isOpen, onClose, onAdd }: AddWebsiteModalProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Basic URL validation
      if (!url.trim()) {
        throw new Error("Please enter a URL");
      }
      
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      // Validate URL format
      new URL(formattedUrl);
      
      await onAdd(formattedUrl);
      onClose();
      setUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add website");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="text-center mb-8">
          <div className="bg-sky-600 rounded-2xl p-4 w-fit mx-auto mb-6 shadow-lg">
            <Plus className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Add Website
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Start monitoring a new website or API endpoint
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="website-url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Website URL
            </Label>
            <div className="relative mt-1">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="website-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10"
                placeholder="https://example.com"
                required
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              We'll monitor this URL and alert you if it goes down
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 font-medium rounded-xl transition-all"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-sky-600 text-white hover:bg-sky-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin  rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </div>
              ) : (
                "Add Website"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
