import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required,password } from '../../common/fieldValidations';
import RenderFiled from "../../common/renderField";

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        /**event binding  */
        this.editPassword = this.editPassword.bind(this);

    }

    editPassword(data) {
        console.log("in editPassword", data)

    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div> 
                {/* <!-- START CHANGE PASSWORD --> */}
                <div className="tab-pane active" >
                    <form onSubmit={handleSubmit(this.editPassword)}  >
                        <Field name="oldPassword" fieldName="Old password" type="password"  component={RenderFiled} validate={[required]} />
                        <Field name="newPassword" fieldName='New Password' type="password"  component={RenderFiled} validate={[required, password]} />
                        <Field name="cPassword" fieldName='Confirm Password' type="password"  component={RenderFiled} validate={[required]} />                        
                        <div className="form-actions">
                            <button type="submit" className="btn green uppercase" disabled={this.props.invalid || this.props.submitting}>Update</button>
                        </div>
                    </form>
                </div>
                {/* <!-- END CHANGE PASSWORD --> */}

            </div>
        );
    }

}

//decorate form component
let changePassword_Form = reduxForm({
    form: "changePassword_Form ",
    validate: function (values) {
        const errors = {};
        if (values.cPassword !== values.newPassword) errors.cPassword = "Password mismatch";
        return errors;
    }
})(ChangePassword);


export default changePassword_Form ;

