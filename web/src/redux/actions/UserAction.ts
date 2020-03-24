import { IUserState } from "../store/state";

//ActionTypes
export const Actions = {
    GET_USER: 'GET_USER',
    ADD_USER: 'ADD_USER',
};

//Interfaces
export interface IGetUser {
    type: typeof Actions.GET_USER
}

export interface IAddUser {
    type: typeof Actions.ADD_USER,
    payload: IUserState
}

//Actions
export function getUserInfo(): IGetUser {
    return {
        type: Actions.GET_USER,
    };
}

export function addUser(user: IUserState): IAddUser {
    return {
        type: Actions.ADD_USER,
        payload: user,
    };
}