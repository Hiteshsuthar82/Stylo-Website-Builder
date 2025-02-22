import React from "react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";

const InteriorDesignTemplate2 = ({ data, onUpdate, editable = false }) => {
  const handleUpdate = (section, key, value, index = null) => {
    if (index !== null) {
      if (
        ["portfolio", "testimonials", "services", "about", "header"].includes(
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
  };

  return (
    <div className="font-sans bg-white text-gray-900">
      {/* Navigation - Modern floating nav */}
      <nav className="fixed w-full z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-lg rounded-full shadow-lg px-8 py-2">
          <div className="flex justify-between items-center">
            {data.header.logoType === "text" ? (
              <div className="text-2xl font-bold tracking-tight py-2">
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
                className="h-12"
                onUpload={(imageUrl) =>
                  handleUpdate("header", "logoImage", imageUrl)
                }
              />
            )}
            <div className="hidden md:flex space-x-8">
              {data.header.items.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
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
        </div>
      </nav>

      {/* Hero Section - Modern asymmetric design */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[url('https://img.freepik.com/free-photo/loft-home-office-interior-design_53876-143117.jpg')]">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-48">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              <EditableText
                editable={editable}
                text={data.hero.title}
                onChange={(value) => handleUpdate("hero", "title", value)}
              />
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              <EditableText
                editable={editable}
                text={data.hero.subtitle}
                onChange={(value) => handleUpdate("hero", "subtitle", value)}
              />
            </p>
            <button className="bg-white text-gray-900 px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
              <EditableText
                editable={editable}
                text={data.hero.cta}
                onChange={(value) => handleUpdate("hero", "cta", value)}
              />
            </button>
          </div>
        </div>
      </section>

      {/* About Section - Modern grid layout */}
      <section id="about" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold">
                <EditableText
                  editable={editable}
                  text={data.about.title}
                  onChange={(value) => handleUpdate("about", "title", value)}
                />
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                <EditableText
                  editable={editable}
                  text={data.about.subtitle}
                  onChange={(value) => handleUpdate("about", "subtitle", value)}
                />
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {data.about.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-sm"
                  >
                    <h3 className="text-xl font-bold mb-4">
                      <EditableText
                        editable={editable}
                        text={feature.title}
                        onChange={(value) =>
                          handleUpdate("about", "title", value, index)
                        }
                      />
                    </h3>
                    <p className="text-gray-600">
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
                className="w-full h-[600px] object-cover rounded-3xl"
                onUpload={(imageUrl) =>
                  handleUpdate("about", "mainImage", imageUrl)
                }
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">
                  <EditableText
                    editable={editable}
                    text={data.about.experience}
                    onChange={(value) =>
                      handleUpdate("about", "experience", value)
                    }
                  />
                </p>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-32">
            {data.about.items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm text-center group hover:shadow-lg transition-shadow"
              >
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <ImageUpload
                      editable={editable}
                      src={item.icon}
                      alt={item.name}
                      className="w-12 h-12"
                      onUpload={(imageUrl) =>
                        handleUpdate("about", "icon", imageUrl, index)
                      }
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  <EditableText
                    editable={editable}
                    text={item.count}
                    onChange={(value) =>
                      handleUpdate("about", "count", value, index)
                    }
                  />
                </h3>
                <p className="text-gray-600">
                  <EditableText
                    editable={editable}
                    text={item.name}
                    onChange={(value) =>
                      handleUpdate("about", "name", value, index)
                    }
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Modern cards */}
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20">
            <EditableText
              editable={editable}
              text={data.services.title}
              onChange={(value) => handleUpdate("services", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {data.services.items.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-3xl hover:shadow-xl transition-shadow"
              >
                <ImageUpload
                  editable={editable}
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 mb-8"
                  onUpload={(imageUrl) =>
                    handleUpdate("services", "icon", imageUrl, index)
                  }
                />
                <h3 className="text-2xl font-bold mb-4">
                  <EditableText
                    editable={editable}
                    text={service.title}
                    onChange={(value) =>
                      handleUpdate("services", "title", value, index)
                    }
                  />
                </h3>
                <p className="text-gray-600">
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

      {/* Portfolio Section - Modern masonry-style grid */}
      <section id="portfolio" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20">
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
                  onUpload={(imageUrl) =>
                    handleUpdate("portfolio", "image", imageUrl, index)
                  }
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className={`absolute inset-0 flex ${
                      editable ? "items-end" : "items-center"
                    } justify-center text-white text-center p-6`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2 pointer-events-auto">
                        <EditableText
                          editable={editable}
                          text={item.title}
                          onChange={(value) =>
                            handleUpdate("portfolio", "title", value, index)
                          }
                        />
                      </h3>
                      <p className="text-white/80 pointer-events-auto">
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

      {/* Testimonials Section - Modern cards with gradient */}
      <section id="testimonials" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20">
            <EditableText
              editable={editable}
              text={data.testimonials.title}
              onChange={(value) => handleUpdate("testimonials", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {data.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <ImageUpload
                  editable={editable}
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  onUpload={(imageUrl) =>
                    handleUpdate("testimonials", "avatar", imageUrl, index)
                  }
                />
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} className="text-yellow-400 text-2xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-center">
                  <EditableText
                    editable={editable}
                    text={testimonial.quote}
                    onChange={(value) =>
                      handleUpdate("testimonials", "quote", value, index)
                    }
                  />
                </p>
                <p className="font-bold text-center">
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

      {/* Contact Section - Modern floating form */}
      <section id="contact" className="relative py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-center mb-12">
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
                  className="w-full px-6 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-gray-900 transition-shadow"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-gray-900 transition-shadow"
                />
              </div>
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full px-6 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-gray-900 transition-shadow"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                }}
              />
              <textarea
                placeholder="Your Message"
                rows="6"
                className="w-full px-6 py-4 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-gray-900 transition-shadow resize-none"
              ></textarea>
              <button className="w-full bg-gray-900 text-white py-4 px-8 rounded-xl text-lg font-medium hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Modern gradient */}
      <footer className="bg-gray-900 text-white py-12 px-6">
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

export default InteriorDesignTemplate2;
