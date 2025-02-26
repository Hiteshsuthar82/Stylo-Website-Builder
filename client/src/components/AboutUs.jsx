"use client";

import React from "react";
import { Users, MapPin, Globe, Code, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const locations = [
  {
    title: "Bengaluru",
    totalUsers: 1203,
    activeUsers: 390,
    growthRate: "+15% MoM"
  },
  {
    title: "Surat",
    totalUsers: 1915,
    activeUsers: 983,
    growthRate: "+23% MoM"
  },
  {
    title: "Jaipur",
    totalUsers: 2179,
    activeUsers: 530,
    growthRate: "+18% MoM"
  },
];

const teamMembers = [
  {
    name: "Hitesh Suthar",
    image: "https://res.cloudinary.com/dno70sflf/image/upload/v1725797995/Resume_Builder/photos/xltqwg7sj2cgnmx2dh2t.jpg",
    position: "Group Leader",
    bio: "2+ years of experience in full stack web development.",
    social: {
      github: "https://github.com/Hiteshsuthar82",
      linkedin: "https://www.linkedin.com/in/hitesh-suthar-84b55b249/",
    }
  },
  {
    name: "Kamlesh Suthar",
    image: "https://res.cloudinary.com/dno70sflf/image/upload/v1725798194/Resume_Builder/photos/s81w73ac0qgoejtye6uw.png",
    position: "Group Member",
    bio: "Expert in building designing using modern web frameworks like React js.",
    social: {
      github: "https://github.com/KamleshSuthar13",
      linkedin: "https://www.linkedin.com/in/kamlesh-suthar-85255b249/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    }
  },
  {
    name: "Chandan Polai",
    image: "https://res.cloudinary.com/dno70sflf/image/upload/v1725797170/Resume_Builder/photos/v8uw9faq3ezl4hkfo0dt.png",
    position: "Group Member",
    bio: "6+ months of experience in full stack web development.",
    social: {
      github: "https://github.com/chandanpolai",
      linkedin: "https://linkedin.com/in/chandanpolai",
    }
  },
  {
    name: "Vivek Paradva",
    image: "https://res.cloudinary.com/dno70sflf/image/upload/v1725797771/Resume_Builder/photos/tvkkuieqvbmqzmdoixud.png",
    position: "Group Member",
    bio: "Expert in building designing using modern web frameworks like React js.",
    social: {
      github: "https://github.com/vivekparadva",
      linkedin: "https://linkedin.com/in/vivekparadva",
    }
  },
  {
    name: "Pradip Rajput",
    image: "https://res.cloudinary.com/dn5occ53n/image/upload/v1740553441/Screenshot_227_d1hkqd.png",
    position: "Group Member",
    bio: "....",
    social: {
      github: "https://github.com/adityasharma",
      linkedin: "https://linkedin.com/in/adityasharma",
    }
  }
];

const stats = [
  { 
    icon: <Users className="h-6 w-6 text-slate-600" />,
    title: "50+", 
    description: "Active users worldwide" 
  },
  { 
    icon: <Globe className="h-6 w-6 text-slate-600" />,
    title: "2+", 
    description: "Countries with Stylo users" 
  },
  { 
    icon: <Code className="h-6 w-6 text-slate-600" />,
    title: "100+", 
    description: "Websites built with Stylo" 
  },
  { 
    icon: <Zap className="h-6 w-6 text-slate-600" />,
    title: "99.9%", 
    description: "Uptime for our services" 
  }
];

const values = [
  {
    title: "User-Centric Design",
    description: "We build everything with the user experience at the forefront."
  },
  {
    title: "Continuous Innovation",
    description: "We're always pushing boundaries to deliver cutting-edge solutions."
  },
  {
    title: "Global Collaboration",
    description: "Our diverse team brings perspectives from across the world."
  },
  {
    title: "Quality First",
    description: "We never compromise on the quality of our products and services."
  }
];

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80')] bg-cover bg-center opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 py-24 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 text-slate-700 font-medium text-sm">
              About Stylo Website Builder
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl leading-tight">
              Empowering Creators Worldwide
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Stylo is more than just a website builder – it's a creative platform designed to bring your digital vision to life with unparalleled ease and flexibility.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:shadow-lg transition-all duration-300 bg-white">
                <div className="p-3 rounded-full bg-slate-50">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.title}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 text-slate-700 font-medium text-sm">
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-gray-900">From Idea to Global Platform</h2>
              <p className="text-lg text-gray-600">
                What started as a simple tool for our own projects has evolved into a powerful platform used by creators worldwide. Founded in 2020, Stylo was built on the principle that website creation should be accessible to everyone, regardless of technical ability.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to have helped millions of users bring their ideas to life through beautiful, functional websites. Our journey is just beginning, and we're excited to continue innovating and expanding our platform.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-500 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Our team working" 
                className="relative z-10 rounded-xl shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-sm">
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900">What We Stand For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do at Stylo, from product development to customer support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-slate-600 text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 text-slate-700 font-medium text-sm">
              Global Presence
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Where Our Users Are</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our users span the globe, but these cities represent our strongest communities.
            </p>
          </div>
          <div className="relative mb-12">
            <img
              className="w-full rounded-xl shadow-lg h-96 object-cover"
              src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
              alt="Global map of Stylo users"
            />
            {locations.map((location, index) => (
              <div 
                key={location.title} 
                className="absolute bg-white p-4 rounded-xl shadow-lg"
                style={{
                  top: index === 0 ? '30%' : index === 1 ? '50%' : '60%',
                  left: index === 0 ? '70%' : index === 1 ? '30%' : '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-slate-600" />
                  <span className="font-bold">{location.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div
                key={location.title}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <MapPin className="h-6 w-6 text-slate-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{location.title}</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Total Users:</span>
                    <span className="font-semibold">{location.totalUsers.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Active Users:</span>
                    <span className="font-semibold">{location.activeUsers.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Growth:</span>
                    <span className="font-semibold text-green-600">{location.growthRate}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 text-slate-700 font-medium text-sm">
              Our Team
            </div>
            <h2 className="text-4xl font-bold text-gray-900">The People Behind Stylo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're a diverse team of designers, developers, and creatives passionate about building the best website creation platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name} 
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex justify-center space-x-4">
                        {Object.keys(member.social).map((platform) => (
                          <a 
                            key={platform} 
                            href={member.social[platform]} 
                            target="_blank"
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                          >
                            <span className="text-white text-xs">{platform==="github" ? <FaGithub size={22}/> : <FaLinkedin size={22}/>}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-slate-600 mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="bg-slate-600 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-12 lg:p-16 space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-500 text-white font-medium text-sm">
                  Join Our Team
                </div>
                <h2 className="text-4xl font-bold text-white">We're Just Getting Started</h2>
                <p className="text-slate-100 text-lg">
                  Join our team of passionate individuals who are reshaping the future of website creation. We're always looking for talented people to help us push the boundaries of what's possible.
                </p>
                <button
                  onClick={() => navigate("/careers")}
                  type="button"
                  className="rounded-lg bg-white px-5 py-3 text-base font-semibold text-slate-600 shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View Open Positions
                </button>
              </div>
              <div className="relative h-96 md:h-full">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80"
                  alt="Team collaboration"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;