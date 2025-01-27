import React, { useState } from "react";
import EditableText from "../Handlers/EditableText";
import ImageUpload from "../Handlers/ImageUpload";

const PortfolioTemplate4 = ({ data, onUpdate, editable = false }) => {
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
    <div className="font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-5">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <EditableText
              editable={editable}
              text={data.header.logoText}
              onChange={(value) => handleUpdate("header", "logoText", value)}
            />
          </h1>
          <nav>
            <ul className="flex gap-6">
              {data.header.items.map((item, index) => (
                <li key={item.id}>
                  <a
                    className="hover:underline"
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
          <div className="text-sm">
            📞{" "}
            <EditableText
              editable={editable}
              text={data.header.phone}
              onChange={(value) => handleUpdate("header", "phone", value)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 px-5">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center">
            <ImageUpload
              editable={editable}
              src={data.hero.profileImage}
              alt="Profile"
              containerClass="rounded-full overflow-hidden w-32 h-32"
              onUpload={(imageUrl) =>
                handleUpdate("hero", "profileImage", imageUrl)
              }
            />
            <h1 className="text-4xl font-bold mt-4">
              <EditableText
                editable={editable}
                text={data.hero.greeting}
                onChange={(value) => handleUpdate("hero", "greeting", value)}
              />
            </h1>
            <p className="mt-2 text-lg">
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
              className="bg-blue-600 px-4 py-2 rounded-full mt-4 hover:bg-blue-700"
            >
              <EditableText
                editable={editable}
                text={data.hero.cta}
                onChange={(value) => handleUpdate("hero", "cta", value)}
              />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100 px-5">
        <div className="container mx-auto grid grid-cols-2 gap-8">
          <ImageUpload
            editable={editable}
            src={data.about.image}
            alt="About"
            className="w-full rounded-lg h-[252px]"
            onUpload={(imageUrl) => handleUpdate("about", "image", imageUrl)}
          />
          <div>
            <h2 className="text-3xl font-bold">
              <EditableText
                editable={editable}
                text={data.about.title}
                onChange={(value) => handleUpdate("about", "title", value)}
              />
            </h2>
            <p className="mt-4">
              <EditableText
                editable={editable}
                text={data.about.description}
                onChange={(value) =>
                  handleUpdate("about", "description", value)
                }
              />
            </p>
            <div className="mt-8">
              <ul className="space-y-4">
                {Object.entries(data.about.details).map(([key, value]) => (
                  <li key={key}>
                    <strong>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </strong>{" "}
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
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-green-100 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">
            <EditableText
              editable={editable}
              text={data.services.title}
              onChange={(value) => handleUpdate("services", "title", value)}
            />
          </h2>
          <div className="grid grid-cols-4 gap-8 mt-8">
            {data.services.items.map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">
                  <EditableText
                    editable={editable}
                    text={service.name}
                    onChange={(value) =>
                      handleUpdate("services", "name", value, index)
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
                <span className="text-green-600 font-bold">
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
      <section id="projects" className="py-20 bg-gray-50 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">
            <EditableText
              editable={editable}
              text={data.projects.title}
              onChange={(value) => handleUpdate("projects", "title", value)}
            />
          </h2>
          <div className="grid grid-cols-3 gap-8 mt-8">
            {data.projects.items.map((project, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <ImageUpload
                  editable={editable}
                  src={project.image}
                  alt={project.name}
                  className="rounded-lg max-h-[140px] min-h-[140px] w-full"
                  onUpload={(imageUrl) =>
                    handleUpdate("projects", "image", imageUrl, index)
                  }
                />
                <h3 className="mt-4 text-xl font-bold">
                  <EditableText
                    editable={editable}
                    text={project.name}
                    onChange={(value) =>
                      handleUpdate("projects", "name", value, index)
                    }
                  />
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-200 px-5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">
            <EditableText
              editable={editable}
              text={data.contact.title}
              onChange={(value) => handleUpdate("contact", "title", value)}
            />
          </h2>
          <form className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-4 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-4 border rounded"
              />
            </div>
            <textarea
              placeholder="Tell me about the project"
              className="w-full p-4 border rounded"
              rows="4"
            ></textarea>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Send
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 text-center px-5">
        <p>
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

export default PortfolioTemplate4;
