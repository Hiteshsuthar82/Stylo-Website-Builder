import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: false,
  user: {},
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {     
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        credentials,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      console.log("Appwrite Service :: login :: error ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      console.log("loged out successfully");
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/get-current-user",
        { withCredentials: true }
      );
      
      return response.data;
    } catch (error) {      
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/get-current-user",
        credentials
      );
      console.log("password changed successfully");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.user = actions.payload.data.user;
      })
      .addCase(login.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions?.payload;
      });

    // signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, actions) => {
        state.status = true;
        state.user = actions.payload.data.user;
      })
      .addCase(signup.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions?.payload;
      });

    // logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.status = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // getCurrentUser
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.user = actions.payload.data;
      })
      .addCase(getCurrentUser.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions?.payload;
        state.status = false;
        state.user = null;
      });

    // changePassword
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state, actions) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.loading = false;
        state.error = actions?.payload;
      });
  },
});

export default authSlice.reducer;
