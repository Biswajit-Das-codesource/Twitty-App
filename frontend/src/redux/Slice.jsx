import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name:"app",
    initialState:{
        user:null
    },
    reducers:{
        setuser:(state,action)=>{
            state.user=action.payload;
        }
    }


})

export const {setuser}=cardSlice.actions;
export default cardSlice.reducer
