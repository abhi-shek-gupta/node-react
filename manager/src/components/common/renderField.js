import React, { Component } from 'react';
import {  FormGroup, FormControl, HelpBlock } from 'react-bootstrap';


class RenderField extends Component {
    render(){    
        let props = this.props; 
        const { input, label, type, fieldName, placeholder, meta: { asyncValidating, touched, error } }  = this.props  ;
        console.log("props",this.props);
        return (
            <FormGroup validationState={!touched ? null : (error ? "error" : "success")}>
                <label>{fieldName}</label>
                <div className={asyncValidating ? 'async-validating' : null}>
                <FormControl
                    { ...input}
                    placeholder={placeholder ? placeholder : ''}
                    type={props.type ? props.type : "text"} />
                </div>
                {/* {touched && error ? error : null} */}
                <HelpBlock>
                    {touched && error ? error : null}
                </HelpBlock>
            </FormGroup>
        );
    }
    
}

export default RenderField;