import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../components/utils/baseUrl';


//creating todos
export const createTodo =createAsyncThunk(
  "todo/createTodo",
  async(obj,{rejectWithValue})=>{
    const{todo,config}=obj
   let data = axiosInstance.post("/api/create",todo,{...config}).then((res)=>{
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
)
//updating todos
export const updataTodo =createAsyncThunk(
  "todo/updatetodo",
  async(obj)=>{
    const{todo,config}=obj
   let data = axiosInstance.post(`/api/${todo._id}`,todo,{...config}).then((res)=>{
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
) 
//deleting todos
export const deleteTodo =createAsyncThunk(
  "todo/deleteTodo",
  async(obj)=>{
    const{id,config}=obj
   let data = axiosInstance.delete(`/api/${id}`,{...config}).then((res)=>{
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
)
//getting todos
export const catchTodo =createAsyncThunk(
  "todo/catchTodo",
  async(config)=>{
   let data = axiosInstance.get(`/api/get`,{...config}).then((res)=>{
     return res.data
   }).catch((err)=>{
     console.log(err)
   })
   return data;
  }
)
const initialState = {
  todos: [],
  isLoading:false,
  isSuccess:false,
  isError:false,
  errorMsg:"",
  successMsg:"",
  status: 'idle',
};
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    logoutTodo:((state)=>{
      state.todos=[]
    }),
    clearTodoState:((state)=>{
      state.isSuccess=false;
      state.isError=false;
      state.successMsg="";
      state.errorMsg="";
    })
  },
  extraReducers:{
    [createTodo.pending]:((state)=>{
      state.isLoading=true
   }),
    [createTodo.fulfilled]:((state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      state.successMsg='A New Todo Has Been Created'
      state.todos.push(action.payload)
    }),
    [createTodo.rejected]:((state,)=>{
      state.errorMsg='Error!! Failed To Create New Todo'
      state.isLoading=false
      state.isError=true
   }),
    [catchTodo.fulfilled]:((state,action)=>{
      state.todos=[...action.payload]
    }),

    [updataTodo.pending]:((state)=>{
      state.isLoading=true
    }),
    [updataTodo.fulfilled]:((state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      state.successMsg="Todo Has Been Updated"
      state.todos=[...action.payload]
    }),
    [updataTodo.rejected]:((state)=>{
      state.errorMsg="Error!! Failed To Update Todo"
      state.isLoading=false
      state.isError=true
    }),
    [deleteTodo.fulfilled]:((state,action)=>{
       state.todos=[...action.payload]
    }),
  }
});
export const {logoutTodo,clearTodoState} = todoSlice.actions
export default todoSlice.reducer;
