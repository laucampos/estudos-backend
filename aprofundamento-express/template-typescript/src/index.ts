import express, { Request, Response } from "express"
import cors from "cors"
import { Afazer, afazeres } from "./afazeres"

const app = express()

app.use(cors())
app.use(express.json())


//exercício 1
app.get("/ping", (req: Request, res: Response) => {
    console.log("Pong!")
})


//exercício 3
app.get("/afazeres/:userId", (req: Request, res: Response) => {
    const userId = Number(req.params.userId)
    const afazer = afazeres.filter(afazer => afazer.userId === userId)

    res.status(200).send(afazer)
})

//exercício 4
//criação de afazer
app.post("/afazeres", (req: Request, res: Response) => {
    const { userId, title } = req.body

    const ultimoAfazer = afazeres[afazeres.length - 1]

    const novoAfazer: Afazer = {
        userId: userId,
        id: ultimoAfazer.id +1,
        title: title,
        completed: false
    }

    afazeres.push(novoAfazer)

    res.send({mensagem: "Afazer criado com sucesso", afazeres: novoAfazer})
})

//exercício 5
//atualização de status
app.put("/afazeres/:userId/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const userId = Number(req.params.userId)
    const { completed }= req.body

    const alterarCompleted = afazeres.map((afazer) => {
        if (afazer.userId === userId && afazer.id === id) {
            return {...afazer, completed: completed}
        }
    })

    res.send({mensagem: "Status atualizado com sucesso!", afazeres: alterarCompleted})
})


app.listen(3003, () => console.log("Servidor Iniciado"))