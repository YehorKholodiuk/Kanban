import React from 'react';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import {deleteStatus} from "./redux/actions";


function DeleteStatusModal (props) {

    const {status, openDeleteStatusModal, setOpenDeleteStatusModal} = props

    const toggle = () => {
        setOpenDeleteStatusModal(!openDeleteStatusModal)
    };

    const deleteStatusButtonHandler = () => {
        props.deleteStatus(status._id)
        setOpenDeleteStatusModal(!openDeleteStatusModal)
    }

    return (
        <div>
            <Modal isOpen={openDeleteStatusModal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode="X">Delete this Status?</ModalHeader>
                <status>
                    {status.status}<br />
                    {status.title}
                </status>
                <ModalFooter>
                    <Button outline color="warning" onClick={deleteStatusButtonHandler}> OK </Button>{' '}
                    <Button outline color="danger" onClick={toggle}> NOT OK </Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    deleteStatus: (statusId) => dispatch(deleteStatus(statusId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStatusModal)