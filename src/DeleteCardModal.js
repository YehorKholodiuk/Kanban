import React, {useState} from 'react';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {deleteCard} from "./redux/actions";


function DeleteCardModal (props) {

    const {card, openDeleteModal, setOpenDeleteModal} = props

    const toggle = () => {
        setOpenDeleteModal(!openDeleteModal)
    };



    const deleteCardButtonHandler = () => {
        props.deleteCard(card._id)
        setOpenDeleteModal(!openDeleteModal)
    }

    return (
        <div>
            <Modal isOpen={openDeleteModal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode="X">Delete this Card?</ModalHeader>
                <ModalBody>
                    {card.name}<br />
                    {card.description}
                </ModalBody>
                <ModalFooter>
                    <Button outline color="warning" onClick={deleteCardButtonHandler}> OK </Button>{' '}
                    <Button outline color="danger" onClick={toggle}> NOT OK </Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    deleteCard: (cardId) => dispatch(deleteCard(cardId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCardModal)