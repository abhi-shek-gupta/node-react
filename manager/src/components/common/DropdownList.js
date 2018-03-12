import React, { Component } from 'react';
import { DropdownList } from 'react-widgets';
/**
 *DropdownComp needs following props
 * label :-to show label of dropdown 
 * options:-options of dropdown must be an array
 * name :- by which it will create field
 * defaultValue :- to show default value on dropdown
 * textField :-to show text on dropdown
 * valueField :- corresponding value
 */

class DropdownComp extends Component {
    constructor(props){
        super(props);

        /**event binding */
        this.updateValue = this.updateValue.bind(this);
    }
    render(){
        const { input, options, defaultValue, label, textField, valueField} = this.props; 
        return (<div>
            <label>{label}</label>
            <DropdownList   
                data={options}
                defaultValue={defaultValue}
                name={input.name}
                textField={textField}
                valueField={valueField}
                // onChange={input.onChange}
                onChange={this.updateValue}
            />
        </div>
           
        )
    }

    updateValue(newValue) {
        /** redux onchange method  */
        /**to send only value on server */   
        this.props.input.onChange(newValue.value);
    }
}

export default DropdownComp;