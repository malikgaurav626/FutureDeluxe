import { configureStore, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const initialState = {
  routeLocation: 0,
  selectedFilters: {
    category: 0,
    price: 0,
    rating: 0,
  },
  data: [],
  filteredData: [],
  totalCheckout: 0.0,
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    setRouteLocation: (state, action) => {
      state.routeLocation = action.payload;
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setTotalCheckout: (state, action) => {
      state.totalCheckout = action.payload;
    },
  },
});

const store = configureStore({
  reducer: dataSlice.reducer,
  middleware: [thunk],
});

export const {
  setRouteLocation,
  setFilteredData,
  setSelectedFilters,
  setData,
  setTotalCheckout,
} = dataSlice.actions;

export default store;
