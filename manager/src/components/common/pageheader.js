/**
 * this component is used for giving heading to each page 
 * directory like path 
 * @argument pageTitle
 * @argument smallTitle
 * @argument route
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class PageHeader extends Component {
    render() {

        const {pageTitle ,smallTitle, route} = this.props
        return (
            <div>
                {/* <!-- BEGIN PAGE HEADER--> */}
                {/* <!-- BEGIN PAGE BAR --> */}
                <div   className="page-bar">
                    <ul className="page-breadcrumb">
                        <li>
                            <Link to="/">Home</Link> 
                            <i className="fa fa-circle"></i>
                        </li>
                        <li>
                            <span>{route}</span>
                        </li>
                    </ul>
                </div>
                {/* <!-- END PAGE BAR --> */}
                {/* <!-- BEGIN PAGE TITLE--> */}
                <h1 className="page-title"> {pageTitle ? pageTitle : ""}
                    <small>{smallTitle ? smallTitle : ""}</small>
                </h1>
                {/* <!-- END PAGE TITLE--> */}
                {/* <!-- END PAGE HEADER--> */}

            </div>
        )
    }

}
