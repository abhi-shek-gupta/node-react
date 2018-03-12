import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavDropdown , MenuItem} from "react-bootstrap";
import avtar from "../../assets/avatar.jpg";
/*import images*/

class Header extends Component {
    render() {
        /*if user is not logged in then return empty */
        if (!this.props.isAdminLoggedIn) return (null);

        return ( 
        <div>
            {/* <!-- BEGIN HEADER --> */}
            <div className="page-header navbar navbar-fixed-top">
                {/* <!-- BEGIN HEADER INNER --> */}
                <div className="page-header-inner ">
                    {/* <!-- BEGIN LOGO --> */}
                    <div className="page-logo" >                       
                         <span style={{"color":"white"}}>  SUPERADMIN </span>   
                    </div>
                    {/* <!-- END LOGO --> */}
                    {/* <!-- BEGIN RESPONSIVE MENU TOGGLER --> */}
                    <a href="#" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                        <span></span>
                    </a>
                    {/* <!-- END RESPONSIVE MENU TOGGLER --> */}
                    {/* <!-- BEGIN TOP NAVIGATION MENU --> */}
                    <div className="top-menu">
                        <ul className="nav navbar-nav pull-right">
                            {/* <!-- BEGIN NOTIFICATION DROPDOWN --> */}
                            <li className="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                    <i className="icon-bell"></i>
                                    <span className="badge badge-default"> 7 </span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="external">
                                        <h3>
                                            <span className="bold">12 pending</span> notifications</h3>
                                        <a href="page_user_profile_1.html">view all</a>
                                    </li>
                                    <li>
                                        <ul className="dropdown-menu-list scroller" style={{height: "250px"}} data-handle-color="#637283">
                                            <li>
                                                <a href="#">
                                                    <span className="time">just now</span>
                                                    <span className="details">
                                                        <span className="label label-sm label-icon label-success">
                                                            <i className="fa fa-plus"></i>
                                                        </span> New user registered. </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="time">3 mins</span>
                                                    <span className="details">
                                                        <span className="label label-sm label-icon label-danger">
                                                            <i className="fa fa-bolt"></i>
                                                        </span> Server #12 overloaded. </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="time">10 mins</span>
                                                    <span className="details">
                                                        <span className="label label-sm label-icon label-warning">
                                                            <i className="fa fa-bell-o"></i>
                                                        </span> Server #2 not responding. </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="time">14 hrs</span>
                                                    <span className="details">
                                                        <span className="label label-sm label-icon label-info">
                                                            <i className="fa fa-bullhorn"></i>
                                                        </span> Application error. </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="time">2 days</span>
                                                    <span className="details">
                                                        <span className="label label-sm label-icon label-danger">
                                                            <i className="fa fa-bolt"></i>
                                                        </span> Database overloaded 68%. </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="time">3 days</span>
                                                    <span className="details">
                                                        <span className="label label-sm label-icon label-danger">
                                                            <i className="fa fa-bolt"></i>
                                                        </span> A user IP blocked. </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span className="time">4 days</span>
                                                    <span className="details">
                                                        <span className="label label-sm label-icon label-warning">
                                                            <i className="fa fa-bell-o"></i>
                                                        </span> Storage Server #4 not responding dfdfdfd. </span>
                                                </a>
                                            </li>
                                         
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                                <li >
                                    <Link to="/profile">
                                        <img className="img-circle user-icon" src={avtar}  alt="Nick"/>                                                                 
                                    </Link>

                                </li>

                                <NavDropdown id="top-nav-header" title="Nick" >
                                    <MenuItem componentClass="span" className="menu-item"> <Link to="/profile">My Profile</Link></MenuItem>
                                    <MenuItem componentClass="span" className="menu-item" ><Link to="/change-password">Change Password</Link></MenuItem>
                                    <MenuItem divider />
                                    <MenuItem componentClass="span" className="menu-item"><Link to='/' onClick={this.logout}>Logout</Link></MenuItem>
                                </NavDropdown>
                            {/* <!-- END NOTIFICATION DROPDOWN --> */}

                            
                               
                            {/* <!-- END USER LOGIN DROPDOWN --> */}
                        </ul>
                    </div>
                    {/* <!-- END TOP NAVIGATION MENU --> */}
                </div>
                {/* <!-- END HEADER INNER --> */}
            </div>
            {/* <!-- END HEADER --> */}
            {/* <!-- BEGIN HEADER & CONTENT DIVIDER --> */}
            <div className="clearfix"> </div>
            {/* <!-- END HEADER & CONTENT DIVIDER --> */}

            {/* <!-- BEGIN CONTAINER --> */}
            <div className="page-container"></div>
        </div>)
        
    }
}



/*get props*/
function mapStatesToProps(state) {
    return ({
        isAdminLoggedIn: (state.admin.token) ? true : false
    });
}

export default connect(mapStatesToProps)(Header);
