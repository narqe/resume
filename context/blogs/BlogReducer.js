import { SET_COVER_IMAGE } from '../../types';

export default (state, action) => {
    switch (action.type) {
    case SET_COVER_IMAGE:        
        return {
            ...state,
            coverImage: action.payload
        };

    default:
        return state;
    }
};