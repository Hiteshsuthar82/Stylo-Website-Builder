import { useLocation, useNavigate, useParams } from "react-router-dom";
import PortfolioTemplate1 from "./Portfolio/PortfolioTemplate1";
import { useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import PortfolioTemplate2 from "./Portfolio/PortfolioTemplate2";
import PortfolioTemplate4 from "./Portfolio/PortfolioTemplate4";
import PortfolioTemplate3 from "./Portfolio/PortfolioTemplate3";
import ProductShowcaseTemplate1 from "./ProductShowcase/ProductShowcaseTemplate1";
import formLoader from "../../assets/form-loader.gif";
import {
  portfolioTemplate,
  interiorDesignTemplate,
  productShowcaseTemplate,
} from "../../dummyData";
import InteriorDesignTemplate1 from "./InteriorDesign/InteriorDesignTemplate1";
import Popup from "../Popup";
import {
  createAndDeployWebsite,
  createWebsite,
  deployWebsite,
  getWebsitesDetails,
  reDeployWebsite,
  updateWebsiteDetails,
} from "../../features/websiteSlice";
import { useDispatch } from "react-redux";
import CreatingWebsiteLoader from "../Loaders/CreatingWebsiteLoader";
import WebsiteUpdateLoader from "../Loaders/WebsiteUpdateLoader";
import InteriorDesignTemplate2 from "./InteriorDesign/InteriorDesignTemplate2";
import InteriorDesignTemplate3 from "./InteriorDesign/InteriorDesignTemplate3";
import ProductShowcaseTemplate2 from "./ProductShowcase/ProductShowcaseTemplate2";

const  CreateWebsite = () => {
  const { templateId } = useParams();
  const { websiteType } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const websiteId = queryParams.get("id");
  const [templateData, setTemplateData] = useState(null);
  const [isWebsiteCreating, setIsWebsiteCreating] = useState(false);
  const [isWebsiteUpdating, setIsWebsiteUpdating] = useState(false);
  const [websiteCreationType, setWebsiteCreationType] = useState(null);
  const [isLogoTypeSelectionPopupOpened, setIsLogoTypeSelectionPopupOpened] =
    useState(true);
  const [isWebsiteDetailsPopupOpened, setIsWebsiteDetailsPopupOpened] =
    useState(false);

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
      dispatch(getWebsitesDetails({ websiteType, websiteId: websiteId })).then(
        (response) => {
          if (response) {
            const data = response.payload.data;
            console.log(data);
            setTemplateData(data);
            // setLoading(false);
          } else {
            console.log("getting error");
          }
        }
      );
    }
  }, [templateId]);

  const handleUpdate = (updatedData) => {
    setTemplateData(updatedData);
  };

  const onConfirmLogoType = (data) => {
    const updatedData = JSON.parse(JSON.stringify(templateData));
    updatedData.header.logoType = data?.logoType;
    updatedData.type = websiteType;
    if (data?.logoType === "text") {
      updatedData.header.logoText = data.logoText;
    } else if (data?.logoType === "image") {
      updatedData.header.logoImage = data.logoImage;
    }

    console.log(updatedData);

    setTemplateData(updatedData);
    setIsLogoTypeSelectionPopupOpened(false);
  };

  const onCreateWebsite = async (websiteDetails, actionType) => {
    setIsWebsiteCreating(true);
    setWebsiteCreationType(actionType);

    const updatedData = { ...templateData };

    updatedData.templateId = templateId;

    if (websiteDetails.websiteName && websiteDetails.websiteAuthorEmail) {
      updatedData.websiteName = websiteDetails.websiteName;
      updatedData.websiteAuthorEmail = websiteDetails.websiteAuthorEmail;
    }
    console.log("Website Data:", updatedData);

    try {
      const response = await dispatch(
        actionType === "draft"
          ? createWebsite(updatedData)
          : createAndDeployWebsite(updatedData)
      );

      if (response && response.payload && response.payload.data) {
        const data = response.payload.data;
        console.log(data);
        setIsWebsiteDetailsPopupOpened(false);
        setIsWebsiteCreating(false);

        // if(actionType === "publish") {
        // window.open(data?.deployedUrl, "_blank");
        // }
        navigate(`/myWebsites`);
      } else {
        console.log("This website name is already exist");
        setIsWebsiteCreating(false);
      }
    } catch (error) {
      console.log("Error occurred:", error.message || error);
    }
  };

  const onUpdateWebsite = async (websiteDetails, actionType) => {
    actionType === "publish" && templateData?.deployedUrl
      ? setIsWebsiteUpdating(true)
      : setIsWebsiteCreating(true);
    setWebsiteCreationType(actionType);

    const updatedData = JSON.parse(JSON.stringify(templateData));

    if (websiteDetails.websiteName && websiteDetails.websiteAuthorEmail) {
      updatedData.websiteName = websiteDetails.websiteName;
      updatedData.websiteAuthorEmail = websiteDetails.websiteAuthorEmail;
    }
    console.log("Website Data:", updatedData);

    try {
      const response = await dispatch(updateWebsiteDetails(updatedData));

      if (response && response.payload && response.payload.data) {
        const data = response.payload.data;
        console.log(data);
        if (actionType === "publish") {
          try {
            const session = await dispatch(
              templateData?.repoName
                ? reDeployWebsite({
                    websiteType: templateData.type,
                    websiteId: websiteId,
                  })
                : deployWebsite({
                    websiteType: templateData.type,
                    websiteId: websiteId,
                  })
            );
            console.log("session", session);
            
            if (session) {
              console.log("website re deployed successfully..");
              templateData?.deployedUrl
                ? setIsWebsiteUpdating(false)
                : setIsWebsiteCreating(false);
              navigate(`/myWebsites`);
            }
          } catch (error) {
            console.log("error when re deploying website..", error);
          }
        }
        actionType === "publish" && templateData?.deployedUrl
          ? setIsWebsiteUpdating(false)
          : setIsWebsiteCreating(false);
          navigate(`/myWebsites`);
      } else if (response?.error?.message == "Rejected") {
        console.log("This website name is already exist");
      } else {
        console.log("no website details found");
      }
    } catch (error) {
      console.log("Error occurred:", error.message || error);
    }

    // console.log("Website Data:", templateData);
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
        // case "t4":
        //   return (
        //     <PortfolioTemplate4
        //       data={templateData}
        //       onUpdate={handleUpdate}
        //       editable
        //     />
        //   );
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
            <InteriorDesignTemplate2
              data={templateData}
              onUpdate={handleUpdate}
              editable
            />
          );
        case "t3":
          return (
            <InteriorDesignTemplate3
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
            <ProductShowcaseTemplate2
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

return  !templateData ? (<div className="h-[75vh] w-full flex items-center justify-center">
      <img src={formLoader} alt="Loading.." className="h-40" />
    </div>) : (
    <div className="bg-white">
      {renderTemplate()}
      <button
        className="bg-[#9333ea] text-white py-3 px-5 fixed bottom-5 right-5 rounded-lg uppercase font-bold flex gap-3"
        onClick={() => setIsWebsiteDetailsPopupOpened(true)}
      >
        {/* Create Website */}
        <GrLinkNext size={24} /> {websiteId ? "Save Changes" : "Save Website"}
      </button>

      <Popup
        type="logoTypeSelection"
        isOpen={isLogoTypeSelectionPopupOpened}
        onClose={() => setIsLogoTypeSelectionPopupOpened(false)}
        onSubmit={onConfirmLogoType}
        WebsiteData={templateData}
      />
      <Popup
        type="addWebsiteDetails"
        isOpen={isWebsiteDetailsPopupOpened}
        onClose={() => setIsWebsiteDetailsPopupOpened(false)}
        onSubmit={websiteId ? onUpdateWebsite : onCreateWebsite}
        WebsiteData={websiteId ? templateData : ""}
        editing={!!websiteId}
      />

      {isWebsiteCreating && (
        <CreatingWebsiteLoader
          isOpen={isWebsiteCreating}
          actionType={websiteCreationType}
        />
      )}

      {isWebsiteCreating && (
        <CreatingWebsiteLoader
          isOpen={isWebsiteCreating}
          actionType={websiteCreationType}
        />
      )}

      {isWebsiteUpdating && (
        <WebsiteUpdateLoader
          isOpen={isWebsiteUpdating}
          actionType={websiteCreationType}
          onClose={() => setIsWebsiteUpdating(false)}
          websiteName={websiteId ? templateData.websiteName : ""}
          updateType={"redploy"} // update or "redploy"
        />
      )}
    </div>
  );
};

export default CreateWebsite;
