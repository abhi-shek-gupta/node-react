import React from 'react';
import Select from 'react-select';
/**CSS */
import 'react-select/dist/react-select.css';

class Multiselect extends React.Component{

    constructor(props){
        super(props);
        this.state={
            disabled: false,
            clearable: true,
            rtl: false,
            selectValue: this.props.selectedValues[0]
        }
        /**bind */
        this.updateValue = this.updateValue.bind(this);
        this.getOptions = this.getOptions.bind(this);

    }


   /** to get options Async */
    getOptions() {
        var optionsChk = new Promise(
            (resolve, reject) => {
                if (this.props.options) {
                    setTimeout(() => {
                        resolve(this.props.options); // fulfilled
                    }, 1000);

                } else {
                    reject("err"); // reject
                }

            }
        );
        return optionsChk.then(data => { return { options: data } })
            .catch(err => { return err })

    }

    updateValue(newValue) {
        this.setState({
            selectValue: newValue,
        });

        console.log(newValue)
         /** redux onchange method  */
        /**to send only id on server */
        if(this.props.multi){
            let array = newValue.map((element) => {
                return element._id
            })
            this.props.input.onChange(array);
        }
       
        else this.props.input.onChange(newValue);
    }

    render() {

        const { valuekey ,labelkey ,multi} = this.props;

        console.log("====",this.props);
        return (
            <div className="section">
                <Select.Async
                    multi={multi?true:false}
                    value={this.state.selectValue}
                    onChange={this.updateValue}
                    valueKey={valuekey ? valuekey:"_id"}
                    labelKey={labelkey ? labelkey:"title"}
                    loadOptions={this.getOptions} />
            </div>
        );
    }
}

export default Multiselect;