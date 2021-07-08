

import React, {useState} from 'react'
import {connect} from "react-redux";
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import DeleteModal from "./DeleteCardModal";
import {moveCard} from "./redux/actions";
import {changePriority} from "./redux/actions";
import EditCardModal from "./EditCardModal";

function Cards (props) {

    const {card, statuses, priorities} = props
    const statusesArray = statuses.map(el => el.status);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditCardModal, setOpenEditCardModal] = useState(false)

    return (
        <div>
            <Card>
                <CardHeader> {card.status}<br />
                </CardHeader>
                <CardBody>
                    <CardText>
                        <b>{card.name}</b> {'  '}
                        <Button onClick={() => setOpenEditCardModal(!openEditCardModal)} className="float-sm-right" outline color="warning">Edit</Button>
                        {openEditCardModal &&
                        <EditCardModal
                            card={card}
                            openEditCardModal={openEditCardModal}
                            setOpenEditCardModal={setOpenEditCardModal}
                        />
                        }
                        <br />
                        <i>{card.description}</i>
                    </CardText>
                    Priority: {card.priority} {'  '}
                    <Button
                        disabled={priorities.indexOf(card.priority) === priorities.length - 1}
                        onClick={() => props.changePriority(card, priorities, 'up')}
                        outline color="info">⥣</Button>
                    <Button
                        disabled={priorities.indexOf(card.priority) === 0}
                        onClick={() => props.changePriority(card, priorities, 'down')}
                        outline color="info">⥥</Button>
                    <hr />
                    <Button
                        disabled={statusesArray.indexOf(card.status) === 0}
                        onClick={() => props.moveCard(card, statuses, 'left')}
                        outline color="info">⤆</Button>
                    <Button onClick={() => setOpenDeleteModal(!openDeleteModal)} outline color="danger">Delete</Button>
                    {openDeleteModal &&
                    <DeleteModal
                        openDeleteModal={openDeleteModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                        card={card}
                    />
                    }
                    <Button disabled={statusesArray.lastIndexOf(card.status) === statusesArray.length - 1} onClick={() => props.moveCard(card, statuses, 'right')} outline color="info">⤇</Button>
                </CardBody>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities,
})

const mapDispatchToProps = (dispatch) => ({
    moveCard: (card, statuses, direction) => dispatch(moveCard(card, statuses, direction)),
    changePriority: (card, priorities, direction) => dispatch(changePriority(card, priorities, direction))

})


export default connect(mapStateToProps, mapDispatchToProps)(Cards)