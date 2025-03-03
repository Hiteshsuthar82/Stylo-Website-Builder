import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  DeleteConfirmationDialog,
  WebsiteTemplate,
} from "../index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import loader from "../../assets/page-loader.gif";
import {
  deleteWebsite,
  deployWebsite,
  getAllWebsites,
} from "../../features/websiteSlice";
import DeploymentLoader from "../Loaders/DeploymentLoader";
import { set } from "react-hook-form";

function MyWebsites() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
  const [selectedWebsiteName, setSelectedWebsiteName] = useState(null);
  const [selectedWebsiteType, setSelectedWebsiteType] = useState(null);
  const [selectedWebsiteUrl, setSelectedWebsiteUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [isdeleteConfirmationDialog, setDeleteConfirmationDialog] =
    useState(false);
  const [isdDeploying, setIsDeploying] = useState(false);
  const templates = useSelector((state) => state.website.allTemplates);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id);
  const [myWebsites, setMyWebsites] = useState([]);

  const handleEditClick = async (websiteId, websiteType, templateId) => {
    console.log(websiteId, websiteType);
    navigate(`/create-website/${websiteType}/${templateId}?id=${websiteId}`);
    // navigate(`/create-website/portfolio/${selectedWebsiteId}/`);
  };

  const handleDeleteClick = (websiteId, websiteType, websiteName) => {
    setDeleteConfirmationDialog(true);
    setSelectedWebsiteId(websiteId);
    setSelectedWebsiteType(websiteType);
    setSelectedWebsiteName(websiteName);
  };

  const handleGoLive = async (websiteId, websiteType, websiteName) => {
    setIsDeploying(true);
    setSelectedWebsiteId(websiteId);
    setSelectedWebsiteName(websiteName);
    try {
      const session = await dispatch(
        deployWebsite({ websiteType: websiteType, websiteId: websiteId })
      );
      if (session) {
        console.log("website deployed successfully..");
        setIsDeploying(false);
        await getAllWebsitesAfter();
      }
    } catch (error) {
      console.log("error when deploying website..", error);
    }
  };

  const getAllWebsitesAfter = async () => {
    setLoading(true);
    try {
      dispatch(getAllWebsites()).then((response) => {
        if (response && response?.meta?.statusCode !== 404) {
          console.log(
            "all websites fetched successfully..",
            response.payload.data
          );
          setMyWebsites(response.payload.data);
          setLoading(false);
        } else {
          // write code if there are note any website for current user
          console.log("no websites found");
          setMyWebsites(null);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("error when fetching websites..", error);
    }
  };

  const handleCancelDeleteClick = () => {
    setDeleteConfirmationDialog(false);
  };

  const handleConfirmDeleteClick = async () => {
    console.log("deleting website..", selectedWebsiteId);

    setDeleting(true);
    try {
      const session = await dispatch(
        deleteWebsite({
          websiteType: selectedWebsiteType,
          websiteId: selectedWebsiteId,
        })
      );
      if (session) {
        setDeleting(false);
        setDeleteConfirmationDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onTemplateSelect = (
    templateId,
    websiteId,
    websiteType,
    deployedUrl,
    websiteName
  ) => {
    setSelectedTemplateId(templateId);
    setSelectedWebsiteId(websiteId);
    setSelectedWebsiteType(websiteType);
    setSelectedWebsiteUrl(deployedUrl);
    setSelectedWebsiteName(websiteName);
  };

  useEffect(() => {
    getAllWebsitesAfter();
  }, [deleting]);

  const allArraysEmpty = Object.values(myWebsites).every(
    (arr) => arr.length === 0
  );

  return allArraysEmpty && !loading ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 9V6a2.25 2.25 0 012.25-2.25h.75a2.25 2.25 0 012.25 2.25v3m3 0v5.25A2.25 2.25 0 0115.75 16.5h-7.5A2.25 2.25 0 016 14.25V9m9 0V6.75a2.25 2.25 0 00-2.25-2.25h-.75a2.25 2.25 0 00-2.25 2.25V9m3 0v3.75m-3 0h-.75A2.25 2.25 0 019 11.25V9"
          ></path>
        </svg>
        <h1 className="text-2xl font-semibold text-gray-700">
          No Website Found
        </h1>
        <p className="text-gray-500 mt-2">
          It looks like there are no websites available at the moment.
        </p>
        <button
          className="mt-6 bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-600"
          onClick={() => navigate("/steps")}
        >
          Create a New Website
        </button>
      </div>
    </div>
  ) : loading ? (
    <div className="h-[75vh] w-full flex items-center justify-center">
      <img src={loader} alt="Loading.." className="h-40" />
    </div>
  ) : (
    <Container>
      <div className="pt-8 mx-3 gap-16 flex-wrap justify-center">
        {templates && myWebsites ? (
          <>
            {Object.keys(myWebsites).map((type, index) => {
              if (myWebsites[type]?.length > 0) {
                return (
                  <div key={type} className="mb-8">
                    <h2
                      className={`text-2xl font-bold mb-4 uppercase bg-slate-200 rounded-md text-slate-900 py-4 pl-5 ${
                        index !== 0 ? "mt-10" : ""
                      }`}
                    >
                      {type.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                      {myWebsites[type].map((website, index) => {
                        const template = templates[website.type]?.find(
                          (template) => template.id === website.templateId
                        );

                        if (template) {
                          return (
                            <WebsiteTemplate
                              key={website._id || index}
                              templateData={template}
                              name={website.websiteName}
                              onClick={onTemplateSelect}
                              isSelected={selectedWebsiteId === website._id}
                              websiteId={website._id}
                              websiteType={website.type}
                              deployedUrl={website?.deployedUrl}
                              onEditClick={handleEditClick}
                              onDeleteClick={handleDeleteClick}
                              onGoLive={handleGoLive}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </>
        ) : (
          ``
        )}
      </div>

      {/* delete confirmation dialog */}
      {isdeleteConfirmationDialog && (
        <DeleteConfirmationDialog
          websiteName={selectedWebsiteName}
          deleting={deleting}
          onCancelClick={handleCancelDeleteClick}
          onDeleteClick={handleConfirmDeleteClick}
        />
      )}

      {isdDeploying && (
        <DeploymentLoader
          isOpen={isdDeploying}
          websiteName={selectedWebsiteName}
          onClose={() => setIsDeploying(false)}
        />
      )}
    </Container>
  );
}

export default MyWebsites;
