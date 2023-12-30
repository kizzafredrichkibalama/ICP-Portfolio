import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isConnected:false,
    principalID:null,
    activeProvider:null,
    changes:null,
    storedUserIDS:null,
    backendActor:null,
    userInfo:null
}
const plugSlice = createSlice({
    name:'plug',
    initialState,
    reducers:{
        setIsConnected:(state,{payload})=>{
            state.isConnected = true

        },
        setPrincipalID:(state,{payload})=>{
            state.principalID = payload
        },
        setActiveProvider:(state,{payload})=>{
            console.log("dddddddd :",JSON.parse(payload));
        //   state.activeProvider = JSON.parse(payload)
        },
        setUserIDs:(state,{payload})=>{
            state.storedUserIDS = payload
        },
        setBackendActor:(state,{payload})=>{
            state.backendActor = payload
        },
        setChanges:(state,{payload})=>{
            state.changes = payload
        },
        setUserInfo:(state,{payload})=>{
            state.userInfo = payload
        }

    }
})

console.log(plugSlice);
export const {
    setChanges,
    setIsConnected,
    setPrincipalID,
    setActiveProvider,
    setUserIDs,
    setBackendActor,
    setUserInfo
} = plugSlice.actions
export default plugSlice.reducer