


import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

/**SERVICES */
import Session from '../../services/session';

/**COMPONENTS */
import { required, emailValiadte } from "../common/fieldValidations";
import RenderFiled from "../common/renderField";

/**CSS */
import "../../assets/css/login.min.css";

class Login extends Component {

    constructor(props){
        super(props);

        /*bind <this> with class methods*/
        this.loginnow = this.loginnow.bind(this);
    }
    render() {

        const { handleSubmit } = this.props;
        return (
            <div className='login'> 
            <div className="content ">
                {/* <!-- BEGIN LOGIN FORM --> */}

                    <form onSubmit={handleSubmit(this.loginnow)} className="login-form" >
                        <h3 className="form-title font-green">Sign In</h3>                                
                        <Field name="email" fieldName='Email' type="text" placeholder='Email' component={RenderFiled} validate={[emailValiadte, required]} />
                        <Field name="password" fieldName='Password'  type='password' placeholder='Password' component={RenderFiled} validate={[required]}/>                                                 
        
                    <div className="form-actions">
                            <button type="submit" className="btn green uppercase" disabled={this.props.invalid || this.props.submitting}>Login</button>
                        <Link to="/forgot-password" id="forget-password" className="forget-password">Forgot Password?</Link>
                    </div>
                </form>
                {/* <!-- END LOGIN FORM --> */}
            </div>
                <ToastContainer
                    position="top-right"
                    type="error"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                />
            </div>
        );
    }

    loginnow(data) {
        console.log(data);
        this.props.dispatch({
            type :"Admin-login",
            data:data,
            success :(r) =>{
                console.log("r@",r)
                if (!r) return false;
                /*set user session in cookie*/
                Session.setSession("token", r.data.token);
                Session.setSession("user", r.data.data);
            },
            error :(e) =>{
                console.log("e@@@@@",e);
                toast(e.message)
            }
        })
    }
}
     
//decorate form component
export default Login = reduxForm({
    form: "login"
})(Login);



      