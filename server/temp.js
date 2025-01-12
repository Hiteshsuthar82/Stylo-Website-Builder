import { useState } from "react";
import { useDispatch } from "react-redux";
import { creteResume } from "./resumeSlice"; // Your slice file

function ResumeForm() {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  // Dummy form data
  const formData = {
    name: "John Doe",
    contact: {
      phone: "123-456-7890",
      email: "johndoe@example.com",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe"
    },
    education: [
      {
        institution: "XYZ University",
        degree: "B.Tech in Computer Science",
        location: "New York, USA",
        duration: "2018 - 2022"
      }
    ],
    experience: [
      {
        title: "Software Developer",
        company: "ABC Corp",
        location: "San Francisco, USA",
        duration: "2022 - Present",
        responsibilities: ["Developing web applications", "Collaborating with design teams"]
      }
    ],
    projects: [
      {
        title: "E-commerce Website",
        technologies: "React, Node.js, MongoDB",
        duration: "6 months",
        description: ["Developed a full-stack e-commerce platform"]
      }
    ],
    skills: {
      languages: "JavaScript, Python",
      frameworks: "React, Node.js",
      developerTools: "VS Code, Git",
      libraries: "Redux, Express"
    },
    templateId: "template_001",  // Required field
    permanentdata: false  // Optional boolean field
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", image); // Append image file
    data.append("data", JSON.stringify(formData)); // Append custom form data

    // Dispatch the action
    dispatch(creteResume(data)); // Dispatch form data to slice
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ResumeForm;





const creteResume = createAsyncThunk(
  "resume/create",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/temp/edit-resume",
        credentials, // FormData object containing image and data
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log("resume create successfully.");
      return rejectWithValue(
        "Appwrite Service :: creteResume :: error ",
        error.response.data
      );
    }
  }
);
