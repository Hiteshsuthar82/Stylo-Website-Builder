import React, { useEffect, useState } from "react";
import UserDetailCard from "./UserDetailCard";
import UserDetailListItem from "./UserDetailListItem";
import { getUsersPermanentsDetail } from "../../features/resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../assets/page-loader.gif";

const UserProfile = () => {
  const [myResumes, setMyResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userDetail = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const user = {
    name: "Jake Ryan",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fconstructingexcellence.org.uk%2Fdummy-member%2F&psig=AOvVaw0MK1-isonIeKyHplT_z_VX&ust=1723723747150000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCbqbe59IcDFQAAAAAdAAAAABAE",
    contact: {
      phone: "123-456-7890",
      email: "jake@uni.edu",
      linkedin: "linkedin.com/in/jake",
      github: "github.com/jake",
    },
    education: [
      {
        institution: "Southwestern University",
        degree: "Bachelor of Arts in Computer Science, Minor in Business",
        location: "Georgetown, TX",
        duration: "Aug. 2018 - May 2021",
      },
      {
        institution: "University of Texas",
        degree: "Master of Science in Computer Science",
        location: "Austin, TX",
        duration: "Aug. 2021 - May 2023",
      },
    ],
    experience: [
      {
        title: "Undergraduate Research Assistant",
        company: "Texas A&M University",
        location: "College Station, TX",
        duration: "June 2020 - Present",
        responsibilities: [
          "Developed a REST API using FlaskAPI and PostgreSQL to store data from learning management systems.",
        ],
      },
      {
        title: "Software Engineering Intern",
        company: "Google",
        location: "Mountain View, CA",
        duration: "June 2022 - Aug. 2022",
        responsibilities: [
          "Worked on enhancing the Google Cloud Platform by developing new features and fixing bugs.",
          "Collaborated with cross-functional teams to deliver high-quality software.",
        ],
      },
    ],
    skills: {
      languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
      frameworks:
        "React, Node.js, Flask, jUnit, WordPress, Material-UI, FastAPI",
      developerTools:
        "Git, Docker, Tmux, CI/CD, Google Cloud Platform, VS Code, Virtual Studio, PyCharm, IntelliJ, Eclipse",
      libraries: "pandas, NumPy, Matplotlib",
    },
  };

  const dummyData = {
    name: "Jake Ryan",
    image:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fconstructingexcellence.org.uk%2Fdummy-member%2F&psig=AOvVaw0MK1-isonIeKyHplT_z_VX&ust=1723723747150000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCbqbe59IcDFQAAAAAdAAAAABAE",
    contact: {
      phone: "123-456-7890",
      email: "jake@uni.edu",
      linkedin: "linkedin.com/in/jake",
      github: "github.com/jake",
    },
    education: [
      {
        institution: "Southwestern University",
        degree: "Bachelor of Arts in Computer Science, Minor in Business",
        location: "Georgetown, TX",
        duration: "Aug. 2018 - May 2021",
      },
      {
        institution: "University of Texas",
        degree: "Master of Science in Computer Science",
        location: "Austin, TX",
        duration: "Aug. 2021 - May 2023",
      },
    ],
    experience: [
      {
        title: "Undergraduate Research Assistant",
        company: "Texas A&M University",
        location: "College Station, TX",
        duration: "June 2020 - Present",
        responsibilities: [
          "Developed a REST API using FlaskAPI and PostgreSQL to store data from learning management systems.",
        ],
      },
      {
        title: "Software Engineering Intern",
        company: "Google",
        location: "Mountain View, CA",
        duration: "June 2022 - Aug. 2022",
        responsibilities: [
          "Worked on enhancing the Google Cloud Platform by developing new features and fixing bugs.",
          "Collaborated with cross-functional teams to deliver high-quality software.",
        ],
      },
    ],
    projects: [
      {
        title: "Gitytics",
        technologies: "Python, Flask, React, PostgreSQL, Docker",
        duration: "June 2020 - Present",
        description: [
          "Developed a REST API with Flask using FlaskAPI, PostgreSQL, and GitHub OAuth to gather data.",
        ],
      },
      {
        title: "Portfolio Website",
        technologies: "HTML, CSS, JavaScript, Node.js",
        duration: "Jan. 2021 - May 2021",
        description: [
          "Built a personal portfolio website to showcase projects and skills.",
          "Implemented responsive design and integrated a contact form.",
        ],
      },
    ],
    skills: {
      languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
      frameworks:
        "React, Node.js, Flask, jUnit, WordPress, Material-UI, FastAPI",
      developerTools:
        "Git, Docker, Tmux, CI/CD, Google Cloud Platform, VS Code, Virtual Studio, PyCharm, IntelliJ, Eclipse",
      libraries: "pandas, NumPy, Matplotlib",
    },
  };

  useEffect(() => {
    dispatch(getUsersPermanentsDetail()).then((response) => {
      if (response && response?.meta?.status !== 404) {
        console.log("all resumes fetched successfully..");
        setMyResumes(response.payload.data);
        setLoading(false);
      } else {
        // write code if there are note any resume for current user
        setMyResumes(null);
        console.log("no resumes found");
        setLoading(false);
      }
    });
  }, []);

  return loading ? (
    <div className="h-[75vh] w-full flex items-center justify-center">
      <img src={loader} alt="Loading.." className="h-40" />
    </div>
  ) : !myResumes ? (
    <div className="h-[70vh]">
      <div className="relative flex flex-col mt-10 mx-10 flex-auto min-w-0 p-4 overflow-hidden break-words border-0 shadow-sm rounded-2xl bg-white/80 bg-clip-border mb-4">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div className="text-base ease-soft-in-out h-16 w-16 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
              <img
                src={
                  userDetail?.image ||
                  "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_black_tone_avatar_people_person_icon_159369.png"
                }
                alt="profile_image"
                className="w-full shadow-md rounded-xl"
              />
            </div>
          </div>
          <div className="flex-none w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <div className="flex">
                <h5 className="mb-1">{userDetail?.fullName}</h5>&nbsp;|&nbsp;
                <h5 className="mb-1">{userDetail?.email}</h5>
              </div>
              <p className="mb-0 font-semibold leading-normal text-sm">
                Account Owner
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto p-6 bg-[#f8f9fe] rounded-lg shadow-md">
      <div className="relative flex flex-col flex-auto min-w-0 m-3 py-2 px-4 overflow-hidden break-words border-0 shadow-sm shadow-purple-600 rounded-lg bg-white/80 bg-clip-border mb-4" >
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div className="text-base ease-soft-in-out h-16 w-16 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
              <img
                src={
                  myResumes.image ||
                  "https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/bruce-mars.jpg"
                }
                alt="profile_image"
                className="w-full shadow-md rounded-xl"
              />
            </div>
          </div>
          <div className="flex-none w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="mb-1">{myResumes.name}</h5>
              <p className="mb-0 font-semibold leading-normal text-sm">
                Account Owner
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 mx-3 py-3 rounded-lg shadow-md bg-white px-3">
        <h1 className="font-bold mb-3 text-xl">Profile</h1>
        <div className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
          {myResumes.profileSummary}
        </div>
      </div>
      <div>
        {Object.entries(myResumes).map(([key, value]) => {
          if (typeof value === String) {
          }
          if (Array.isArray(value)) {
            return null;
          } else if (typeof value === "object" && value !== null) {
            return (
              <div
                key={key}
                className="mb-6 mx-3 py-3 rounded-lg shadow-md bg-white"
              >
                <h1 className="font-bold mb-3 text-xl px-3">{key}</h1>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <div className="px-3" key={subKey}>
                    <UserDetailListItem
                      key={subKey}
                      lable={subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                      value={
                        typeof subValue === "object"
                          ? JSON.stringify(subValue)
                          : subValue
                      }
                    />
                  </div>
                ))}
              </div>
            );
          }
          return null; // Return null for non-array and non-object values
        })}
      </div>

      <div className="w-full pb-6 mx-auto removable">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {Object.entries(myResumes).map(([key, value]) => {
            if (Array.isArray(value)) {
              // Render arrays using UserDetailCard
              return (
                <div key={key} className="mb-6">
                  <UserDetailCard
                    heading={key.charAt(0).toUpperCase() + key.slice(1)}
                    data={value}
                  />
                </div>
              );
            }
            return null; // Return null for non-array and non-object values
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
