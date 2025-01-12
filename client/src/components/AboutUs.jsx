"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const locations = [
  {
    title: "Bengaluru",
    timings: "total users : 1203",
    address: "active users : 390",
  },
  {
    title: "Surat",
    timings: "total users : 1915",
    address: "active users : 983",
  },
  {
    title: "Jaipur",
    timings: "total users : 2179",
    address: "active users : 530",
  },
];

const users = [
  {
    name: "Hitesh Suthar",
    image:
      "https://res.cloudinary.com/dno70sflf/image/upload/v1725797995/Resume_Builder/photos/xltqwg7sj2cgnmx2dh2t.jpg",
    // 'https://res.cloudinary.com/dno70sflf/image/upload/v1725797033/Resume_Builder/photos/pbacuqkk1pjkkn29bcwm.jpg',
    position: "Group Leader",
  },
  {
    name: "Kamlesh Suthar",
    image:
      "https://res.cloudinary.com/dno70sflf/image/upload/v1725798194/Resume_Builder/photos/s81w73ac0qgoejtye6uw.png",
    // 'https://res.cloudinary.com/dno70sflf/image/upload/v1725797915/Resume_Builder/photos/qv6h1exx3p6fn02v4cof.png',
    position: "Group Member",
  },
  {
    name: "Chandan Polai",
    image:
      "https://res.cloudinary.com/dno70sflf/image/upload/v1725797170/Resume_Builder/photos/v8uw9faq3ezl4hkfo0dt.png",
    position: "Group Member",
  },
  {
    name: "Vivek Paradva",
    image:
      "https://res.cloudinary.com/dno70sflf/image/upload/v1725797771/Resume_Builder/photos/tvkkuieqvbmqzmdoixud.png",
    // 'https://res.cloudinary.com/dno70sflf/image/upload/v1725797660/Resume_Builder/photos/hw27smyp4wtfke1cohwi.png',
    position: "Group Member",
  },
];

function AboutPageOne() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-xs font-semibold leading-normal md:text-sm">
              About the company
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
            Made with love, right here in India
          </p>
          <p className="max-w-4xl text-base text-gray-600 md:text-xl">
            Our users is from accross the world but here we have pined three top
            cities, from that cieties out most active users are belong?
          </p>
        </div>
        <div className="w-full space-y-4">
          <img
            className="h-[200px] w-full rounded-xl object-cover md:h-full"
            src="https://dev-ui-image-assets.s3.ap-south-1.amazonaws.com/google-map.jpg"
            alt=""
          />
        </div>
        {/* locations */}
        <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
          {locations.map((location) => (
            <div
              key={location.title}
              className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
            >
              <MapPin className="h-5 w-5" />
              <p className="w-full text-xl font-semibold  text-gray-900">
                {location.title}
              </p>
              <p className="w-full text-base text-gray-700">
                {location.timings}
              </p>
              <p className="text-sm font-medium">{location.address}</p>
            </div>
          ))}
        </div>
        <hr className="mt-20" />
        {/* greetings */}
        <div className="mt-16 flex items-center">
          <div className="space-y-6 md:w-3/4">
            <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
              <p className="text-xs font-semibold leading-normal md:text-sm">
                Join Us &rarr;
              </p>
            </div>
            <p className="text-3xl font-bold text-gray-900 md:text-4xl">
              Meet our team
            </p>
            <p className="max-w-4xl text-base text-gray-700 md:text-xl">
              Our philosophy is simple — hire a team of diverse, passionate
              people and foster a culture that empowers you to do your best
              work.
            </p>
            <div></div>
          </div>
        </div>
        {/* TEAM */}
        <div className="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
          {users.map((user) => (
            <div className="rounded-md border" key={user.name}>
              <img
                src={user.image}
                alt={user.name}
                className="h-[300px] w-full rounded-lg object-cover "
              />
              <p className="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
                {user.name}
              </p>
              <p className="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
                {user.position}
              </p>
            </div>
          ))}
        </div>
        {/* Hiring Banner */}
        <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
          <div className="space-y-6">
            <p className="text-sm font-semibold md:text-base">
              Join our team &rarr;
            </p>
            <p className="text-3xl font-bold md:text-4xl">
              We&apos;re just getting started
            </p>
            <p className="text-base text-gray-600 md:text-lg">
              Our philosophy is simple — create a team of some interested,
              intelegint, passionate people and foster a culture that empowers
              you to do your best work.
            </p>
            <button
              onClick={() => navigate("/steps")}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Join Now
            </button>
          </div>
          <div className="md:mt-o mt-10 w-full">
            <img
              src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              alt="Getting Started"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <hr className="mt-6" />
    </div>
  );
}

export default AboutPageOne;
