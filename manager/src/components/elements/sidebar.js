import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
/**action types */
import {ADMIN_LOGOUT} from "../common/actions";


/*import images*/

class SideBar extends Component {

    constructor(props) {
        super(props);
        /*bind this with current class object*/
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.dispatch({
            type: ADMIN_LOGOUT,
            success: (e) => {
                /*redirect user to login*/
                this.props.dispatch(push("/login"));
            }
        });
    }

    render(){
        /*if user is not logged in then return empty */
        if (!this.props.isAdminLoggedIn) return (null);

        return (
            <div>
                {/* <!-- BEGIN SIDEBAR --> */}
                <div className="page-sidebar-wrapper">
                    <div className="page-sidebar navbar-collapse collapse">
                        {/* <!-- BEGIN SIDEBAR MENU --> */}
                        <ul className="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" >
                          
                            <li className="nav-item start ">
                                <Link to="/"><i className="icon-home"></i>Dashboard</Link>                                                           
                            </li>
                            <li className="nav-item start ">
                                <Link to="/role-managment"><i className="fa fa-user"></i>Role Managment</Link>                               
                            </li>
                            <li className="nav-item start ">
                                <Link to="/user-managment"><i className="fa fa-bullseye"></i>User Managment</Link>
                            </li>
                            <li className="nav-item start ">
                                <Link to="/profile"><i className="fa fa-bullseye"></i>Profile</Link>
                            </li>
                            <li className="nav-item start ">
                                <Link to="/change-password"><i className="fa fa-lock"></i>Change Password</Link>
                            </li>                    
                            <li>
                                <a onClick={this.logout} className='pointer'><i className="fa fa-sign-out"></i>Logout</a>
                            </li>
                            <li className="heading">
                                <h3 className="uppercase">Features</h3>
                            </li>
                        </ul>
                        {/* <!-- END SIDEBAR MENU --/> */}                    
                    </div>
                </div>
                {/* <!-- END SIDEBAR --> */}
             </div>

        )
    }
}


/*get props*/
function mapStatesToProps(state) {
    return ({
        isAdminLoggedIn: (state.admin.token) ? true : false
    });
}

export default connect(mapStatesToProps)(SideBar);
