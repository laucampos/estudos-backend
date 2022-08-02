import { IUserDB, USER_ROLE } from "../../models/User"

export const users: IUserDB[] = [
    {
        id: "bb9b7ee8-ae4b-4bd1-9bd6-e7e21594399b",
        nickname: "Astrodev",
        email: "astrodev@gmail.com",
        password: "bananinha",
        role: USER_ROLE.ADMIN
    },
    {
        id: "f03017bb-2c08-4cdc-bb63-7fbd7cebe01f",
        nickname: "Zé gotinha",
        email: "fulano@gmail.com",
        password: "qwerty00",
        role: USER_ROLE.NORMAL
    },
    {
        id: "7079b8e4-95cd-48aa-82a9-77454e94b789",
        nickname: "Ciclana",
        email: "ciclana@gmail.com",
        password: "asdfg123",
        role: USER_ROLE.NORMAL
    }

    
]