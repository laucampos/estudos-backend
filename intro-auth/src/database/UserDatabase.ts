import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Auth_Users"

    public createUser = async (user: User) => {

        if(user){
            const result = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .select("*")
                .where({ email: user.getEmail() })

            if(result.length > 0){
                throw new Error("User already exists")
            }        
        }

        const userDB: IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword()
        }

        await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .insert(userDB)
    }

    public findByEmail = async (email: string) => {
        const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })

        return result[0]
    }

    public findById = async (id: string) => {
        const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ id })

        return result[0]
    }

    public requestAllUsers = async () => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .orderBy("nickname")

        return result
    }

    public updateUser = async (id: string, nickname: string, email: string, password: string) => {     
        const result = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update({
                nickname,
                email,
                password
            })
            .where("id", "=", id)
    }

    public deleteUser = async (id: string) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where("id", "=", id)
    }
}

