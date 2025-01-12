import React, { useEffect, useState } from "react";
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
          className="bg-white mx-auto p-8 shadow-lg mt-10"
          style={{
            width: "90vw", // Adjust width to viewport width
            maxWidth: "1200px", // Limit the width on larger screens
            padding: "4vw", // Responsive padding
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <header
            className="flex justify-between mb-5"
            style={{ marginBottom: "3vw" }}
          >
            <div>
              <h1
                className="text-purple-700 border-b-2 border-purple-700"
                style={{
                  fontSize: "4vw",
                  fontWeight: "bold",
                }}
              >
                {data.name}
              </h1>
              <p style={{ fontSize: "2vw" }}>Software Engineer</p>
              <p style={{ fontSize: "2vw" }}>
                {data.contact.email} | {data.contact.phone} |{" "}
                <a
                  href={`https://${data.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  github
                </a>{" "}
                |{" "}
                <a
                  href={`https://${data.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  linkedIn
                </a>
              </p>
            </div>
            {data.image && (
              <img
                src={data.image}
                alt="Profile"
                style={{
                  width: "16vw", // Responsive image size
                  height: "16vw",
                  borderRadius: "1vw",
                  maxWidth: "150px", // Maximum width on large screens
                  maxHeight: "200px", // Maximum height on large screens
                }}
              />
            )}
          </header>
          <main>
            <section style={{ marginBottom: "3vw" }}>
              <h2
                className="text-purple-700 border-b-2 border-purple-700"
                style={{
                  fontSize: "2.5vw",
                  fontWeight: "600",
                  paddingBottom: "0.5vw",
                }}
              >
                Profile
              </h2>
              <p style={{ marginTop: "2vw", fontSize: "2vw" }}>
                {data.profileSummary}
              </p>
            </section>
            <section style={{ marginBottom: "3vw" }}>
              <h2
                className="text-purple-700 border-b-2 border-purple-700"
                style={{
                  fontSize: "2.5vw",
                  fontWeight: "600",
                  paddingBottom: "0.5vw",
                }}
              >
                Experience
              </h2>
              {data.experience.map((job, index) => (
                <div style={{ marginTop: "2vw" }} key={index}>
                  <h3 style={{ fontSize: "2.3vw", fontWeight: "600" }}>
                    {job.title}
                  </h3>
                  <p style={{ fontSize: "2vw" }}>
                    {job.company} | {job.duration}
                  </p>
                  <ul
                    className="list-disc list-inside"
                    style={{ marginTop: "1vw", fontSize: "2vw" }}
                  >
                    {job.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section style={{ marginBottom: "3vw" }}>
              <h2
                className="text-purple-700 border-b-2 border-purple-700"
                style={{
                  fontSize: "2.5vw",
                  fontWeight: "600",
                  paddingBottom: "0.5vw",
                }}
              >
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div style={{ marginTop: "2vw" }} key={index}>
                  <h3 style={{ fontSize: "2.3vw", fontWeight: "600" }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: "2vw" }}>
                    {edu.institution} | {edu.duration}
                  </p>
                </div>
              ))}
            </section>
            <section style={{ marginBottom: "3vw" }}>
              <h2
                className="text-purple-700 border-b-2 border-purple-700"
                style={{
                  fontSize: "2.5vw",
                  fontWeight: "600",
                  paddingBottom: "0.5vw",
                }}
              >
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div style={{ marginTop: "2vw" }} key={index}>
                  <h3 style={{ fontSize: "2.3vw", fontWeight: "600" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "2vw" }}>
                    {project.technologies} | {project.duration}
                  </p>
                  <ul
                    className="list-disc list-inside"
                    style={{ marginTop: "1vw", fontSize: "2vw" }}
                  >
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section>
              <h2
                className="text-purple-700 border-b-2 border-purple-700"
                style={{
                  fontSize: "2.5vw",
                  fontWeight: "600",
                  paddingBottom: "0.5vw",
                }}
              >
                Skills
              </h2>
              <ul
                className="list-disc list-inside"
                style={{ marginTop: "2vw", fontSize: "2vw" }}
              >
                <li>{data.skills.languages}</li>
                <li>{data.skills.frameworks}</li>
                <li>{data.skills.developerTools}</li>
                <li>{data.skills.libraries}</li>
              </ul>
            </section>
          </main>
        </div>
      ) : (
        <div
          id="content-to-print"
          className="bg-white max-w-4xl mx-auto p-8 shadow-lg mt-16"
        >
          <header className="flex justify-between mb-5">
            <div>
              <h1 className="text-4xl font-bold text-purple-700">
                {data.name}
              </h1>
              <p className="text-lg">Software Engineer</p>
              <p className="text-lg">
                {data.contact.email} | {data.contact.phone} |{" "}
                <a
                  href={`https://${data.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  github
                </a>{" "}
                |{" "}
                <a
                  href={`https://${data.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  linkedIn
                </a>
              </p>
            </div>
            {data.image && (
              <img
                src={data.image}
                alt="Profile"
                className="w-40 h-40 rounded-md"
              />
            )}
          </header>
          <main>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-purple-700 border-b-2 border-purple-700 pb-1">
                Profile
              </h2>
              <p className="mt-2">{data.profileSummary}</p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-purple-700 border-b-2 border-purple-700 pb-1">
                Experience
              </h2>
              {data.experience.map((job, index) => (
                <div className="mt-4" key={index}>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-lg">
                    {job.company} | {job.duration}
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    {job.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-purple-700 border-b-2 border-purple-700 pb-1">
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div className="mt-4" key={index}>
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-lg">
                    {edu.institution} | {edu.duration}
                  </p>
                </div>
              ))}
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-purple-700 border-b-2 border-purple-700 pb-1">
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div className="mt-4" key={index}>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-lg">
                    {project.technologies} | {project.duration}
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-purple-700 border-b-2 border-purple-700 pb-1">
                Skills
              </h2>
              <ul className="list-disc list-inside mt-4">
                <li>{data.skills.languages}</li>
                <li>{data.skills.frameworks}</li>
                <li>{data.skills.developerTools}</li>
                <li>{data.skills.libraries}</li>
              </ul>
            </section>
          </main>
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
}

export default Resume;
