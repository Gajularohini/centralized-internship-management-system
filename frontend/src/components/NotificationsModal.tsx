"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell } from "lucide-react";

export default function NotificationsModal({ open, onOpenChange, notifications = [] }: { open: boolean, onOpenChange: (open: boolean) => void, notifications?: any[] }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#8a63ff]" /> Notifications
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No notifications yet.</div>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="bg-[#222] rounded-lg p-3 border border-[#8a63ff]/20">
                <div className="font-medium text-white">{n.title}</div>
                <div className="text-sm text-gray-400">{n.body}</div>
                <div className="text-xs text-gray-500 mt-1">{n.date}</div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
