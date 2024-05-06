import React,{useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { CircularProgress } from "@material-ui/core";
import { cleanUserState, loginTodo } from "../../features/todos/userSlice";
import ErrorMsg from "../../utils/errorMsg";
import * as Yup from "yup"
import "./auth.css"

const Login = () => {

  const {isLoggedINLoading,isSuccessLoggedIn,isLoginError,loginErrMessage} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = async(values)=>{
    await dispatch(loginTodo(values))
  }


  useEffect(() => {
    if (isSuccessLoggedIn) {
      dispatch(cleanUserState())
      history.push("/")
    }
  }, [isSuccessLoggedIn]);
  
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
          <h3 className="auth-header">Login Form</h3>
          {
            isLoginError&&
            <ErrorMsg msg={loginErrMessage} />
          }
          <Formik 
            initialValues={{
            userName:"ahmed",
            password:"ahmed123",
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            <Form>
              <div>
                <Field type="text" name="userName" placeholder="Username:" />
                <ErrorMessage name="userName" component="span" />
              </div>

              <div>
                <Field type="password" name="password" placeholder="Password:" />
                <ErrorMessage name="password" component="span" />
              </div>

              <button type="submit">
                <span>Login</span>
                {
                  isLoggedINLoading&&
                  <CircularProgress size={25} style={{margin:"0px",color:"inherit"}} />
                }
              </button>
            </Form>
          </Formik>
        </div>
    </div>
  );
}

export default Login;
