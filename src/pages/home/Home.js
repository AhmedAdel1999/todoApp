import React from "react";
import cover from "../../assets/cover.png"
import "./home.css"
const Home = () =>{
    return(
        <div className="home-page">
               <section className="home-img">
                <img 
                    alt="home-image"
                    loading="lazy"
                    src={cover}
                />
                </section>
                <section className="home-text">
                    <h1><span>Create</span> Your Tasks</h1>
                    <p>
                        A tasks manager allows you to better manage your time by
                        allowing you to lay out what you need to accomplish
                        and then coordinate your time from there. manage your time
                        to achive your goal in life.
                    </p>
                </section>
        </div>
    )
}
export default Home;
