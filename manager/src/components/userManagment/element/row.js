import React, { Component } from 'react';
import Moment from "react-moment";
import { Link } from 'react-router-dom';

class ROW extends Component {
    
    
    render() {
        const {admin} = this.props;
        return (
            <tr className="odd gradeX" >
                <td> {admin.firstname + " " + admin.lastname} </td>
                <td> {admin.email} </td>
                <td> {admin.mobile ? admin.mobile:"NA"} </td>
                <td> {admin.role} </td>
                <td><Moment format="DD MMM YYYY">{admin.created_at}</Moment></td>            
                <td> {admin.status?"Active":"In-Active"} </td>
                <td>                    
                    <Link to={'/user-managment/edit/' + admin._id} className=" btn btn-lg pointer" ><i className="fa fa-pencil-square-o"  title="Edit"></i></Link>
                    <a className=" btn btn-lg pointer" onClick={this.showModal} title="delete"><i className="fa fa-trash no-pointer"  ></i></a>
                </td>
            </tr>
        );
    }

}



export default ROW;

