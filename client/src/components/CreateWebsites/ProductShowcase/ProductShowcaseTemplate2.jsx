import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  TrashIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";
import Popup from "../../Popup";

const ProductShowcaseTemplate2 = ({ data, onUpdate, editable = false }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [isAddingSpec, setIsAddingSpec] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleUpdate = (section, key, value, index = null) => {
    if (index !== null) {
      const updatedData = {
        ...data,
        [section]: {
          ...data[section],
          items: data[section].items.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
          ),
        },
      };
      onUpdate(updatedData);
      return;
    }

    const updatedData = {
      ...data,
      [section]: {
        ...data[section],
        [key]: value,
      },
    };
    onUpdate(updatedData);
  };

  const handleAddSpecification = (newData) => {
    const updatedSpecs = { ...data.details.specifications };
    updatedSpecs[newData.key] = newData.value;
    handleUpdate("details", "specifications", updatedSpecs);
    setIsAddingSpec(false);
  };

  const removeSpecification = (key) => {
    const updatedSpecs = { ...data.details.specifications };
    delete updatedSpecs[key];
    handleUpdate("details", "specifications", updatedSpecs);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Gallery navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.details.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.details.gallery.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="font-sans bg-slate-900 text-white">
      {/* Header */}
      <header className="fixed w-full z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex justify-between items-center">
            {data.header.logoType === "text" ? (
              <h1 className="text-3xl py-2 font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                <EditableText
                  editable={editable}
                  text={data.header.logoText}
                  onChange={(value) =>
                    handleUpdate("header", "logoText", value)
                  }
                />
              </h1>
            ) : (
              <ImageUpload
                editable={editable}
                src={data.header.logoImage}
                alt="Profile"
                className="h-12"
                containerClass="relative"
                onUpload={(imageUrl) =>
                  handleUpdate("header", "logoImage", imageUrl)
                }
              />
            )}
            <nav className="hidden md:flex space-x-8">
              {data.header.items.map((item, index) => (
                <a
                  key={index}
                  onClick={(e) => handleNavClick(e, item.id)}
                  href={`#${item.id}`}
                  className="text-slate-300 hover:text-purple-400 transition-colors"
                >
                  <EditableText
                    editable={editable}
                    text={item.label}
                    onChange={(value) => {
                      const updatedNav = [...data.header.items];
                      updatedNav[index] = {
                        ...updatedNav[index],
                        label: value,
                      };
                      handleUpdate("header", "items", updatedNav);
                    }}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-purple-400 text-lg font-semibold mb-4 block">
                  Introducing
                </span>
                <h1 className="text-6xl font-bold leading-tight mb-6">
                  <EditableText
                    editable={editable}
                    text={data.hero.title}
                    onChange={(value) => handleUpdate("hero", "title", value)}
                  />
                </h1>
                <p className="text-xl text-slate-400 mb-8">
                  <EditableText
                    editable={editable}
                    text={data.hero.subtitle}
                    onChange={(value) =>
                      handleUpdate("hero", "subtitle", value)
                    }
                  />
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={!editable ? "#contact" : ""}
                    onClick={(e) =>
                      handleNavClick(e, !editable ? "contact" : "")
                    }
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-center hover:opacity-90 transition-opacity"
                  >
                    <EditableText
                      editable={editable}
                      text={data.hero.primaryCta}
                      onChange={(value) =>
                        handleUpdate("hero", "primaryCta", value)
                      }
                    />
                  </a>
                  <a
                    href={!editable ? "#details" : ""}
                    onClick={(e) =>
                      handleNavClick(e, !editable ? "details" : "")
                    }
                    className="px-8 py-4 border border-purple-500 rounded-full text-center hover:bg-purple-500/10 transition-colors"
                  >
                    <EditableText
                      editable={editable}
                      text={data.hero.secondaryCta}
                      onChange={(value) =>
                        handleUpdate("hero", "secondaryCta", value)
                      }
                    />
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20"></div>
                <ImageUpload
                  editable={editable}
                  src={data.hero.productImage}
                  alt="Product Image"
                  className="w-full rounded-3xl relative z-10"
                  containerClass="relative"
                  onUpload={(imageUrl) =>
                    handleUpdate("hero", "productImage", imageUrl)
                  }
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section id="details" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <div className="sticky top-24">
                {/* Image Slider */}
                <div className="relative group">
                  {/* Main Image Container */}
                  <div className="relative rounded-2xl bg-slate-900">
                    <div className="h-96">
                      {" "}
                      {/* Fixed height container */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="h-full"
                        >
                          <ImageUpload
                            editable={editable}
                            src={data.details.gallery[currentImageIndex]}
                            alt={`Product Gallery ${currentImageIndex + 1}`}
                            className="w-full h-full object-contain"
                            containerClass="h-full"
                            onUpload={(imageUrl) => {
                              const updatedGallery = [...data.details.gallery];
                              updatedGallery[currentImageIndex] = imageUrl;
                              handleUpdate(
                                "details",
                                "gallery",
                                updatedGallery
                              );
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>
                      {/* Navigation Buttons */}
                      <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <ChevronLeftIcon size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <ChevronRightIcon size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="flex justify-center mt-4 gap-2">
                    {data.details.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index
                            ? "bg-purple-500 w-8"
                            : "bg-slate-600 hover:bg-slate-500"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {data.details.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`relative rounded-lg overflow-hidden aspect-video ${
                          currentImageIndex === index
                            ? "ring-2 ring-purple-500"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="space-y-8">
                <div className="inline-flex rounded-full bg-purple-500/10 p-1">
                  {["description", "specifications"].map((tab) => (
                    <button
                      key={tab}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-purple-500 text-white"
                          : "text-purple-400 hover:text-purple-300"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <p className="text-slate-300 text-lg">
                        <EditableText
                          editable={editable}
                          text={data.details.description}
                          onChange={(value) =>
                            handleUpdate("details", "description", value)
                          }
                        />
                      </p>
                      <div className="grid gap-4">
                        {data.details.keyFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 bg-slate-700/50 p-4 rounded-xl"
                          >
                            <ChevronRightIcon
                              className="text-purple-400"
                              size={20}
                            />
                            <EditableText
                              editable={editable}
                              text={feature}
                              onChange={(value) => {
                                const updatedFeatures = [
                                  ...data.details.keyFeatures,
                                ];
                                updatedFeatures[index] = value;
                                handleUpdate(
                                  "details",
                                  "keyFeatures",
                                  updatedFeatures
                                );
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "specifications" && (
                    <motion.div
                      key="specifications"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {Object.entries(data.details.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center bg-slate-700/50 p-4 rounded-xl"
                          >
                            <span className="text-slate-300">{key}</span>
                            <div className="flex items-center gap-3">
                              <EditableText
                                editable={editable}
                                text={value}
                                onChange={(newValue) => {
                                  const updatedSpecs = {
                                    ...data.details.specifications,
                                    [key]: newValue,
                                  };
                                  handleUpdate(
                                    "details",
                                    "specifications",
                                    updatedSpecs
                                  );
                                }}
                              />
                              {editable && (
                                <button
                                  onClick={() => removeSpecification(key)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <TrashIcon size={18} />
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      )}

                      {editable && !isAddingSpec && (
                        <button
                          onClick={() => setIsAddingSpec(true)}
                          className="w-full flex items-center justify-center p-4 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-colors"
                        >
                          <PlusIcon className="mr-2" size={20} /> Add
                          Specification
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <EditableText
              editable={editable}
              text={data.testimonials.title}
              onChange={(value) => handleUpdate("testimonials", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.testimonials.items.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-800 p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <ImageUpload
                    editable={editable}
                    src={review.imageUrl}
                    alt="Reviewer"
                    className="w-16 h-16 rounded-full object-cover"
                    onUpload={(imageUrl) => {
                      const updatedTestimonials = [...data.testimonials.items];
                      updatedTestimonials[index].imageUrl = imageUrl;
                      handleUpdate(
                        "testimonials",
                        "items",
                        updatedTestimonials
                      );
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      <EditableText
                        editable={editable}
                        text={review.name}
                        onChange={(value) => {
                          const updatedTestimonials = [
                            ...data.testimonials.items,
                          ];
                          updatedTestimonials[index] = {
                            ...updatedTestimonials[index],
                            name: value,
                          };
                          handleUpdate(
                            "testimonials",
                            "items",
                            updatedTestimonials
                          );
                        }}
                      />
                    </h3>
                    <div className="text-yellow-400 text-sm">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300">
                  <EditableText
                    editable={editable}
                    text={review.comment}
                    onChange={(value) => {
                      const updatedTestimonials = [...data.testimonials.items];
                      updatedTestimonials[index] = {
                        ...updatedTestimonials[index],
                        comment: value,
                      };
                      handleUpdate(
                        "testimonials",
                        "items",
                        updatedTestimonials
                      );
                    }}
                  />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 shadow-2xl border border-slate-700">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              <EditableText
                editable={editable}
                text={data.contact.title}
                onChange={(value) => handleUpdate("contact", "title", value)}
              />
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-6 py-4 bg-slate-900/50 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500 text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-slate-900/50 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500 text-white"
                />
              </div>
              <input
                type="tel"
                placeholder="Contact No"
                className="w-full px-6 py-4 bg-slate-900/50 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500 text-white"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-6 py-4 bg-slate-900/50 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500 text-white resize-none"
              ></textarea>
              <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-500">
            <EditableText
              editable={editable}
              text={data.footer.copyright}
              onChange={(value) => handleUpdate("footer", "copyright", value)}
            />
          </p>
        </div>
      </footer>

      {/* Popup for adding specifications */}
      <Popup
        type="addSpecification"
        isOpen={isAddingSpec}
        onClose={() => setIsAddingSpec(false)}
        onSubmit={handleAddSpecification}
      />
    </div>
  );
};

export default ProductShowcaseTemplate2;
