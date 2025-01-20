import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PortfolioTemplate1 from "./Portfolio/PortfolioTemplate1";
import PortfolioTemplate2 from "./Portfolio/PortfolioTemplate2";
import NoTemplateAvailableView from "./NoTemplateAvailableView";
import PortfolioTemplate3 from "./Portfolio/PortfolioTemplate3";
import PortfolioTemplate4 from "./Portfolio/PortfolioTemplate4";

const WebsiteDemo = () => {
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

  if (!templateData) {
    return <div>Loading...</div>;
  }

  if (websiteType == "portfolio") {
    switch (templateId) {
      case "t1":
        return (
          <PortfolioTemplate1 data={templateData} onUpdate={handleUpdate} />
        );
        break;
      case "t2":
        return (
          <PortfolioTemplate2 data={templateData} onUpdate={handleUpdate} />
        );
        break;
      case "t3":
        return (
          <PortfolioTemplate3 data={templateData} onUpdate={handleUpdate} />
        );
        break;
      case "t4":
        return (
          <PortfolioTemplate4 data={templateData} onUpdate={handleUpdate} />
        );
        break;
      default:
        return <NoTemplateAvailableView />;
        break;
    }
  }
};

export default WebsiteDemo;
