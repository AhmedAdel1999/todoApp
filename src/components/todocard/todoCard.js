import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import {Brightness2Rounded,Delete,CheckCircle,Archive,Unarchive,Edit,AddAlarm} from '@material-ui/icons';
import { clearTodoState, deleteTodo, updataTodo } from "../../features/todos/todoSlice";
import "./todocard.css"

const TodoCard = ({todo}) =>{

    const dispatch = useDispatch()
    const { addToast:notify } = useToasts()
    const [currentTodoId,setCurrentTodoId] = useState("")
    const [status,setStatus] = useState("")
    const userData = useSelector((state)=>state.user.userData)
    const {isUpdateLoading,isUpdateSuccess,isDeleteLoading,
    isDeleteSuccess,deleteSuccessMsg} = useSelector((state)=>state.todo)


    useEffect(()=>{
       if(isDeleteSuccess){
            notify(`${deleteSuccessMsg}`,
            {appearance: 'success',autoDismiss:"true"})
            dispatch(clearTodoState())
        }
        if(isUpdateSuccess){
            setStatus("")
            setCurrentTodoId("")
            dispatch(clearTodoState())
        }
    },[isDeleteSuccess,isUpdateSuccess])

    const updateCompleted = (todo) =>{
        setCurrentTodoId(todo._id)
        setStatus("complete")
        let newtodo={
            ...todo,
            complete:!todo.complete
        }
        dispatch(updataTodo({todoData:newtodo,todoId:todo._id,userId:userData._id}))
    }

    const updateArchive = (todo) =>{
        setCurrentTodoId(todo._id)
        setStatus("archive")
        let newtodo={
            ...todo,
            archive:!todo.archive
        }
        dispatch(updataTodo({todoData:newtodo,todoId:todo._id,userId:userData._id}))
    }

    const handleDeleteTodo = (todoId) =>{
        setCurrentTodoId(todoId)
        dispatch(deleteTodo({todoId,userId:userData._id}))
    }

    const calDays = (date) => {
        let day =
            (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24);

        let min = (
            new Date(date).getMinutes() - new Date().getMinutes()
        ).toString();

        if (day > 0) {
            return `${parseInt(day) + 1} Days remaining `;
        } else if (min > 0) {
            return `${min} Minutes remaining`;
        } else {
            return "Time is over !";
        }
    };

    return(
        <div className="todo-card">

            <h4 className="todo-title">{todo.title}</h4>

            <div className={`todo-label`}>
                <span>{todo.label}</span>
                {
                    todo.complete?
                    <>
                        <span>completed</span>
                        <CheckCircle />
                    </>
                    :
                    <>
                        <span>pending</span>
                        <Brightness2Rounded />
                    </>
                }
            </div>
            
            <div className="todo-body">
                <p>
                    <span>{calDays(todo.date)}</span>
                    <AddAlarm />
                </p>
                <p>{todo.discription}</p>
            </div>
            <div className="todo-controll">
                <button onClick={()=>handleDeleteTodo(todo._id)}>
                    <Delete />
                    <span>delete</span>
                    {
                        (isDeleteLoading&&currentTodoId==todo._id)&&
                        <CircularProgress size={25} style={{color:"inherit",margin:"0px"}} />
                    }
                </button>
                <button>
                    <Link to={`/update/${todo._id}`}>
                        <Edit />
                        <span>edit</span>
                    </Link>
                </button>
                <button onClick={()=>updateCompleted(todo)}>
                  {
                    todo.complete?
                    <>
                      <Brightness2Rounded />
                      <span>Setpending</span>
                    </>
                    :
                    <>
                     <CheckCircle />
                     <span>setcompleted</span>
                    </>
                  }
                  {
                        (isUpdateLoading && currentTodoId===todo._id && status==="complete")?
                        <CircularProgress size={25} style={{color:"inherit",margin:"0px"}} />
                        :null
                  }
                </button>
                <button onClick={()=>updateArchive(todo)}>
                    {
                        todo.archive?
                        <>
                            <Unarchive />
                            <span>unArchive</span>
                        </>
                        :
                        <>
                            <Archive />
                            <span>archive</span>
                        </>
                    }
                    {
                        (isUpdateLoading && currentTodoId===todo._id && status==="archive")?
                        <CircularProgress size={25} style={{color:"inherit",margin:"0px"}} />
                        :null
                    }
                </button>
            </div>
        </div>
    )
}
export default TodoCard;