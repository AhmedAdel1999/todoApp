import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/baseUrl';
const initialState = {
  userData:{},
  isRegisterLoading:false,
  isLoggedINLoading:false,
  isSuccessLoggedIn:false,
  isSuccessRegister:false,
  isLoginError:false,
  isRegisterError:false,
  loginErrMessage:"",
  registerErrMessage:"",
};

export const registerTodo =createAsyncThunk(
  "user/registerTodo",
  async(obj,{ rejectWithValue,fulfillWithValue })=>{
    const {userName} = obj
    let isExist = false
    try{
      const response = await axiosInstance.get("/user")
      const data = await response.data
      if(data.length>0){
          for(let i=0; i<data.length; i++){
            if(data[i].userName===userName){
              isExist = true
              return rejectWithValue("This User Is Already Registered");
            }
          }

          if(!isExist){
            const response = await axiosInstance.post("/user",obj)
            const data = await response.data
            return fulfillWithValue(data)
          }
        
      }else{
        const response = await axiosInstance.post("/user",obj)
        const data = await response.data
        return fulfillWithValue(data)
      }
    }catch(error){
        return rejectWithValue(error.response.data)
    }
  }
)



export const loginTodo =createAsyncThunk(
  "user/loginTodo",
  async(obj,{ rejectWithValue,fulfillWithValue })=>{
    const{password,userName}=obj
    let isExist = false
    let userId
    try{
      const response = await axiosInstance.get("/user")
      const data = await response.data

      if(data.length){

        for(let i=0; i<data.length; i++){
            if(data[i].userName===userName&&data[i].password===password){
                isExist=true
                 userId=data[i]._id
                break;
            }
        }

        if(isExist){
          return fulfillWithValue({userName,password,_id:userId})
        }else{
          return rejectWithValue("user not found or password don,t match")
        }

      }else{
        return rejectWithValue("user not found")
      }
    }catch(error){
        return rejectWithValue(error.response.data)
    }
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    clearUserData:((state)=>{
      state.userData={}
    }),

    cleanUserState:((state)=>{
      state.isRegisterLoading = false;
      state.isLoggedINLoading = false;
      state.isSuccessLoggedIn = false;
      state.isSuccessRegister = false;
      state.isLoginError = false;
      state.isRegisterError = false;
      state.loginErrMessage = "";
      state.registerErrMessage = ""
    })

  },
  extraReducers:{

    //register actions
    [registerTodo.pending]:((state)=>{
      state.isRegisterLoading=true
    }),
  
    [registerTodo.fulfilled]:((state,action)=>{
      state.isSuccessRegister=true
      state.isRegisterLoading=false
      state.userData={
        ...action.payload,
        token:Math.random().toString(36).slice(2)
      }
    }),

    [registerTodo.rejected]:((state,action)=>{
      state.isRegisterError=true
      state.isRegisterLoading=false
      state.registerErrMessage=action.payload
    }),

     
    //login actions
    [loginTodo.pending]:((state)=>{
      state.isLoggedINLoading=true
    }),
    [loginTodo.fulfilled]:((state,action)=>{
      state.isSuccessLoggedIn=true
      state.isLoggedINLoading=false
      state.userData={
        ...action.payload,
        token:Math.random().toString(36).slice(2)
      }
    }),
    [loginTodo.rejected]:((state,action)=>{
      state.isLoginError=true
      state.isLoggedINLoading=false
      state.loginErrMessage=action.payload
    }),
  }
});
export const { clearUserData,cleanUserState } = userSlice.actions
export default userSlice.reducer;
