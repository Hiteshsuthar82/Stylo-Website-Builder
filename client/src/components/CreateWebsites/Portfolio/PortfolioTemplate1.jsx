import React from "react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";

const PortfolioTemplate1 = ({ data, onUpdate, editable = false }) => {
  const handleUpdate = (section, key, value, index = null) => {
    if (index !== null) {
      if (["header", "services", "projects"].includes(section)) {
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

    if (typeof value === "object" && value !== null) {
      const updatedData = {
        ...data,
        [section]: {
          ...data[section],
          [key]: value,
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
        <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              <EditableText
                editable={editable}
                text={data.header.logoText}
                onChange={(value) => handleUpdate("header", "logoText", value)}
              />
            </h1>
            <nav className="hidden md:flex">
              <ul className="flex gap-8">
                {data.header.items.map((item, index) => (
                  <li key={item.id}>
                    <a
                      className="text-gray-600 hover:text-rose-500 transition-colors cursor-pointer"
                      href={!editable ? item.href : "#"}
                      onClick={(e) => handleNavClick(e, item.href.slice(1))}
                    >
                      <EditableText
                        editable={editable}
                        text={item.text}
                        onChange={(value) =>
                          handleUpdate("header", "text", value, index)
                        }
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="text-rose-500 font-medium">
              <EditableText
                editable={editable}
                text={data.header.phone}
                onChange={(value) => handleUpdate("header", "phone", value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          <div className="bg-white rounded-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] p-8 sm:p-16">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h1 className="text-6xl font-bold text-gray-800">
                  <EditableText
                    editable={editable}
                    text={data.hero.greeting}
                    onChange={(value) =>
                      handleUpdate("hero", "greeting", value)
                    }
                  />
                </h1>
                <p className="text-xl text-gray-600">
                  <EditableText
                    editable={editable}
                    text={data.hero.subtitle}
                    onChange={(value) =>
                      handleUpdate("hero", "subtitle", value)
                    }
                  />
                </p>
                <a
                  href={!editable ? "#about" : "#"}
                  onClick={(e) => {
                    if (!editable) {
                      handleNavClick(e, "about");
                    }
                  }}
                  className="inline-block px-3 sm:px-8 py-4 bg-rose-500 text-white rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-rose-200 transition-all"
                >
                  <EditableText
                    editable={editable}
                    text={data.hero.cta}
                    onChange={(value) => handleUpdate("hero", "cta", value)}
                  />
                </a>
              </div>
              <div className="relative md:w-[300px]">
                <div className="absolute inset-0 bg-rose-100 rounded-3xl rotate-6"></div>
                <div className="absolute inset-0 bg-rose-200 rounded-3xl rotate-3"></div>
                <ImageUpload
                  editable={editable}
                  src={data.hero.profileImage}
                  alt="Profile"
                  className="w-full"
                  containerClass="relative rounded-3xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  onUpload={(imageUrl) =>
                    handleUpdate("hero", "profileImage", imageUrl)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          <div className="bg-white rounded-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] p-8 sm:p-16">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <ImageUpload
                  editable={editable}
                  src={data.about.image}
                  alt="About"
                  className="rounded-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-[1.02] duration-300"
                  onUpload={(imageUrl) =>
                    handleUpdate("about", "image", imageUrl)
                  }
                />
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-800">
                  <EditableText
                    editable={editable}
                    text={data.about.title}
                    onChange={(value) => handleUpdate("about", "title", value)}
                  />
                </h2>
                <p className="text-gray-600">
                  <EditableText
                    editable={editable}
                    text={data.about.description}
                    onChange={(value) =>
                      handleUpdate("about", "description", value)
                    }
                  />
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(data.about.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-xl p-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                    >
                      <span className="text-rose-500 font-medium block mb-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <EditableText
                        editable={editable}
                        text={value}
                        onChange={(newValue) =>
                          handleUpdate("about", "details", {
                            ...data.about.details,
                            [key]: newValue,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            <EditableText
              editable={editable}
              text={data.services.title}
              onChange={(value) => handleUpdate("services", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {data.services.items.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-lg transition-all"
              >
                <div className="h-2 w-16 bg-rose-500 rounded-full mb-6"></div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  <EditableText
                    editable={editable}
                    text={service.name}
                    onChange={(value) =>
                      handleUpdate("services", "name", value, index)
                    }
                  />
                </h3>
                <p className="text-gray-600 mb-4">
                  <EditableText
                    editable={editable}
                    text={service.description}
                    onChange={(value) =>
                      handleUpdate("services", "description", value, index)
                    }
                  />
                </p>
                <span className="text-rose-500 font-bold">
                  <EditableText
                    editable={editable}
                    text={service.price}
                    onChange={(value) =>
                      handleUpdate("services", "price", value, index)
                    }
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            <EditableText
              editable={editable}
              text={data.projects.title}
              onChange={(value) => handleUpdate("projects", "title", value)}
            />
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.projects.items.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all"
              >
                <ImageUpload
                  editable={editable}
                  src={project.image}
                  alt={project.name}
                  className="w-full h-[300px] object-cover rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  onUpload={(imageUrl) =>
                    handleUpdate("projects", "image", imageUrl, index)
                  }
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    <EditableText
                      editable={editable}
                      text={project.name}
                      onChange={(value) =>
                        handleUpdate("projects", "name", value, index)
                      }
                    />
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-3xl mx-auto px-3 sm:px-8">
          <div className="bg-white rounded-3xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] p-8 sm:p-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
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
                  className="w-full px-6 py-4 bg-gray-50 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-gray-50 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <textarea
                placeholder="Tell me about the project"
                className="w-full px-6 py-4 bg-gray-50 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-rose-500"
                rows="4"
              ></textarea>
              <button className="w-full py-4 bg-rose-500 text-white rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-rose-200 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
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

export default PortfolioTemplate1;
