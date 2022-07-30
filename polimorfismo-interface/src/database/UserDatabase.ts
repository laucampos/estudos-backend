import { User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    TABLE_NAME = "Labe_Users"
    public static TABLE_USERS = "Labe_Users"

    public async getAll() {
        return super.getAll()
    }

    public async create(user: User) {
        return super.create(user)
    }

    public async getItemById(id: string) {
        return super.getItemById(id)
    }
}
