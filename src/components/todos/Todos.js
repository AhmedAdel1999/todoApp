import React, { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { catchTodo} from "../../features/todos/todoSlice";
import { GetConfig } from "../utils/userData";
import TodoCard from "../todocard/todoCard";
import {Brightness2Rounded,AssignmentInd,Work,AllInbox,CheckCircle,Archive} from '@material-ui/icons';
import "./todos.css"


const Todos = () =>{
    const config = GetConfig();
    const dispatch = useDispatch();
    const [value] = useState([
        {text:"SHOW_ALL",icon:<AllInbox />},
        {text:"COMPLETE",icon:<CheckCircle />},
        {text:"PENDING",icon:<Brightness2Rounded />},
        {text:"PERSONAL",icon:<AssignmentInd />},
        {text:"WORK",icon:<Work />},
        {text:"ARCHIVE",icon:<Archive />}
    ]);
    const [selected,setSelected] =useState("SHOW_ALL")
    const data = useSelector((state)=>state.todo.todos)
    const [val,setVal] =useState("SHOW_ALL")


    useEffect(()=>{ 
        dispatch(catchTodo(config));
    },[dispatch])


    let  filterTodos = (value) =>{
    switch (value) {
        case "SHOW_ALL":
            return [...data.filter((todo) => !todo.archive)];
        case "PENDING":
            return [...data.filter((todo) => !todo.complete && !todo.archive)];
        case "COMPLETE":
            return [...data.filter((todo) => todo.complete===true && !todo.archive===true)];
        case "ARCHIVE":
        return [...data.filter((todo) => todo.archive)];
        case "WORK":
        return [...data.filter((todo) => todo.label === "Work" && !todo.archive)];
        case "PERSONAL":
        return [...data.filter((todo) => todo.label === "Personal" && !todo.archive)];
        default:
        return [...data.filter((todo) => !todo.archive)];
        }
    }

const handelSelectanFilter = (val) =>{
    setSelected(val);
    setVal(val)
}

return(
    <div className="todos-container">
        <div className="toggels">
            {value.map((ele,index)=>{
                return(
                    <React.Fragment key={index}>
                        <button className={selected===ele.text?"active":""} onClick={()=>handelSelectanFilter(ele.text)}>
                            <span>{ele.icon}</span>
                            <span>{ele.text}</span>
                        </button>
                    </React.Fragment>
                )
            })}
        </div>
        <div className="todos">
            {filterTodos(val).length>0?(
                filterTodos(val).map((todo,index)=>{
                    return <TodoCard todo={todo} key={index} />
                })
            ):(<p>no tasks yet!</p>)}
        </div>
    </div>
)
}
export default Todos;