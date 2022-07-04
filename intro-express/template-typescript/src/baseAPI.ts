import express, {Request, Response} from "express"
import cors from "cors"

//função que inicia um servidor
const app = express()

//middlewares
app.use(cors())
app.use(express.json())


//endpoints: sintaxe (precisa ficar acima do app.listen)
// app.get("/caminho", (req: Request, res: Response) => {
//     res.send("Hello World")
// })

//header (req.headers)
//query params ?chave=valor (req.query.valorDaChave)
//path params /:id (req.params)
//body (req.body)

//enviar respostas
//send(valor)
//status(200)
//end()

//Pegar headers
app.get("/users", (req: Request, res: Response) => {
    const headers = req.headers.teste
    res.status(200).send("Requisição recebida!")
    console.log(headers)
})



//função que abre uma porta no nosso pc para rodar a aplicação
app.listen(3003, () => console.log("Servidor iniciado!"))
