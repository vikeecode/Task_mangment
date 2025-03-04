// import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

// const initialState={
//     pastes:localStorage.getItem("pastes")?JSON.parse(localStorage.getItem("pastes")):[]
// }

// export const pasteSlice=createSlice({
//     name:"pastes",
//     initialState,
//     reducers:{
//         addToPaste: (state,action) =>{
//           const paste= action.payload;
//           state.pastes.push(paste);
//           localStorage.setItem("pastes",JSON.stringify(state.pastes));
//           toast("Paste Created Sucessfully")
//         },
//         deleteToPaste: (state,action)=>{
//             const pasteId = action.payload;
//             const index = state.pastes.findIndex((item)=> item._id === pasteId);
//             if(index !== -1){
//                 state.pastes.splice(index,1);
//                 localStorage.setItem("pastes",JSON.stringify(state.pastes));

//                 toast.success("Paste deleted")
//             }

//         },
//         editToPaste: (state,action)=>{
//             const paste=action.payload;
//             const index=state.pastes.findIndex((item)=>item.id===paste.id);
//             if(index>=0){
//                 state.pastes[index]=paste;
//                 localStorage.setItem("pastes",JSON.stringify(state.pastes))
//                 toast.success("Paste updated")
//             }
//         },
//         resetAllPaste: (store)=>{
//             store.pastes=[]
//             localStorage.removeItem("pastes")

//         },
//     },
// })
// export const {addToPaste,deleteToPaste,editToPaste,resetAllPaste}=pasteSlice.actions
// export default pasteSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: JSON.parse(localStorage.getItem("pastes")) || [],
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = { ...action.payload, _id: String(Date.now()) }; // Ensure ID is a string
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Successfully");
    },
    deleteToPaste: (state, action) => {
      state.pastes = state.pastes.filter((item) => item._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste deleted");
    },
    editToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index !== -1) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated");
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

export const { addToPaste, deleteToPaste, editToPaste, resetAllPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
