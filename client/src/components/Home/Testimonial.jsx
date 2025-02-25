import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "ease-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "Emma L.",
      role: "Small Business Owner",
      quote:
        "Stylo Website Builder saved me hours of work! I was able to create a professional website for my boutique in just 30 minutes. The templates are beautiful, and the editing process is so easy!",
    },
    {
      id: 2,
      name: "James P.",
      role: "Freelancer",
      quote:
        "I've used other website builders, but none come close to the simplicity and power of Stylo. The real-time preview feature is a game-changer – I can see my edits live without any guesswork.",
    },
    {
      id: 3,
      name: "Sophia K.",
      role: "Travel Blogger",
      quote:
        "As someone with no technical skills, I was amazed at how quickly I created a blog that looks like it was made by a professional. Plus, it works perfectly on mobile!",
    },
    {
      id: 4,
      name: "David R.",
      role: "Startup Founder",
      quote:
        "Launching my startup's landing page was effortless with Stylo. The one-click deployment feature made going live a breeze, and the integrated analytics helped me track visitors right away.",
    },
    {
      id: 5,
      name: "Olivia H.",
      role: "Graphic Designer",
      quote:
        "The templates are so well-designed and modern that I barely needed to customize anything. My portfolio looks amazing, and clients are impressed!",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">
            Trusted by Thousands of Satisfied Users
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            See why people love using Stylo to build their perfect websites
          </p>
        </div>

        <div className="testimonial-slider px-2">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-3 py-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="p-6">
                    <div className="mb-4">
                      {/* Quote icon */}
                      <svg
                        className="h-8 w-8 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.867 3.944-4.867 5.951h4.872v9.898h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.571 9-10.609l.996 2.151c-2.433.917-4.868 3.944-4.868 5.951h4.872v9.898h-10z" />
                      </svg>
                    </div>
                    <p className="text-slate-700 mb-6 line-clamp-4">{review.quote}</p>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900">{review.name}</p>
                        <p className="text-xs text-slate-500">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;