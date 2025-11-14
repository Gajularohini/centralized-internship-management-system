"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  Award,
  Code,
  FileText,
  Edit,
  Save,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Star,
  Github,
  Linkedin,
  Globe,
  Upload
} from "lucide-react";
import Link from "next/link";

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    university: string;
    rollNumber: string;
    department: string;
    year: string;
    semester: string;
    location: string;
    bio: string;
    skills: string[];
    achievements: string[];
    projects: Array<{ title: string; link: string; description: string; tech: string[] }>;
    socialLinks: {
      github: string;
      linkedin: string;
      portfolio: string;
    };
  }>({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    rollNumber: "",
    department: "",
    year: "",
    semester: "",
    location: "",
    bio: "",
    skills: [],
    achievements: [],
    projects: [],
    socialLinks: {
      github: "",
      linkedin: "",
      portfolio: ""
    }
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setProfileData({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        university: user.university || "",
        rollNumber: user.rollNumber || "",
        department: user.department || "",
        year: user.year ? `${user.year}${user.year === 1 ? 'st' : user.year === 2 ? 'nd' : user.year === 3 ? 'rd' : 'th'} Year` : "",
        semester: user.semester ? `Semester ${user.semester}` : "",
        location: "",
        bio: "Passionate computer science student looking for internship opportunities",
        skills: [],
        achievements: [],
        projects: [],
        socialLinks: {
          github: "",
          linkedin: "",
          portfolio: ""
        }
      });
    }
  }, []);

  const handleSave = () => {
    // TODO: Implement API call to save profile
    console.log("Profile saved:", profileData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const stats = [
    { label: "Internships Applied", value: "12", icon: Briefcase },
    { label: "Tasks Completed", value: "24", icon: FileText },
    { label: "Feedback Received", value: "8", icon: Star },
    { label: "Skills Acquired", value: "15+", icon: Code }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/student/dashboard" className="inline-flex items-center text-gray-400 hover:text-[#00f5d4] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Profile Header */}
          <Card variant="glass">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#00f5d4] to-[#4cc9f0] flex items-center justify-center">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  {isEditing && (
                    <Button variant="glass" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 w-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {isEditing ? (
                        <Input
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="text-3xl font-bold mb-2"
                        />
                      ) : (
                        <h1 className="text-3xl font-bold text-white mb-2">{profileData.fullName}</h1>
                      )}
                      <p className="text-[#00f5d4] text-lg">{profileData.department} • {profileData.year}</p>
                    </div>
                    <Button
                      variant={isEditing ? "neon" : "glass"}
                      onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="h-5 w-5 text-[#4cc9f0]" />
                      {isEditing ? (
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      ) : (
                        <span>{profileData.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="h-5 w-5 text-[#4cc9f0]" />
                      {isEditing ? (
                        <Input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      ) : (
                        <span>{profileData.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Building2 className="h-5 w-5 text-[#4cc9f0]" />
                      <span>{profileData.university}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="h-5 w-5 text-[#4cc9f0]" />
                      {isEditing ? (
                        <Input
                          value={profileData.location}
                          onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        />
                      ) : (
                        <span>{profileData.location}</span>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={profileData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Github className="h-5 w-5 text-gray-400" />
                    </a>
                    <a
                      href={profileData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-gray-400" />
                    </a>
                    <a
                      href={profileData.socialLinks.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Globe className="h-5 w-5 text-gray-400" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-6 w-6 text-[#00f5d4]" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* About Me */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#00f5d4]/50 min-h-[100px]"
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-[#00f5d4]" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {profileData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#4cc9f0]/10 border border-[#4cc9f0]/30 rounded-lg text-[#4cc9f0] font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {isEditing && (
                  <Button variant="glass" size="sm">
                    + Add Skill
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#00f5d4]" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {profileData.projects.map((project, index) => (
                <div key={index} className="p-4 bg-black/20 border border-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f5d4] hover:underline text-sm"
                    >
                      View Project →
                    </a>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#00f5d4]/10 border border-[#00f5d4]/30 rounded-full text-[#00f5d4] text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {isEditing && (
                <Button variant="glass" className="w-full">
                  + Add Project
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#00f5d4]" />
                Achievements & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {profileData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#00f5d4]/20 flex items-center justify-center flex-shrink-0">
                      <Star className="h-4 w-4 text-[#00f5d4]" />
                    </div>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
                {isEditing && (
                  <Button variant="glass" size="sm" className="mt-4">
                    + Add Achievement
                  </Button>
                )}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
