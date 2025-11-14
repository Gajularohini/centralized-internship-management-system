"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import NotificationsModal from "@/components/NotificationsModal";
import SettingsModal from "@/components/SettingsModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  User,
  Bell,
  Settings,
  LogOut,
  Plus,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Send,
  Calendar,
  MapPin,
  DollarSign,
  Edit,
  Trash2,
  Award,
  GraduationCap,
  Building2
} from "lucide-react";

// Mock data for internships
const mockInternships = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    location: "San Francisco, CA",
    type: "Remote",
    duration: "3 months",
    stipend: "$1500/month",
    posted: "2025-11-01",
    deadline: "2025-12-01",
    applicants: 127,
    openings: 5,
    status: "active"
  },
  {
    id: 2,
    title: "Data Analytics Intern",
    location: "New York, NY",
    type: "Hybrid",
    duration: "4 months",
    stipend: "$1800/month",
    posted: "2025-10-28",
    deadline: "2025-11-25",
    applicants: 89,
    openings: 3,
    status: "active"
  }
];

// Mock applicants
const mockApplicants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@university.edu",
    university: "MIT",
    department: "Computer Science",
    year: "3rd Year",
    gpa: "3.8/4.0",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    internshipApplied: "Full Stack Developer Intern",
    appliedDate: "2025-11-08",
    status: "pending",
    resumeUrl: "#",
    coverLetter: "I am excited to apply for the Full Stack Developer position...",
    portfolioUrl: "https://johndoe.dev"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@university.edu",
    university: "Stanford",
    department: "Computer Science",
    year: "4th Year",
    gpa: "3.9/4.0",
    skills: ["Python", "React", "AWS", "Docker"],
    internshipApplied: "Full Stack Developer Intern",
    appliedDate: "2025-11-10",
    status: "pending",
    resumeUrl: "#",
    coverLetter: "With my strong background in software development...",
    portfolioUrl: "https://janesmith.dev"
  }
];

// Mock current interns
const mockInterns = [
  {
    id: 1,
    name: "Mike Johnson",
    internship: "Mobile App Developer",
    startDate: "2025-10-15",
    tasksAssigned: 12,
    tasksCompleted: 10,
    performance: 85,
    lastSubmission: "Week 10: Final Testing",
    submittedDate: "2025-11-12"
  },
  {
    id: 2,
    name: "Sarah Williams",
    internship: "DevOps Engineering Intern",
    startDate: "2025-11-01",
    tasksAssigned: 6,
    tasksCompleted: 5,
    performance: 92,
    lastSubmission: "Week 5: CI/CD Pipeline",
    submittedDate: "2025-11-13"
  }
];

export default function CompanyDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const [activeTab, setActiveTab] = useState("internships");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof mockApplicants[0] | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const stats = [
    { label: "Active Internships", value: "5", icon: Briefcase, color: "#4cc9f0" },
    { label: "Total Applicants", value: "216", icon: Users, color: "#00f5d4" },
    { label: "Active Interns", value: "8", icon: GraduationCap, color: "#8a63ff" },
    { label: "Avg Rating Given", value: "4.2", icon: Star, color: "#f77f00" }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      accepted: "bg-green-500/20 text-green-400 border-green-500/30",
      rejected: "bg-red-500/20 text-red-400 border-red-500/30"
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const handleReviewApplication = (applicantId: number, decision: "accept" | "reject") => {
    console.log(`${decision} applicant:`, applicantId, { feedback, rating });
    alert(`Application ${decision}ed! Notification sent to student.`);
    setSelectedApplicant(null);
    setFeedback("");
    setRating(0);
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "#00f5d4";
    if (performance >= 75) return "#4cc9f0";
    if (performance >= 60) return "#f77f00";
    return "#f72585";
  };

  useEffect(() => {
    // Any side effects or data fetching can be done here
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome, <span className="gradient-text">{user?.name || "Company"}</span>
            </h1>
            <p className="text-gray-400">Manage internships and track intern performance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" size="icon" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="glass" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
            <Link href="/company/profile">
              <Button variant="glass" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="glass" size="icon" onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("userRole");
              localStorage.removeItem("userData");
              router.push("/company/login");
            }}>
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
            { id: "internships", label: "My Internships", icon: Briefcase },
            { id: "applicants", label: "Review Applicants", icon: Users },
            { id: "interns", label: "Manage Interns", icon: GraduationCap },
            { id: "feedback", label: "Provide Feedback", icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-[#4cc9f0]/20 text-[#4cc9f0] border border-[#4cc9f0]/30"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* My Internships Tab */}
        {activeTab === "internships" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Posted Internship Opportunities</CardTitle>
                    <CardDescription>Manage your internship listings</CardDescription>
                  </div>
                  <Button variant="neon" onClick={() => setShowPostForm(!showPostForm)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Internship
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {showPostForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-6 bg-black/20 border border-[#4cc9f0]/30 rounded-lg"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Post New Internship</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Internship Title</label>
                        <Input placeholder="e.g., Full Stack Developer Intern" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Location</label>
                        <Input placeholder="e.g., San Francisco, CA" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Type</label>
                        <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]/50">
                          <option value="remote">Remote</option>
                          <option value="onsite">On-site</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Duration</label>
                        <Input placeholder="e.g., 3 months" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Stipend</label>
                        <Input placeholder="e.g., $1500/month" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Number of Openings</label>
                        <Input type="number" placeholder="5" />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <label className="text-sm font-medium text-gray-300">Description</label>
                      <textarea
                        placeholder="Describe the internship role, responsibilities, and requirements..."
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]/50 min-h-[150px]"
                      />
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button variant="neon">
                        <Plus className="h-4 w-4 mr-2" />
                        Post Internship
                      </Button>
                      <Button variant="glass" onClick={() => setShowPostForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}

                {mockInternships.map((internship) => (
                  <div
                    key={internship.id}
                    className="p-6 bg-black/20 border border-gray-700 rounded-lg hover:border-[#4cc9f0]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{internship.title}</h3>
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
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          internship.status
                        )}`}
                      >
                        {internship.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="p-3 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Applicants</p>
                        <p className="text-2xl font-bold text-white">{internship.applicants}</p>
                      </div>
                      <div className="p-3 bg-[#00f5d4]/10 border border-[#00f5d4]/30 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Openings</p>
                        <p className="text-2xl font-bold text-white">{internship.openings}</p>
                      </div>
                      <div className="p-3 bg-[#8a63ff]/10 border border-[#8a63ff]/30 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Posted</p>
                        <p className="text-sm font-semibold text-white">
                          {new Date(internship.posted).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="p-3 bg-[#f72585]/10 border border-[#f72585]/30 rounded-lg">
                        <p className="text-sm text-gray-400 mb-1">Deadline</p>
                        <p className="text-sm font-semibold text-white">
                          {new Date(internship.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/company/internships/${internship.id}`}>
                        <Button variant="neon" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Button variant="glass" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="glass" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Close
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Review Applicants Tab */}
        {activeTab === "applicants" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Review & Manage Applications</CardTitle>
                <CardDescription>Evaluate applicants and make hiring decisions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockApplicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="p-6 bg-black/20 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#4cc9f0]/20 flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-[#4cc9f0]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{applicant.name}</h3>
                          <p className="text-gray-400 text-sm mb-2">{applicant.email}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-[#4cc9f0]">{applicant.university}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">{applicant.department}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">{applicant.year}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-[#00f5d4]">GPA: {applicant.gpa}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          applicant.status
                        )}`}
                      >
                        {applicant.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">Applied for: <span className="text-white font-semibold">{applicant.internshipApplied}</span></p>
                      <p className="text-sm text-gray-400">Applied on: {new Date(applicant.appliedDate).toLocaleDateString()}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-300 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-full text-[#4cc9f0] text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-[#4cc9f0] mb-2">Cover Letter:</p>
                      <p className="text-gray-300 text-sm">{applicant.coverLetter}</p>
                    </div>

                    {selectedApplicant?.id === applicant.id && (
                      <div className="p-4 bg-black/40 border border-gray-700 rounded-lg mb-4">
                        <h4 className="text-sm font-semibold text-white mb-3">Provide Feedback</h4>
                        <textarea
                          placeholder="Write feedback for the applicant..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]/50 min-h-[100px] mb-3"
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      {applicant.status === "pending" && (
                        <>
                          <Button
                            variant="neon"
                            size="sm"
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              handleReviewApplication(applicant.id, "accept");
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button
                            variant="glass"
                            size="sm"
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              handleReviewApplication(applicant.id, "reject");
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </>
                      )}
                      <Button variant="glass" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Resume
                      </Button>
                      {applicant.portfolioUrl && (
                        <Button variant="glass" size="sm">
                          <Building2 className="h-4 w-4 mr-2" />
                          View Portfolio
                        </Button>
                      )}
                      <Button variant="glass" size="sm" onClick={() => setSelectedApplicant(applicant)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Manage Interns Tab */}
        {activeTab === "interns" && (
          <div className="space-y-6">
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Active Interns - Track Progress & Performance</CardTitle>
                <CardDescription>Assign tasks, monitor work, and evaluate performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockInterns.map((intern) => (
                  <div
                    key={intern.id}
                    className="p-6 bg-black/20 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#4cc9f0]/20 flex items-center justify-center">
                          <User className="h-6 w-6 text-[#4cc9f0]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">{intern.name}</h3>
                          <p className="text-[#4cc9f0] text-sm mb-2">{intern.internship}</p>
                          <p className="text-gray-400 text-sm">
                            Started: {new Date(intern.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Tasks Progress</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#4cc9f0]"
                              style={{ width: `${(intern.tasksCompleted / intern.tasksAssigned) * 100}%` }}
                            />
                          </div>
                          <span className="text-white font-semibold text-sm">
                            {intern.tasksCompleted}/{intern.tasksAssigned}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-2">Performance Score</p>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: getPerformanceColor(intern.performance) }}
                        >
                          {intern.performance}%
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-400 mb-2">Last Submission</p>
                        <p className="text-sm font-semibold text-white">
                          {new Date(intern.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-lg mb-4">
                      <p className="text-sm text-gray-300">
                        <strong className="text-[#4cc9f0]">Recent Work:</strong> {intern.lastSubmission}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="neon" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Assign Task
                      </Button>
                      <Button variant="glass" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View All Tasks
                      </Button>
                      <Button variant="glass" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Feedback
                      </Button>
                      <Button variant="glass" size="sm">
                        <Award className="h-4 w-4 mr-2" />
                        Rate Performance
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
                <CardTitle>Provide Ratings & Feedback</CardTitle>
                <CardDescription>Evaluate interns and communicate with students/teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-black/20 border border-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-[#f77f00]" />
                      Rate Intern Performance
                    </h3>
                    <div className="space-y-3">
                      <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]/50">
                        <option value="">Select Intern</option>
                        {mockInterns.map((intern) => (
                          <option key={intern.id} value={intern.id}>
                            {intern.name} - {intern.internship}
                          </option>
                        ))}
                      </select>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Rating:</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className={`w-8 h-8 rounded-full transition-colors ${
                                star <= rating ? "bg-[#f77f00]" : "bg-gray-700"
                              }`}
                            >
                              <Star className="h-4 w-4 mx-auto text-white" />
                            </button>
                          ))}
                        </div>
                        <span className="text-[#f77f00] font-semibold">{rating}/5</span>
                      </div>
                      <textarea
                        placeholder="Write detailed feedback about the intern's performance..."
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4cc9f0]/50 min-h-[150px]"
                      />
                      <Button variant="neon" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 bg-black/20 border border-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-[#8a63ff]" />
                      Message Teachers
                    </h3>
                    <div className="space-y-3">
                      <select className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#8a63ff]/50">
                        <option value="">Select Teacher/University</option>
                        <option value="1">Prof. Johnson - MIT</option>
                        <option value="2">Prof. Williams - Stanford</option>
                        <option value="3">Prof. Davis - Harvard</option>
                      </select>
                      <textarea
                        placeholder="Write your message to the teacher..."
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8a63ff]/50 min-h-[150px]"
                      />
                      <Button variant="neonPurple" className="w-full">
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
      </div>
      
      {/* Notifications Modal */}
      <NotificationsModal open={showNotifications} onOpenChange={setShowNotifications} />
      {/* Settings Modal */}
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
}
