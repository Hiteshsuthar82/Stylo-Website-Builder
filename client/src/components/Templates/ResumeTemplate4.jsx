import React, { useState, useEffect } from "react";
import downloadIcon from "./../../assets/download-icon.svg";
import backIcon from "./../../assets/back-icon.svg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Resume({ data }) {
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
    <>
      {isMobileView ? (
        <div
          id="content-to-print"
          className="bg-white w-[90vw] h-[120vw] mx-auto p-[5vw] shadow-lg relative mt-10"
        >
          {/* Background Design */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-gradient-to-br from-purple-200 to-purple-300"></div>

          {/* Header Section */}
          <header className="flex justify-between items-center mb-[3vw] relative z-10">
            <div className="text-left">
              <h1 className="text-[4vw] font-bold text-black">{data.name}</h1>
              <p className="text-[2vw] mt-[1vw] text-gray-700 flex items-center">
                <span className="material-icons mr-[1vw]">email</span>
                {data.contact.email}
              </p>
              <p className="text-[2vw] mt-[1vw] text-gray-700 flex items-center">
                <span className="material-icons mr-[1vw]">phone</span>
                {data.contact.phone}
              </p>
              <p className="text-[2vw] mt-[1vw] text-gray-700 flex items-center">
                <span className="material-icons mr-[1vw]">github</span>
                <a
                  href={`https://${data.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {data.contact.github}
                </a>
              </p>
              <p className="text-[2vw] mt-[1vw] text-gray-700 flex items-center">
                <span className="material-icons mr-[1vw]">linkedin</span>
                <a
                  href={`https://${data.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {data.contact.linkedin}
                </a>
              </p>
            </div>
            {data.image && (
              <img
                src={data.image}
                alt="Profile"
                className="w-[13vw] h-[15vw] rounded-md shadow-md"
              />
            )}
          </header>

          {/* Two-Column Main Section */}
          <div className="grid grid-cols-2 gap-[3vw] relative z-10">
            {/* Left Column */}
            <div className="bg-gray-50 p-[4vw] rounded-lg shadow-md">
              {/* Profile Section */}
              <section className="mb-[3vw]">
                <h2 className="text-[3vw] font-semibold text-black border-b-2 border-black pb-[0.5vw]">
                  Profile
                </h2>
                <p className="text-[2vw] mt-[1vw] text-gray-700">
                  {data.profileSummary}
                </p>
              </section>

              {/* Experience Section */}
              <section className="mb-[3vw]">
                <h2 className="text-[3vw] font-semibold text-black border-b-2 border-black pb-[0.5vw]">
                  Experience
                </h2>
                {data.experience.map((job, index) => (
                  <div className="mt-[2vw]" key={index}>
                    <h3 className="text-[2.5vw] font-semibold">{job.title}</h3>
                    <p className="text-[2vw] text-gray-600">
                      {job.company} | {job.duration}
                    </p>
                    <ul className="list-disc list-inside text-[2vw] mt-[1vw] text-gray-700">
                      {job.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </div>

            {/* Right Column */}
            <div className="bg-gray-100 p-[4vw] rounded-lg shadow-md">
              {/* Education Section */}
              <section className="mb-[3vw]">
                <h2 className="text-[3vw] font-semibold text-black border-b-2 border-black pb-[0.5vw]">
                  Education
                </h2>
                {data.education.map((edu, index) => (
                  <div className="mt-[2vw]" key={index}>
                    <h3 className="text-[2.5vw] font-semibold">{edu.degree}</h3>
                    <p className="text-[2vw] text-gray-600">
                      {edu.institution} | {edu.duration}
                    </p>
                  </div>
                ))}
              </section>

              {/* Projects Section */}
              <section className="mb-[3vw]">
                <h2 className="text-[3vw] font-semibold text-black border-b-2 border-black pb-[0.5vw]">
                  Projects
                </h2>
                {data.projects.map((project, index) => (
                  <div className="mt-[2vw]" key={index}>
                    <h3 className="text-[2.5vw] font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-[2vw] text-gray-600">
                      {project.technologies} | {project.duration}
                    </p>
                    <ul className="list-disc list-inside text-[2vw] mt-[1vw] text-gray-700">
                      {project.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Skills Section */}
              <section>
                <h2 className="text-[3vw] font-semibold text-black border-b-2 border-black pb-[0.5vw]">
                  Skills
                </h2>
                <ul className="list-disc list-inside text-[2vw] mt-[2vw] text-gray-700">
                  <li>{data.skills.languages}</li>
                  <li>{data.skills.frameworks}</li>
                  <li>{data.skills.developerTools}</li>
                  <li>{data.skills.libraries}</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="content-to-print"
          className="bg-white w-[210mm] h-[297mm] mx-auto p-10 shadow-lg relative mt-16"
        >
          {/* Background Design */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-gradient-to-br from-purple-200 to-purple-300"></div>

          {/* Header Section */}
          <header className="flex justify-between items-center mb-8 relative z-10">
            <div className="text-left">
              <h1 className="text-5xl font-bold text-black">{data.name}</h1>
              <p className="text-lg mt-2 text-gray-700 flex items-center">
                <span className="material-icons mr-2">email</span>
                {data.contact.email}
              </p>
              <p className="text-lg mt-2 text-gray-700 flex items-center">
                <span className="material-icons mr-2">phone</span>
                {data.contact.phone}
              </p>
              <p className="text-lg mt-2 text-gray-700 flex items-center">
                <span className="material-icons mr-2">github</span>
                <a
                  href={`https://${data.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {data.contact.github}
                </a>
              </p>
              <p className="text-lg mt-2 text-gray-700 flex items-center">
                <span className="material-icons mr-2">linkedin</span>
                <a
                  href={`https://${data.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {data.contact.linkedin}
                </a>
              </p>
            </div>
            {data.image && (
              <img
                src={data.image}
                alt="Profile"
                className="w-36 h-40 rounded-md shadow-md"
              />
            )}
          </header>

          {/* Two-Column Main Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* Left Column */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              {/* Profile Section */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold text-black border-b-2 border-black pb-1">
                  Profile
                </h2>
                <p className="mt-2 text-gray-700">{data.profileSummary}</p>
              </section>

              {/* Experience Section */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold text-black border-b-2 border-black pb-1">
                  Experience
                </h2>
                {data.experience.map((job, index) => (
                  <div className="mt-4" key={index}>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-lg text-gray-600">
                      {job.company} | {job.duration}
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {job.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </div>

            {/* Right Column */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              {/* Education Section */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold text-black border-b-2 border-black pb-1">
                  Education
                </h2>
                {data.education.map((edu, index) => (
                  <div className="mt-4" key={index}>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-lg text-gray-600">
                      {edu.institution} | {edu.duration}
                    </p>
                  </div>
                ))}
              </section>

              {/* Projects Section */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold text-black border-b-2 border-black pb-1">
                  Projects
                </h2>
                {data.projects.map((project, index) => (
                  <div className="mt-4" key={index}>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-lg text-gray-600">
                      {project.technologies} | {project.duration}
                    </p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {project.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Skills Section */}
              <section>
                <h2 className="text-2xl font-semibold text-black border-b-2 border-black pb-1">
                  Skills
                </h2>
                <ul className="list-disc list-inside mt-4 text-gray-700">
                  <li>{data.skills.languages}</li>
                  <li>{data.skills.frameworks}</li>
                  <li>{data.skills.developerTools}</li>
                  <li>{data.skills.libraries}</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Download Button */}
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
}

export default Resume;
