import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Navbar from './components/navbar/Navroute';
import Register from './components/auth/Register';
import Todos from "./components/todos/Todos"
import CreateTodoItem from './components/createtodo/createTodo';
import PageNotFound from './components/pagenotfound/pageNotFound';
import "./App.css"

 


const  App = () => {
    const token = useSelector((state)=>state.user.token)
    const[AppHeight,setAppHeight]=useState(`100vh`)
    useEffect(()=>{
      setAppHeight(`${window.innerHeight - 1}px`)
    },[])
  return (
    <div className="App" style={{height:AppHeight}}>
      <BrowserRouter>
         <Navbar />
              <Switch>
                <Route path="/" exact strict component={token?Todos:Home} />
                <Route path="/register" exact strict component={Register} />
                <Route path="/login" exact strict component={Login} />
                <Route path="/create" exact strict component={token?CreateTodoItem:PageNotFound} />
                <Route path="/update/:id" exact strict component={token?CreateTodoItem:PageNotFound} />
                <Route path="*" component={PageNotFound} />
              </Switch>
 
      </BrowserRouter>
    </div>
  );
}

export default App;
