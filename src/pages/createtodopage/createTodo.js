import React,{ useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { clearTodoState, createTodo, updataTodo } from "../../features/todos/todoSlice"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useToasts } from "react-toast-notifications";
import { useDispatch,useSelector } from "react-redux"
import { CircularProgress } from "@material-ui/core";
import ErrorMsg from "../../utils/errorMsg";
import "./createtodo.css"



function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return year + '-' + month + '-' + day;
  }
const CreateTodoItem = () =>{
    const [todo,setTodo]=useState({
        label:'Personal',
        title:"",
        discription:"",
        date:new Date(),
        complete:false,
        archive:false
    })
    const[Edit,setEdit] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory()
    const {id} = useParams()
    const { addToast:notify } = useToasts()
    const {userData} = useSelector((state)=>state.user)
    const {todos,isCreateLoading,isCreateSuccess,isCreateError,createErrorMsg,createSuccessMsg,
    isUpdateLoading,isUpdateSuccess,isUpdateError,updateErrorMsg,updateSuccessMsg} = useSelector((state)=>state.todo)
    const currentTodo = id && todos.filter((ele)=>ele._id===id)[0]

    useEffect(()=>{
      if(id){
        setTodo({...currentTodo})
        setEdit(true)
      }
    },[id])


    useEffect(()=>{
      if(isCreateSuccess || isUpdateSuccess){
        dispatch(clearTodoState())
        notify(`${createSuccessMsg || updateSuccessMsg}`,
        {appearance: 'success',autoDismiss:"true"})
        history.push("/")
      }
    },[isCreateSuccess,isUpdateSuccess])

     const handelChange = (e) =>{
        const{name,value}=e.target
        setTodo({...todo,[name]:value})
     }

     const handelSubmit = async (e) =>{
        e.preventDefault();
        if(Edit){
            if(todo.discription==="" || todo.title===""){
                notify(`You Have To Fill All Fields First`,
                {appearance: 'warning',autoDismiss:"true"})
            }else{
                await dispatch(updataTodo({todoData:todo,userId:userData._id,todoId:id}))
            }   
        }
        else{
            if(todo.discription==="" || todo.title===""){
                notify(`You Have To Fill All Fields First`,
                {appearance: 'warning',autoDismiss:"true"})
            }else{
                await dispatch(createTodo({todoData:todo,userId:userData._id}))
                setTodo({...todo,discription:"",title:""})
            }
        }
     }
    return(
        <div className="create-todos">
            <div className="create-box">
                <h3>Create Your Todo</h3>
                {
                    (isCreateError || isUpdateError)&&<ErrorMsg msg={createErrorMsg || updateErrorMsg} />
                }
                <form onSubmit={handelSubmit}>
                    <div>
                        <label>Label:</label>
                        <select onChange={handelChange} name="label" value={todo.label}>
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                        </select>
                    </div>
                    <div>
                        <label>Title:</label>
                        <input type="text" placeholder="Title" name="title" value={todo.title} onChange={handelChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea placeholder="Task Description" name="discription" value={todo.discription} onChange={handelChange} />
                    </div>
                    <div>
                    <label>task compeletion data:</label>
                        <input type="date" name="date" value={getFormattedDate(new Date(todo.date))} onChange={handelChange} />
                    </div>
                    <div className="btns">
                        <button type="submit">
                            {
                               Edit?
                               <React.Fragment>
                                   <span>Update Task</span>
                                   {
                                       isUpdateLoading&&
                                       <CircularProgress size={25} style={{color:"inherit",margin:"0px"}} />
                                   }
                               </React.Fragment>
                               :
                               <React.Fragment>
                                   <span>Create Task</span>
                                   {
                                       isCreateLoading&&
                                       <CircularProgress size={25} style={{color:"inherit",margin:"0px"}} />
                                   }
                               </React.Fragment>
                            }
                        </button>
                        <button onClick={()=>history.push("/")}><KeyboardBackspaceIcon /></button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}
export default CreateTodoItem;
