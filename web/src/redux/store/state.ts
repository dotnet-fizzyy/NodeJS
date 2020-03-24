export interface IUserState {
    userId: string;
    id: number;
    title: string;
    body: string;
}

export interface IState {
    user: IUserState
};