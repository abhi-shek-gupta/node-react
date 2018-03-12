import React, { Component } from 'react';
import Moment from "react-moment";
import { Link } from 'react-router-dom';

class ROW extends Component {
    
    
    render() {
        const {role} = this.props;
        return (
            <tr className="odd gradeX" >
                <td> {role.title} </td>
                <td><Moment format="DD MMM YYYY">{role.created_at}</Moment></td>            
                <td className="center"> 12 Jan 2012 </td>
                <td>
                    <a className=" btn btn-lg pointer" onClick={this.showModal} title="View"><i className="fa fa-eye no-pointer"  ></i></a>
                    <Link to={'/role-managment/edit/' + role._id} className=" btn btn-lg pointer" ><i className="fa fa-pencil-square-o"  title="Edit"></i></Link>
                    
                </td>
            </tr>
        );
    }

}



export default ROW;

