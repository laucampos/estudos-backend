import express, {Request, Response} from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

//exercício 1
app.get("/", (req: Request, res: Response) => {
    console.log("Servidor funcionando (:")
}) 

//exercício 2
type Person = {
    id: number, 
    name: string,
    phone: number,
    email: string
}

let users: Person [] = [
    {
        id: 1,
        name: "Laura",
        phone: 989044881,
        email: "laura@laura.com."

    },
    {
        id: 2,
        name: "Thalita",
        phone: 98999664,
        email: "thali@thali.com"
    },
    {
        id: 3,
        name: "Malu",
        phone: 9989616469,
        email: "malu@malu.com"
    }
]

//exercicio 3
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

//exercício 4
app.get("/users/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = users.filter(user => user.id === id)

    res.status(200).send(user)
})

//exercício 5
app.put("/users/:id", (req: Request, res: Response) => {
    //receber id do front
    const id = Number(req.params.id)

    //armazena novo telefone do usuário
    const newPhone: number = req.body.phone

    //filtra usuário e atualiza com o novo numero
    users.map((user) => {
        if (user.id === id) {
            user.phone = newPhone
        }

    })
    
    res.status(200).send({mensagem: "Telefone alterado com sucesso!", users})
})


//exercício 6
app.delete("/users/:id", (req: Request, res: Response) => {
    //receber id do front
    const id = Number(req.params.id)
    //procurar index através do id
    const index = users.findIndex(user => user.id === id)
    //deletar através do index
    users.splice(index, 1)

    //enviar nova lista de usuários
    res.status(200).send(users)
})

app.listen(3003, () => console.log("Servidor iniciado!"))

