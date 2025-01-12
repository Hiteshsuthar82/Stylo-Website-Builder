import React, { useEffect, useState } from "react";
import downloadIcon from "./../../assets/download-icon.svg";
import backIcon from "./../../assets/back-icon.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeTemplate1 = ({ data }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  // Add a resize event listener when the component mounts
  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen to window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const generatePDF = () => {
    const input = document.getElementById("content-to-print");

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const ratio = pdfWidth / canvasWidth;
      const imgHeight = canvasHeight * ratio;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add extra pages if the content is taller than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("download.pdf");
    });
  };

  return (
    data && (
      <>
        {isMobileView ? (
          <div
            id="content-to-print"
            className="bg-white mx-auto p-8 shadow-lg mt-10"
            style={{
              width: "90vw", // Adjust width to viewport width
              maxWidth: "1200px", // Limit the width on larger screens
              padding: "4vw", // Responsive padding
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="text-center bg-gray-100 rounded-lg py-2">
              {data.image && (
                <img
                  src={data.image}
                  alt="Profile"
                  className="rounded-full mx-auto mb-[1vw]"
                  style={{ width: "15vw", height: "15vw" }} // Image size as a percentage of viewport width
                />
              )}
              <h1
                style={{ fontSize: "4vw" }}
                className="font-bold text-orange-600"
              >
                {data.name}
              </h1>
              <p style={{ fontSize: "2vw" }} className="text-gray-700">
                {data.occupation || "Occupation"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="mt-[3vw]">
                <h2
                  style={{ fontSize: "3vw" }}
                  className="font-semibold text-orange-600"
                >
                  Profile
                </h2>
                <p className="text-gray-700" style={{ fontSize: "2vw" }}>
                  {data.profileSummary}
                </p>
              </div>
              <div className="mt-[3vw]">
                <h2
                  style={{ fontSize: "3vw" }}
                  className="font-semibold text-orange-600"
                >
                  Contact Information
                </h2>
                <ul className="text-gray-700" style={{ fontSize: "2vw" }}>
                  <li>Phone: {data.contact.phone}</li>
                  <li>Email: {data.contact.email}</li>
                  {data.contact.github && (
                    <li>
                      GitHub:{" "}
                      <a
                        href={`https://${data.contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {data.contact.github}
                      </a>
                    </li>
                  )}
                  {data.contact.linkedin && (
                    <li>
                      LinkedIn:{" "}
                      <a
                        href={`https://${data.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {data.contact.linkedin}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-[3vw]">
              <h2
                style={{ fontSize: "3vw" }}
                className="font-semibold text-orange-600"
              >
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="text-gray-700 mt-[2vw]"
                  style={{ fontSize: "2vw" }}
                >
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p>
                    {edu.institution}, {edu.location} - {edu.duration}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-[3vw]">
              <h2
                style={{ fontSize: "3vw" }}
                className="font-semibold text-orange-600"
              >
                Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="text-gray-700 mt-[2vw]"
                  style={{ fontSize: "2vw" }}
                >
                  <h3 className="font-bold">{exp.title}</h3>
                  <p>
                    {exp.company}, {exp.location} - {exp.duration}
                  </p>
                  <ul className="list-disc list-inside">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-[3vw]">
              <h2
                style={{ fontSize: "3vw" }}
                className="font-semibold text-orange-600"
              >
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="text-gray-700 mt-[2vw]"
                  style={{ fontSize: "2vw" }}
                >
                  <h3 className="font-bold">{project.title}</h3>
                  <p>
                    {project.technologies} - {project.duration}
                  </p>
                  <ul className="list-disc list-inside">
                    {project.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-[3vw]">
              <h2
                style={{ fontSize: "3vw" }}
                className="font-semibold text-orange-600"
              >
                Skills
              </h2>
              <ul
                className="text-gray-700 list-disc list-inside"
                style={{ fontSize: "2vw" }}
              >
                {Object.entries(data.skills).map(([key, value], index) => (
                  <li key={index}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div
            id="content-to-print"
            className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-16"
          >
            <div className="text-center bg-gray-100 rounded-lg py-3">
              {data.image && (
                <img
                  src={data.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
              )}
              <h1 className="text-4xl font-bold text-orange-600">
                {data.name}
              </h1>
              <p className="text-lg text-gray-700">
                {data.occupation || "Occupation"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-orange-600">
                  Profile
                </h2>
                <p className="text-gray-700">{data.profileSummary}</p>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-orange-600">
                  Contact Information
                </h2>
                <ul className="text-gray-700">
                  <li>Phone: {data.contact.phone}</li>
                  <li>Email: {data.contact.email}</li>
                  {data.contact.github && (
                    <li>
                      GitHub:{" "}
                      <a
                        href={`https://${data.contact.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {data.contact.github}
                      </a>
                    </li>
                  )}
                  {data.contact.linkedin && (
                    <li>
                      LinkedIn:{" "}
                      <a
                        href={`https://${data.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {data.contact.linkedin}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-orange-600">
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="text-gray-700 mt-4">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p>
                    {edu.institution}, {edu.location} - {edu.duration}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-orange-600">
                Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="text-gray-700 mt-4">
                  <h3 className="font-bold">{exp.title}</h3>
                  <p>
                    {exp.company}, {exp.location} - {exp.duration}
                  </p>
                  <ul className="list-disc list-inside">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-orange-600">
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="text-gray-700 mt-4">
                  <h3 className="font-bold">{project.title}</h3>
                  <p>
                    {project.technologies} - {project.duration}
                  </p>
                  <ul className="list-disc list-inside">
                    {project.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-orange-600">Skills</h2>
              <ul className="text-gray-700 list-disc list-inside">
                {Object.entries(data.skills).map(([key, value], index) => (
                  <li key={index}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <button
          className={`fixed bottom-0  right-10 p-5 my-9 text-white font-bold text-base rounded-full bg-purple-600 hover:bg-purple-700`}
          onClick={generatePDF}
        >
          <img src={downloadIcon} alt="Download" />
        </button>
        <button
          className={`hidden md:block fixed top-10 left-2 p-3 my-9 text-white font-bold text-base rounded-full bg-gray-400 hover:bg-purple-700`}
          onClick={() => window.history.back()}
        >
          <img src={backIcon} alt="Download" />
        </button>
      </>
    )
  );
};

export default ResumeTemplate1;
