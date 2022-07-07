//exercício 1

export type User = {
    id: number,
    name: string,
    email: string,
    role: USER_ROLE,
    age: number
}

export enum USER_ROLE {
    ADMIN = "Admin",
    NORMAL = "Normal"
}


export const users: User[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@email.com",
        role: USER_ROLE.ADMIN,
        age: 12
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@email.com",
        role: USER_ROLE.NORMAL,
        age: 36
    },
    {
        id: 3,
        name: "Coragem",
        email: "coragem@email.com",
        role: USER_ROLE.NORMAL,
        age: 21
    },
    {
        id: 4,
        name: "Dory",
        email: "dory@email.com",
        role: USER_ROLE.NORMAL,
        age: 17
    },
    {
        id: 5,
        name: "Elsa",
        email: "elsa@email.com",
        role: USER_ROLE.ADMIN,
        age: 17
    },
    {
        id: 6,
        name: "Fred",
        email: "fred@email.com",
        role: USER_ROLE.ADMIN,
        age: 60
    }
]