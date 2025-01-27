import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: false,
  data: null,
  allTemplates: {
    portfolio:[
      {
        id: "t1",
        name: "Portfolio 1",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993908/port1_fsg7c7.png",
      },
      {
        id: "t2",
        name: "Portfolio 2",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993908/port2_rxo2de.png",
      },
      {
        id: "t3",
        name: "Portfolio 3",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993910/port3_uvnm5y.png",
      },
      {
        id: "t4",
        name: "Portfolio 4",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993912/port4_iqwcbr.png",
      },
    ],
    interiorDesign:[
      {
        id: "t1",
        name: "Interior Design 1",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993909/interior1_ws6gid.png",
      },
    ],
    productShowcase:[
      {
        id: "t1",
        name: "Product Showcase 1",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993912/prod1_xsk91t.png",
      },
    ],
    hospital:[
      {
        id: "t1",
        name: "Hospital 1",
        src: "https://res.cloudinary.com/dno70sflf/image/upload/v1725788112/Resume_Builder/photos/zbdutp7pkd1pwxbqkwdk.png",
      },
      {
        id: "t2",
        name: "Hospital 2",
        src: "https://res.cloudinary.com/dno70sflf/image/upload/v1725788112/Resume_Builder/photos/zbdutp7pkd1pwxbqkwdk.png",
      },
    ]
  }
  // [
  //   {
  //     src: "https://res.cloudinary.com/dno70sflf/image/upload/v1725788112/Resume_Builder/photos/zbdutp7pkd1pwxbqkwdk.png",
  //     id: "t1",
  //   },
  //   {
  //     src: "https://res.cloudinary.com/dno70sflf/image/upload/v1725788143/Resume_Builder/photos/xvt9zuuvb7chnv385k4c.png",
  //     id: "t2",
  //   },
  //   {
  //     src: "https://res.cloudinary.com/dno70sflf/image/upload/v1725788174/Resume_Builder/photos/ghcknv3eczccie7ray0j.png",
  //     id: "t3",
  //   },
  //   {
  //     src: "https://res.cloudinary.com/dno70sflf/image/upload/v1725788204/Resume_Builder/photos/rpxi2jwwzyqlgxqjohqu.png",
  //     id: "t4",
  //   },
  //   {
  //     src: "https://res.cloudinary.com/dno70sflf/image/upload/v1725788233/Resume_Builder/photos/q450lvnatfptcan8lhr1.png",
  //     id: "t5",
  //   },
  // ],
};

export const uploadImage = createAsyncThunk(
  "resume/uploadImage",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/temp/upload-image`,
        credentials,
        {
          withCredentials: true ,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("image uploaded successfully.");
      return response.data;
    } catch (error) {
      console.log("error in uploading image.", error.payload);
      return rejectWithValue("uploadImage :: error ", error.payload);
    }
  }
);

export const updateImage = createAsyncThunk(
  "resume/updateImage",
  async (credentials, { rejectWithValue }) => {
    const resumeId = credentials.get('resumeId');
    console.log(resumeId);
    
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/temp/image/${resumeId}`,
        credentials,
        {
          withCredentials: true ,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("image updated successfully.");
      return response.data;
    } catch (error) {
      console.log("error in updating image.", error.payload);
      return rejectWithValue("updateImage :: error ", error.payload);
    }
  }
);

export const createResume = createAsyncThunk(
  "resume/create",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/temp/edit-resume",
        credentials,
        { withCredentials: true }
      );

      console.log("resume create successfully.");
      return response.data;
    } catch (error) {
      return rejectWithValue("createResume :: error ", error.payload);
    }
  }
);

export const getAllResumes = createAsyncThunk(
  "resume/getAllResumes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/temp/Allresume`,
        { withCredentials: true }
      );

      console.log("all resume's data fetched successfully.");
      return response.data;
    } catch (error) {
      console.log("error occur in getAllResumes : ", error.response);
      return rejectWithValue("getAllResumes :: error ", error.response.data);
    }
  }
);

export const getUsersPermanentsDetail = createAsyncThunk(
  "resume/getUsersPermanentsDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/temp/usersPermanentDetais`,
        { withCredentials: true }
      );

      console.log("user's Permanent resume's data fetched successfully.");
      return response.data;
    } catch (error) {
      console.log("error occur in getUsersPermanentsDetail : ", error.response);
      return rejectWithValue(
        "getUsersPermanentsDetail :: error ",
        error.response
      );
    }
  }
);

export const getResumeData = createAsyncThunk(
  "resume/getResumeData",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/temp/resume-data/${credentials?.resumeId}`,
        { withCredentials: true }
      );

      if (response) {
        console.log("selected resume's data fetched successfully.");
        return response.data;
      } else {
        console.log("some error occured in getting resume's data");
      }
    } catch (error) {
      console.log("error occured in getResumeData", error.response);
      return rejectWithValue("getResumeData :: error ", error.response.data);
    }
  }
);

export const deleteResume = createAsyncThunk(
  "resume/deleteResume",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/temp/delete/resume/${credentials?.resumeId}`,
        { withCredentials: true }
      );
      console.log(response.data);

      return true;
    } catch (error) {
      console.log("selected resume deleted successfully.");
      return rejectWithValue("deleteResume :: error ", error.response.data);
    }
  }
);

export const editResume = createAsyncThunk(
  "resume/edit",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/temp/resume-edit/${credentials?.resumeId}`,
        credentials?.formData,
        { withCredentials: true }
      );
      console.log("resume edited successfully.");
      return response.data;
    } catch (error) {
      return rejectWithValue("editResume :: error ", error.response);
    }
  }
);

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  extraReducers: (builder) => {
    // upload image
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(uploadImage.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(uploadImage.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // update image
    builder
      .addCase(updateImage.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(updateImage.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(updateImage.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // create resume
    builder
      .addCase(createResume.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(createResume.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(createResume.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // edit resume
    builder
      .addCase(editResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(editResume.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(editResume.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // getting all resumes data
    builder
      .addCase(getAllResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllResumes.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(getAllResumes.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // getting permanent resumes data
    builder
      .addCase(getUsersPermanentsDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersPermanentsDetail.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(getUsersPermanentsDetail.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // getting data of selected resume
    builder
      .addCase(getResumeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getResumeData.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(getResumeData.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // delete resume
    builder
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteResume.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(deleteResume.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  },
});

export default resumeSlice.reducer;
