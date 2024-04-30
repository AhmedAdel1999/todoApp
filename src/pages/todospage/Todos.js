import React, { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { catchTodo} from "../../features/todos/todoSlice";
import TodoCard from "../../components/todocard/todoCard";
import {Brightness2Rounded,AssignmentInd,Work,AllInbox,CheckCircle,Archive} from '@material-ui/icons';
import "./todos.css"


const Todos = () =>{
    const dispatch = useDispatch();
    
    
    
    const data = useSelector((state)=>state.todo.todos)
    const {userData} = useSelector((state)=>state.user)
    let currentUserTodos = data.filter((todo)=>todo.userId === userData._id)
    let numofPending = currentUserTodos.filter((todo) => !todo.complete && !todo.archive).length
    let numofComplete = currentUserTodos.filter((todo) => todo.complete===true && !todo.archive===true).length
    let numofArchive = currentUserTodos.filter((todo) => todo.archive).length
    let numofWork = currentUserTodos.filter((todo) => todo.label === "Work" && !todo.archive).length
    let numofPersonal = currentUserTodos.filter((todo) => todo.label === "Personal" && !todo.archive).length
    const [values,setValues] = useState([]);
    const [selected,setSelected] =useState("SHOW_ALL")
    const [val,setVal] =useState("SHOW_ALL")


    useEffect(()=>{
       setValues([
        {text:"SHOW_ALL",icon:<AllInbox />,total:currentUserTodos.length},
        {text:"COMPLETE",icon:<CheckCircle />,total:numofComplete},
        {text:"PENDING",icon:<Brightness2Rounded />,total:numofPending},
        {text:"PERSONAL",icon:<AssignmentInd />,total:numofPersonal},
        {text:"WORK",icon:<Work />,total:numofWork},
        {text:"ARCHIVE",icon:<Archive />,total:numofArchive}
       ])
    },[data])
    useEffect(()=>{ 
        dispatch(catchTodo());
    },[dispatch])




    let  filterTodos = (value) =>{
    switch (value) {
        case "SHOW_ALL":
            return [...currentUserTodos.filter((todo) => !todo.archive)];
        case "PENDING":
            return [...currentUserTodos.filter((todo) => !todo.complete && !todo.archive)];
        case "COMPLETE":
            return [...currentUserTodos.filter((todo) => todo.complete===true && !todo.archive===true)];
        case "ARCHIVE":
        return [...currentUserTodos.filter((todo) => todo.archive)];
        case "WORK":
        return [...currentUserTodos.filter((todo) => todo.label === "Work" && !todo.archive)];
        case "PERSONAL":
        return [...currentUserTodos.filter((todo) => todo.label === "Personal" && !todo.archive)];
        default:
        return [...currentUserTodos.filter((todo) => !todo.archive)];
        }
    }

const handelSelectanFilter = (val) =>{
    setSelected(val);
    setVal(val)
}

return(
    <div className="todos-container">
        <div className="toggels">
            {values.map((ele,index)=>{
                return(
                    <React.Fragment key={index}>
                        <button className={selected===ele.text?"active":""} onClick={()=>handelSelectanFilter(ele.text)}>
                            <span>{ele.icon}</span>
                            <span>{ele.text} {`( ${ele.total} )`}</span>
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