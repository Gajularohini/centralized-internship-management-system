"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Edit,
  Save
} from "lucide-react";
import Link from "next/link";

export default function TeacherProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    department: "",
    employeeId: "",
    specialization: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        university: user.university || "",
        department: user.department || "",
        employeeId: user.employeeId || "",
        specialization: user.specialization || ""
      });
    }
  }, []);

  const handleSave = () => {
    // TODO: Add API call to update profile
    localStorage.setItem("userData", JSON.stringify(profileData));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/teacher/dashboard" 
            className="inline-flex items-center text-gray-400 hover:text-[#8a63ff] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <Card variant="purple" className="overflow-hidden">
            <CardHeader className="border-b border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-3xl mb-2">Teacher Profile</CardTitle>
                  <CardDescription>View and manage your profile information</CardDescription>
                </div>
                <Button 
                  variant="neonPurple" 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
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
            </CardHeader>

            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#8a63ff] flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        University/College
                      </label>
                      <Input
                        value={profileData.university}
                        onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#8a63ff] flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Professional Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Department
                      </label>
                      <Input
                        value={profileData.department}
                        onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Employee ID
                      </label>
                      <Input
                        value={profileData.employeeId}
                        onChange={(e) => setProfileData({ ...profileData, employeeId: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Specialization
                      </label>
                      <Input
                        value={profileData.specialization}
                        onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#8a63ff]">Performance Statistics</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card variant="glass">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-[#8a63ff]">24</div>
                        <div className="text-sm text-gray-400">Students Monitoring</div>
                      </CardContent>
                    </Card>
                    <Card variant="glass">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-[#4cc9f0]">156</div>
                        <div className="text-sm text-gray-400">Feedback Given</div>
                      </CardContent>
                    </Card>
                    <Card variant="glass">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl font-bold text-[#00f5d4]">85%</div>
                        <div className="text-sm text-gray-400">Avg Performance</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
