import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { FormGroup,FormControl,} from "react-bootstrap";
class ChangeAvtar extends Component {

    constructor(props){
        super(props);

        /**event binding */
        this.uploadAvtar = this.uploadAvtar.bind(this);
    }

    static FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup >
            <FormControl {...props} />
        </FormGroup>
    );
    }
    uploadAvtar(data){
        console.log("uploadAvtar :",data);
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>

                {/* <!-- CHANGE AVATAR TAB --> */}
                <div className="tab-pane" id="tab_1_2">
                    <p> AVTAR IMAGE</p>                  
                    <form onSubmit={handleSubmit(this.uploadAvtar)}>
                        <div className="form-group">
                            <div className="fileinput fileinput-new" data-provides="fileinput">
                                <div className="fileinput-new thumbnail" style={{ width: "200px", height: "150px" }}>
                                    <img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image" alt="" /> </div>
                                <div className="fileinput-preview fileinput-exists thumbnail" style={{ maxWidth: "200px", maxHeight: "150px" }}> </div>
                                <div>                                               
                                    <Field name="avtar"  type="file" component={ChangeAvtar.FieldGroup} />                                                               
                                </div>
                            </div>
                        </div>
                        <div className="margin-top-10">
                            <button type="submit" className="btn green uppercase" >Upload</button>         
                        </div>
                    </form>
                </div>
                {/* <!-- END CHANGE AVATAR TAB --> */}

            </div>
        );
    }

}

//decorate form component
let changeAvtar_Form = reduxForm({
    form: "changeAvtar_Form"
})(ChangeAvtar);

export default changeAvtar_Form


