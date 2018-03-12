import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { ToastContainer, toast } from 'react-toastify';
import HTTP from "../../services/http";

import { required } from '../common/fieldValidations';

/**COMPONENT */
import RenderFiled from "../common/renderField";
import PageHeader from "../common/pageheader"; 
import Multiselect from "../common/multiselect";
import Loader from "../common/loader";


/**CONSTANT DATA */
import {OPTIONS} from "../common/options"

class AddRole extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedpermissions:[],
            isLoading:false,
            formAction :"ADD"
        }
        /**event binding  */
        this.addEditRole = this.addEditRole.bind(this);
        this.getARole = this.getARole.bind(this);

    }

    componentWillMount(){
        this.getARole()
    }
    
    render() {
        const { handleSubmit } = this.props;
        const { selectedpermissions, isLoading, formAction } = this.state
        // console.log("selectedpermissions", selectedpermissions)
        return (
            <div>

                {isLoading ? <Loader /> : <div><PageHeader pageTitle={formAction ==="ADD"?"Add New Role":"Edit Role"} route="Role Managment" />
              
                <div className="tab-pane active" >
                    <form onSubmit={handleSubmit(this.addEditRole)}  >
                        <Field name="title" fieldName="Title" type="text" component={RenderFiled} validate={[required]} />
                        
                        
                        <label>Permissions</label>
                        <Field name='permissions' 
                        selectedValues={selectedpermissions}
                        options={OPTIONS} 
                        component={Multiselect} 
                        multi={true}/><br />
  
                        <div className="form-actions">
                            <button type="submit" className="btn green uppercase" disabled={this.props.invalid || this.props.submitting}>Update</button>
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

    addEditRole(data) {
        console.log("in addEditRole", data)
        return;
        HTTP.Request("post", window.admin.addEditRole, data)
        .then(result => { 
            toast(result.message);
            setTimeout(() => {
                this.props.dispatch(push("/role-managment"));
            }, 2000);
        })
            .catch(err => toast(err.message));
    }

    getARole(){
        const { match, initialize } = this.props;
        /*extract plant id from request*/
        let roleID = (match.params.id) ? match.params.id : null;

        if(roleID){
            this.setState({ isLoading: true, formAction:"EDIT"})
            HTTP.Request("get", window.admin.getARole, { id: roleID})
            .then(result => {
                this.setState({ isLoading: false, selectedpermissions: result.data.permissions})

                /*set data to form*/
                initialize(result.data);
            })
        }
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
})(AddRole);


export default changePassword_Form;

