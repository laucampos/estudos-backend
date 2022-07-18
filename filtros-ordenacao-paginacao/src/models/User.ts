export enum USER_ROLE {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export type User = {
    id: string,
    email: string,
    password: string,
    role: USER_ROLE
};