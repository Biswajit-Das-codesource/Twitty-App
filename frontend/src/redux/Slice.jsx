import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name:"app",
    initialState:{
        user:null
    },
    reducers:{
        setuser:(state,action)=>{
            state.user=action.payload || null;
        },
        refreshUserState: (state) => {
            state.user = { ...state.user }; // Forces state update without changing value
        }
    }
    
})

export const {setuser,refreshUserState}=cardSlice.actions;
export default cardSlice.reducer
