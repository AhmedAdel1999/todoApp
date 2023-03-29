import React, { useState } from "react";
import {Brightness2Rounded,Delete,CheckCircle,Archive,Unarchive,Edit,AddAlarm} from '@material-ui/icons';
import { updataTodo } from "../../features/todos/todoSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetConfig } from "../utils/userData";
import "./todocard.css"
import DeleteModal from "../deleteModal/deleteModal";

const TodoCard = ({todo}) =>{

const dispatch = useDispatch()
const config = GetConfig()
const[showModal,setShowModal]=useState(false)

const updateCompleted = async (todo) =>{
    let newtodo={
        ...todo,
        complete:!todo.complete
    }
    await dispatch(updataTodo({todo:newtodo,config}))
}
const updateArchive = (todo) =>{
    let newtodo={
        ...todo,
        archive:!todo.archive
    }
    dispatch(updataTodo({todo:newtodo,config}))
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
            <div className={`todo-label ${todo.complete?"green":"red"}`}>
                <span>{todo.label}</span>
                {
                    todo.complete?
                    <span>completed<CheckCircle /></span>
                    :
                    <span>pending<Brightness2Rounded /></span>
                }
            </div>
            <h4 className="todo-title">{todo.title}</h4>
            <div className="todo-body">
                <p>{calDays(todo.date)}<AddAlarm /></p>
                <p>{todo.discription}</p>
            </div>
            <div className="todo-controll">
                <button onClick={()=>setShowModal(true)}><Delete />delete</button>
                <DeleteModal todoId={todo._id} showModal={showModal} setShowModal={setShowModal} />
                <button><Link to={`/update/${todo._id}`}><Edit />edit</Link></button>
                <button onClick={()=>updateCompleted(todo)}>
                  {
                    todo.complete?
                    <span><Brightness2Rounded />Setpending</span>
                    :
                    <span><CheckCircle />setcompleted</span>
                  }
                </button>
                <button onClick={()=>updateArchive(todo)}>
                    {
                        todo.archive?
                        <span><Unarchive />unArchive</span>
                        :
                        <span><Archive />archive</span>
                    }
                </button>
            </div>
        </div>
    )
}
export default TodoCard;