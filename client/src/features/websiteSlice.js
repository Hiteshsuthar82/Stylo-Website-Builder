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
        premium: true,
      },
      {
        id: "t2",
        name: "Portfolio 2",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993908/port2_rxo2de.png",
        premium: true,
      },
      {
        id: "t3",
        name: "Portfolio 3",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993910/port3_uvnm5y.png",
        premium: false,
      },
      // {
      //   id: "t4",
      //   name: "Portfolio 4",
      //   src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993912/port4_iqwcbr.png",
      // },
    ],
    interiorDesign:[
      {
        id: "t1",
        name: "Interior Design 1",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993909/interior1_ws6gid.png",
        premium: false,
      },
      {
        id: "t2",
        name: "Interior Design 2",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1740417855/Screenshot_226_rlexlq.png",
        premium: true,
      },
      {
        id: "t3",
        name: "Interior Design 3",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1740417853/Screenshot_225_qzlv8x.png",
        premium: false,
      },
    ],
    productShowcase:[
      {
        id: "t1",
        name: "Product Showcase 1",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1737993912/prod1_xsk91t.png",
        premium: false,
      },
      {
        id: "t2",
        name: "Product Showcase 2",
        src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1740417852/Screenshot_224_kvnuux.png",
        premium: true,
      },
    ],
    // hospital:[
    //   {
    //     id: "t1",
    //     name: "Hospital 1",
    //     src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1740417852/Screenshot_224_kvnuux.png",
    //     premium: false,
    //   },
    //   {
    //     id: "t2",
    //     name: "Hospital 2",
    //     src: "https://res.cloudinary.com/dn5occ53n/image/upload/v1740417852/Screenshot_224_kvnuux.png",
    //     premium: true,
    //   },
    // ]
  }
};

const apiKey = import.meta.env.VITE_API_URL;

export const uploadImage = createAsyncThunk(
  "website/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${apiKey}/websites/image-upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully:", response.data);
      return response.data; // Expecting `response.data` to be the image URL
    } catch (error) {
      console.error("Error in uploading image:", error?.response?.data || error.message);
      return rejectWithValue(error?.response?.data || "Upload failed");
    }
  }
);

export const createWebsite = createAsyncThunk(
  "website/createWebsite",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);

    try {
      const response = await axios.post(
        `${apiKey}/websites/create`,
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
        `${apiKey}/websites/create`,
        credentials,
        { withCredentials: true }
      );

      console.log("website create successfully.");
      console.log(response);
      if (response.data.data._id) {
        try {
          const depolyResponse = await axios.patch(
            `${apiKey}/websites/deploy/${response?.data?.data?.type}/${response.data.data._id}`,
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

export const deployWebsite = createAsyncThunk(
  "website/deployWebsite",
  async (credentials, { rejectWithValue }) => {
    console.log("deployWebsite", credentials);
    
    try {
      const response = await axios.patch(
        `${apiKey}/websites/deploy/${credentials?.websiteType}/${credentials?.websiteId}`,
        {},
        { withCredentials: true }
      );

      console.log("website deployed successfully.");

      console.log(response);

      return response.data;
    } catch (error) {
      console.log("deployWebsite", error);
      return rejectWithValue("deployWebsite :: error ", error.payload);
    }
  }
);

export const reDeployWebsite = createAsyncThunk(
  "website/reDeployWebsite",
  async (credentials, { rejectWithValue }) => {
    console.log("reDeployWebsite", credentials);
    
    try {
      const response = await axios.patch(
        `${apiKey}/websites/redeploy/${credentials?.websiteType}/${credentials?.websiteId}`,
        {},
        { withCredentials: true }
      );

      console.log("websiten re deployed successfully.");

      console.log(response);

      return response.data;
    } catch (error) {
      console.log("reDeployWebsite", error);
      return rejectWithValue("reDeployWebsite :: error ", error.payload);
    }
  }
);

export const getAllWebsites = createAsyncThunk(
  "website/getAllWebsites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiKey}/websites/get-all`,
        { withCredentials: true }
      );

      console.log("all websites's data fetched successfully.");
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
        `${apiKey}/websites/${credentials?.websiteType}/${credentials?.websiteId}`,
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
        `${apiKey}/websites/update/${credentials?.type}/${credentials?._id}`,
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
        `${apiKey}/websites/delete/${credentials?.websiteType}/${credentials?.websiteId}`,
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

export const websiteSlice = createSlice({
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

    // deploy website
    builder
      .addCase(deployWebsite.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(deployWebsite.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(deployWebsite.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // re Deploy website
    builder
      .addCase(reDeployWebsite.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(reDeployWebsite.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(reDeployWebsite.rejected, (state) => {
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
  },
});

export default websiteSlice.reducer;
