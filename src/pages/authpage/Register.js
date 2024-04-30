import React,{useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { CircularProgress } from "@material-ui/core";
import { cleanUserState, registerTodo } from "../../features/todos/userSlice";
import ErrorMsg from "../../utils/errorMsg";
import * as Yup from "yup"
import "./auth.css"


const Register = () => {

  const {isRegisterLoading,isSuccessRegister,isRegisterError,registerErrMessage} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  console.log(isSuccessRegister)

  const onSubmit = async(values)=>{
    await dispatch(registerTodo(values))
  }

 
  useEffect(() => {
    if (isSuccessRegister) {
      dispatch(cleanUserState())
      history.push("/")
    }
  }, [isSuccessRegister]);
  
  const schema = () =>{
    const schema = Yup.object().shape({
      userName:Yup.string().min(2, 'Too Short!').required("required"),
      password:Yup.string().min(6, 'Too Short!').required("required"),
    })
    return schema
  }


  return (
    <div className="auth">
        <div className="auth-content">
          <h3 className="auth-header">
             Register Form
          </h3>
          {
            isRegisterError&&
            <ErrorMsg msg={registerErrMessage} />
          }
          <Formik 
            initialValues={{
            userName:"",
            password:"",
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            <Form>
              <div>
                <Field type="text" name="userName" placeholder="Username*" />
                <ErrorMessage name="userName" component="span" />
              </div>

              <div>
                <Field type="password" name="password" placeholder="Password*" />
                <ErrorMessage name="password" component="span" />
              </div>

              <button type="submit">
                <span>Register</span>
               {
                isRegisterLoading&&
                <CircularProgress size={25} style={{margin:"0px",color:"inherit"}} />
               }
              </button>
            </Form>
          </Formik>
        </div>
    </div>
  );
}

export default Register;
