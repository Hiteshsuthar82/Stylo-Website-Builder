import React from "react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";

const PortfolioTemplate2 = ({ data, onUpdate, editable = false }) => {
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
    <div className="font-sans bg-gray-900 text-gray-100">
      {/* Header - Fixed Navigation */}
      <header className="fixed w-full bg-gray-900/80 backdrop-blur-md z-30 py-4 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-light">
            <EditableText
              editable={editable}
              text={data.header.logoText}
              onChange={(value) => handleUpdate("header", "logoText", value)}
            />
          </h1>
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {data.header.items.map((item, index) => (
                <li key={item.id}>
                  <a
                    className="hover:text-emerald-400 transition-colors"
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
          <div className="text-emerald-400">
            <EditableText
              editable={editable}
              text={data.header.phone}
              onChange={(value) => handleUpdate("header", "phone", value)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              <EditableText
                editable={editable}
                text={data.hero.greeting}
                onChange={(value) => handleUpdate("hero", "greeting", value)}
              />
            </h1>
            <p className="text-xl text-gray-400">
              <EditableText
                editable={editable}
                text={data.hero.subtitle}
                onChange={(value) => handleUpdate("hero", "subtitle", value)}
              />
            </p>
            <a
              href={!editable ? "#about" : "#"}
              onClick={(e) => {
                if (!editable) {
                  handleNavClick(e, "about");
                }
              }}
              className="inline-block bg-emerald-400 px-8 py-3 rounded-full text-gray-900 font-medium hover:bg-emerald-300 transition-colors"
            >
              <EditableText
                editable={editable}
                text={data.hero.cta}
                onChange={(value) => handleUpdate("hero", "cta", value)}
              />
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <ImageUpload
              editable={editable}
              src={data.hero.profileImage}
              alt="Profile"
              containerClass="relative rounded-full overflow-hidden w-64 h-64 mx-auto"
              className="w-full"
              onUpload={(imageUrl) =>
                handleUpdate("hero", "profileImage", imageUrl)
              }
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400/10 blur-2xl"></div>
            <ImageUpload
              editable={editable}
              src={data.about.image}
              alt="About"
              className="relative rounded-2xl w-full h-[400px] object-cover"
              onUpload={(imageUrl) => handleUpdate("about", "image", imageUrl)}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              <EditableText
                editable={editable}
                text={data.about.title}
                onChange={(value) => handleUpdate("about", "title", value)}
              />
            </h2>
            <p className="text-gray-400">
              <EditableText
                editable={editable}
                text={data.about.description}
                onChange={(value) =>
                  handleUpdate("about", "description", value)
                }
              />
            </p>
            <div className="space-y-4">
              {Object.entries(data.about.details).map(([key, value]) => (
                <div key={key} className="flex gap-4 items-center">
                  <span className="text-emerald-400 font-medium">
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
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
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
                className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-800/80 transition-colors"
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
                <p className="text-gray-400 mb-4">
                  <EditableText
                    editable={editable}
                    text={service.description}
                    onChange={(value) =>
                      handleUpdate("services", "description", value, index)
                    }
                  />
                </p>
                <span className="text-emerald-400 font-bold">
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
      <section id="projects" className="py-32 px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
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
                <ImageUpload
                  editable={editable}
                  src={project.image}
                  alt={project.name}
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                  onUpload={(imageUrl) =>
                    handleUpdate("projects", "image", imageUrl, index)
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold pointer-events-auto">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
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
                className="w-full px-6 py-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <textarea
              placeholder="Tell me about the project"
              className="w-full px-6 py-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              rows="4"
            ></textarea>
            <button className="w-full bg-emerald-400 text-gray-900 font-medium px-6 py-4 rounded-lg hover:bg-emerald-300 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 px-8 text-center">
        <p className="text-gray-400">
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

export default PortfolioTemplate2;
