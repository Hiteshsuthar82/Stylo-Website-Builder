import React from "react";
import review1 from "../../assets/review-1.jpeg";
import review3 from "../../assets/review-3.jpeg";
import review2 from "../../assets/review-2.jpeg";
import review4 from "../../assets/review-4.jpeg";
import review5 from "../../assets/review-5.jpeg";
import quotes1 from "../../assets/quotes1.png";
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
    speed: 3000,
    autoplaySpeed: 3500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
        },
      },
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "Emma L.",
      role: "Small Business Owner",
      image: review1,
      quote:
        "Stylo Website Builder saved me hours of work! I was able to create a professional website for my boutique in just 30 minutes. The templates are beautiful, and the editing process is so easy!",
    },
    {
      id: 2,
      name: "James P.",
      role: "Freelancer",
      image: review2,
      quote:
        "I've used other website builders, but none come close to the simplicity and power of Stylo. The real-time preview feature is a game-changer – I can see my edits live without any guesswork.",
    },
    {
      id: 3,
      name: "Sophia K.",
      role: "Travel Blogger",
      image: review3,
      quote:
        "As someone with no technical skills, I was amazed at how quickly I created a blog that looks like it was made by a professional. Plus, it works perfectly on mobile!",
    },
    {
      id: 4,
      name: "David R.",
      role: "Startup Founder",
      image: review4,
      quote:
        "Launching my startup's landing page was effortless with Stylo. The one-click deployment feature made going live a breeze, and the integrated analytics helped me track visitors right away.",
    },
    {
      id: 5,
      name: "Olivia H.",
      role: "Graphic Designer",
      image: review5,
      quote:
        "The templates are so well-designed and modern that I barely needed to customize anything. My portfolio looks amazing, and clients are impressed!",
    },
  ];

  return (
    <>
      <div className="max-w-screen-2xl mx-auto container bg-gradient-to-b from-white to-purple-300 md:px-16 px-6 py-14">
        <div className="text-center my-4">
          <h2 className="text-purple-700 font-bold md:text-3xl text-2xl">
            Hear What Our Happy Users Are Saying
          </h2>
        </div>
        <div className="slider-container px-2 py-6">
          <Slider {...settings} className="">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="relative bg-purple-100 border-2 border-spacing-x-20 border-black md:max-w-sm max-w-[280px] md:h-[360px] md:mx-8 mx-4 my-3 md:px-6 px-3 rounded-br-[70px] rounded-tl-[35px] rounded-lg py-8 "
              >
                <div className="">
                  <img src={quotes1} className="h-9" alt="" />
                </div>
                <div className="mb-6 md:px-6 pl-4">
                  <p className="italic ">{review.quote}</p>
                </div>
                <div className="flex md:flex-row flex-col items-center gap-4 mx-4 md:absolute md:bottom-10">
                  <div className=" border-2 rounded-full border-purple-800">
                    <img
                      src={review.image}
                      className="h-20 w-20 rounded-full"
                      alt="reviewer-image"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-semibold">{review.name}</h2>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Testimonial;
