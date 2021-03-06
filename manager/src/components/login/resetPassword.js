import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { ToastContainer, toast } from 'react-toastify';

/**COMPONENTS */
import { required } from "../common/fieldValidations";
import RenderFiled from "../common/renderField";

/**CSS */
import "../../assets/css/login.min.css";

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        /*bind <this> with class methods*/
        this.resetpswd = this.resetpswd.bind(this);
    }
    render() {

        const { handleSubmit } = this.props;
        return (
            <div className='login'>
                <div className="content ">
                    <form onSubmit={handleSubmit(this.resetpswd)} className="login-form" >
                        <h3 className="font-green">Reset Password </h3>                        
                        <Field name="otp" fieldName='OTP' type="text"  component={RenderFiled} validate={[required]} />
                        <Field name='newPassword' fieldName=' New Password' type="password" component={RenderFiled}   validate={[required]} />
                        <Field name="cPassword" fieldName='Confirm Password' type="password" component={RenderFiled}  validate={[required]} />
                        <div className="form-actions">
                            <Link to="/login"><button type="button" className="btn green btn-outline">Back To Login</button></Link>
                            <button type="submit" className="btn btn-success uppercase pull-right" disabled={this.props.invalid || this.props.submitting}>Submit</button>
                        </div>
                    </form>
                </div>
                <ToastContainer
                    position="top-right"
                    type="error"
                    autoClose={1999}
                    hideProgressBar={false}
                    newestOnTop={false}
                />
            </div>
        );
    }

    resetpswd(data) {

        const { match } = this.props;
        /*extract restkey from url*/
        let resetQuery = (match.params.token) ? match.params.token : null;
        data.resetQuery = resetQuery;
        console.log("in resetpswd");
        console.log(data);
        this.props.dispatch({
            type: "ADMIN_RESET_PASSWORD",
            data: data,
            success: (r) => {
                console.log("r@", r)
                if (!r) return false;
                toast(r.message);
                setTimeout(() => {
                    this.props.dispatch(push("/"))
                }, 2000);
                
            },
            error: (e) => {
                console.log("e@@@@@", e);
                toast(e.message)
            }
        })
    }
}

//decorate form component
let reset_form = reduxForm({
    form: "reset_password",
    validate: function (values) {
        const errors = {};
        if (values.cPassword !== values.newPassword) errors.cPassword = "Password mismatch";
        return errors;
    }
})(ResetPassword);

export default reset_form;

