import React from "react";
import PropTypes from "prop-types";

const EditableText = ({ text, onChange, className = "", editable }) => {
  const handleBlur = (e) => {
    const newValue = e.target.innerText;
    onChange(newValue);
  };

  return (
    <span
      contentEditable={editable}
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`outline-none ${
        editable && "hover:bg-opacity-10 hover:bg-black cursor-pointer"
      } ${className}`}
    >
      {text}
    </span>
  );
};

// Use default parameters in the function signature
EditableText.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default EditableText;
