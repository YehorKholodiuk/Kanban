import React from 'react'
import './App.css';
import {connect} from "react-redux";
import {Col} from "reactstrap";
import Card from "./Cards";

function ColumnNull(props) {



    return (
        <div>
            <Col>
                <h2>NULL</h2>
                {props.cards.filter(el => el.status === null).map(el => <Card card={el} key={el._id} />)}
            </Col>
        </div>

    );
}

const mapStateToProps = (state) => ({
    cards: state.cards,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ColumnNull);