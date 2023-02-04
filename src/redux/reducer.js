import * as types from "./actionType";

const initialState = {
    users: [],
    user: {},
    loading: true
}

const usersReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_STUDENTS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case types.DELETE_STUDENT:
        case types.CREATE_STUDENT:
        case types.UPDATE_STUDENT:
            return {
                ...state,
                loading: false
            };
        case types.GET_STUDENT:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default usersReducers;