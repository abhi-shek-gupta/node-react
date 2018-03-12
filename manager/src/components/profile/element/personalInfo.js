import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';


import { required, emailValiadte, minLengthValidate, mobileValidate} from "../../common/fieldValidations";
import RenderFiled from "../../common/renderField";

class PersonalInfo extends Component {

    constructor(props){
        super(props);

        /**event binding  */
        this.editPersonalInfo = this.editPersonalInfo.bind(this);

    }

    editPersonalInfo(data){
        console.log("in editProfile",data)

    }

    render() {

        const { handleSubmit } = this.props;
        return (
            <div> 

                {/* <!-- PERSONAL INFO TAB --> */}
                <div className="tab-pane active" >

                    <form onSubmit={handleSubmit(this.editPersonalInfo)}  >
                       
                        <Field name="firstname" fieldName='First Name' type="text" placeholder='First Name' component={RenderFiled} validate={[required, minLengthValidate]} />
                        <Field name="lastname" fieldName='Last Name' type="text" placeholder='Last Name' component={RenderFiled} validate={[required, minLengthValidate]} />
                        <Field name="username" fieldName='Username' type="text" placeholder='Username' component={RenderFiled} validate={[required, minLengthValidate]} />
                        <Field name="email" fieldName='Email' type="text" placeholder='abc@yourdomain.com' component={RenderFiled} validate={[emailValiadte, required]} />
                        <Field name="mobile" fieldName='Mobile No.' type="number" placeholder='9999999999' component={RenderFiled} validate={[mobileValidate, required]} />                      
                        <div className="form-actions">
                            <button type="submit" className="btn green uppercase" disabled={this.props.invalid || this.props.submitting}>Save Changes</button>         
                        </div>
                    </form>
                    
                </div>
                {/* <!-- END PERSONAL INFO TAB --> */}
            </div>
        );
    }

}


let PersonalInfo_Form = reduxForm({
    form: "edit_personal_info"
})(PersonalInfo);

//decorate form component
export default PersonalInfo_Form;




