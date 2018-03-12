import React, { Component } from 'react';
import {Alert } from "react-bootstrap";
import HTTP from '../../../services/http';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

/**COMPONENTS */
import Loader from "../../common/loader";
import ROW from "./row"


var timer;
class Table extends Component {

    constructor(props){
        super(props);
        this.state ={
            array:[],
            isLoading:false,
            searchQuery :'',
            activePage :1,
            totalItemsCount:1
        }
        /**event binding */
        this.getRoles = this.getRoles.bind(this);
        this.search = this.search.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    componentWillMount(){
        this.getRoles();
    }
    render() {
        const {array ,isLoading} = this.state;
        return (
            <div >
                {isLoading &&<Loader />}
               
                <div className="portlet light bordered">
                    <div className="portlet-body min-heigh">

                        {/* actions search addnew  */}
                        <div className="table-toolbar">
                            <div className="row">
                                <div className="col-md-6">

                                </div>

                                {/* <!-- filter --> */}
                                <div className="col-md-2">
                                    <div className="btn-group pull-right">
                                        {/* <button id="sample_editable_1_new" className="btn sbold green"> Add New
                               <i className="fa fa-plus"></i>
                            </button> */}
                                    </div>
                                </div>

                                {/* <!-- search --> */}
                                <div className="col-md-2">
                                    <div className="btn-group pull-right">
                                        <input type="text" className="form-control" placeholder="Search" onChange={this.search} />
                                    </div>
                                </div>

                                {/* <!-- add new --> */}
                                <div className="col-md-2">
                                    <div className="btn-group pull-right">
                                        <Link to="/role-managment/add"><button id="sample_editable_1_new" className="btn sbold green"> Add New
                             <i className="fa fa-plus"></i>
                                        </button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* actions search addnew END */}


                        {/* if list is empty */}
                        {!isLoading && !array.length ? <Alert bsStyle="warning">
                            <strong>No Data Found !</strong>
                        </Alert>:
                            <div style={{ display: "flow-root"}}>                                
                            <table className="table table-striped table-bordered table-hover table-checkable order-column" id="sample_1">
                                <thead>
                                    <tr>
                                        <th> Title </th>
                                        <th> Created At </th>                                    
                                        <th> Privileges </th>
                                        <th> Actions </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {array.map(role => {
                                        return (
                                            <ROW key={role._id} role={role} />
                                        )
                                    })}
                                </tbody>                               
                            </table>
                                <div style={{float:"right"}}>
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={window.limit}
                                    totalItemsCount={this.state.totalItemsCount}
                                    pageRangeDisplayed={3}
                                    onChange={this.handlePageChange}
                                    
                              />
                             </div>                         
                        </div>
                    }
                    </div>
                </div>
            </div>
        );
    }

    /**PAGINATION */
    handlePageChange(eventKey){

        console.log('props :' ,this.props)
        this.setState({ activePage: eventKey });
        this.getRoles({
            page: eventKey ? eventKey : 1,
        });
        /**to set query in route */
        this.props.history.push({
            search: '?page=' + eventKey
        })
    }
    /**SEARCH */
    search(e) {
        /**to remove Event Pooling  */
        e.persist()
        this.setState({ searchQuery: e.target.value });
        clearTimeout(timer);
        timer = setTimeout(() => {
            this.getRoles({
                page: this.state.activePage ? this.state.activePage : 1,
                searchQuery: e.target.value ? e.target.value : '',
                filter: this.state.filter ? this.state.filter : 2,

            });
        }, 1000);
    }

    /**to get list of roles */
    getRoles(params={}){
        /**to start Loader */
        this.setState({  isLoading: true }) 
        HTTP.Request("get",window.admin.getRoles,params)
        .then((response) =>{
            // console.log("response",response);
             this.setState({
                array : response.data.role,
                isLoading:false,
                totalItemsCount: response.data.roleCount
            })     
        })
    }
}



export default Table ;

