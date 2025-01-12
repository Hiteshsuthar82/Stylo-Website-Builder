import React, { useEffect, useState } from "react";
import downloadIcon from "./../../assets/download-icon.svg";
import backIcon from "./../../assets/back-icon.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeTemplate2 = ({ data }) => {
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
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <>
      {isMobileView ? (
        <div
          id="content-to-print"
          className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-[2vw] flex mt-10"
        >
          {/* Left Sidebar */}
          <div className="w-[33vw] bg-gray-100 p-[2vw] rounded-l-lg">
            <div className="text-center mb-[2vw]">
              {data.image && (
                <img
                  src={data.image}
                  alt="Profile"
                  className="w-[8vw] h-[8vw] rounded-full mx-auto mb-[1vw]"
                />
              )}
              <h1 className="text-[3vw] font-bold text-orange-600">
                {data.name}
              </h1>
              <p className="text-[1.5vw] text-gray-700">
                {data.permanentdata ? "Permanent Data" : ""}
              </p>
            </div>

            <div className="mb-[2vw]">
              <h2 className="text-[2vw] font-semibold text-orange-600">
                Contact Information
              </h2>
              <ul className="text-[1.5vw] text-gray-700">
                {data.contact.email && <li>Email: {data.contact.email}</li>}
                {data.contact.phone && <li>Phone: {data.contact.phone}</li>}
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

            <div>
              <h2 className="text-[2vw] font-semibold text-orange-600">
                Skills
              </h2>
              <ul className="text-[1.5vw] text-gray-700 list-disc list-inside">
                <li>Languages: {data.skills.languages}</li>
                <li>Frameworks: {data.skills.frameworks}</li>
                <li>Developer Tools: {data.skills.developerTools}</li>
                <li>Libraries: {data.skills.libraries}</li>
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-[66vw] p-[2vw]">
            <div className="mb-[2vw]">
              <h2 className="text-[2.5vw] font-semibold text-orange-600">
                Professional Summary
              </h2>
              <p className="text-[1.5vw] text-gray-700">
                {data.profileSummary}
              </p>
            </div>

            <div className="mb-[2vw]">
              <h2 className="text-[2.5vw] font-semibold text-orange-600">
                Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="text-[1.5vw] text-gray-700 mt-[1vw]"
                >
                  <h3 className="font-bold">{exp.title}</h3>
                  <p>
                    {exp.company}, {exp.location} - {exp.duration}
                  </p>
                  <ul className="list-disc list-inside">
                    {exp.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-[2.5vw] font-semibold text-orange-600">
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="text-[1.5vw] text-gray-700 mt-[1vw]"
                >
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p>
                    {edu.institution}, {edu.location} - {edu.duration}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-[2.5vw] font-semibold text-orange-600">
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="text-[1.5vw] text-gray-700 mt-[1vw]"
                >
                  <h3 className="font-bold">{project.title}</h3>
                  <p>Technologies: {project.technologies}</p>
                  <ul className="list-disc list-inside">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          id="content-to-print"
          className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 flex mt-16"
        >
          {/* Left Sidebar */}
          <div className="w-1/3 bg-gray-100 p-6 rounded-l-lg">
            <div className="text-center mb-8">
              {data.image && (
                <img
                  src={data.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
              )}
              <h1 className="text-3xl font-bold text-orange-600">
                {data.name}
              </h1>
              <p className="text-lg text-gray-700">
                {data.permanentdata ? "Permanent Data" : ""}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-orange-600">
                Contact Information
              </h2>
              <ul className="text-gray-700">
                {data.contact.email && <li>Email: {data.contact.email}</li>}
                {data.contact.phone && <li>Phone: {data.contact.phone}</li>}
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

            <div>
              <h2 className="text-xl font-semibold text-orange-600">Skills</h2>
              <ul className="text-gray-700 list-disc list-inside">
                <li>Languages: {data.skills.languages}</li>
                <li>Frameworks: {data.skills.frameworks}</li>
                <li>Developer Tools: {data.skills.developerTools}</li>
                <li>Libraries: {data.skills.libraries}</li>
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-2/3 p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-orange-600">
                Professional Summary
              </h2>
              <p className="text-gray-700">{data.profileSummary}</p>
            </div>

            <div className="mb-8">
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
                    {exp.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
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

            <div>
              <h2 className="text-2xl font-semibold text-orange-600">
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="text-gray-700 mt-4">
                  <h3 className="font-bold">{project.title}</h3>
                  <p>Technologies: {project.technologies}</p>
                  <ul className="list-disc list-inside">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
  );
};

export default ResumeTemplate2;
