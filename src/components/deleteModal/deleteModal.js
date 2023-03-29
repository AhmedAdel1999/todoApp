import React from "react";
import {Delete,Clear,Done} from '@material-ui/icons';
import Modal from 'react-bootstrap/Modal'
import { GetConfig } from "../utils/userData";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../features/todos/todoSlice";
import "./deleteModal.css"

const DeleteModal = ({showModal,setShowModal,todoId}) =>{

    const dispatch = useDispatch()
    const config = GetConfig()
    
    const deleteTodoItem = async () =>{
        await dispatch(deleteTodo({id:todoId,config}))
        setShowModal(false)
    }
    
    return(
        <Modal className={`modal`} show={showModal} 
        onHide={() => setShowModal(false)} size="lg">
            <div className="modal-header">
                <div>
                    <Delete />
                    Confirm Delete
                </div>
                <div>
                    <Clear onClick={()=>setShowModal(false)} />
                </div>
            </div>
            <div className="modal-body">
                <p>
                   Are you sure you want to delete this todo 
                </p>
            </div>
            <div className="modal-footer">
                <div>
                    <button onClick={()=>setShowModal(false)}>
                       <Clear /> No
                    </button>
                    <button onClick={()=>deleteTodoItem()}>
                    <Done /> Yes
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default DeleteModal;