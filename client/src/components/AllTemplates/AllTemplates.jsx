import React, { useState } from "react";
import { Container } from "./../index";
import { Template, ShowImagePopup } from "./../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllTemplates() {
  const navigate = useNavigate();
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [enlargedImageSrc, setEnlargedImageSrc] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isImageVisible, setImageVisible] = useState(false);

  const templates = useSelector((state) => state.resume.allTemplates);

  const handleSearchClick = (templateId) => {
    navigate(`/website-demo/portfolio/${templateId}`);
    // setEnlargedImageSrc(src);
    // setPopupVisible(true);
    // setTimeout(() => setImageVisible(true), 10);
  };

  const closePopup = () => {
    setImageVisible(false);
    setTimeout(() => {
      setPopupVisible(false);
      setEnlargedImageSrc(null);
    }, 300);
  };

  const onNextClick =() =>{
    // navigate(`/createResume/${selectedTemplateId}`)
    navigate(`/create-website/portfolio/${selectedTemplateId}`)
  }

  return (
    <Container>
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-3 gap-16 flex-wrap justify-center">
        {templates &&
          templates.map((template) => (
            <Template
              key={template.id}
              templateData={template}
              isSelected={selectedTemplateId === template.id}
              onClick={setSelectedTemplateId}
              onSearchClick={handleSearchClick}
            />
          ))}
      </div>

      {selectedTemplateId && (
        <button
          onClick={onNextClick}
          className="mt-5 px-10 py-3 fixed bottom-5 right-5 sm:bottom-8 sm:right-8 lg:bottom-9 lg:right-11 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all"
        >
          Next
        </button>
      )}

      {enlargedImageSrc && (
        <ShowImagePopup
          src={enlargedImageSrc}
          isPopupVisible={isPopupVisible}
          isImageVisible={isImageVisible}
          closePopup={closePopup}
        />
      )}
    </Container>
  );
}

export default AllTemplates;
