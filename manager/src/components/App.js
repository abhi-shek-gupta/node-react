import React, { Component } from 'react';
import { connect } from 'react-redux';



import AppRouter from '../router/index';

class App extends Component {
  render() {

    return(
    <div>
      <div className="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
        <div className="page-wrapper">
            <AppRouter history={this.props.history} />
      </div>
      </div>
    </div>)
  }
}

function mapStatesToProps(state) {
  return ({
    isAdminLoggedIn:  false
  });
}

export default connect(mapStatesToProps)(App);
