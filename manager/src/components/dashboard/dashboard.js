import React, { Component } from 'react';

/**COMPONENTS */
import PageHeader from "../common/pageheader";
import Rectangle from "./element/rectangle"

/**PAGE LEVEL CSS */

class Dashboard extends Component {
    render() {
        return (
            <div> 
                <PageHeader pageTitle="Admin Dashboard " route="Dashboard" />

                <div className="row">
                    <Rectangle stylingClass="dashboard-stat dashboard-stat-v2 blue" 
                        icon="fa fa-comments" value={30} title="New Feedbacks"  sign=""/>
                    <Rectangle stylingClass="dashboard-stat dashboard-stat-v2 red"
                        icon="fa fa-bar-chart-o" value={130} title="Total Profit" sign="M$" />
                    <Rectangle stylingClass="dashboard-stat dashboard-stat-v2 green "
                        icon="fa fa-shopping-cart" value={60} title="New Orders" sign="" />
                    <Rectangle stylingClass="dashboard-stat dashboard-stat-v2 purple"
                        icon="fa fa-globe" value={900} title="Brand Popularity" sign="" />
                </div>

            </div>
        );
    }

}


export default Dashboard;

