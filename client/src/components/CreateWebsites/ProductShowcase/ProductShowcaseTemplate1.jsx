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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    const updatedSpecs = { ...data.details.specifications, };
    updatedSpecs[newData.key] = newData.value;
    handleUpdate("details", "specifications", updatedSpecs);

    setIsAddingSpec(false);
  };

  const removeSpecification = (key) => {
    const updatedSpecs = { ...data.details.specifications };
    delete updatedSpecs[key];
    handleUpdate("details", "specifications", updatedSpecs);
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Header */}
      <header className="fixed w-full z-30 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            <EditableText
              editable={editable}
              text={data.header.logo}
              onChange={(value) => handleUpdate("header", "logo", value)}
            />
          </h1>
          <nav className="flex space-x-6">
            {data.header.navigation.map((item, index) => (
              <a
                key={index}
                href={`#${item.id}`}
                className="text-gray-600 hover:text-primary-500 transition-colors"
              >
                <EditableText
                  editable={editable}
                  text={item.label}
                  onChange={(value) => {
                    const updatedNav = [...data.header.navigation];
                    updatedNav[index] = { ...updatedNav[index], label: value };
                    handleUpdate("header", "navigation", updatedNav);
                  }}
                />
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
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
                <button className="px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                  <EditableText
                    editable={editable}
                    text={data.hero.primaryCta}
                    onChange={(value) =>
                      handleUpdate("hero", "primaryCta", value)
                    }
                  />
                </button>
                <button className="px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-xl hover:bg-primary-50 transition-colors">
                  <EditableText
                    editable={editable}
                    text={data.hero.secondaryCta}
                    onChange={(value) =>
                      handleUpdate("hero", "secondaryCta", value)
                    }
                  />
                </button>
              </div>
            </div>
            <div className="relative">
              <ImageUpload
                editable={editable}
                src={data.hero.productImage}
                alt="Product Image"
                className="w-full rounded-2xl shadow-lg z-10 relative"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="grid grid-cols-2 gap-6 h-fit">
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
            <div>
              <div className="flex space-x-4 mb-8 border-b">
                {["description", "specifications", "reviews"].map((tab) => (
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
                  <div className="grid md:grid-cols-2 gap-4">
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

                  {/* {editable && isAddingSpec && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col space-y-2"
                    >
                      <input
                        type="text"
                        placeholder="Specification Key"
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="text"
                        placeholder="Specification Value"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={addSpecification}
                          className="flex-grow bg-blue-500 text-white p-2 rounded"
                        >
                          Save Specification
                        </button>
                        <button
                          onClick={() => setIsAddingSpec(false)}
                          className="bg-gray-200 text-gray-700 p-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )} */}
                  <Popup
                    type="addSpecification"
                    isOpen={isAddingSpec}
                    onClose={() => setIsAddingSpec(false)}
                    onSubmit={handleAddSpecification}
                  />
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {data.details.reviews.map((review, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-gray-100 p-4 rounded-xl mb-4"
                  >
                      <div className="flex justify-between">
                        <EditableText
                          editable={editable}
                          text={review.name}
                          onChange={(value) => {
                            const updatedReviews = [...data.details.reviews];
                            updatedReviews[index] = {
                              ...updatedReviews[index],
                              name: value,
                            };
                            handleUpdate("details", "reviews", updatedReviews);
                          }}
                        />
                        <div className="text-yellow-500">
                          {"★".repeat(review.rating)}
                        </div>
                      </div>
                      <EditableText
                        editable={editable}
                        text={review.comment}
                        onChange={(value) => {
                          const updatedReviews = [...data.details.reviews];
                          updatedReviews[index] = {
                            ...updatedReviews[index],
                            comment: value,
                          };
                          handleUpdate("details", "reviews", updatedReviews);
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            <EditableText
              editable={editable}
              text={data.pricing.title}
              onChange={(value) => handleUpdate("pricing", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.pricing.plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4">
                  <EditableText
                    editable={editable}
                    text={plan.name}
                    onChange={(value) => {
                      const updatedPlans = [...data.pricing.plans];
                      updatedPlans[index] = {
                        ...updatedPlans[index],
                        name: value,
                      };
                      handleUpdate("pricing", "plans", updatedPlans);
                    }}
                  />
                </h3>
                <div className="text-4xl font-bold text-primary-500 mb-6">
                  <EditableText
                    editable={editable}
                    text={plan.price}
                    onChange={(value) => {
                      const updatedPlans = [...data.pricing.plans];
                      updatedPlans[index] = {
                        ...updatedPlans[index],
                        price: value,
                      };
                      handleUpdate("pricing", "plans", updatedPlans);
                    }}
                  />
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <span className="text-primary-500">✓</span>
                      <EditableText
                        editable={editable}
                        text={feature}
                        onChange={(value) => {
                          const updatedPlans = [...data.pricing.plans];
                          const updatedFeatures = [
                            ...updatedPlans[index].features,
                          ];
                          updatedFeatures[featureIndex] = value;
                          updatedPlans[index] = {
                            ...updatedPlans[index],
                            features: updatedFeatures,
                          };
                          handleUpdate("pricing", "plans", updatedPlans);
                        }}
                      />
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
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
              <textarea
                placeholder="Your Message"
                className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="4"
              ></textarea>
              <button className="w-full py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
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
