"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InternshipDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resume: null as File | null,
    portfolio: "",
    availability: ""
  });

  // Mock internship data (in real app, fetch based on params.id)
  const internship = {
    id: params.id,
    title: "Full Stack Developer Intern",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Remote",
    duration: "3 months",
    stipend: "$1500/month",
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
    ],
    posted: "2 days ago",
    deadline: "2025-12-01",
    openings: 5,
    applicants: 127,
    status: "open"
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData({ ...applicationData, resume: e.target.files[0] });
    }
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API call to submit application
    console.log("Application submitted:", applicationData);
    
    alert("Application submitted successfully! You will be notified about the status.");
    router.push("/student/dashboard");
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/student/dashboard" className="inline-flex items-center text-gray-400 hover:text-[#00f5d4] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Internship Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="glass" className="mb-6">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-[#00f5d4]/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-10 w-10 text-[#00f5d4]" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{internship.title}</h1>
                      <p className="text-xl text-[#00f5d4] font-semibold">{internship.company}</p>
                    </div>
                    <span className="px-4 py-2 rounded-full text-sm font-medium border bg-green-500/20 text-green-400 border-green-500/30">
                      {internship.openings} OPENINGS
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
                      <Calendar className="h-5 w-5 text-[#4cc9f0]" />
                      <span>{new Date(internship.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {internship.applicants} applicants
                    </span>
                    <span>•</span>
                    <span>Posted {internship.posted}</span>
                    <span>•</span>
                    <span className="text-[#00f5d4]">{internship.type}</span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="neon"
                      size="lg"
                      onClick={() => setShowApplicationForm(!showApplicationForm)}
                    >
                      {showApplicationForm ? "Hide Application Form" : "Apply Now"}
                    </Button>
                    <Button variant="glass" size="lg">
                      Save for Later
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Form */}
          {showApplicationForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glass" className="mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#00f5d4]">Submit Your Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitApplication} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Cover Letter</label>
                      <textarea
                        className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00f5d4]/50 min-h-[150px]"
                        placeholder="Tell us why you're a great fit for this internship..."
                        value={applicationData.coverLetter}
                        onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Resume/CV (PDF)</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="resume-upload"
                          required
                        />
                        <label
                          htmlFor="resume-upload"
                          className="flex items-center justify-center gap-3 w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-8 text-gray-400 hover:border-[#00f5d4]/50 cursor-pointer transition-colors"
                        >
                          <Upload className="h-6 w-6" />
                          <span>
                            {applicationData.resume
                              ? applicationData.resume.name
                              : "Click to upload your resume (PDF only)"}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Portfolio/GitHub Link (Optional)
                      </label>
                      <Input
                        type="url"
                        placeholder="https://github.com/yourusername"
                        value={applicationData.portfolio}
                        onChange={(e) => setApplicationData({ ...applicationData, portfolio: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Availability</label>
                      <Input
                        type="text"
                        placeholder="e.g., Immediately / After December 2025"
                        value={applicationData.availability}
                        onChange={(e) => setApplicationData({ ...applicationData, availability: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" variant="neon" size="lg" className="flex-1">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Submit Application
                      </Button>
                      <Button
                        type="button"
                        variant="glass"
                        size="lg"
                        onClick={() => setShowApplicationForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* About the Internship */}
          <Card variant="glass" className="mb-6">
            <CardHeader>
              <CardTitle>About the Internship</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{internship.description}</p>
            </CardContent>
          </Card>

          {/* Key Responsibilities */}
          <Card variant="glass" className="mb-6">
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#00f5d4] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card variant="glass" className="mb-6">
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
          <Card variant="glass" className="mb-6">
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
              <CardTitle>What You'll Gain</CardTitle>
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
        </motion.div>
      </div>
    </div>
  );
}
