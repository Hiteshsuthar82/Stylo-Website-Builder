import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PortfolioTemplate1 from "./Portfolio/PortfolioTemplate1";
import PortfolioTemplate2 from "./Portfolio/PortfolioTemplate2";
import NoTemplateAvailableView from "./NoTemplateAvailableView";
import PortfolioTemplate3 from "./Portfolio/PortfolioTemplate3";
import PortfolioTemplate4 from "./Portfolio/PortfolioTemplate4";
import InteriorDesignTemplate1 from "./InteriorDesign/InteriorDesignTemplate1";
import { portfolioTemplate, interiorDesignTemplate } from "../../dummyData";

const WebsiteDemo = () => {
  const { templateId } = useParams();
  const { websiteType } = useParams();
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    if (websiteType == "portfolio") {
      setTemplateData(portfolioTemplate);
    } else if (websiteType == "interiorDesign") {
      setTemplateData(interiorDesignTemplate);
    }
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
  else if (websiteType == "interiorDesign") {
    switch (templateId) {
      case "t1":
        return (
          <InteriorDesignTemplate1 data={templateData} onUpdate={handleUpdate} />
        );
      case "t2":
        return (
          <PortfolioTemplate2 data={templateData} onUpdate={handleUpdate} />
        );
      default:
        return <NoTemplateAvailableView />;
    }
  }
};

export default WebsiteDemo;
