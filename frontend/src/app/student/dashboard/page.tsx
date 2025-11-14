"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Upload,
  MessageSquare,
  TrendingUp,
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import NotificationsModal from "@/components/NotificationsModal";
import SettingsModal from "@/components/SettingsModal";

// Mock data for internships
const mockInternships = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Remote",
    duration: "3 months",
    stipend: "$1500/month",
    description: "Work on cutting-edge web applications using React, Node.js, and MongoDB.",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    posted: "2 days ago",
    deadline: "2025-12-01",
    status: "open"
  },
  {
    id: 2,
    title: "AI/ML Research Intern",
    company: "DataScience Labs",
    location: "Boston, MA",
    type: "Hybrid",
    duration: "6 months",
    stipend: "$2000/month",
    description: "Research and develop machine learning models for predictive analytics.",
    skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis"],
    posted: "1 week ago",
    deadline: "2025-11-25",
    status: "open"
  },
  {
    id: 3,
    title: "Mobile App Developer",
    company: "AppVentures Inc",
    location: "Austin, TX",
    type: "On-site",
    duration: "4 months",
    stipend: "$1800/month",
    description: "Build cross-platform mobile applications using React Native and Flutter.",
    skills: ["React Native", "Flutter", "Firebase", "UI/UX"],
    posted: "3 days ago",
    deadline: "2025-11-30",
    status: "open"
  },
  {
    id: 4,
    title: "DevOps Engineering Intern",
    company: "CloudOps Systems",
    location: "Seattle, WA",
    type: "Remote",
    duration: "3 months",
    stipend: "$1700/month",
    description: "Manage CI/CD pipelines, Docker containers, and Kubernetes clusters.",
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    posted: "5 days ago",
    deadline: "2025-12-05",
    status: "open"
  },
  {
    id: 5,
    title: "Data Analytics Intern",
    company: "Analytics Pro",
    location: "New York, NY",
    type: "Hybrid",
    duration: "5 months",
    stipend: "$1600/month",
    description: "Analyze large datasets and create visualizations for business insights.",
    skills: ["SQL", "Python", "Tableau", "Excel"],
    posted: "1 day ago",
    deadline: "2025-11-28",
    status: "open"
  },
  {
    id: 6,
    title: "UI/UX Design Intern",
    company: "DesignHub Studio",
    location: "Los Angeles, CA",
    type: "Remote",
    duration: "3 months",
    stipend: "$1400/month",
    description: "Design user interfaces and create prototypes for web and mobile apps.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    posted: "4 days ago",
    deadline: "2025-12-03",
    status: "open"
  }
];

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    internship: "Full Stack Developer Intern",
    company: "TechCorp Solutions",
    appliedDate: "2025-11-10",
    status: "under_review",
    lastUpdate: "2025-11-12"
  },
  {
    id: 2,
    internship: "AI/ML Research Intern",
    company: "DataScience Labs",
    appliedDate: "2025-11-08",
    status: "accepted",
    lastUpdate: "2025-11-13"
  },
  {
    id: 3,
    internship: "Mobile App Developer",
    company: "AppVentures Inc",
    appliedDate: "2025-11-05",
    status: "rejected",
    lastUpdate: "2025-11-11"
  }
];

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: "Week 1: Setup Development Environment",
    internship: "AI/ML Research Intern",
    dueDate: "2025-11-20",
    status: "submitted",
    feedback: "Great work! Keep it up."
  },
  {
    id: 2,
    title: "Week 2: Data Preprocessing Pipeline",
    internship: "AI/ML Research Intern",
    dueDate: "2025-11-27",
    status: "pending",
    feedback: null
  }
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    window.location.href = "/student/login";
  };

  const stats = [
    { label: "Active Applications", value: "2", icon: Briefcase, color: "#00f5d4" },
    { label: "Tasks Pending", value: "1", icon: Upload, color: "#f72585" },
    { label: "Tasks Completed", value: "1", icon: CheckCircle2, color: "#4cc9f0" },
    { label: "Feedback Received", value: "1", icon: MessageSquare, color: "#8a63ff" }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      open: "bg-green-500/20 text-green-400 border-green-500/30",
      under_review: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      accepted: "bg-green-500/20 text-green-400 border-green-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30",
      submitted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      pending: "bg-orange-500/20 text-orange-400 border-orange-500/30"
    };
    return badges[status as keyof typeof badges] || badges.open;
  };

  const getStatusIcon = (status: string) => {
    if (status === "accepted" || status === "submitted") return <CheckCircle2 className="h-4 w-4" />;
    if (status === "rejected") return <XCircle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const filteredInternships = mockInternships.filter(internship =>
    internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="gradient-text">{user?.name || "Student"}</span>
            </h1>
            <p className="text-gray-400">Manage your internships and track your progress</p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" size="icon" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="glass" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
            <Link href="/student/profile">
              <Button variant="glass" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="glass" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass" className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="glass p-2 rounded-xl inline-flex gap-2 mb-8">
          {[
            { id: "browse", label: "Browse Internships", icon: Search },
            { id: "applications", label: "My Applications", icon: FileText },
            { id: "tasks", label: "Tasks & Submissions", icon: Upload },
            { id: "feedback", label: "Feedback", icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/30"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Browse Internships Tab */}
        {activeTab === "browse" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <Card variant="glass">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search internships by title, company, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00f5d4]/50"
                    />
                  </div>
                  <Button variant="neon">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Internship Listings */}
            <div className="grid gap-6">
              {filteredInternships.map((internship, index) => (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="glass" className="hover:scale-[1.02] transition-transform">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Company Logo Placeholder */}
                        <div className="w-16 h-16 rounded-xl bg-[#00f5d4]/20 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-8 w-8 text-[#00f5d4]" />
                        </div>

                        {/* Internship Details */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h3 className="text-2xl font-bold text-white">{internship.title}</h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                                  internship.status
                                )}`}
                              >
                                {internship.status.replace("_", " ").toUpperCase()}
                              </span>
                            </div>
                            <p className="text-[#00f5d4] font-semibold text-lg">{internship.company}</p>
                          </div>

                          <p className="text-gray-300">{internship.description}</p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {internship.location}
                            </span>
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {internship.duration}
                            </span>
                            <span className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4" />
                              {internship.stipend}
                            </span>
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Deadline: {new Date(internship.deadline).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {internship.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-full text-[#4cc9f0] text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-3 pt-2">
                            <Link href={`/student/internships/${internship.id}`}>
                              <Button variant="neon">View Details</Button>
                            </Link>
                            <Button variant="glass">Save for Later</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Application Status Tracker</CardTitle>
                <CardDescription>Track all your internship applications in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 bg-black/20 border border-gray-700 rounded-lg hover:border-[#00f5d4]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{app.internship}</h4>
                        <p className="text-gray-400">{app.company}</p>
                      </div>
                      <span
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {getStatusIcon(app.status)}
                        {app.status.replace("_", " ").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-400">
                      <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                      <span>Last Update: {new Date(app.lastUpdate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tasks & Submissions Tab */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Daily/Weekly Task Submissions</CardTitle>
                <CardDescription>Upload your work and track submission status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-black/20 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{task.title}</h4>
                        <p className="text-gray-400 text-sm">{task.internship}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          task.status
                        )}`}
                      >
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    {task.feedback && (
                      <div className="p-3 bg-[#00f5d4]/10 border border-[#00f5d4]/30 rounded-lg mb-3">
                        <p className="text-sm text-gray-300">
                          <strong className="text-[#00f5d4]">Feedback:</strong> {task.feedback}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      {task.status === "pending" && (
                        <Button variant="neon" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Work
                        </Button>
                      )}
                      <Button variant="glass" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Feedback from Teachers & Companies</CardTitle>
                <CardDescription>View all feedback and ratings you've received</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-black/20 border border-gray-700 rounded-lg">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#8a63ff]/20 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-[#8a63ff]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">Prof. Johnson</h4>
                        <span className="text-sm text-gray-400">2 days ago</span>
                      </div>
                      <p className="text-gray-300 mb-3">
                        Great work on Week 1 submission! Your development environment setup is perfect. 
                        Keep maintaining the same quality of work.
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Rating:</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-full ${
                                i < 4 ? "bg-[#00f5d4]" : "bg-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[#00f5d4] font-semibold">4/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/20 border border-gray-700 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#4cc9f0]/20 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-[#4cc9f0]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">DataScience Labs</h4>
                        <span className="text-sm text-gray-400">1 week ago</span>
                      </div>
                      <p className="text-gray-300 mb-3">
                        Welcome to the team! We're excited to have you onboard for the AI/ML Research internship. 
                        Looking forward to working with you.
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm">
                          Internship Accepted
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Notifications Modal */}
      <NotificationsModal open={showNotifications} onOpenChange={setShowNotifications} />
      {/* Settings Modal */}
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
}
