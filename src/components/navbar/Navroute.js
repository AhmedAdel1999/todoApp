import React, {useState} from "react";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutTodo } from "../../features/todos/userSlice";
import { logoutTodo as LogOut } from "../../features/todos/todoSlice";
import {Home,Clear,ViewWeekSharp,AccountCircle,Add} from '@material-ui/icons';
import { FaBars } from 'react-icons/fa';
import { GetUsername } from "../utils/userData";
import { useMediaQuery } from "react-responsive";
import "./navebar.css"

const Navbar = () =>{
    const token = useSelector((state)=>state.user.token)
    const username = GetUsername()
    const history = useHistory()
    const isShowToggle = useMediaQuery({maxWidth:992})
    const[toggle,setToggle]=useState(false)

    const dispatch = useDispatch()
    const logout = () =>{
        dispatch(logoutTodo())
        dispatch(LogOut())
        history.push("/")
        setToggle(false)
    }

    let style={
        overflow:toggle?"visible":"hidden",
        height:isShowToggle===false?"auto":toggle===true?token?"120px":"80px":"0px"
    }
    
    return(
        <div className="navbar-section" >
           <div className="logo">
                <Link to="/">
                    <Home />
                    <span>TODO</span>
                </Link>
           </div>
           {
               isShowToggle&&
               <div className="toggel" onClick={()=>setToggle(!toggle)}>
                   {
                       toggle?
                       <Clear />
                       :
                       <FaBars />
                   }
               </div>
           }
           <ul className="links" style={{...style}}>
               {
                   token?
                   <React.Fragment>
                       <li>
                            <Link onClick={()=>setToggle(false)} to="/" className="account">
                                <AccountCircle/>{username}
                            </Link>
                       </li>
                       <li>
                            <Link onClick={()=>setToggle(false)} to="/" onClick={logout}>
                                Logout
                            </Link> 
                       </li>
                       <li>
                            <Link onClick={()=>setToggle(false)} to="/create" className="add">
                                <Add />
                            </Link>
                       </li>
                   </React.Fragment>
                   :
                   <React.Fragment>
                       <li>
                            <Link onClick={()=>setToggle(false)} to="/login">
                                Login
                            </Link>
                       </li>
                       <li>
                            <Link onClick={()=>setToggle(false)} to="/register">
                                Register
                            </Link>
                       </li>
                   </React.Fragment>
               }
           </ul>
        </div>
    )
}
export default Navbar;