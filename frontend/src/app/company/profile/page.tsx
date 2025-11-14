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
  Briefcase,
  ArrowLeft,
  Edit,
  Save
} from "lucide-react";
import Link from "next/link";

export default function CompanyProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    companySize: "",
    website: "",
    contactPersonName: "",
    address: "",
    city: "",
    country: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        industry: user.industry || "",
        companySize: user.companySize || "",
        website: user.website || "",
        contactPersonName: user.contactPersonName || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || ""
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
            href="/company/dashboard" 
            className="inline-flex items-center text-gray-400 hover:text-[#4cc9f0] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <Card variant="glass" className="overflow-hidden border-[#4cc9f0]/30">
            <CardHeader className="border-b border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-3xl mb-2">Company Profile</CardTitle>
                  <CardDescription>View and manage your company profile information</CardDescription>
                </div>
                <Button 
                  variant="neon" 
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
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#4cc9f0] flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Company Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Company Name
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
                        <User className="h-4 w-4" />
                        Contact Person
                      </label>
                      <Input
                        value={profileData.contactPersonName}
                        onChange={(e) => setProfileData({ ...profileData, contactPersonName: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#4cc9f0] flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Additional Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Industry
                      </label>
                      <Input
                        value={profileData.industry}
                        onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Company Size
                      </label>
                      <Input
                        value={profileData.companySize}
                        onChange={(e) => setProfileData({ ...profileData, companySize: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Website
                      </label>
                      <Input
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Address
                      </label>
                      <Input
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        City
                      </label>
                      <Input
                        value={profileData.city}
                        onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Country
                      </label>
                      <Input
                        value={profileData.country}
                        onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-900/50" : ""}
                      />
                    </div>
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
