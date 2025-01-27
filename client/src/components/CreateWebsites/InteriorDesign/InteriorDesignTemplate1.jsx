import React from "react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";

const InteriorDesignTemplate1 = ({ data, onUpdate, editable = false }) => {
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
        [key]: typeof value === "object" ? value : value,
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
    <div className="font-serif bg-neutral-50 text-neutral-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-light">
              <EditableText
                editable={editable}
                text={data.header.logoText}
                onChange={(value) => handleUpdate("header", "logoText", value)}
              />
            </div>
            <div className="hidden md:flex space-x-8">
              {data.header.items.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors"
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

      {/* Hero Section */}
      <section className="relative h-screen">
        <ImageUpload
          editable={editable}
          src={data.hero.backgroundImage}
          alt="Interior Design Hero"
          className="absolute inset-0 w-full h-full object-cover"
          onUpload={(imageUrl) =>
            handleUpdate("hero", "backgroundImage", imageUrl)
          }
        />

        <div className={`absolute inset-0 bg-black/40`} />
        <div
          className="relative h-full flex items-center justify-center text-center text-white px-6 bg-cover bg-center"
          style={{
            backgroundImage: `url(${data.hero.backgroundImage})`,
          }}
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              <EditableText
                editable={editable}
                text={data.hero.title}
                onChange={(value) => handleUpdate("hero", "title", value)}
              />
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              <EditableText
                editable={editable}
                text={data.hero.subtitle}
                onChange={(value) => handleUpdate("hero", "subtitle", value)}
              />
            </p>
            <button className="bg-white text-neutral-900 px-8 py-3 rounded-none hover:bg-neutral-100 transition-colors">
              <a
                href={!editable ? "#portfolio" : "#"}
                onClick={(e) => {
                  if (!editable) {
                    handleNavClick(e, "portfolio");
                  }
                }}
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <EditableText
                  editable={editable}
                  text={data.hero.cta}
                  onChange={(value) => handleUpdate("hero", "cta", value)}
                />
              </a>
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative">
              <ImageUpload
                editable={editable}
                src={data.about.mainImage}
                alt="About Us"
                className="w-full h-[600px] object-cover"
                onUpload={(imageUrl) =>
                  handleUpdate("about", "mainImage", imageUrl)
                }
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-8 shadow-xl">
                <p className="text-4xl font-light text-neutral-900">
                  <EditableText
                    editable={editable}
                    text={data.about.experience}
                    onChange={(value) =>
                      handleUpdate("about", "experience", value)
                    }
                  />
                </p>
                <p className="text-neutral-600">Years of Excellence</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-5xl font-light">
                <EditableText
                  editable={editable}
                  text={data.about.title}
                  onChange={(value) => handleUpdate("about", "title", value)}
                />
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                <EditableText
                  editable={editable}
                  text={data.about.subtitle}
                  onChange={(value) => handleUpdate("about", "subtitle", value)}
                />
              </p>
              <div className="grid grid-cols-2 gap-8">
                {data.about.features.map((feature, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-neutral-900 pl-6"
                  >
                    <h3 className="text-xl font-medium mb-2">
                      <EditableText
                        editable={editable}
                        text={feature.title}
                        onChange={(value) =>
                          handleUpdate("about", "title", value, index)
                        }
                      />
                    </h3>
                    <p className="text-neutral-600">
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
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {data.about.items.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 relative">
                  <div className="w-24 h-24 mx-auto rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
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
                <p className="text-neutral-600">
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

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16">
            <EditableText
              editable={editable}
              text={data.services.title}
              onChange={(value) => handleUpdate("services", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {data.services.items.map((service, index) => (
              <div key={index} className="text-center">
                <ImageUpload
                  editable={editable}
                  src={service.icon}
                  alt={service.title}
                  className="w-16 h-16 mx-auto mb-6"
                  onUpload={(imageUrl) =>
                    handleUpdate("services", "icon", imageUrl, index)
                  }
                />
                <h3 className="text-2xl font-light mb-4">
                  <EditableText
                    editable={editable}
                    text={service.title}
                    onChange={(value) =>
                      handleUpdate("services", "title", value, index)
                    }
                  />
                </h3>
                <p className="text-neutral-600">
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-16">
            <EditableText
              editable={editable}
              text={data.portfolio.title}
              onChange={(value) => handleUpdate("portfolio", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.portfolio.items.map((item, index) => (
              <div key={index} className="group relative overflow-hidden">
                <div className="relative">
                  <ImageUpload
                    editable={editable}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                    onUpload={(imageUrl) =>
                      handleUpdate("portfolio", "image", imageUrl, index)
                    }
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div
                    className={`absolute inset-0 flex ${
                      editable ? "items-end" : "items-center"
                    } justify-center text-white text-center p-6`}
                  >
                    <div>
                      <h3 className="text-2xl font-light mb-2 pointer-events-auto">
                        <EditableText
                          editable={editable}
                          text={item.title}
                          onChange={(value) =>
                            handleUpdate("portfolio", "title", value, index)
                          }
                        />
                      </h3>
                      <p className="text-sm pointer-events-auto">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16 text-gray-800">
            <EditableText
              editable={editable}
              text={data.testimonials.title}
              onChange={(value) => handleUpdate("testimonials", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <ImageUpload
                  editable={editable}
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  onUpload={(imageUrl) =>
                    handleUpdate("testimonials", "avatar", imageUrl, index)
                  }
                />
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <span key={starIndex} className={`text-xl text-yellow-400`}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-neutral-600 mb-6">
                  <EditableText
                    editable={editable}
                    text={testimonial.quote}
                    onChange={(value) =>
                      handleUpdate("testimonials", "quote", value, index)
                    }
                  />
                </p>
                <p className="font-medium text-gray-700">
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

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-light text-center mb-16">
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
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-white"
              />
            </div>
              <input
                type="text"
                placeholder="Contact No"
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-white"
              />
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-white"
            ></textarea>
            <button className="w-full bg-white text-neutral-900 py-3 hover:bg-neutral-100 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <EditableText
            editable={editable}
            text={data.footer.copyright}
            onChange={(value) => handleUpdate("footer", "copyright", value)}
          />
        </div>
      </footer>
    </div>
  );
};

export default InteriorDesignTemplate1;
