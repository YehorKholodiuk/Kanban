import React, {useState} from 'react';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import {createStatus} from "./redux/actions";


function CreateStatusModal (props) {

    const {openCreateStatusModal, setOpenCreateStatusModal} = props

    const toggle = () => {
        setOpenCreateStatusModal(!openCreateStatusModal)
    };


    const [newStatus, setNewStatus] = useState('');
    const [newTitle, setNewTitle] = useState('');

    const addStatusButtonHandler = () => {
        const newCard = {
            status: newStatus,
            title: newTitle,
        }
        props.createStatus(newCard)
        setOpenCreateStatusModal(!openCreateStatusModal)
    }

    return (
        <div>
            <Modal isOpen={openCreateStatusModal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode="X">Create new Status</ModalHeader>
                <ModalBody>
                    <Label>Status:</Label>
                    <Input value={newStatus} onChange={(e) => setNewStatus(e.target.value)} type="text" placeholder="new status" />

                    <Label>Title: </Label>
                    <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type="text" placeholder="title of the status" />


                </ModalBody>
                <ModalFooter>
                    <Button outline color="warning" onClick={addStatusButtonHandler}>SAVE</Button>{' '}
                    <Button outline color="danger" onClick={toggle}>CANCEL</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    createStatus: (newStatus) => dispatch(createStatus(newStatus)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateStatusModal)
