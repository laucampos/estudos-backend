import { Request, Response } from "express";
import { UserDatabase } from "../database/UserDatabase";
import { User } from "../models/User";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class UserController {
    public signup = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { nickname, email, password } = req.body

            if (!nickname || !email || !password) {
                throw new Error("Missing data")
            }

            if (typeof nickname !== "string" || typeof email !== "string" || typeof password !== "string") {
                errorCode = 401
                throw new Error("Invalid data")
            }

            if (nickname.length < 3) {
                errorCode = 401
                throw new Error("Nickname must be at least 3 characters")
            }

            if (password.length < 6) {
                errorCode = 401
                throw new Error("Password must be at least 6 characters")
            }

            if (!email.includes("@")) {
                errorCode = 401
                throw new Error("Invalid email")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const user = new User(
                id,
                nickname,
                email,
                password
            )

            const userDatabase = new UserDatabase()
            await userDatabase.createUser(user)

            const payload: ITokenPayload = {
                id: user.getId()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            res.status(200).send({
                message: "User created successfully",
                token
            })

        } catch (error) {
            if (error.message.includes("Duplicate")
            ) {
                return res.status(400).send({
                    message: "Email already in use"
                })
            }
            res.status(errorCode).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const { email, password } = req.body

            if (!email || !password) {
                errorCode = 401
                throw new Error("Missing data")
            }

            if (typeof email !== "string" || typeof password !== "string") {
                errorCode = 401
                throw new Error("Invalid data")
            }

            if (!email.includes("@")) {
                errorCode = 401
                throw new Error("Invalid email")
            }

            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.findByEmail(email)

            if (!userDB) {
                errorCode = 401
                throw new Error("User not found")
            }

            const user = new User(
                userDB.id,
                userDB.nickname,
                userDB.email,
                userDB.password
            )

            if (user.getPassword() !== password) {
                errorCode = 401
                throw new Error("Invalid password")
            }

            const payload: ITokenPayload = {
                id: user.getId()
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken(payload)

            res.status(200).send({
                message: "User logged in successfully",
                token
            })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public requestUsers = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { nickname } = req.query

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Invalid token")
            }

            const userDatabase = new UserDatabase()
            const usersDB = await userDatabase.requestAllUsers()

            const users = usersDB.map(user => {
                return {
                    id: user.id,
                    nickname: user.nickname,
                    email: user.email
                }
            })

            if (nickname) {
                const user = users.filter(user => {
                    return user.nickname.includes(`${nickname}`)
                }
                )
                return res.status(200).send({user})
            }

            return res.status(200).send({users})

        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const token = req.headers.authorization
            const { nickname, email, password } = req.body

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(token)

            if (!payload) {
                errorCode = 401
                throw new Error("Invalid token")
            }

            if(!nickname && !email && !password) {
                errorCode = 401
                throw new Error("Missing data, please fill at least one field")
            }

            if(nickname && typeof nickname !== "string" || nickname && nickname.length < 3) {
                errorCode = 401
                throw new Error("Nickname must be at least 3 characters")
            }

            if(email && typeof email !== "string" || email && !email.includes("@")) {
                errorCode = 401
                throw new Error("Invalid email")
            }

            if(password && typeof password !== "string" || password && password.length < 6) {
                errorCode = 401
                throw new Error("Password must be at least 6 characters")
            }
            
            const userDatabase = new UserDatabase()
            const userEmail = await userDatabase.findByEmail(email)

            if(userEmail) {
                errorCode = 401
                throw new Error("Email already in use")
            }

            const userDB = await userDatabase.updateUser(payload.id, nickname, email, password)

           res.status(200).send({ message: "User updated successfully" })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        let errorCode = 400
        try {
            const authorization = req.headers.authorization
            const { id } = req.body

            const authenticator = new Authenticator()
            const payload = authenticator.getTokenPayload(authorization)

            if (!payload) {
                errorCode = 401
                throw new Error("Invalid token")
            }

            if(!id) {
                errorCode = 401
                throw new Error("Id must be provided")
            }

            if(id === payload.id) {
                errorCode = 401
                throw new Error("You can't delete yourself")
            }

            

            const userDatabase = new UserDatabase()
            const userDB = await userDatabase.findById(id)

            if(!userDB) {
                errorCode = 401
                throw new Error("User not found")
            }
            
            await userDatabase.deleteUser(id)

            res.status(200).send({ message: "User deleted successfully" })


        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}

