import React, { useState } from "react";
import "./App.css";

const portfolioTemplate = {
  hero: {
    heading: "Your Name",
    subheading: "Your Profession",
    description: "A brief introduction about yourself.",
  },
  about: {
    title: "About Me",
    content: "Write something about yourself here.",
  },
  contact: {
    title: "Contact Me",
    email: "your-email@example.com",
    phone: "123-456-7890",
  },
};

const EditableText = ({ text, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(value);
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
};

const PortfolioTemplate = ({ data, onUpdate }) => {
  const handleUpdate = (section, key, value) => {
    const updatedData = { ...data, [section]: { ...data[section], [key]: value } };
    onUpdate(updatedData);
  };

  return (
    <div className="portfolio-template">
      <section className="hero">
        <h1>
          <EditableText
            text={data.hero.heading}
            onChange={(value) => handleUpdate("hero", "heading", value)}
          />
        </h1>
        <h2>
          <EditableText
            text={data.hero.subheading}
            onChange={(value) => handleUpdate("hero", "subheading", value)}
          />
        </h2>
        <p>
          <EditableText
            text={data.hero.description}
            onChange={(value) => handleUpdate("hero", "description", value)}
          />
        </p>
      </section>
      <section className="about">
        <h2>
          <EditableText
            text={data.about.title}
            onChange={(value) => handleUpdate("about", "title", value)}
          />
        </h2>
        <p>
          <EditableText
            text={data.about.content}
            onChange={(value) => handleUpdate("about", "content", value)}
          />
        </p>
      </section>
      <section className="contact">
        <h2>
          <EditableText
            text={data.contact.title}
            onChange={(value) => handleUpdate("contact", "title", value)}
          />
        </h2>
        <p>
          Email: 
          <EditableText
            text={data.contact.email}
            onChange={(value) => handleUpdate("contact", "email", value)}
          />
        </p>
        <p>
          Phone: 
          <EditableText
            text={data.contact.phone}
            onChange={(value) => handleUpdate("contact", "phone", value)}
          />
        </p>
      </section>
    </div>
  );
};

export default PortfolioTemplate;
