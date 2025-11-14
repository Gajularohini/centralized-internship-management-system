"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Building2,
  BookOpen,
  Mail,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";
import Link from "next/link";

/**
 * Hero Section Component
 */
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
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

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <div className="glass px-6 py-3 rounded-full border border-[#4cc9f0]/30">
              <span className="text-[#4cc9f0] font-semibold">🚀 Revolutionizing Internship Management</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            <span className="gradient-text">Centralized</span>
            <br />
            <span className="text-white">Internship Management</span>
            <br />
            <span className="gradient-text">System</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            A unified platform connecting <span className="text-[#00f5d4] font-semibold">Students</span>, 
            <span className="text-[#8a63ff] font-semibold"> Teachers</span>, and 
            <span className="text-[#4cc9f0] font-semibold"> Companies</span> for seamless internship tracking, 
            evaluation, and communication.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link href="/login">
              <Button variant="neon" size="xl" className="group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#dashboards">
              <Button variant="glass" size="xl">
                View Dashboards
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-16"
          >
            {[
              { icon: Users, label: "Active Users", value: "5000+" },
              { icon: Briefcase, label: "Internships", value: "1200+" },
              { icon: Building2, label: "Companies", value: "300+" }
            ].map((stat, index) => (
              <div key={index} className="glass p-6 rounded-2xl">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-[#4cc9f0]" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * About Section Component
 */
const AboutSection = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "For Students",
      description: "Apply, upload tasks, track progress",
      points: [
        "Browse and apply for internships",
        "Upload daily/weekly work submissions",
        "Receive feedback from teachers & companies",
        "Track application status in real-time",
        "Build your professional profile"
      ],
      color: "#00f5d4"
    },
    {
      icon: BookOpen,
      title: "For Teachers",
      description: "Monitor, evaluate, approve work",
      points: [
        "Track student internship performance",
        "Review and approve task submissions",
        "Provide detailed feedback & ratings",
        "Generate progress reports",
        "Communicate with students & companies"
      ],
      color: "#8a63ff"
    },
    {
      icon: Briefcase,
      title: "For Companies",
      description: "Post internships, review applicants, give feedback",
      points: [
        "Post internship opportunities",
        "Review and manage applications",
        "Assign tasks to interns",
        "Provide ratings & feedback",
        "Track intern progress & performance"
      ],
      color: "#4cc9f0"
    }
  ];

  return (
    <section id="about" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">What is a Centralized</span>
            <br />
            <span className="text-white">Internship Management System?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A single, powerful platform where students, faculty, and companies manage internships seamlessly. 
            Experience streamlined workflows, real-time collaboration, and comprehensive tracking—all in one place.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card 
                variant="glass" 
                className="h-full hover:scale-105 transition-transform duration-300 group"
                style={{
                  borderColor: `${feature.color}30`,
                  boxShadow: `0 0 30px ${feature.color}15`
                }}
              >
                <CardHeader>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: `${feature.color}20`,
                      boxShadow: `0 0 20px ${feature.color}30`
                    }}
                  >
                    <feature.icon 
                      className="h-8 w-8" 
                      style={{ color: feature.color }}
                    />
                  </div>
                  <CardTitle className="text-2xl text-white group-hover:text-[#4cc9f0] transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 
                          className="h-5 w-5 mt-0.5 flex-shrink-0" 
                          style={{ color: feature.color }}
                        />
                        <span className="text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-12 rounded-3xl"
        >
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
            Platform Highlights
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, text: "One dashboard for all roles" },
              { icon: Briefcase, text: "Easy internship posting & application" },
              { icon: FileCheck, text: "Real-time work submission by students" },
              { icon: MessageSquare, text: "Feedback & evaluation tools" },
              { icon: Mail, text: "Notifications & messaging" },
              { icon: TrendingUp, text: "Analytics & reporting" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#4cc9f0]/20 flex items-center justify-center group-hover:bg-[#4cc9f0]/30 transition-colors">
                  <item.icon className="h-6 w-6 text-[#4cc9f0]" />
                </div>
                <span className="text-gray-200 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Footer Component
 */
const Footer = () => {
  return (
    <footer className="relative py-16 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Internship Management System
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering students, teachers, and companies with seamless internship management and collaboration.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Github className="h-5 w-5 text-gray-400" />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Twitter className="h-5 w-5 text-gray-400" />
              </a>
              <a href="https://linkedin.com" className="w-10 h-10 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="h-5 w-5 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Contact", "Login"].map((link) => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-[#4cc9f0] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">For Users</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/student/login" className="text-gray-400 hover:text-[#00f5d4] transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/teacher/login" className="text-gray-400 hover:text-[#8a63ff] transition-colors">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link href="/company/login" className="text-gray-400 hover:text-[#4cc9f0] transition-colors">
                  Company Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Internship Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

/**
 * Main Home Page
 */
export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
