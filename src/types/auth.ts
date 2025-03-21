
export interface IUser {
    id: number;
    name: string;
    email: string;
}
export interface ILoginResponse {
    accessToken: string,
    user: IUser
}
