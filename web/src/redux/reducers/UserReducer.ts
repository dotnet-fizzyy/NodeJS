import { IUserState } from '../store/state';
import { Actions, IAddUser } from '../actions/UserAction';

export const initialState: IUserState = {
    id: 0,
    userId: '',
    body: '',
    title: '',
}

export default function userReducer(state = initialState, action: any) {
    switch (action.type) {
        case Actions.ADD_USER:
            return addUSer(state, action);
        default:
            return state;
    }
}

function addUSer(state: IUserState, action: IAddUser): IUserState {
    return {
        ...state,
        id: action.payload.id,
        userId: action.payload.userId,
        body: action.payload.body,
        title: action.payload.title,
    };
}
