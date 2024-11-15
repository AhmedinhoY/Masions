import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    image: undefined,
  },
  reducers:{
    addImage(state, action){
      state.image = action.payload
    }
  }
});


export const dataActions = dataSlice.actions;
export default dataSlice;