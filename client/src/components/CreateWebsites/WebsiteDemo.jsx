import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PortfolioTemplate1 from "./Portfolio/PortfolioTemplate1";
import PortfolioTemplate2 from "./Portfolio/PortfolioTemplate2";
import NoTemplateAvailableView from "./NoTemplateAvailableView";
import PortfolioTemplate3 from "./Portfolio/PortfolioTemplate3";
import PortfolioTemplate4 from "./Portfolio/PortfolioTemplate4";
import InteriorDesignTemplate1 from "./InteriorDesign/InteriorDesignTemplate1";
import { portfolioTemplate, interiorDesignTemplate, productShowcaseTemplate } from "../../dummyData";
import ProductShowcaseTemplate1 from "./ProductShowcase/ProductShowcaseTemplate1";
import { useDispatch } from "react-redux";
import { getWebsitesDetails } from "../../features/websiteSlice";

const WebsiteDemo = () => {
  const { templateId } = useParams();
  const { websiteType } = useParams();
  const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const websiteId = queryParams.get('id');
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    if (!websiteId) {
      if (websiteType == "portfolio") {
        setTemplateData(portfolioTemplate);
      } else if (websiteType == "interiorDesign") {
        setTemplateData(interiorDesignTemplate);
      } else if (websiteType == "productShowcase") {
        setTemplateData(productShowcaseTemplate);
      }
    } else {
      dispatch(getWebsitesDetails({ websiteId: websiteId })).then((response) => {
        if (response) {
          const data = response.payload.data;
          console.log(data);
          setTemplateData(data)
          // setLoading(false);
        } else {
          console.log("getting error");
        }
      })
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
  else if (websiteType == "productShowcase") {
    switch (templateId) {
      case "t1":
        return (
          <ProductShowcaseTemplate1 data={templateData} onUpdate={handleUpdate} />
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
