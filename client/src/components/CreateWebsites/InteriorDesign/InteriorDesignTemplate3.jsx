import React, { useState } from "react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";
import { Menu, X } from "lucide-react";

const InteriorDesignTemplate3 = ({ data, onUpdate, editable = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUpdate = (section, key, value, index = null) => {
    if (index !== null) {
      if (
        ["portfolio", "testimonials", "services", "about", "header", "stats"].includes(
          section
        )
      ) {
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

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans bg-gray-900 text-gray-100">
      {/* Modern Responsive Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              {data.header.logoType === "text" ? (
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  <EditableText
                    editable={editable}
                    text={data.header.logoText}
                    onChange={(value) =>
                      handleUpdate("header", "logoText", value)
                    }
                  />
                </div>
              ) : (
                <ImageUpload
                  editable={editable}
                  src={data.header.logoImage}
                  alt="Logo"
                  className="h-10"
                  oldImageUrl={data.header.logoImage}
                  onUpload={(imageUrl) =>
                    handleUpdate("header", "logoImage", imageUrl)
                  }
                />
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {data.header.items.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  <EditableText
                    editable={editable}
                    text={item.text}
                    onChange={(value) =>
                      handleUpdate("header", "text", value, index)
                    }
                  />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {data.header.items.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-lg transition-colors"
                >
                  <EditableText
                    editable={editable}
                    text={item.text}
                    onChange={(value) =>
                      handleUpdate("header", "text", value, index)
                    }
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[url('https://plus.unsplash.com/premium_photo-1684348962314-64fa628992f0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
          
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              <EditableText
                editable={editable}
                text={data.hero.title}
                onChange={(value) => handleUpdate("hero", "title", value)}
              />
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              <EditableText
                editable={editable}
                text={data.hero.subtitle}
                onChange={(value) => handleUpdate("hero", "subtitle", value)}
              />
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
              <EditableText
                editable={editable}
                text={data.hero.cta}
                onChange={(value) => handleUpdate("hero", "cta", value)}
              />
            </button>
          </div>
        </div>
      </section>

      {/* About Section with Glass Effect */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                <EditableText
                  editable={editable}
                  text={data.about.title}
                  onChange={(value) => handleUpdate("about", "title", value)}
                />
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                <EditableText
                  editable={editable}
                  text={data.about.subtitle}
                  onChange={(value) => handleUpdate("about", "subtitle", value)}
                />
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {data.about.items.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-700"
                  >
                    <h3 className="text-xl font-bold mb-4 text-white">
                      <EditableText
                        editable={editable}
                        text={feature.title}
                        onChange={(value) =>
                          handleUpdate("about", "title", value, index)
                        }
                      />
                    </h3>
                    <p className="text-gray-400">
                      <EditableText
                        editable={editable}
                        text={feature.description}
                        onChange={(value) =>
                          handleUpdate("about", "description", value, index)
                        }
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <ImageUpload
                editable={editable}
                src={data.about.mainImage}
                alt="About Us"
                className="w-full h-[600px] object-cover rounded-3xl transform hover:scale-105 transition-transform duration-500"
                oldImageUrl={data.about.mainImage}
                onUpload={(imageUrl) =>
                  handleUpdate("about", "mainImage", imageUrl)
                }
              />
              <div className="absolute -bottom-8 -right-8 bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl border border-gray-700">
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  <EditableText
                    editable={editable}
                    text={data.about.experience}
                    onChange={(value) =>
                      handleUpdate("about", "experience", value)
                    }
                  />
                </p>
                <p className="text-gray-400">Years of Excellence</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-32">
            {data.stats.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-700 text-center group hover:bg-gray-800/70 transition-all"
              >
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    <ImageUpload
                      editable={editable}
                      src={item.icon}
                      alt={item.name}
                      className="w-12 h-12"
                      oldImageUrl={item.icon}
                      onUpload={(imageUrl) =>
                        handleUpdate("stats", "icon", imageUrl, index)
                      }
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  <EditableText
                    editable={editable}
                    text={item.count}
                    onChange={(value) =>
                      handleUpdate("stats", "count", value, index)
                    }
                  />
                </h3>
                <p className="text-gray-400">
                  <EditableText
                    editable={editable}
                    text={item.name}
                    onChange={(value) =>
                      handleUpdate("stats", "name", value, index)
                    }
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Hover Effects */}
      <section id="services" className="py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            <EditableText
              editable={editable}
              text={data.services.title}
              onChange={(value) => handleUpdate("services", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.services.items.map((service, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-3xl border border-gray-700 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"
              >
                <ImageUpload
                  editable={editable}
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 mb-8"
                  oldImageUrl={service.icon}
                  onUpload={(imageUrl) =>
                    handleUpdate("services", "icon", imageUrl, index)
                  }
                />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  <EditableText
                    editable={editable}
                    text={service.title}
                    onChange={(value) =>
                      handleUpdate("services", "title", value, index)
                    }
                  />
                </h3>
                <p className="text-gray-400">
                  <EditableText
                    editable={editable}
                    text={service.description}
                    onChange={(value) =>
                      handleUpdate("services", "description", value, index)
                    }
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Modern Grid */}
      <section id="portfolio" className="py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            <EditableText
              editable={editable}
              text={data.portfolio.title}
              onChange={(value) => handleUpdate("portfolio", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.portfolio.items.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl"
              >
                <ImageUpload
                  editable={editable}
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  oldImageUrl={item.image}
                  onUpload={(imageUrl) =>
                    handleUpdate("portfolio", "image", imageUrl, index)
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 flex ${
                      editable ? "items-end" : "items-center"
                    } justify-center text-center p-6`}>
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-bold mb-2 text-white pointer-events-auto">
                        <EditableText
                          editable={editable}
                          text={item.title}
                          onChange={(value) =>
                            handleUpdate("portfolio", "title", value, index)
                          }
                        />
                      </h3>
                      <p className="text-gray-300 pointer-events-auto">
                        <EditableText
                          editable={editable}
                          text={item.category}
                          onChange={(value) =>
                            handleUpdate("portfolio", "category", value, index)
                          }
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Glass Cards */}
      <section
        id="testimonials"
        className="py-32 bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            <EditableText
              editable={editable}
              text={data.testimonials.title}
              onChange={(value) => handleUpdate("testimonials", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700 hover:border-purple-500/50 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative mb-8">
                  <ImageUpload
                    editable={editable}
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-purple-500/20"
                    oldImageUrl={testimonial.avatar}
                    onUpload={(imageUrl) =>
                      handleUpdate("testimonials", "avatar", imageUrl, index)
                    }
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <span key={starIndex} className="text-purple-400">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 text-center">
                  <EditableText
                    editable={editable}
                    text={testimonial.quote}
                    onChange={(value) =>
                      handleUpdate("testimonials", "quote", value, index)
                    }
                  />
                </p>
                <p className="font-bold text-center text-white">
                  <EditableText
                    editable={editable}
                    text={testimonial.name}
                    onChange={(value) =>
                      handleUpdate("testimonials", "name", value, index)
                    }
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Neon Effect */}
      <section id="contact" className="relative py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-12 border border-gray-700">
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
                  placeholder="Full Name"
                  className="w-full px-6 py-4 bg-gray-900/50 rounded-xl border border-gray-700 focus:border-purple-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-gray-900/50 rounded-xl border border-gray-700 focus:border-purple-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <input
                type="text"
                placeholder="Contact No"
                className="w-full px-6 py-4 bg-gray-900/50 rounded-xl border border-gray-700 focus:border-purple-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                }}
              />
              <textarea
                placeholder="Your Message"
                rows="6"
                className="w-full px-6 py-4 bg-gray-900/50 rounded-xl border border-gray-700 focus:border-purple-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              ></textarea>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl text-lg font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with Modern Dark Theme */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400">
            <EditableText
              editable={editable}
              text={data.footer.copyright}
              onChange={(value) => handleUpdate("footer", "copyright", value)}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InteriorDesignTemplate3;
