import { Hypnosis } from "react-cssfx-loading";
const LandingPage = () =>{
    let landingStyle ={
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e4dfd9"
    }
    return(
        <div style={{...landingStyle}}>
            <Hypnosis width={"100px"} height={"100px"} color="#522157" />
        </div>
    )
}
export default LandingPage;