import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: false,
  data: null,
  allTemplates: {
    portfolio: [
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
    interiorDesign: [
      {
        id: "t1",
        name: "Interior Design 1",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993909/interior1_ws6gid.png",
      },
    ],
    productShowcase: [
      {
        id: "t1",
        name: "Product Showcase 1",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993912/prod1_xsk91t.png",
      },
    ],
    hospital: [
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
    ],
  },
};

export const uploadImage = createAsyncThunk(
  "website/uploadImage",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/temp/upload-image`,
        credentials,
        {
          withCredentials: true,
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
  "website/updateImage",
  async (credentials, { rejectWithValue }) => {
    const resumeId = credentials.get("resumeId");
    console.log(resumeId);

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/temp/image/${resumeId}`,
        credentials,
        {
          withCredentials: true,
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

export const createWebsite = createAsyncThunk(
  "website/createWebsite",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/portfolio/create-portfolio",
        credentials,
        { withCredentials: true }
      );

      console.log("website create successfully.");
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue("createWebsite :: error ", error.payload);
    }
  }
);

export const createAndDeployWebsite = createAsyncThunk(
  "website/createAndDeployWebsite",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/portfolio/create-portfolio",
        credentials,
        { withCredentials: true }
      );

      console.log("website create successfully.");
      console.log(response);
      if (response.data.data._id) {
        try {
          const depolyResponse = await axios.patch(
            `http://localhost:8000/api/v1/portfolio/deploy-website/${response.data.data._id}`,
            {},
            { withCredentials: true }
          );

          console.log("website deployed successfully.");

          console.log(depolyResponse);

          return depolyResponse.data;
        } catch (error) {
          console.log("createAndDeployWebsite", error);
          return rejectWithValue("createAndDeployWebsite-deploy :: error ", error.payload);
        }
      }

      // return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("createAndDeployWebsite-create :: error ", error.payload);
    }
  }
);

export const getAllWebsites = createAsyncThunk(
  "website/getAllWebsites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/portfolio/get-all-portfolio`,
        { withCredentials: true }
      );

      console.log("all resume's data fetched successfully.");
      return response.data;
    } catch (error) {
      console.log("error occur in getAllWebsites : ", error.response);
      return rejectWithValue("getAllWebsites :: error ", error.response.data);
    }
  }
);

export const getWebsitesDetails = createAsyncThunk(
  "website/getWebsitesDetails",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/portfolio/get-portfolio/${credentials?.websiteId}`,
        { withCredentials: true }
      );

      console.log("selected website's data fetched successfully.");
      return response.data;
    } catch (error) {
      console.log("error occur in getWebsitesDetails : ", error.response);
      return rejectWithValue(
        "getWebsitesDetails :: error ",
        error.response.data
      );
    }
  }
);

export const updateWebsiteDetails = createAsyncThunk(
  "website/updateWebsiteDetails",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/portfolio/update-portfolio/${credentials?._id}`,
        credentials,
        { withCredentials: true }
      );

      console.log("selected websites's data updated successfully.");
      return response.data;
    } catch (error) {
      console.log("error occur in updateWebsiteDetails : ", error.response);
      return rejectWithValue(
        "updateWebsiteDetails :: error ",
        error.response.data
      );
    }
  }
);

export const deleteWebsite = createAsyncThunk(
  "website/deleteWebsite",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/portfolio/delete-portfolio/${credentials?.websiteId}`,
        { withCredentials: true }
      );

      console.log("selected websites deleted successfully.", response);
      return response.data;
    } catch (error) {
      console.log("error occur in deleteWebsite : ", error.response);
      return rejectWithValue("deleteWebsite :: error ", error.response.data);
    }
  }
);

export const getUsersPermanentsDetail = createAsyncThunk(
  "website/getUsersPermanentsDetail",
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
  "website/getResumeData",
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
  "website/deleteResume",
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
  "website/edit",
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
  name: "website",
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

    // create website
    builder
      .addCase(createWebsite.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(createWebsite.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(createWebsite.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // create and deploy website
    builder
      .addCase(createAndDeployWebsite.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(createAndDeployWebsite.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(createAndDeployWebsite.rejected, (state) => {
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

    // getting all websites data
    builder
      .addCase(getAllWebsites.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllWebsites.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(getAllWebsites.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // getting selected website data by id
    builder
      .addCase(getWebsitesDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWebsitesDetails.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(getWebsitesDetails.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // updating selected website data by id
    builder
      .addCase(updateWebsiteDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWebsiteDetails.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(updateWebsiteDetails.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // delete selected website by id
    builder
      .addCase(deleteWebsite.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWebsite.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(deleteWebsite.rejected, (state) => {
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
