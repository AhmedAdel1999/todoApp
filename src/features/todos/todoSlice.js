import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/baseUrl';


//creating todos
export const createTodo =createAsyncThunk(
  "todo/createTodo",
  async({userId,todoData},{ rejectWithValue,fulfillWithValue })=>{
    try{
      await axiosInstance.post(`user/${userId}/todo`,todoData)
      let response = await axiosInstance.get(`/todo`)
      let data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        rejectWithValue(error)
    }
  }



)
//updating todos
export const updataTodo =createAsyncThunk(
  "todo/updatetodo",
  async({userId,todoId,todoData},{ rejectWithValue,fulfillWithValue })=>{
    try{
      await axiosInstance.put(`user/${userId}/todo/${todoId}`,todoData)
      let response = await axiosInstance.get(`/todo`)
      let data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        rejectWithValue(error)
    }
  }
) 
//deleting todos
export const deleteTodo =createAsyncThunk(
  "todo/deleteTodo",
  async({userId,todoId},{ rejectWithValue,fulfillWithValue })=>{
    try{
      await axiosInstance.delete(`user/${userId}/todo/${todoId}`)
      let response = await axiosInstance.get(`/todo`)
      let data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        rejectWithValue(error)
    }
  }
)
//getting todos
export const catchTodo =createAsyncThunk(
  "todo/catchTodo",
  async(undefined,{ rejectWithValue,fulfillWithValue })=>{
    try{
      let response = await axiosInstance.get(`/todo`)
      let data = await response.data
      return fulfillWithValue(data)
    }catch(error){
        rejectWithValue(error)
    }
  }
)

const initialState = {
  todos: [],
  isCreateLoading:false,
  isCreateSuccess:false,
  isCreateError:false,
  createErrorMsg:"",
  createSuccessMsg:"",

  isUpdateLoading:false,
  isUpdateSuccess:false,
  isUpdateError:false,
  updateErrorMsg:"",
  updateSuccessMsg:"",

  isDeleteLoading:false,
  isDeleteSuccess:false,
  deleteSuccessMsg:"",  
};
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearTodoData:((state)=>{
      state.todos=[]
    }),
    clearTodoState:((state)=>{
      state.isCreateLoading= false;
      state.isCreateSuccess= false;
      state.isCreateError= false;
      state.createErrorMsg= "";
      state.createSuccessMsg= "";

      state.isUpdateLoading= false;
      state.isUpdateSuccess= false;
      state.isUpdateError= false;
      state.updateErrorMsg= "";
      state.updateSuccessMsg= "";

      state.isDeleteLoading= false;
      state.isDeleteSuccess= false;
      state.deleteSuccessMsg= "";
    })
  },
  extraReducers:{

    //create todo actions
    [createTodo.pending]:((state)=>{
      state.isCreateLoading=true
    }),
    [createTodo.fulfilled]:((state,action)=>{
      state.isCreateLoading=false
      state.isCreateSuccess=true
      state.createSuccessMsg='A New Todo Has Been Created'
      state.todos=[...action.payload]
    }),
    [createTodo.rejected]:((state)=>{
      state.createErrorMsg='Error!! Failed To Create New Todo'
      state.isCreateLoading=false
      state.isCreateError=true
    }),

   //get all todos action
    [catchTodo.fulfilled]:((state,action)=>{
      state.todos=[...action.payload]
    }),

    //update all todos actions
    [updataTodo.pending]:((state)=>{
      state.isUpdateLoading=true
    }),
    [updataTodo.fulfilled]:((state,action)=>{
      state.isUpdateLoading=false
      state.isUpdateSuccess=true
      state.updateSuccessMsg="Todo Has Been Updated"
      state.todos=[...action.payload]
    }),
    [updataTodo.rejected]:((state)=>{
      state.updateErrorMsg="Error!! Failed To Update Todo"
      state.isUpdateLoading=false
      state.isUpdateError=true
    }),
    
    //delete todo actions
    [deleteTodo.pending]:((state)=>{
      state.isDeleteLoading=true
    }),
    [deleteTodo.fulfilled]:((state,action)=>{
      state.isDeleteLoading=false
      state.isDeleteSuccess= true;
      state.deleteSuccessMsg="Todo Has Been Deleted Successfully"
      state.todos=[...action.payload]
    }),
    
  }
});
export const {clearTodoData,clearTodoState} = todoSlice.actions
export default todoSlice.reducer;
