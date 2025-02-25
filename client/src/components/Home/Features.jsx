import React from "react";
import nocode from "../../assets/no-code.png";
import edit from "../../assets/edit.png";
import template from "../../assets/windows.png";
import devices from "../../assets/devices.png";
import cloud from "../../assets/cloud.png";
import email from "../../assets/email.png";

const Features = () => {
  const features = [
    {
      title: "Pre-Designed Templates",
      description:
        "Choose from a variety of professional templates for different website types, making the setup quick and easy.",
      image: template,
      alt: "template-image",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Real-Time Editing",
      description:
        "Edit content instantly with a live preview, ensuring seamless customization without delays.",
      image: edit,
      alt: "edit-image",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "No Coding Required",
      description:
        "Create and customize your website without any technical skills, making it accessible for everyone.",
      image: nocode,
      alt: "nocode-image",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Fast Deployment",
      description:
        "Publish your site instantly with just one click, using GitHub and Vercel for reliable hosting.",
      image: cloud,
      alt: "cloud-image",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    },
    {
      title: "Multi-Device Responsiveness",
      description:
        "Websites automatically adjust to look perfect on desktops and mobile devices.",
      image: devices,
      alt: "devices-image",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
    {
      title: "Email Integration",
      description:
        "customer can contact with website owener by filling contact form.",
      image: email,
      alt: "devices-image",
      color: "bg-gradient-to-br from-slate-500 to-teal-600",
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Why Choose Stylo Web Builder?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Build stunning websites with features designed for everyone.
          </p>
          <div className="mt-4 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="p-6">
                <div className="flex items-center mb-5">
                  <div
                    className={`p-3 rounded-lg ${feature.color} transform transition-transform group-hover:scale-110`}
                  >
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-slate-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
