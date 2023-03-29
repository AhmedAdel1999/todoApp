import React,{useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import LockIcon from '@material-ui/icons/Lock';
import { loginTodo,cleanState } from "../../features/todos/userSlice";
import Load from "../utils/Load"
import ErrorMsg from "../utils/errorMsg";
import * as Yup from "yup"
import "./auth.css"

const Login = () => {

  const {isSuccess,isError,isLoading,errMessage} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = async(values)=>{
    await dispatch(loginTodo(values))
  }

  useEffect(() => {
      dispatch(cleanState());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(cleanState());
      history.push("/")
    }
  }, [isSuccess, isError]);
  
  const schema = () =>{
    const schema = Yup.object().shape({
      userName:Yup.string().min(2, 'Too Short!').required("required"),
      password:Yup.string().min(6, 'Too Short!').required("required"),
    })
    return schema
  }

  if(isLoading){
    return <Load />
  }

  return (
    <div className="auth">
        <div className="auth-content">
          <div className="auth-header">
            <span><LockIcon /></span>
            <span>Login</span>
          </div>
          {
            isError&&
            <ErrorMsg msg={errMessage} />
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

              <button type="submit">Login</button>
            </Form>
          </Formik>
        </div>
    </div>
  );
}

export default Login;
