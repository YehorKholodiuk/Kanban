import React, {useEffect, useState} from 'react'
import './App.css';
import {connect} from "react-redux";
import {getStatuses, getCards} from "./redux/actions";
import 'bootstrap/dist/css/bootstrap.css'
import {Button, Container, Row} from "reactstrap";
import Column from "./Column";
import CreateModal from "./CreateTaskModal";
import CreateStatusModal from "./CreateStatusModal";
import ColumnNull from "./ColumnNull";

function App(props) {

    useEffect( () => {
        props.getStatuses()
    }, []);

    useEffect( () => {
        props.getCards()
    }, []);

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openCreateStatusModal, setOpenCreateStatusModal] = useState(false)


    return (
        <div>
            <h1> Kanban (axios, redux, thunk, bootstrap) </h1>
            <hr />
            <Container>
                <Button onClick={() => setOpenCreateModal(!openCreateModal)} outline color="info">Create Card</Button>
                {openCreateModal &&
                <CreateModal
                    openCreateModal={openCreateModal}
                    setOpenCreateModal={setOpenCreateModal}
                />}
                <Button onClick={() => setOpenCreateStatusModal(!openCreateStatusModal)} className="float-sm-right" outline color="info">Create New Status</Button>
                {openCreateStatusModal &&
                <CreateStatusModal
                    openCreateStatusModal={openCreateStatusModal}
                    setOpenCreateStatusModal={setOpenCreateStatusModal}
                />}
                <hr />
                <Row>
                    {props.statuses.map(el => <Column status={el} key={el._id}/>)}
                    {/*<ColumnNull />*/}
                </Row>
            </Container>
        </div>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
})

const mapDispatchToProps = (dispatch) => ({
    getStatuses: () => dispatch(getStatuses()),
    getCards: () => dispatch(getCards())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);