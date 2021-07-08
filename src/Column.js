import React, {useState} from 'react'
import './App.css';
import {connect} from "react-redux";
import {Button, Col} from "reactstrap";
import Card from "./Cards";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import EditStatusModal from "./EditStatusModal";
import DeleteStatusModal from "./DeleteStatusModal";


function Column(props) {

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const [openEditStatusModal, setOpenEditStatusModal] = useState(false)
    const [openDeleteStatusModal, setOpenDeleteStatusModal] = useState(false)

    return (
        <div>
            <Col>
                <h2>{props.status.status}
                    <ButtonDropdown className="float-sm-right" isOpen={isOpen} toggle={toggle}>
                        <DropdownToggle outline color="info">
                            ...
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setOpenEditStatusModal(!openEditStatusModal)}>Edit</DropdownItem>
                            { openEditStatusModal &&
                            <EditStatusModal
                                openEditStatusModal={openEditStatusModal}
                                setOpenEditStatusModal={setOpenEditStatusModal}
                                status={props.status}
                            />
                            }

                            <DropdownItem disabled={props.cards.filter(el => el.status === props.status.status).length !== 0}
                                          onClick={() => setOpenDeleteStatusModal(!openDeleteStatusModal)}>Delete</DropdownItem>
                            {openDeleteStatusModal &&
                            <DeleteStatusModal
                                status={props.status}
                                openDeleteStatusModal={openDeleteStatusModal}
                                setOpenDeleteStatusModal={setOpenDeleteStatusModal}
                            />
                            }
                        </DropdownMenu>
                    </ButtonDropdown>


                </h2>

                {props.cards.filter(el => el.status === props.status.status).map(el => <Card card={el} key={el._id} />)}


            </Col>
        </div>

    );
}

const mapStateToProps = (state) => ({
    cards: state.cards,

})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Column);
