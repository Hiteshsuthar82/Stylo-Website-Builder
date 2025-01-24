import { useParams } from "react-router-dom";
import PortfolioTemplate1 from "./Portfolio/PortfolioTemplate1";
import { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import PortfolioTemplate2 from "./Portfolio/PortfolioTemplate2";
import PortfolioTemplate4 from "./Portfolio/PortfolioTemplate4";
import PortfolioTemplate3 from "./Portfolio/PortfolioTemplate3";
import ProductShowcaseTemplate1 from "./ProductShowcase/ProductShowcaseTemplate1";

import { portfolioTemplate, interiorDesignTemplate, productShowcaseTemplate } from "../../dummyData";
import InteriorDesignTemplate1 from "./InteriorDesign/InteriorDesignTemplate1";

const CreateWebsite = () => {
  const { templateId } = useParams();
  const { websiteType } = useParams();
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    if (websiteType == "portfolio") {
      setTemplateData(portfolioTemplate);
    } else if (websiteType == "interiorDesign") {
      setTemplateData(interiorDesignTemplate);
    } else if (websiteType == "productShowcase") {
      setTemplateData(productShowcaseTemplate);
    }
  }, [templateId]);

  const handleUpdate = (updatedData) => {
    setTemplateData(updatedData);
  };

  const handleCreateWebsite = () => {
    console.log("Website Data:", templateData);
  };

  const renderTemplate = () => {
    if (websiteType == "portfolio") {
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
        case "t3":
          return (
            <PortfolioTemplate3
              data={templateData}
              onUpdate={handleUpdate}
              editable
            />
          );
        case "t4":
          return (
            <PortfolioTemplate4
              data={templateData}
              onUpdate={handleUpdate}
              editable
            />
          );
        default:
          return (
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-bold">Template Not Found</h2>
              <p>Please select a valid template.</p>
            </div>
          );
      }
    } else if (websiteType == "interiorDesign") {
      switch (templateId) {
        case "t1":
          return (
            <InteriorDesignTemplate1
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
        default:
          return (
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-bold">Template Not Found</h2>
              <p>Please select a valid template.</p>
            </div>
          );
      }
    } else if (websiteType == "productShowcase") {
      switch (templateId) {
        case "t1":
          return (
            <ProductShowcaseTemplate1
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
        default:
          return (
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-bold">Template Not Found</h2>
              <p>Please select a valid template.</p>
            </div>
          );
      }
    }
  };

  if (!templateData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      {renderTemplate()}
      <button
        className="bg-[#9333ea] text-white py-3 px-5 fixed bottom-5 right-5 rounded-lg uppercase font-bold flex gap-3"
        onClick={handleCreateWebsite}
      >
        {/* Create Website */}
        <GrLinkNext size={24} /> Create Website
      </button>
    </div>
  );
};

export default CreateWebsite;
