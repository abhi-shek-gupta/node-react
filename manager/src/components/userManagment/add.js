import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { ToastContainer, toast } from 'react-toastify';
import HTTP from "../../services/http";


import { required,emailValiadte,mobileValidate } from '../common/fieldValidations';

/**COMPONENT */
import RenderFiled from "../common/renderField";
import PageHeader from "../common/pageheader"; 
import Multiselect from "../common/multiselect";
import Loader from "../common/loader";
import DropdownComp from "../common/DropdownList";
// import asyncValidate from "./element/asyncValidate";


import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';



/**CONSTANT DATA */
import {OPTIONS} from "../common/options";

var timer ;
class AddUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedprivilege:[],
            isLoading:false,
            formAction :"ADD",
            status:true
        }

        /**event binding  */
        this.addEditUser = this.addEditUser.bind(this);
        this.getAUser = this.getAUser.bind(this);
      

    }

    componentWillMount(){
        this.getAUser()
    }
    
    render() {
        const { handleSubmit } = this.props;
        const { selectedprivilege, isLoading, formAction } = this.state
        // console.log("selectedprivilege",selectedprivilege)
        return (
            <div>

                {isLoading ? <Loader /> : <div><PageHeader pageTitle={formAction ==="ADD"?"Add New User":"Edit User"} route="User Managment" />
              
                <div className="tab-pane active" >
                    <form onSubmit={handleSubmit(this.addEditUser)}  >
                          

                        <Field name="role"
                            options={[{ title: "Super Admin", _id: 1 }, { title: "Admin", _id: 2 }]}                            
                             selectedValues={[{ title: "Super Admin", _id: 1 }]}
                            multi={false}
                            component={Multiselect}
                        /><br />
                        <Field name="firstname" fieldName="First Name" type="text" component={RenderFiled} validate={[required]} />
                        <Field name="lastname" fieldName="Last Name" type="text" component={RenderFiled} validate={[required]} />
                        <Field name="username" fieldName="User Name" type="text" component={RenderFiled} validate={[required]} />
                        <Field name="email" fieldName='Email' type="text" placeholder="abc@yourdoamil.com" component={RenderFiled} validate={[emailValiadte, required]} />
                        <Field name="mobile" fieldName='Mobile' type="number"  component={RenderFiled} validate={[mobileValidate, required]} />
                        <Field name="status"
                            options={[{ label: "Active", value: true }, { label: "In-Active", value: false }]}
                            label="Role"
                            defaultValue={ this.state.status  ? "Active" : "In-Active"}
                            textField="label"
                            valueField="value"
                            component={DropdownComp}
                        /><br />                      
                        <div className="form-actions">
                            <button type="submit" className="btn green uppercase" disabled={this.props.invalid || this.props.submitting}>{formAction === "ADD" ? "Add " : "Edit"}</button>
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
                }

            </div>
        );
    }

    addEditUser(data) {
        console.log("data",data)
        HTTP.Request("post", window.admin.addEditUser, data)
        .then(result => { 
            console.log("result",result);
            toast(result.message);
            setTimeout(() => {
                this.props.dispatch(push("/user-managment"));
            }, 2000);
        })
        .catch(err => {
            if(err && err.error.length>0)
            err.error.map(message => toast(message)  )      
        })
    }

    getAUser(){
        const { match, initialize } = this.props;
        /*extract plant id from request*/
        let userID = (match.params.id) ? match.params.id : null;

        if(userID){
            this.setState({ isLoading: true, formAction:"EDIT"})
            HTTP.Request("get", window.admin.getAUser, { id: userID})
            .then(result => {
                this.setState({ isLoading: false})

                /*set data to form*/
                initialize(result.data);
            })
        }
    }

    getRolesForOptions(){

    }
}

//decorate form component
let AddUser_Form = reduxForm({
    form: "addUser_Form",
    validate: function (values) {
        const errors = {};
        if (values.cPassword !== values.newPassword) errors.cPassword = "Password mismatch";
        return errors;
    },
    // asyncValidate,
    // asyncBlurFields: ['username']
})(AddUser);


export default AddUser_Form;