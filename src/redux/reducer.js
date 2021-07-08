const initialState = {
    cards: [
        {
            "description": "321",
            "priority": 1,
            "status": 'todo',
            "_id": "5f95357667d806003c3aeb0a",
            "name": "132",
        },
    ],
    statuses: [
        {
            "_id": "5f4436cbd67a54003ca3364a",
            "title": "first",
            "status": "todo",
        },
    ],
    priorities: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

const kanban = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_CARDS':
            return {
                ...state, cards: action.payload
            }

        case 'GET_STATUSES':
            return {
                ...state, statuses: action.payload
            }

        default:
            return state;
    }
}

export default kanban