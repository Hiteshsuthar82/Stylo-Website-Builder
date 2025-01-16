import React from "react";
import nocode from "../../assets/no-code.png"
import edit from "../../assets/edit.png"
import template from "../../assets/windows.png";
import devices from "../../assets/devices.png";
import cloud from "../../assets/cloud.png";

const Features = () => {
  const features = [
    {
      title: "Pre-Designed Templatess",
      description:
        "Choose from a variety of professional templates for different website types, making the setup quick and easy.",
      image: template,
      alt: "template-image",
    },
    {
      title: "Real-Time Editing",
      description:
        "Edit content instantly with a live preview, ensuring seamless customization without delays.",
      image: edit,
      alt: "edit-image",
    },
    {
      title: "No Coding Required",
      description:
        "Create and customize your website without any technical skills, making it accessible for everyone.",
      image: nocode,
      alt: "nocode-image",
    },
    {
      title: "Fast Deployment",
      description:
        "Publish your site instantly with just one click, using GitHub and Vercel for reliable hosting.",
      image: cloud,
      alt: "cloud-image",
    },
    {
      title: "Multi-Device Responsiveness",
      description:
        "Websites automatically adjust to look perfect on desktops and mobile devices.",
      image: devices,
      alt: "devices-image",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto container md:px-16 px-6 py-14  ">
      <div className="text-center space-y-1 my-4">
        <h2 className="text-purple-700 font-bold md:text-3xl text-2xl">
          Why Choose Stylo Web Builder?
        </h2>
        <p className="md:text-lg text-base font-semibold">
          Build stunning websites with features designed for everyone.
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center md:p-6 p-2 border rounded-2xl shadow-xl"
          >
            <div className="rounded-2xl md:w-24 w-16 bg-white border border-purple-500 p-3 shadow-2xl shadow-purple-600">
              <img src={feature.image} alt={feature.alt} />
            </div>
            <div className="text-center mt-4 space-y-2">
              <h2 className="text-xl font-semibold">
                {feature.title}
              </h2>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
