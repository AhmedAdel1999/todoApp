import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Home from './pages/home/Home';
import Login from './pages/authpage/Login';
import Navbar from './components/navbar/Navroute';
import Register from './pages/authpage/Register';
import Todos from "./pages/todospage/Todos"
import CreateTodoItem from './pages/createtodopage/createTodo';
import PageNotFound from './pages/pagenotfound/pageNotFound';
import "./App.css"

 


const  App = () => {
    const {userData} = useSelector((state)=>state.user)
    
  return (
    <div className="App">
      <BrowserRouter>
         <Navbar />
              <Switch>
                <Route path="/" exact strict component={userData.token?Todos:Home} />
                <Route path="/register" exact strict component={Register} />
                <Route path="/login" exact strict component={Login} />
                <Route path="/create" exact strict component={userData.token?CreateTodoItem:PageNotFound} />
                <Route path="/update/:id" exact strict component={userData.token?CreateTodoItem:PageNotFound} />
                <Route path="*" component={PageNotFound} />
              </Switch>
 
      </BrowserRouter>
    </div>
  );
}

export default App;
