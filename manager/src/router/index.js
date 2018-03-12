import React from 'react';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';

/*import private routes for authenticated users*/
import WithoutLogin from './withoutLogin';
import PrivateRoute from './private';
import ProfileRoute from './ProfileRoute';

import Login from '../components/login/login';
import ForgotPassword from "../components/login/forgotPassword";
import ResetPassword from "../components/login/resetPassword";


import Dashboard from '../components/dashboard/dashboard';

/**ROLE MANAGMENT */
import RoleManagement from '../components/roleManagment';
import AddRole from '../components/roleManagment/add';

/**USER MANAGMENT */
import UserManagement from '../components/userManagment';
import AddUser from '../components/userManagment/add';

import Profile from '../components/profile/profile';
import ChangePassword from '../components/changepassword';

/*import Element*/
import Header from '../components/elements/header';
import Footer from '../components/elements/footer';
import SideBar from '../components/elements/sidebar';



class AppRouter extends React.Component {
	render() {
		const {isAdminLoggedIn} = this.props;
		return (

			<ConnectedRouter history={this.props.history}>
				<div>
					<Header />
					{/* <!-- BEGIN CONTAINER --> */}
            <div className="page-container margin-top-container">
						<SideBar />
						<div className="page-content-wrapper">
							{/* <!-- BEGIN CONTENT BODY --> */}
							<div className={isAdminLoggedIn ?"page-content" :null}>
								<Switch>

									<WithoutLogin exact path='/login' component={Login}/>	
									<WithoutLogin exact path='/forgot-password' component={ForgotPassword} />
									<WithoutLogin exact path='/reset-password/:token' component={ResetPassword} />
									
									<PrivateRoute exact path='/' component={Dashboard} />	
									<ProfileRoute exact path='/profile' component={Profile} permission="PROFILE" />	
									<ProfileRoute exact path='/change-password' component={ChangePassword} permission="CHANGEPASSWORD"/>

									{/* RoleManagement */}
									<PrivateRoute exact path='/role-managment' component={RoleManagement} />
									<PrivateRoute exact path='/role-managment/add' component={AddRole} />
									<PrivateRoute exact path='/role-managment/edit/:id' component={AddRole} />	

									{/* UserManagement */}
									<PrivateRoute exact path='/user-managment' component={UserManagement} />
									<PrivateRoute exact path='/user-managment/add' component={AddUser} />
									<PrivateRoute exact path='/user-managment/edit/:id' component={AddUser} />	
												
									{/* <PrivateRoute path='*' component={NotFound} /> */}

								</Switch>

							</div>

						</div>

					</div>
					<Footer />
				</div>
			</ConnectedRouter>

		);
	}
}


/*get props*/
function mapStatesToProps(state) {
	return ({
		isAdminLoggedIn: (state.admin.token) ? true : false
	});
}

export default connect(mapStatesToProps)(AppRouter);