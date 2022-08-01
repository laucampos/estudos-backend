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

// Endpoint 1: signup

app.post("/signup", userController.signup)

// Endpoint 2: login

app.post("/login", userController.login)

// Endpoint 3: requestUsers

app.get("/users", userController.requestUsers)

// Endpoint 4: updateUser nickname email password

app.put("/users", userController.updateUser)

// Endpoint 5: deleteUser

app.delete("/users", userController.deleteUser)



