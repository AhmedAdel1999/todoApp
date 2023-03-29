import React from "react";
import "./home.css"
const Home = () =>{
    return(
        <div className="home-page">
            <div className="welcomebox">
                <div>
                    <h3>Create Your Todo</h3>
                    <p>
                        A to-do allows you to better manage your time by
                        allowing you to lay out what you need to accomplish
                        and then coordinate your time from there.
                    </p>
                    <p>manage your time to achive your goal in life.</p>
                </div>
            </div>
            <div className="footer">
                <h6>create your own todo</h6>
                <p>copyright &copy; todo app 2021</p>
            </div>
        </div>
    )
}
export default Home;