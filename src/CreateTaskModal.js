import React, {useState} from 'react';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import {createCard} from "./redux/actions";


function CreateTaskModal (props) {

    const {openCreateModal, setOpenCreateModal} = props

    const toggle = () => {
        setOpenCreateModal(!openCreateModal)
    };



    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const [priority, setPriority] = useState(5);

    const addCardButtonHandler = () => {
        const newCard = {
            name: name,
            description: description,
            status: status,
            priority: priority,
        }
        props.createCard(newCard)
        setOpenCreateModal(!openCreateModal)
    }

    return (
        <div>
            <Modal isOpen={openCreateModal} toggle={toggle} >
                <ModalHeader toggle={toggle} charCode="X">Create new Card</ModalHeader>
                <ModalBody>
                    <Label>Name:</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name of the card" />

                    <Label>Description: </Label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description of the card" />

                    <Label>Status: </Label>
                    <Input value={status} onChange={(e) => setStatus(e.target.value)} type="select" >
                        {props.statuses.map(el =>  <option value={el.status} key={el._id}> {el.status} </option>)}
                    </Input>

                    <Label>Priority: </Label>
                    <Input value={priority} onChange={(e) => setPriority(e.target.value)} type="select" >
                        {props.priorities.map(el =>  <option value={el} key={el}> {el} </option>)}
                    </Input>

                </ModalBody>
                <ModalFooter>
                    <Button outline color="warning" onClick={addCardButtonHandler}>SAVE</Button>{' '}
                    <Button outline color="danger" onClick={toggle}>CANCEL</Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities,
})

const mapDispatchToProps = (dispatch) => ({
    createCard: (newCard) => dispatch(createCard(newCard)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal)