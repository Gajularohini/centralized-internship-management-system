"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings, Bell, Lock, Palette, Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("English");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Settings className="h-6 w-6 text-[#8a63ff]" /> Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Notifications Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#4cc9f0]" />
              Notifications
            </h3>
            <div className="space-y-3 pl-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8a63ff]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-400">Receive browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8a63ff]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Palette className="h-5 w-5 text-[#00f5d4]" />
              Appearance
            </h3>
            <div className="space-y-3 pl-7">
              <div>
                <p className="text-white font-medium mb-2">Theme</p>
                <div className="flex gap-3">
                  <Button
                    variant={theme === "light" ? "neon" : "glass"}
                    size="sm"
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "neon" : "glass"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#f77f00]" />
              Language & Region
            </h3>
            <div className="space-y-3 pl-7">
              <div>
                <p className="text-white font-medium mb-2">Language</p>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#8a63ff]"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4 border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#f72585]" />
              Security
            </h3>
            <div className="space-y-3 pl-7">
              <Button variant="glass" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="glass" className="w-full justify-start">
                Two-Factor Authentication
              </Button>
              <Button variant="glass" className="w-full justify-start text-red-400 hover:text-red-300">
                Delete Account
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-700">
            <Button 
              variant="neon" 
              className="flex-1"
              onClick={() => {
                onOpenChange(false);
                alert("Settings saved successfully!");
              }}
            >
              Save Changes
            </Button>
            <Button 
              variant="glass" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
