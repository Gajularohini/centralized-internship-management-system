"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Users,
  FileCheck,
  MessageSquare,
  TrendingUp,
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Eye,
  Star,
  Filter,
  Calendar,
  GraduationCap,
  Building2,
  Award,
  Send
} from "lucide-react";
import Link from "next/link";
import NotificationsModal from "@/components/NotificationsModal";
import SettingsModal from "@/components/SettingsModal";

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "2024CS001",
    internship: "Full Stack Developer Intern",
    company: "TechCorp Solutions",
    startDate: "2025-11-01",
    tasksCompleted: 8,
    tasksTotal: 10,
    performance: 85,
    status: "active",
    recentSubmission: "Week 8: API Integration",
    submittedDate: "2025-11-12"
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "2024CS002",
    internship: "AI/ML Research Intern",
    company: "DataScience Labs",
    startDate: "2025-11-05",
    tasksCompleted: 6,
    tasksTotal: 8,
    performance: 92,
    status: "active",
    recentSubmission: "Week 6: Model Training",
    submittedDate: "2025-11-13"
  },
  {
    id: 3,
    name: "Mike Johnson",
    rollNumber: "2024CS003",
    internship: "Mobile App Developer",
    company: "AppVentures Inc",
    startDate: "2025-10-15",
    tasksCompleted: 12,
    tasksTotal: 12,
    performance: 78,
    status: "completed",
    recentSubmission: "Final Report",
    submittedDate: "2025-11-10"
  }
];

// Mock pending submissions
const mockPendingSubmissions = [
  {
    id: 1,
    studentName: "John Doe",
    rollNumber: "2024CS001",
    title: "Week 8: API Integration",
    internship: "Full Stack Developer Intern",
    company: "TechCorp Solutions",
    submittedDate: "2025-11-12",
    dueDate: "2025-11-13",
    fileUrl: "#",
    description: "Implemented REST API endpoints for user authentication and profile management"
  },
  {
    id: 2,
    studentName: "Jane Smith",
    rollNumber: "2024CS002",
    title: "Week 6: Model Training",
    internship: "AI/ML Research Intern",
    company: "DataScience Labs",
    submittedDate: "2025-11-13",
    dueDate: "2025-11-14",
    fileUrl: "#",
    description: "Trained neural network model with 92% accuracy on test dataset"
  }
];

export default function TeacherDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("students");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
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
    router.push("/teacher/login");
  };

  const stats = [
    { label: "Students Monitoring", value: "24", icon: Users, color: "#8a63ff" },
    { label: "Pending Reviews", value: "8", icon: FileCheck, color: "#f72585" },
    { label: "Feedback Given", value: "156", icon: MessageSquare, color: "#4cc9f0" },
    { label: "Avg Performance", value: "85%", icon: TrendingUp, color: "#00f5d4" }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      pending: "bg-orange-500/20 text-orange-400 border-orange-500/30"
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "#00f5d4";
    if (performance >= 75) return "#4cc9f0";
    if (performance >= 60) return "#f77f00";
    return "#f72585";
  };

  const handleApproveSubmission = (submissionId: number) => {
    console.log("Approving submission:", submissionId, { feedback, rating });
    alert(`Submission approved with rating ${rating}/5!`);
    setFeedback("");
    setRating(0);
  };

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.internship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Any side effects or data fetching can be done here
    console.log("Active tab changed:", activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, <span className="gradient-text">{user?.name || "Teacher"}</span>
            </h1>
            <p className="text-gray-400">Monitor and evaluate student internship performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" size="icon" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="glass" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
            <Link href="/teacher/profile">
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
            { id: "students", label: "Student Performance", icon: Users },
            { id: "submissions", label: "Review Submissions", icon: FileCheck },
            { id: "feedback", label: "Provide Feedback", icon: MessageSquare },
            { id: "reports", label: "Generate Reports", icon: Download }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-[#8a63ff]/20 text-[#8a63ff] border border-[#8a63ff]/30"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Student Performance Tab */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search students by name, roll number, or internship..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/40 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8a63ff]/50"
                    />
                  </div>
                  <Button variant="neonPurple">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="p-6 bg-black/20 border border-gray-700 rounded-lg hover:border-[#8a63ff]/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#8a63ff]/20 flex items-center justify-center">
                            <GraduationCap className="h-6 w-6 text-[#8a63ff]" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">{student.name}</h3>
                            <p className="text-gray-400 text-sm mb-2">Roll: {student.rollNumber}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-[#8a63ff]">{student.internship}</span>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-400">{student.company}</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                            student.status
                          )}`}
                        >
                          {student.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-2">Tasks Progress</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#8a63ff]"
                                style={{ width: `${(student.tasksCompleted / student.tasksTotal) * 100}%` }}
                              />
                            </div>
                            <span className="text-white font-semibold text-sm">
                              {student.tasksCompleted}/{student.tasksTotal}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 mb-2">Performance Score</p>
                          <div className="flex items-center gap-2">
                            <div
                              className="text-2xl font-bold"
                              style={{ color: getPerformanceColor(student.performance) }}
                            >
                              {student.performance}%
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 mb-2">Start Date</p>
                          <div className="flex items-center gap-2 text-white">
                            <Calendar className="h-4 w-4 text-[#4cc9f0]" />
                            {new Date(student.startDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-[#8a63ff]/10 border border-[#8a63ff]/30 rounded-lg mb-4">
                        <p className="text-sm text-gray-300">
                          <strong className="text-[#8a63ff]">Recent Submission:</strong> {student.recentSubmission}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Submitted: {new Date(student.submittedDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="neonPurple" size="sm" onClick={() => setSelectedStudent(student)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="glass" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Student
                        </Button>
                        <Button variant="glass" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Progress Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Review Submissions Tab */}
        {activeTab === "submissions" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Pending Task Submissions</CardTitle>
                <CardDescription>Review and approve student work submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockPendingSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="p-6 bg-black/20 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{submission.title}</h3>
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <span className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-[#8a63ff]" />
                            <span className="text-white">{submission.studentName}</span>
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{submission.rollNumber}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{submission.internship}</span>
                          <span className="text-gray-500">•</span>
                          <span>{submission.company}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-gray-400">Submitted</p>
                        <p className="text-white font-semibold">
                          {new Date(submission.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{submission.description}</p>

                    <div className="p-4 bg-[#8a63ff]/10 border border-[#8a63ff]/30 rounded-lg mb-4">
                      <h4 className="text-sm font-semibold text-[#8a63ff] mb-3">Provide Feedback & Rating</h4>
                      <textarea
                        placeholder="Write detailed feedback for the student..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8a63ff]/50 min-h-[100px] mb-3"
                      />
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Rating:</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className={`w-8 h-8 rounded-full transition-colors ${
                                star <= rating ? "bg-[#8a63ff]" : "bg-gray-700"
                              }`}
                            >
                              <Star className="h-4 w-4 mx-auto text-white" />
                            </button>
                          ))}
                        </div>
                        <span className="text-[#8a63ff] font-semibold">{rating}/5</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="neonPurple"
                        size="sm"
                        onClick={() => handleApproveSubmission(submission.id)}
                        disabled={!feedback || rating === 0}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Approve & Send Feedback
                      </Button>
                      <Button variant="glass" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Files
                      </Button>
                      <Button variant="glass" size="sm">
                        <XCircle className="h-4 w-4 mr-2" />
                        Request Revision
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Provide Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Communicate with Students & Companies</CardTitle>
                <CardDescription>Send feedback, ratings, and messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-black/20 border border-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-[#8a63ff]" />
                      Message Students
                    </h3>
                    <div className="space-y-3">
                      <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#8a63ff]/50">
                        <option value="">Select Student</option>
                        {mockStudents.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name} - {student.rollNumber}
                          </option>
                        ))}
                      </select>
                      <textarea
                        placeholder="Write your message to the student..."
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8a63ff]/50 min-h-[150px]"
                      />
                      <Button variant="neonPurple" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 bg-black/20 border border-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-[#4cc9f0]" />
                      Message Companies
                    </h3>
                    <div className="space-y-3">
                      <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]/50">
                        <option value="">Select Company</option>
                        <option value="1">TechCorp Solutions</option>
                        <option value="2">DataScience Labs</option>
                        <option value="3">AppVentures Inc</option>
                      </select>
                      <textarea
                        placeholder="Write your message to the company..."
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]/50 min-h-[150px]"
                      />
                      <Button variant="neon" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Generate Reports Tab */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Generate Progress Reports</CardTitle>
                <CardDescription>Create detailed reports for students and administration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-black/20 border border-gray-700 rounded-lg hover:border-[#8a63ff]/30 transition-colors">
                    <Award className="h-12 w-12 text-[#8a63ff] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Individual Student Report</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Generate comprehensive performance report for a specific student
                    </p>
                    <Button variant="neonPurple" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  <div className="p-6 bg-black/20 border border-gray-700 rounded-lg hover:border-[#8a63ff]/30 transition-colors">
                    <Users className="h-12 w-12 text-[#4cc9f0] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Batch Report</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Generate summary report for all students you're monitoring
                    </p>
                    <Button variant="neon" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>

                  <div className="p-6 bg-black/20 border border-gray-700 rounded-lg hover:border-[#8a63ff]/30 transition-colors">
                    <TrendingUp className="h-12 w-12 text-[#00f5d4] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Performance Analytics</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      View detailed analytics and trends across all internships
                    </p>
                    <Button variant="glass" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
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
