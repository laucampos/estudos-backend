import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { PingController } from './controller/PingController'
import { UserController } from './controller/UserController'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

const pingController = new PingController()
const userController = new UserController()

app.get("/ping", pingController.ping)
app.post("/signup", userController.signup)
app.post("/login", userController.login)
app.get("/users", userController.getAllUsers)
app.put("/users", userController.editUser)
app.delete("/users/:id", userController.deleteUser)