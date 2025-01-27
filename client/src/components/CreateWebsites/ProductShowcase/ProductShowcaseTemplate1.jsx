import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, TrashIcon, Edit2Icon, SaveIcon } from "lucide-react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";
import Popup from "../../Popup";

const ProductShowcaseTemplate1 = ({ data, onUpdate, editable = false }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [isAddingSpec, setIsAddingSpec] = useState(false);

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

  const addSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) {
      alert("Please enter both key and value for the specification");
      return;
    }

    const updatedSpecs = { ...data.details.specifications };
    updatedSpecs[newSpecKey] = newSpecValue;
    handleUpdate("details", "specifications", updatedSpecs);

    // Reset add specification state
    setNewSpecKey("");
    setNewSpecValue("");
    setIsAddingSpec(false);
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

  // Smooth scroll to section
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Header */}
      <header className="fixed w-full z-30 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            <EditableText
              editable={editable}
              text={data.header.logoText}
              onChange={(value) => handleUpdate("header", "logoText", value)}
            />
          </h1>
          <nav className="hidden sm:flex space-x-6">
            {data.header.items.map((item, index) => (
              <a
                key={index}
                onClick={(e) => handleNavClick(e, item.id)}
                href={`#${item.id}`}
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                <EditableText
                  editable={editable}
                  text={item.label}
                  onChange={(value) => {
                    const updatedNav = [...data.header.items];
                    updatedNav[index] = { ...updatedNav[index], label: value };
                    handleUpdate("header", "items", updatedNav);
                  }}
                />
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-800">
                <EditableText
                  editable={editable}
                  text={data.hero.title}
                  onChange={(value) => handleUpdate("hero", "title", value)}
                />
              </h1>
              <p className="text-xl text-gray-600">
                <EditableText
                  editable={editable}
                  text={data.hero.subtitle}
                  onChange={(value) => handleUpdate("hero", "subtitle", value)}
                />
              </p>
              <div className="flex space-x-4">
                <a
                  href={!editable ? "#contact" : ""}
                  onClick={(e) => handleNavClick(e, !editable ? "contact" : "")}
                  className="px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-xl hover:bg-primary-50 transition-colors"
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
                  onClick={(e) => handleNavClick(e, !editable ? "details" : "")}
                  className="px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-xl hover:bg-primary-50 transition-colors"
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
            </div>
            <div className="relative">
              <ImageUpload
                editable={editable}
                src={data.hero.productImage}
                alt="Product Image"
                className="w-full max-h-[600px]  object-cover rounded-2xl relative"
                containerClass="relative"
                onUpload={(imageUrl) =>
                  handleUpdate("hero", "productImage", imageUrl)
                }
              />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-100 rounded-full blur-2xl opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-20 bg-white" id="details">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row gap-12">
            <div className="grid grid-cols-2 gap-6 h-fit flex-1">
              {data.details.gallery.map((image, index) => (
                <ImageUpload
                  key={index}
                  editable={editable}
                  src={image}
                  alt={`Product Gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-xl shadow-md"
                  onUpload={(imageUrl) => {
                    const updatedGallery = [...data.details.gallery];
                    updatedGallery[index] = imageUrl;
                    handleUpdate("details", "gallery", updatedGallery);
                  }}
                />
              ))}
            </div>
            <div className="flex-1">
              <div className="flex space-x-4 mb-8 border-b">
                {["description", "specifications"].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-4 text-lg font-semibold ${
                      activeTab === tab
                        ? "text-primary-500 border-b-2 border-primary-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="text-gray-600 mb-6">
                    <EditableText
                      editable={editable}
                      text={data.details.description}
                      onChange={(value) =>
                        handleUpdate("details", "description", value)
                      }
                    />
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-10">
                    {data.details.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-primary-500">✓</span>
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

                  <a
                    href={!editable ? "#contact" : ""}
                    onClick={(e) =>
                      handleNavClick(e, !editable ? "contact" : "")
                    }
                    className="inline-block px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-xl hover:bg-primary-50 transition-colors"
                  >
                    <EditableText
                    editable={editable}
                    text={data.details.descriptionbtnText}
                    onChange={(value) =>
                      handleUpdate("details", "descriptionbtnText", value)
                    }
                  />
                  </a>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-4">
                  {Object.entries(data.details.specifications).map(
                    ([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <span className="text-gray-600 flex-grow">{key}</span>
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
                          className="flex-grow text-right"
                        />
                        {editable && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeSpecification(key)}
                            className="ml-2 text-red-500"
                          >
                            <TrashIcon size={20} />
                          </motion.button>
                        )}
                      </motion.div>
                    )
                  )}

                  {editable && !isAddingSpec && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsAddingSpec(true)}
                      className="w-full flex items-center justify-center p-2 bg-blue-50 text-blue-500 rounded-lg"
                    >
                      <PlusIcon className="mr-2" /> Add Specification
                    </motion.button>
                  )}
                  <Popup
                    type="addSpecification"
                    isOpen={isAddingSpec}
                    onClose={() => setIsAddingSpec(false)}
                    onSubmit={handleAddSpecification}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="px-5 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          <EditableText
            editable={editable}
            text={data.testimonials.title}
            onChange={(value) => handleUpdate("testimonials", "title", value)}
          />
        </h2>
        <div className="flex flex-col sm:flex-row mt-10 gap-5">
          {data.testimonials.items.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-6 rounded-xl shadow-lg mb-6"
            >
              <div className="flex items-center mb-4">
                {/* Image of the reviewer */}
                {/* <img
                  src={review.imageUrl} // Add the image URL for each review
                  alt={review.name}
                  className=""
                /> */}
                <ImageUpload
                key={index}
                  editable={editable}
                  src={review.imageUrl}
                  alt="Reviewer Image"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onUpload={(imageUrl) => {
                    const updatedGallery = [...data.testimonials.items];
                    updatedGallery[index].imageUrl = imageUrl;
                    handleUpdate("testimonials", "items", updatedGallery);
                  }}
                />
                <div className="flex-1">
                  <EditableText
                    editable={editable}
                    text={review.name}
                    onChange={(value) => {
                      const updatedTestimonials = [...data.testimonials.items];
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
                  <div className="text-yellow-500 text-sm mt-1">
                    {"★".repeat(review.rating)}
                  </div>
                </div>
              </div>
              <EditableText
                editable={editable}
                text={review.comment}
                onChange={(value) => {
                  const updatedTestimonials = [...data.testimonials.items];
                  updatedTestimonials[index] = {
                    ...updatedTestimonials[index],
                    comment: value,
                  };
                  handleUpdate("testimonials", "items", updatedTestimonials);
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
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
                  className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <input
                type="number"
                placeholder="Contact No"
                className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="4"
              ></textarea>
              <button className="w-full py-4 bg-primary-500 border-2 border-primary-500 text-primary-500 rounded-xl hover:bg-primary-600 transition-colors">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <p className="text-center text-gray-600">
          <EditableText
            editable={editable}
            text={data.footer.copyright}
            onChange={(value) => handleUpdate("footer", "copyright", value)}
          />
        </p>
      </footer>
    </div>
  );
};

export default ProductShowcaseTemplate1;
