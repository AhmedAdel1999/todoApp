import React from "react";
import Alert from '@material-ui/lab/Alert';
const Message = (props) =>{
    return(
        <div>
            <Alert onClose={props.handleClose} severity="success">
                Saved Go Back to see.
            </Alert>
        </div>
    )
}
export default Message