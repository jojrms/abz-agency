import { AxiosResponse } from "axios";

export type NewUserProps = {
    name: string;
    email: string;
    phone: string;
    position_id: number;
    photo: FileList | [];
}

export type UserProps = {
    id: string,
    name: string,
    email: string,
    phone: string,
    position: string,
    position_id: number,
    registration_timestamp: number,
    photo: string,
}
export type GetUsersProps = {
    success: boolean,
    page: number,
    total_pages: number,
    total_users: number,
    count: number,
    links: {
        next_url: string,
        prev_url: string
    },
    users: UserProps[]
}

export type PositionProps = {
    id: number,
    name: string
}

export type GetUserPositionsProps = {
    success: boolean,
    positions: PositionProps[]
}

export type GetTokenProps = {
    success: boolean,
    token: string
}

export type GetUsersResult = Promise<AxiosResponse<GetUsersProps>>;
export type GetUserToken = Promise<AxiosResponse<GetTokenProps>>;
export type GetUserByIdResult = Promise<AxiosResponse<UserProps>>;
export type GetUserPositionsResult = Promise<AxiosResponse<GetUserPositionsProps>>;
