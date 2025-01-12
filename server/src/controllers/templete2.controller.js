import { Resume } from "../models/resume.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteImageOnCloudinary,
  uploadPhotoOnCloudinary as uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose, { isValidObjectId } from "mongoose";

// Function to insert dummy data
const insertDummyData = asyncHandler(async (req, res, next) => {
  try {
    const dummyResume = {
      name: "Jake Ryan",
      profileSummary:"A highly skilled software engineer with over 5 years of experience in full-stack development",
      templateId: 101,
      permanentdata: false,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn2NgTLaAhwax8ADJoioSGTcwDMAJFKF3leg&s",
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
        languages:
          "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
        frameworks:
          "React, Node.js, Flask, jUnit, WordPress, Material-UI, FastAPI",
        developerTools:
          "Git, Docker, Tmux, CI/CD, Google Cloud Platform, VS Code, Virtual Studio, PyCharm, IntelliJ, Eclipse",
        libraries: "pandas, NumPy, Matplotlib",
      },
    };

    // Check if data already exists
    const count = await Resume.countDocuments();
    if (count === 0) {
      const insertedResume = await new Resume(dummyResume).save();
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            insertedResume,
            "Default resume data fetch successfully"
          )
        );
    } else {
      const resume2data = await Resume.findOne(); // Fetch existing data
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            resume2data,
            "Default resume data fetch successfully"
          )
        );
    }
  } catch (error) {
    next(new ApiError(500, "Error inserting or fetching dummy data"));
  }
});

// 😊workking fine ----
// Image Upload Controller
const uploadImage = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "No image file uploaded");
    }

    const avatarImg = await uploadOnCloudinary(avatarLocalPath);

    if (!avatarImg) {
      throw new ApiError(500, "Error occurred while uploading file");
    }

    // Store the image URL in the user's document
    await User.findByIdAndUpdate(userId, {
      tempResumeImage: avatarImg.secure_url,
    });

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: avatarImg.secure_url,
    });
  } catch (error) {
    next(new ApiError(500, "Error uploading image: " + error.message));
  }
});

// Resume Edit Controller
const editResume = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized to edit resume");
    }

    const updateData = req.body;
    console.log(updateData);

    // Check if there's any existing resume with permanentdata set to true
    if (updateData?.permanentdata) {
      const existingResume = await Resume.findOne({
        owner: userId,
        permanentdata: true,
      });

      if (existingResume) {
        // Update the permanentdata field to false for the existing resume
        existingResume.permanentdata = false;
        await existingResume.save();
      }
    }

    // Get the stored image URL from the user's document
    const user = await User.findById(userId);
    const storedImageUrl = user.tempResumeImage;

    // Create a new resume document
    const newResume = new Resume({
      owner: userId,
      ...updateData,
      // image: storedImageUrl, // Add the stored image URL to the resume
    });
    await newResume.save();

    // Clear the temporary image URL from the user's document
    await User.findByIdAndUpdate(userId, { $unset: { tempResumeImage: "" } });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newResume,
          "New resume template created successfully"
        )
      );
  } catch (error) {
    next(new ApiError(500, "Error creating resume template: " + error.message));
  }
});

// 😊workking fine ---- perment resume data fetch

const getPermanentResume = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized to view resume");
    }

    // Find the resume with permanentdata set to true
    const permanentResume = await Resume.findOne({
      owner: userId,
      permanentdata: true,
    });

    if (!permanentResume) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No permanent resume found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          permanentResume,
          "Permanent resume fetched successfully"
        )
      );
  } catch (error) {
    next(
      new ApiError(500, "Error fetching permanent resume: " + error.message)
    );
  }
});

const updateResumeByResumeId = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { resumeId } = req.params; // Extract resumeId from URL

    if (!userId) {
      throw new ApiError(401, "Unauthorized to edit resume");
    }

    if (!resumeId) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Resume ID is required"));
    }

    const updateData = req.body;

    // Check if there's any existing resume with permanentdata set to true
    if (updateData?.permanentdata) {
      const existingResume = await Resume.findOne({
        owner: userId,
        permanentdata: true,
      });

      if (existingResume) {
        // Update the permanentdata field to false for the existing resume
        existingResume.permanentdata = false;
        await existingResume.save();
      }
    }

    // Find the existing resume
    const resume = await Resume.findOne({ _id: resumeId, owner: userId });

    if (!resume) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Resume not found for the given ID"));
    }

    // Update existing resume without creating a new document
    Object.assign(resume, updateData);
    await resume.save();

    return res
      .status(200)
      .json(new ApiResponse(200, resume, "Resume updated successfully"));
  } catch (error) {
    next(new ApiError(500, "Error updating resume: " + error.message));
  }
});

// 😊workking fine ----

const updateUserAvatar = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { resumeId } = req.params; // Extract resumeId from URL
    console.log("resumeka is", resumeId);
    console.log("user ka id", userId);

    if (!userId) {
      throw new ApiError(401, "Unauthorized to update avatar");
    }

    //   if (!resumeId || !mongoose.Types.ObjectId.isValid(resumeId)) {
    //     return res
    //       .status(400)
    //       .json(new ApiResponse(400, null, "Invalid Resume ID"));
    //   }

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "File required");
    }

    const avatarImg = await uploadOnCloudinary(avatarLocalPath);

    if (!avatarImg) {
      throw new ApiError(500, "Error occurred while uploading file");
    }

    // Find the specific resume associated with the user and resumeId
    let resume = await Resume.findOne({ _id: resumeId, owner: userId });
    console.log("User's resume", resume);

    if (!resume) {
      throw new ApiError(404, "Resume not found for this user");
    }

    // Update the resume's image field
    resume.image = avatarImg.secure_url;

    // Save the updated resume
    await resume.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          resume,
          "Avatar updated and resume image updated successfully"
        )
      );
  } catch (error) {
    next(new ApiError(500, "Error updating avatar: " + error.message));
  }
});

// 😊workking fine ----
const getResumesByUserId = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id; // User ID from request

    if (!userId) {
      throw new ApiError(401, "Unauthorized to fetch resumes");
    }

    if (!userId) {
      throw new ApiError(401, "Unauthorized to fetch resumes");
    }

    // Find all resumes belonging to the user
    const resumes = await Resume.find({ owner: userId });

    if (resumes.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No resumes found for this user"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, resumes, "Resumes fetched successfully"));
  } catch (error) {
    next(new ApiError(500, "Error fetching resumes: " + error.message));
  }
});

const getResumeById = asyncHandler(async (req, res, next) => {
  try {
    const { resumeId } = req.params; // Resume ID from URL parameters
    console.log("Fetching resume with ID:", resumeId);

    if (!resumeId) {
      throw new ApiError(400, "Resume ID is required");
    }

    // Find the resume by its ID
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Resume not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, resume, "Resume fetched successfully"));
  } catch (error) {
    next(new ApiError(500, "Error fetching resume: " + error.message));
  }
});

const deleteResumeById = asyncHandler(async (req, res, next) => {
  try {
    const { resumeId } = req.params; // Resume ID from URL parameters

    // Delete the resume by its ID
    const result = await Resume.findByIdAndDelete(resumeId);

    if (!result) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Resume not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Resume deleted successfully"));
  } catch (error) {
    next(new ApiError(500, "Error deleting resume: " + error.message));
  }
});

// 😊workking fine ----
const deleteAllResumesByUserId = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id; // User ID from request

    if (!userId) {
      throw new ApiError(401, "Unauthorized to delete resumes");
    }

    // Delete all resumes associated with the user
    const result = await Resume.deleteMany({ owner: userId });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          `${result.deletedCount} resumes deleted successfully`
        )
      );
  } catch (error) {
    next(new ApiError(500, "Error deleting resumes: " + error.message));
  }
});

export {
  insertDummyData,
  editResume,
  uploadImage,
  getPermanentResume,
  updateUserAvatar,
  getResumesByUserId,
  getResumeById,
  deleteResumeById,
  deleteAllResumesByUserId,
  updateResumeByResumeId,
};

// {
//     "name": "Priya Sharma",
//     "contact": {
//       "phone": "987-654-3210",
//       "email": "priya.sharma@email.com",
//       "linkedin": "linkedin.com/in/priyasharma",
//       "github": "github.com/priyasharma-dev"
//     },
//     "education": [
//       {
//         "institution": "Delhi University",
//         "degree": "Bachelor of Technology in Computer Science",
//         "location": "New Delhi, India",
//         "duration": "July 2018 - May 2022"
//       }
//     ],
//     "experience": [
//       {
//         "title": "Senior Frontend Developer",
//         "company": "TechSolutions India Pvt Ltd",
//         "location": "Bengaluru, India",
//         "duration": "June 2023 - Present",
//         "responsibilities": [
//           "Lead the development of responsive web applications using React and Next.js",
//           "Implemented state management using Redux and Context API",
//           "Optimized website performance, achieving a 40% improvement in load times",
//           "Mentored junior developers and conducted code reviews"
//         ]
//       },
//       {
//         "title": "Frontend Developer",
//         "company": "StartUp Innovators",
//         "location": "Mumbai, India",
//         "duration": "July 2022 - May 2023",
//         "responsibilities": [
//           "Developed user interfaces for e-commerce platforms using React and Styled Components",
//           "Integrated RESTful APIs and implemented real-time features using WebSockets",
//           "Collaborated with UX designers to implement pixel-perfect designs"
//         ]
//       }
//     ],
//     "projects": [
//       {
//         "title": "E-learning Platform",
//         "technologies": "React, Redux, Node.js, MongoDB",
//         "duration": "Jan 2023 - April 2023",
//         "description": [
//           "Developed a responsive e-learning platform with video streaming capabilities",
//           "Implemented user authentication and course progress tracking features",
//           "Integrated payment gateway for course purchases"
//         ]
//       },
//       {
//         "title": "Weather Forecast App",
//         "technologies": "React Native, Expo, OpenWeatherMap API",
//         "duration": "Nov 2022 - Dec 2022",
//         "description": [
//           "Built a cross-platform mobile app for real-time weather forecasts",
//           "Implemented geolocation services for automatic location detection",
//           "Designed an intuitive UI with animated weather icons"
//         ]
//       }
//     ],
//     "skills": {
//       "languages": "JavaScript, TypeScript, HTML5, CSS3, Python",
//       "frameworks": "React, Next.js, Vue.js, Angular, Express.js",
//       "developerTools": "Git, Webpack, Babel, npm, Yarn, Docker",
//       "libraries": "Redux, React Router, Axios, Styled Components, Material-UI, Bootstrap"
//     }
//   }
