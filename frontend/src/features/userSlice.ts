import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../api/user.Api"; 


const initialState = {
  user: null, 
  loading: false,
  error: null,
};


export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserById(userId); 
      console.log(response,'from thunkdk')
      return response; // On success, return the user data
    } catch (error) {
      return rejectWithValue(error.response.data); // On error, reject with error message
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Fetching user...");
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Set user data in the state
        console.log("User fetched:", action.payload);
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message in case of failure
        console.log("Error fetching user:", action.payload);
      });
  },
});

export const selectUser = (state) => state.user.user; // Selector to access user data

export default userSlice.reducer;
