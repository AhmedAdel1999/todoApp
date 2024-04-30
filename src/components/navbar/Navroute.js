import React from "react";
import {Link,NavLink} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../features/todos/userSlice";
import { clearTodoData } from "../../features/todos/todoSlice";
import {AccountCircle,Add} from '@material-ui/icons';
import logo from "../../assets/logo.png"
import "./navebar.css"

const Navbar = () =>{
    const {userData} = useSelector((state)=>state.user)

    const dispatch = useDispatch()
    const logout = () =>{
        dispatch(clearTodoData())
        dispatch(clearUserData())
    }

    
    return(
        <div className="navbar-section" >
            <Link className="logo" to="/">
                <img 
                    alt="logo"
                    src={logo}
                    loading="lazy"
                />
                <h3>Todo App</h3>
            </Link>
           <ul className="links">
               {
                   userData.token?
                   <React.Fragment>
                       <li>
                            <NavLink to="/" className="account">
                                <AccountCircle/>
                                <span>{userData.userName}</span>
                            </NavLink>
                       </li>
                       <li>
                            <Link 
                                to="/"
                                onClick={logout} 
                            >
                                Logout
                            </Link> 
                       </li>
                       <li>
                            <NavLink to="/create" className="add">
                                <Add />
                            </NavLink>
                       </li>
                   </React.Fragment>
                   :
                   <React.Fragment>
                       <li>
                            <NavLink to="/login">
                                Login
                            </NavLink>
                       </li>
                       <li>
                            <NavLink to="/register">
                                Register
                            </NavLink>
                       </li>
                   </React.Fragment>
               }
           </ul>
        </div>
    )
}
export default Navbar;