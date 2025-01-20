import { useParams } from "react-router-dom";
import PortfolioTemplate1 from "./Portfolio/PortfolioTemplate1";
import { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import PortfolioTemplate2 from "./Portfolio/PortfolioTemplate2";

const CreateWebsite = () => {
  const { templateId } = useParams();
  const { websiteType } = useParams();
  const [templateData, setTemplateData] = useState(null);

  const portfolioTemplate = {
    header: {
      title: "First",
      phone: "120-340-8900",
      items: [
        { id: 1, text: "About", href: "#about" },
        { id: 2, text: "Services", href: "#services" },
        { id: 3, text: "Projects", href: "#projects" },
        { id: 4, text: "Contact", href: "#contact" },
      ],
    },
    hero: {
      greeting: "Hello friend!",
      subtitle: "I'm available for freelance work.",
      cta: "Let's begin",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s",
    },
    about: {
      title: "My Story",
      description: "A little bit about Joshua...",
      details: {
        name: "Joshua Morgan",
        birthday: "Aug 12, 1989",
        phone: "120-340-8900",
        email: "hello@joshua.com",
      },
      image:
        "https://plus.unsplash.com/premium_photo-1661833879387-1513bf753554?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    services: {
      title: "Services",
      items: [
        {
          name: "Websites",
          price: "$2,000",
          description: "Explore my CSS templates.",
        },
        {
          name: "Branding",
          price: "$1,500",
          description: "Custom branding services.",
        },
        {
          name: "Ecommerce",
          price: "$3,000",
          description: "Customized ecommerce solutions.",
        },
        {
          name: "SEO",
          price: "$1,450",
          description: "SEO for top search engine rankings.",
        },
      ],
    },
    projects: {
      title: "Projects",
      items: [
        {
          name: "Online shopping",
          image:
            "https://i.graphicmama.com/blog/wp-content/uploads/2020/07/09110116/website-design-idea-gradients-in-web-design-example-4.jpg",
        },
        {
          name: "Food Website",
          image:
            "https://www.figma.com/community/resource/a68f5ea1-6e0e-4ac6-b22c-1066c463ada7/thumbnail",
        },
        {
          name: "Zoik Agency",
          image:
            "https://assets.justinmind.com/wp-content/uploads/2021/11/web-design-portfolio-templates-eve.png",
        },
      ],
    },
    contact: {
      title: "Say Hi",
    },
    footer: {
      copyright: "© 2025 First Portfolio. All rights reserved.",
    },
  };

  useEffect(() => {
    setTemplateData(portfolioTemplate);

    //   // Fetch the data from the backend using the templateId
    //   fetch(`http://localhost:5000/api/template/${templateId}`)
    //     .then((response) => response.json())
    //     .then((data) => setTemplateData(data))
    //     .catch((error) => console.error("Error fetching data:", error));
  }, [templateId]);

  const handleUpdate = (updatedData) => {
    setTemplateData(updatedData);
  };

  const handleCreateWebsite = () => {
    console.log("Website Data:", templateData);
  };

  const renderTemplate = () => {
    switch (templateId) {
      case "t1":
        return (
          <PortfolioTemplate1
            data={templateData}
            onUpdate={handleUpdate}
            editable
          />
        );
      case "t2":
        return (
          <PortfolioTemplate2
            data={templateData}
            onUpdate={handleUpdate}
            editable
          />
        );
      // Add more cases for additional templates
      default:
        return (
          <div className="text-center text-gray-500">
            <h2 className="text-2xl font-bold">Template Not Found</h2>
            <p>Please select a valid template.</p>
          </div>
        );
    }
  };

  if (!templateData) {
    return <div>Loading...</div>;
  }

  if (websiteType == "portfolio") {
    return (
      <div className="p-10">
        {renderTemplate()}
        <button
          className="bg-purple-400 py-2 px-2 fixed top-3 right-20 rounded-full uppercase font-bold"
          onClick={handleCreateWebsite}
        >
          {/* Create Website */}
          <GrLinkNext size={24} />
        </button>
      </div>
    );
  }
};

export default CreateWebsite;
