import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Auth_Users"

    public createUser = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }

    public findByEmail = async (email: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })
        
        return result[0]
    }

    public getAllUsers = async (search: string | undefined) => {
        let result: IUserDB[] = []
        
        if (search) {
            result = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .select()
                .where("nickname", "LIKE", `%${search}%`)
        } else {
            result = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .select()
        }
        
        return result
    }

    public checkIfExistsById = async (id: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ id })
        
        return result[0] ? true : false
    }

    public checkRole = async (id: string, role: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ id })

        return result[0].role === "ADMIN" ? true : false
    }

    public findById = async (id: string) => {
        const result: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ id })
        
        return result[0]
    }

    public editUser = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            nickname: user.getNickname(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .update(userDB)
            .where({ id: userDB.id })
    }

    public deleteUser = async (id: string) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .delete()
            .where({ id })
    }
}