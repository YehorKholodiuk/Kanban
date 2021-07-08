import axios from 'axios'

export function getStatuses () {
    return (dispatch) => {
        axios.get('http://nazarov-kanban-server.herokuapp.com/column')
            .then(res => {
                dispatch({
                    type: 'GET_STATUSES',
                    payload: res.data,
                })
            })
            .catch(err => err)
    }
}

export function getCards () {
    return (dispatch) => {
        axios.get('http://nazarov-kanban-server.herokuapp.com/card')
            .then(res => {
                dispatch({
                    type: 'GET_CARDS',
                    payload: res.data,
                })
            })
            .catch(err => err)
    }
}

export function createCard (newCard) {
    return (dispatch) => {
        axios.post('http://nazarov-kanban-server.herokuapp.com/card', newCard)
            .then(res => {
                dispatch(getCards())
            })
            .catch(err => err)
    }
}

export function createStatus (newStatus) {
    return (dispatch) => {
        axios.post('http://nazarov-kanban-server.herokuapp.com/column', newStatus)
            .then(res => {
                dispatch(getStatuses())
            })
            .catch(err => err)
    }
}

export function editStatus (statusId, updatedStatus) {
    return (dispatch) => {
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/column/${statusId}`, {...updatedStatus})
            .then(res => {
                dispatch(getStatuses())
            })
            .catch(err => err)
    }
}

export function editCard (taskId, updatedCard) {
    return (dispatch) => {
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${taskId}`, {...updatedCard})
            .then(res => {
                dispatch(getCards())
            })
            .catch(err => err)
    }
}

export function deleteStatus (statusId) {
    return (dispatch) => {
        axios.delete(`http://nazarov-kanban-server.herokuapp.com/column/${statusId}`)
            .then(res => {
                dispatch(getStatuses())
            })
            .catch(err => err)
    }
}

export function deleteCard (cardId) {
    return (dispatch) => {
        axios.delete(`http://nazarov-kanban-server.herokuapp.com/card/${cardId}`)
            .then(res => {
                dispatch(getCards())
            })
            .catch(err => err)
    }
}

export function moveCard (card, statuses, direction) {
    const corrector = direction === 'left' ? -1 : 1;
    const newStatuses = statuses.map(el => el.status);
    const status = newStatuses[newStatuses.indexOf(card.status) + corrector]
    return (dispatch) => {
        axios.put(`http://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {status} )
            .then(res => {
                dispatch(getCards())
            })
            .catch(err => err)
    }
}

export function changePriority (card, priorities, direction) {
    const corrector = direction === 'up' ? 1 : -1;
    const priority = priorities[priorities.indexOf(card.priority) + corrector]
    console.log('priority', priority)
    return (dispatch) => {
        axios.patch(`http://nazarov-kanban-server.herokuapp.com/card/${card._id}`, {...card, priority: priority})
            .then(res => {
                dispatch(getCards())
            })
            .catch(err => err)
    }
}