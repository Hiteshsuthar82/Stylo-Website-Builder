import React, { useState } from "react";
import { Container, WebsiteTemplate } from "../index";
import { Template, ShowImagePopup } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PaymentPlans from "../PaymentGateway/PaymentPlans";

function AllWebsiteTemplatesPage() {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const templates = useSelector((state) => state.website.allTemplates);
  const { websiteType } = useParams();
  const [showPlansPopup, setShowPlansPopup] = useState(false);
  const userData = useSelector((state) => state.auth.user);

  const togglePlansPopup = () => {
    setShowPlansPopup(!showPlansPopup);
  };

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
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-3 gap-10 flex-wrap justify-center md:mx-10">
        {templates[websiteType] &&
          templates[websiteType].map((template) => (
            <WebsiteTemplate
              key={template.id}
              templateData={template}
              isSelected={selectedTemplateId === template.id}
              onClick={setSelectedTemplateId}
              onDemoClick={handleDemoClick}
              onUseTemplateClick={template.premium && !userData.isPremium ? togglePlansPopup : handleCreateWebsiteClick}
            />
          ))}
      </div>
      {/* Premium Plans Popup */}
      {showPlansPopup && (
        <PaymentPlans togglePlansPopup={togglePlansPopup}/>
      )}
    </Container>
  );
}

export default AllWebsiteTemplatesPage;
