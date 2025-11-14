"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Building2,
  Briefcase,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function InternshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params Promise for Next.js 15+
  const { id } = use(params);
  
  // Mock internship data (in real app, fetch based on id)
  const internship = {
    id: id,
    title: "Full Stack Developer Intern",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Remote",
    duration: "3 months",
    stipend: "$1500/month",
    posted: "2025-11-01",
    deadline: "2025-12-01",
    applicants: 127,
    openings: 5,
    status: "active",
    description: "We are looking for a passionate Full Stack Developer Intern to join our dynamic team. You will work on cutting-edge web applications using modern technologies and contribute to real-world projects that impact millions of users.",
    responsibilities: [
      "Develop and maintain web applications using React and Node.js",
      "Collaborate with designers and backend developers",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and team meetings",
      "Debug and fix issues in existing applications",
      "Learn and implement best practices in software development"
    ],
    requirements: [
      "Currently pursuing or recently completed degree in Computer Science or related field",
      "Strong knowledge of JavaScript, React, and Node.js",
      "Understanding of RESTful APIs and database design",
      "Familiarity with Git version control",
      "Good problem-solving skills",
      "Excellent communication and teamwork abilities"
    ],
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "Git", "REST APIs"],
    benefits: [
      "Work from anywhere with flexible hours",
      "Mentorship from experienced developers",
      "Opportunity to work on real projects",
      "Certificate of completion",
      "Potential for full-time conversion",
      "Access to company resources and tools"
    ]
  };

  // Mock applicants for this internship
  const applicants = [
    {
      id: 1,
      name: "John Doe",
      university: "MIT",
      year: "3rd Year",
      gpa: "3.8/4.0",
      appliedDate: "2025-11-08",
      status: "pending",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"]
    },
    {
      id: 2,
      name: "Jane Smith",
      university: "Stanford",
      year: "4th Year",
      gpa: "3.9/4.0",
      appliedDate: "2025-11-10",
      status: "pending",
      skills: ["Python", "React", "AWS", "Docker"]
    },
    {
      id: 3,
      name: "Mike Johnson",
      university: "Berkeley",
      year: "3rd Year",
      gpa: "3.7/4.0",
      appliedDate: "2025-11-05",
      status: "accepted",
      skills: ["JavaScript", "Vue.js", "Node.js", "MySQL"]
    }
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

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/company/dashboard" className="inline-flex items-center text-gray-400 hover:text-[#4cc9f0] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Internship Header */}
          <Card variant="glass" className="border-[#4cc9f0]/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-[#4cc9f0]/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-10 w-10 text-[#4cc9f0]" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{internship.title}</h1>
                      <p className="text-xl text-[#4cc9f0] font-semibold">{internship.company}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(
                        internship.status
                      )}`}
                    >
                      {internship.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-5 w-5 text-[#4cc9f0]" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-5 w-5 text-[#4cc9f0]" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <DollarSign className="h-5 w-5 text-[#4cc9f0]" />
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Briefcase className="h-5 w-5 text-[#4cc9f0]" />
                      <span>{internship.type}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="neon" size="lg">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Posting
                    </Button>
                    <Button variant="glass" size="lg">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Close Internship
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card variant="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Applicants</p>
                    <p className="text-3xl font-bold text-white">{internship.applicants}</p>
                  </div>
                  <Users className="h-8 w-8 text-[#00f5d4]" />
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Openings Left</p>
                    <p className="text-3xl font-bold text-white">{internship.openings}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-[#4cc9f0]" />
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Posted Date</p>
                    <p className="text-sm font-bold text-white">
                      {new Date(internship.posted).toLocaleDateString()}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-[#8a63ff]" />
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Deadline</p>
                    <p className="text-sm font-bold text-white">
                      {new Date(internship.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-[#f72585]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About the Internship */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>About the Internship</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{internship.description}</p>
            </CardContent>
          </Card>

          {/* Key Responsibilities */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#4cc9f0] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#4cc9f0] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {internship.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-lg text-[#4cc9f0] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                {internship.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#00f5d4]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-[#00f5d4]" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Applicants */}
          <Card variant="glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Applicants</CardTitle>
                  <p className="text-gray-400 text-sm mt-1">Latest applications for this internship</p>
                </div>
                <Button variant="neon">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Applicants
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicants.slice(0, 5).map((applicant) => (
                  <div
                    key={applicant.id}
                    className="p-4 bg-black/20 border border-gray-700 rounded-lg hover:border-[#4cc9f0]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{applicant.name}</h4>
                        <p className="text-sm text-gray-400">
                          {applicant.university} • {applicant.year} • GPA: {applicant.gpa}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                          applicant.status
                        )}`}
                      >
                        {applicant.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {applicant.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-full text-[#4cc9f0] text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Trend */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#00f5d4]" />
                Application Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-black/20 border border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Applications This Week</p>
                  <p className="text-3xl font-bold text-[#00f5d4]">42</p>
                  <p className="text-xs text-gray-500 mt-1">↑ 18% from last week</p>
                </div>
                <div className="p-4 bg-black/20 border border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Acceptance Rate</p>
                  <p className="text-3xl font-bold text-[#4cc9f0]">12%</p>
                  <p className="text-xs text-gray-500 mt-1">3 accepted out of 25 reviewed</p>
                </div>
                <div className="p-4 bg-black/20 border border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Avg Response Time</p>
                  <p className="text-3xl font-bold text-[#8a63ff]">2.5 days</p>
                  <p className="text-xs text-gray-500 mt-1">From application to decision</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
