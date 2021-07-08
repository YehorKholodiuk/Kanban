import React, {useState} from 'react';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import {editStatus} from "./redux/actions";


function EditStatusModal (props) {

    const {status, openEditStatusModal, setOpenEditStatusModal} = props;

    const toggle = () => {
        setOpenEditStatusModal(!openEditStatusModal)
    };

    const [newStatus, setNewStatus] = useState(status.status);
    const [newTitle, setNewTitle] = useState(status.title);

    const editStatusButtonHandler = () => {
        const updatedStatus = {
            status: newStatus,
            title: newTitle,
        }
        props.editStatus(status._id, updatedStatus)
        setOpenEditStatusModal(!openEditStatusModal)
    }

    return (
        <div>
            <Modal isOpen={openEditStatusModal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode="X">Create new Status</ModalHeader>
                <ModalBody>
                    <Label>Status:</Label>
                    <Input value={newStatus} onChange={(e) => setNewStatus(e.target.value)} type="text" placeholder="new status" />

                    <Label>Title: </Label>
                    <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type="text" placeholder="title of the status" />


                </ModalBody>
                <ModalFooter>
                    <Button outline color="warning" onClick={editStatusButtonHandler}>SAVE</Button>{' '}
                    <Button outline color="danger" onClick={toggle}>CANCEL</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    editStatus: (statusId, updatedStatus) => dispatch(editStatus(statusId, updatedStatus)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditStatusModal)