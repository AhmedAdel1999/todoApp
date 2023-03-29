import React from "react";
import { useHistory } from "react-router-dom";
import WarningIcon from '@material-ui/icons/Warning';
import "./pagenotfound.css"
const PageNotFound = () =>{
    const history = useHistory()
    return(
        <div className="notfound">
            <div>
                <h3>Error 404 <WarningIcon /></h3>
                <p>Page Not Found try to login!</p>
                <button onClick={()=>history.goBack()}>
                  go back
                </button>
            </div>
        </div>
    )
}
export default PageNotFound