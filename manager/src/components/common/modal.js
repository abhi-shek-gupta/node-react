

import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


/**
 * send props 'show={true }' to show the component
 * 'func' the delete function in the parent component
 *  <ShowPopup show={true} func={this.deleteProfileImage}
 */

class ShowPopup extends Component {
   constructor(props){
       super(props);
       this.state={
           show:false
       }

       this.closeModel = this.closeModel.bind(this);
       this.deletefunc = this.deletefunc.bind(this);
   }
   componentWillMount(){
       this.setState({ show: this.props.show });
   }
   componentWillReceiveProps(newProps){
       if (newProps && newProps.show)
       this.setState({ show: newProps.show });
   }
    deletefunc(){
        /**to close model */
        this.setState({ show: false });
        /**function is called which is to be execute on ok */
        this.props.func(true);
       
    }
    
    closeModel(){
        /**to close modal */
        this.setState({show:false});
        this.props.closeParentModal();
    }
    render() {
        return (
            <div>
                <Modal 
                show={this.state.show}
                >
                    <Modal.Header className='theme-bg'>
                        <Modal.Title>
                            Delete 
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete <b>{this.props.message}</b>?</p>
                        <p className="text-warning"><small>This action cannot be undone.</small></p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className='btn btn-default' onClick={this.closeModel}>Cancel</Button>
                        <Button className='btn btn-danger' onClick={this.deletefunc} >Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
    }
}
export default ShowPopup;