import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  services: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const API_URL = '/api/services/';

// Get all services
export const getServices = createAsyncThunk('services/getAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = serviceSlice.actions;
export default serviceSlice.reducer;
