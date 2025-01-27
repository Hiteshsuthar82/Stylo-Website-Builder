import React, { useState } from "react";
import { Container, WebsiteTemplate } from "../index";
import { Template, ShowImagePopup } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function AllWebsiteTemplatesPage() {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const templates = useSelector((state) => state.resume.allTemplates);
  const { websiteType } = useParams();  

  const handleDemoClick = (templateId) => {
    navigate(`/website-demo/${websiteType}/${templateId}`);
  };

  const handleCreateWebsiteClick = (templateId) => {
    navigate(`/create-website/${websiteType}/${templateId}`);
  };

  const onNextClick = () => {
    navigate(`/create-website/${websiteType}/${selectedTemplateId}`);
  };

  return (
    <Container>
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-3 gap-10 flex-wrap justify-center">
        {templates[websiteType] &&
          templates[websiteType].map((template) => (
            <WebsiteTemplate
              key={template.id}
              templateData={template}
              isSelected={selectedTemplateId === template.id}
              onClick={setSelectedTemplateId}
              onDemoClick={handleDemoClick}
              onUseTemplateClick={handleCreateWebsiteClick}
            />
          ))}
      </div>
    </Container>
  );
}

export default AllWebsiteTemplatesPage;
