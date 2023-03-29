import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../components/utils/baseUrl';
const initialState = {
  token:null,
  username:null,
  isSuccess:false,
  isError:false,
  isLoading:false,
  errMessage:"",
  status: 'idle',
};

export const registerTodo =createAsyncThunk(
  "user/registerTodo",
  async(obj,{ rejectWithValue,fulfillWithValue })=>{
    try{
      const response = await axiosInstance.post("/register",{...obj})
      const data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        return rejectWithValue(error.response.data)
    }
  }
)

export const loginTodo =createAsyncThunk(
  "user/loginTodo",
  async(obj,{ rejectWithValue,fulfillWithValue })=>{
    try{
      const response = await axiosInstance.post("/login",{...obj})
      const data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        return rejectWithValue(error.response.data)
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutTodo:((state)=>{
      state.token=null;
      state.username=null
    }),
    cleanState:((state)=>{
      state.isSuccess=false;
      state.isError=false;
      state.errMessage="";
    })
  },
  extraReducers:{
    [registerTodo.pending]:((state)=>{
      state.isLoading=true
    }),
    [registerTodo.rejected]:((state,action)=>{
      state.isError=true
      state.isLoading=false
      state.errMessage=action.payload.error.message
    }),
    [registerTodo.fulfilled]:((state,action)=>{
      state.isSuccess=true
      state.isLoading=false
      state.token=action.payload.token
      state.username=action.payload.userName
    }),

    [loginTodo.pending]:((state)=>{
      state.isLoading=true
    }),
    [loginTodo.fulfilled]:((state,action)=>{
      state.isSuccess=true
      state.isLoading=false
      state.token=action.payload.token
      state.username=action.payload.userName
    }),
    [loginTodo.rejected]:((state,action)=>{
      state.isError=true
      state.isLoading=false
      state.errMessage=action.payload.error.message
    }),
  }
});
export const{logoutTodo,cleanState}=userSlice.actions
export default userSlice.reducer;
