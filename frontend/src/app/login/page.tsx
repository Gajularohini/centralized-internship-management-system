"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const roles = [
    {
      title: "Student",
      description: "Apply for internships and track your progress",
      icon: GraduationCap,
      color: "#00f5d4",
      href: "/student/login",
      features: [
        "Browse internship opportunities",
        "Submit daily/weekly tasks",
        "Track application status",
        "Receive feedback"
      ]
    },
    {
      title: "Teacher",
      description: "Monitor and evaluate student performance",
      icon: BookOpen,
      color: "#8a63ff",
      href: "/teacher/login",
      features: [
        "Track student progress",
        "Review task submissions",
        "Provide feedback & ratings",
        "Generate reports"
      ]
    },
    {
      title: "Company",
      description: "Post internships and manage applicants",
      icon: Briefcase,
      color: "#4cc9f0",
      href: "/company/login",
      features: [
        "Post internship opportunities",
        "Review applications",
        "Assign tasks to interns",
        "Track performance"
      ]
    }
  ];

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#00f5d4]/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-[28rem] h-[28rem] bg-[#8a63ff]/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Choose Your Role</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select how you want to access the Internship Management System
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link href={role.href}>
                <Card 
                  variant="glass" 
                  className="h-full hover:scale-105 transition-all duration-300 group cursor-pointer"
                  style={{
                    borderColor: `${role.color}30`,
                    boxShadow: `0 0 30px ${role.color}15`
                  }}
                >
                  <CardHeader>
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `${role.color}20`,
                        boxShadow: `0 0 20px ${role.color}30`
                      }}
                    >
                      <role.icon 
                        className="h-8 w-8" 
                        style={{ color: role.color }}
                      />
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:opacity-80 transition-opacity">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-2">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: role.color }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="neon" 
                      className="w-full group-hover:scale-105 transition-transform"
                      style={{
                        background: `linear-gradient(135deg, ${role.color}20, ${role.color}10)`,
                        borderColor: role.color,
                        color: role.color
                      }}
                    >
                      Login as {role.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/">
            <Button variant="glass" size="lg">
              ← Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
