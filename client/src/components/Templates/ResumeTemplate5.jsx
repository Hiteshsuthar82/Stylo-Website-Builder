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
          className="mt-7 w-[80vw] mx-auto bg-white shadow-lg rounded-lg p-[3vw] max-w-[80vw]"
        >
          {/* Header */}
          <header className="flex items-center justify-between pb-[1vw] mb-[2.3vw]">
            <div>
              <h1 className="text-[3.2vw] font-bold">{data.name}</h1>
            </div>
            <div className="flex items-center">
              {data.image && (
                <img
                  src={data.image}
                  alt={`${data.name}'s profile`}
                  className="w-[9.3vw] h-[9.3vw] object-cover rounded-full border"
                />
              )}
            </div>
          </header>

          {/* Main Grid */}
          <div className="mb-[1.7vw] grid grid-cols-2 gap-[1.7vw]">
            {/* Profile Section */}
            <section>
              <h2 className="text-[2.2vw] font-semibold border-b pb-[1vw]">
                Profile
              </h2>
              <p className="text-[1.7vw] text-gray-600">
                {data.profileSummary}
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-[2.2vw] font-semibold border-b pb-[1vw]">
                Contact
              </h2>
              <ul className="mt-[1vw] text-[1.7vw]">
                <li>Phone: {data.contact.phone}</li>
                <li>Email: {data.contact.email}</li>
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
              </ul>
            </section>
          </div>

          {/* Education Section */}
          <section className="mb-[2.5vw]">
            <h2 className="text-[2.2vw] font-semibold border-b pb-[1vw]">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mt-[1vw]">
                <h3 className="text-[1.7vw] font-semibold">
                  {edu.institution}
                </h3>
                <p className="text-[1.7vw] text-gray-600">{edu.degree}</p>
                <p className="text-[1.7vw]">{edu.location}</p>
                <p className="text-[1.7vw]">{edu.duration}</p>
              </div>
            ))}
          </section>

          {/* Experience Section */}
          <section className="mb-[1.7vw]">
            <h2 className="text-[2.2vw] font-semibold border-b pb-[1vw]">
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mt-[1vw]">
                <h3 className="text-[1.7vw] font-semibold">{exp.title}</h3>
                <p className="text-[1.7vw] text-gray-600">{exp.company}</p>
                <p className="text-[1.7vw]">
                  {exp.location} | {exp.duration}
                </p>
                <ul className="mt-[1vw] list-disc list-inside text-[1.7vw]">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects Section */}
          <section className="mb-[1.7vw]">
            <h2 className="text-[2.2vw] font-semibold border-b pb-[1vw]">
              Projects
            </h2>
            {data.projects.map((project, index) => (
              <div key={index} className="mt-[1vw]">
                <h3 className="text-[1.7vw] font-semibold">{project.title}</h3>
                <p className="text-[1.7vw] text-gray-600">
                  {project.technologies}
                </p>
                <p className="text-[1.7vw]">{project.duration}</p>
                <ul className="mt-[1vw] list-disc list-inside text-[1.7vw]">
                  {project.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Skills Section */}
          <section className="mb-[1.7vw]">
            <h2 className="text-[2.2vw] font-semibold border-b pb-[1vw]">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-[1vw] mt-[1vw]">
              <div>
                <h3 className="text-[1.7vw] font-semibold">Languages</h3>
                <p className="text-[1.7vw]">{data.skills.languages}</p>
              </div>
              <div>
                <h3 className="text-[1.7vw] font-semibold">Frameworks</h3>
                <p className="text-[1.7vw]">{data.skills.frameworks}</p>
              </div>
              <div>
                <h3 className="text-[1.7vw] font-semibold">Developer Tools</h3>
                <p className="text-[1.7vw]">{data.skills.developerTools}</p>
              </div>
              <div>
                <h3 className="text-[1.7vw] font-semibold">Libraries</h3>
                <p className="text-[1.7vw]">{data.skills.libraries}</p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div
          id="content-to-print"
          className=" mt-16 container mx-auto bg-white shadow-lg rounded-lg p-8 px-10 max-w-4xl"
        >
          {/* Header */}
          <header className="flex items-center justify-between pb-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold">{data.name}</h1>
            </div>
            <div className="flex items-center">
              {data.image && (
                <img
                  src={data.image}
                  alt={`${data.name}'s profile`}
                  className="w-24 h-24 object-cover rounded-full border"
                />
              )}
            </div>
          </header>

          <div className="mb-8 grid grid-cols-2 gap-10">
            {/* Profile section */}
            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2">Profile</h2>
              <p className="text-lg text-gray-600">{data.profileSummary}</p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2">Contact</h2>
              <ul className="mt-4 text-lg">
                <li>Phone: {data.contact.phone}</li>
                <li>Email: {data.contact.email}</li>
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
              </ul>
            </section>
          </div>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mt-4">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-lg text-gray-600">{edu.degree}</p>
                <p className="text-lg">{edu.location}</p>
                <p className="text-lg">{edu.duration}</p>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mt-4">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-lg text-gray-600">{exp.company}</p>
                <p className="text-lg">
                  {exp.location} | {exp.duration}
                </p>
                <ul className="mt-2 list-disc list-inside text-lg">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2">Projects</h2>
            {data.projects.map((project, index) => (
              <div key={index} className="mt-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-lg text-gray-600">{project.technologies}</p>
                <p className="text-lg">{project.duration}</p>
                <ul className="mt-2 list-disc list-inside text-lg">
                  {project.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b pb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold">Languages</h3>
                <p className="text-lg">{data.skills.languages}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Frameworks</h3>
                <p className="text-lg">{data.skills.frameworks}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Developer Tools</h3>
                <p className="text-lg">{data.skills.developerTools}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Libraries</h3>
                <p className="text-lg">{data.skills.libraries}</p>
              </div>
            </div>
          </section>
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
