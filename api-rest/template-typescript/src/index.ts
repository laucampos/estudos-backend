import express, { Request, Response } from "express"
import cors from "cors"
import { User, USER_ROLE, users } from "./data"

const app = express()

app.use(cors())
app.use(express.json())

function throwErrorToRole(role: string) {

    const roles: String[] = [USER_ROLE.ADMIN, USER_ROLE.NORMAL]
    if (!roles.includes(role)) {
        throw new Error(`Error: ${role} is not a role`);
    }
}

function throwErrorToEmail(email: string) {

    const checkEmail: User[] = users.filter((user) => {
        if (user.email === email) {
            throw new Error("Error: email already exists")
        }
    })
}

app.get("/", (req: Request, res: Response) => {

    res.status(200).send({ mensagem: "API funcionando" })
})

//exercício 2
app.get("/users", (req: Request, res: Response) => {
    try {
        const role = req.query.role as string

        if (!role) {
            return res.status(200).send({ users: users })
        }
        const result = users.filter((user) => {
            return user.role === role
        })

        throwErrorToRole(role)

        res.status(200).send({ mensagem: "ok", result: result })

    } catch (error) {
        res.status(400).send({ mensagem: error.message })
    }

})

//exercício 3
app.post("/users", (req: Request, res: Response) => {

    try {
        const { name, email, role, age } = req.body
        const newId = Date.now()

        if (typeof name !== "string") {
            throw new Error("Error:'name' should be a string");
        }

        if (typeof email !== "string") {
            throw new Error("Error:'email' should be a string");
        }

        if (typeof age !== "number") {
            throw new Error("Error:'age' should be a number");
        }

        throwErrorToEmail(email)

        throwErrorToRole(role)

        const newUser: User = {
            id: newId,
            name: name,
            email: email,
            role: role,
            age: age
        }

        users.push(newUser)

        res.status(201).send({ mensagem: "Novo usuário criado com sucesso!", users: users })

    } catch (error) {
        res.status(400).send({ mensagem: error.message })
    }

})

//exercicio 4
app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const { email } = req.body

        throwErrorToEmail(email)

        function changeEmail(id: number) {
            const user = users.filter((user) => user.id === id)

            if (user.length === 0) {
                throw new Error(`Error: id ${id} does not exist. Inform a valid id`);
            } else {
                user.map((user) => {
                    user.email = email
                    return user
                })
            }
            return user
        }
        const emailUpdated = changeEmail(id)

        res.status(201).send({ message: "Email sucessfully update", user: emailUpdated })

    } catch (error) {
        res.status(400).send({ mensagem: error.message, error: error })
    }

})

//exercicio 5
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const index = users.findIndex(user => user.id === id)
        users.splice(index, 1)

        res.status(200).send({ mensagem: "User sucessfully deleted", users})

    } catch (error) {
        res.status(400).send({ mensagem: error.message, error: error })
    }

})




app.listen(3003, () => console.log("Servidor iniciado!"))