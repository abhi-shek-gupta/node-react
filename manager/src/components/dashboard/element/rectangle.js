import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Rectangle extends Component {
    render() {
        const { stylingClass, icon, value, title, sign } = this.props;
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <Link className={stylingClass ? stylingClass : "dashboard-stat dashboard-stat-v2 blue"} to="/">
                    <div className="visual">
                        <i className={icon ? icon :"fa fa-comments"}></i>
                    </div>
                    <div className="details">
                        <div className="number">
                            <span data-counter="counterup" data-value="1349">{value}</span>{sign? sign :""}
                        </div>
                        <div className="desc"> {title?title :""} </div>
                    </div>
                </Link>
            </div>
        );
    }

}


