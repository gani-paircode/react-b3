import { ACTION_TYPES } from "./reducer";

export const getCommunityActions = (dispatch) => {

    const addMember = record => dispatch({
        type: ACTION_TYPES.ADD_RECORD,
        payload: record,
    });

    const deleteMember = (id) =>
        dispatch({
            type: ACTION_TYPES.DELETE_RECORD,
            payload: id
        });

    return Object.freeze({
        addMember,
        deleteMember,
    });

}