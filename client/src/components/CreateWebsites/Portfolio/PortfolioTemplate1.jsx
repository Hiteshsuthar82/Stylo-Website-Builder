import React from "react";
import EditableText from "../../EditableText";

// const EditableText = ({ text, onChange, className = "" }) => {
//   const handleBlur = (e) => {
//     const newValue = e.target.innerText;
//     onChange(newValue);
//   };

//   return (
//     <span
//       contentEditable
//       suppressContentEditableWarning
//       onBlur={handleBlur}
//       className={`outline-none hover:bg-opacity-10 hover:bg-black ${className}`}
//     >
//       {text}
//     </span>
//   );
// };

const PortfolioTemplate1 = ({ data, onUpdate }) => {
  const handleUpdate = (section, key, value) => {
    const updatedData = {
      ...data,
      [section]: {
        ...data[section],
        [key]: value,
      },
    };
    onUpdate(updatedData);
  };

  const handleNavUpdate = (index, value) => {
    const updatedData = {
      ...data,
      header: {
        ...data.header,
        navigation: data.header.navigation.map((item, i) =>
          i === index ? { ...item, text: value } : item
        ),
      },
    };
    onUpdate(updatedData);
  };

  const handleServiceUpdate = (index, key, value) => {
    const updatedData = {
      ...data,
      services: {
        ...data.services,
        items: data.services.items.map((item, i) =>
          i === index ? { ...item, [key]: value } : item
        ),
      },
    };
    onUpdate(updatedData);
  };

  const handleProjectUpdate = (index, key, value) => {
    const updatedData = {
      ...data,
      projects: {
        ...data.projects,
        items: data.projects.items.map((item, i) =>
          i === index ? { ...item, [key]: value } : item
        ),
      },
    };
    onUpdate(updatedData);
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-5">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <EditableText
              text={data.header.title}
              onChange={(value) => handleUpdate("header", "title", value)}
            />
          </h1>
          <nav>
            <ul className="flex gap-6">
              {data.header.navigation.map((item, index) => (
                <li key={item.id}>
                  <a
                    //  href={item.href}
                    className="hover:underline"
                  >
                    <EditableText
                      text={item.text}
                      onChange={(value) => handleNavUpdate(index, value)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm">
            📞{" "}
            <EditableText
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
            <div className="rounded-full overflow-hidden w-32 h-32">
              <img src="/api/placeholder/128/128" alt="Profile" />
            </div>
            <h1 className="text-4xl font-bold mt-4">
              <EditableText
                text={data.hero.greeting}
                onChange={(value) => handleUpdate("hero", "greeting", value)}
              />
            </h1>
            <p className="mt-2 text-lg">
              <EditableText
                text={data.hero.subtitle}
                onChange={(value) => handleUpdate("hero", "subtitle", value)}
              />
            </p>
            <button className="bg-blue-600 px-4 py-2 rounded-full mt-4 hover:bg-blue-700">
              <EditableText
                text={data.hero.cta}
                onChange={(value) => handleUpdate("hero", "cta", value)}
              />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100 px-5">
        <div className="container mx-auto grid grid-cols-2 gap-8">
          <img
            src={data.about.image}
            alt="About"
            className="rounded-lg h-[252px]"
          />
          <div>
            <h2 className="text-3xl font-bold">
              <EditableText
                text={data.about.title}
                onChange={(value) => handleUpdate("about", "title", value)}
              />
            </h2>
            <p className="mt-4">
              <EditableText
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
              text={data.services.title}
              onChange={(value) => handleUpdate("services", "title", value)}
            />
          </h2>
          <div className="grid grid-cols-4 gap-8 mt-8">
            {data.services.items.map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">
                  <EditableText
                    text={service.name}
                    onChange={(value) =>
                      handleServiceUpdate(index, "name", value)
                    }
                  />
                </h3>
                <p className="text-gray-600">
                  <EditableText
                    text={service.description}
                    onChange={(value) =>
                      handleServiceUpdate(index, "description", value)
                    }
                  />
                </p>
                <span className="text-green-600 font-bold">
                  <EditableText
                    text={service.price}
                    onChange={(value) =>
                      handleServiceUpdate(index, "price", value)
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
              text={data.projects.title}
              onChange={(value) => handleUpdate("projects", "title", value)}
            />
          </h2>
          <div className="grid grid-cols-3 gap-8 mt-8">
            {data.projects.items.map((project, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <img
                  src={project.image}
                  alt={project.name}
                  className="rounded-lg h-[160px] w-full"
                />
                <h3 className="mt-4 text-xl font-bold">
                  <EditableText
                    text={project.name}
                    onChange={(value) =>
                      handleProjectUpdate(index, "name", value)
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
            text={data.footer.copyright}
            onChange={(value) => handleUpdate("footer", "copyright", value)}
          />
        </p>
      </footer>
    </div>
  );
};

export default PortfolioTemplate1;
