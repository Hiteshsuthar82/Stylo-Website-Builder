import React from "react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";

const PortfolioTemplate3 = ({ data, onUpdate, editable = false }) => {
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

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white min-h-screen">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="fixed w-full z-30">
        <div className="mx-4 mt-4">
          <div className="max-w-7xl mx-auto backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-lg">
            <div className="px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-light">
                <EditableText
                  editable={editable}
                  text={data.header.logoText}
                  onChange={(value) => handleUpdate("header", "logoText", value)}
                />
              </h1>
              <nav>
                <ul className="flex gap-8">
                  {data.header.items.map((item, index) => (
                    <li key={item.id}>
                      <a
                        className="hover:text-purple-300 transition-colors"
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
              <div className="text-purple-300">
                <EditableText
                  editable={editable}
                  text={data.header.phone}
                  onChange={(value) => handleUpdate("header", "phone", value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 p-16">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h1 className="text-7xl font-bold">
                  <EditableText
                    editable={editable}
                    text={data.hero.greeting}
                    onChange={(value) =>
                      handleUpdate("hero", "greeting", value)
                    }
                  />
                </h1>
                <p className="text-xl text-purple-200">
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
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-purple-500/25"
                >
                  <EditableText
                    editable={editable}
                    text={data.hero.cta}
                    onChange={(value) => handleUpdate("hero", "cta", value)}
                  />
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                <ImageUpload
                  editable={editable}
                  src={data.hero.profileImage}
                  alt="Profile"
                  className="w-full"
                  containerClass="relative rounded-3xl overflow-hidden w-full h-[500px]"
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
      <section id="about" className="py-32 px-4">
        <div className="max-w-7xl mx-auto backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 p-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <ImageUpload
                editable={editable}
                src={data.about.image}
                alt="About"
                className="relative rounded-3xl w-full h-[600px] object-cover transition-transform group-hover:scale-105 duration-500"
                onUpload={(imageUrl) =>
                  handleUpdate("about", "image", imageUrl)
                }
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                <EditableText
                  editable={editable}
                  text={data.about.title}
                  onChange={(value) => handleUpdate("about", "title", value)}
                />
              </h2>
              <p className="text-lg text-purple-200">
                <EditableText
                  editable={editable}
                  text={data.about.description}
                  onChange={(value) =>
                    handleUpdate("about", "description", value)
                  }
                />
              </p>
              <div className="space-y-6">
                {Object.entries(data.about.details).map(([key, value]) => (
                  <div
                    key={key}
                    className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-white/10"
                  >
                    <span className="text-purple-300 font-medium block mb-2">
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
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                className="group backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">
                  <EditableText
                    editable={editable}
                    text={service.name}
                    onChange={(value) =>
                      handleUpdate("services", "name", value, index)
                    }
                  />
                </h3>
                <p className="text-purple-200 mb-4">
                  <EditableText
                    editable={editable}
                    text={service.description}
                    onChange={(value) =>
                      handleUpdate("services", "description", value, index)
                    }
                  />
                </p>
                <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold">
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
      <section id="projects" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <ImageUpload
                  editable={editable}
                  src={project.image}
                  alt={project.name}
                  className="w-full h-[400px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  onUpload={(imageUrl) =>
                    handleUpdate("projects", "image", imageUrl, index)
                  }
                />
                <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                  <h3 className="text-2xl font-bold pointer-events-auto">
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
      <section id="contact" className="py-32 px-4">
        <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 p-16">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                className="w-full px-6 py-4 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <textarea
              placeholder="Tell me about the project"
              className="w-full px-6 py-4 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500 transition-colors"
              rows="4"
            ></textarea>
            <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-purple-500/25">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-lg bg-white/5 py-8 border-t border-white/10">
        <p className="text-center text-purple-200">
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

export default PortfolioTemplate3;
