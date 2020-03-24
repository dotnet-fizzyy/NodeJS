import { IState } from '../store/state';

export function getUserState(state: IState) {
    return state.user;
}
