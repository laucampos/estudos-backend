import express, { Request, Response } from 'express'
import cors from 'cors'
import { Produto, produtos } from './produtos'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003.")
})

// Endpoint de teste
app.get("/aragon", (req: Request, res: Response) => {
    res.send({ mensagem: "API funcionando!" })
})

// Endpoint de busca de produtos por status de ativo, se não mandar o status devolve tudo
app.get("/produtos", (req: Request, res: Response) => {
    const busca = req.query.busca

    if (busca !== "true" && busca !== "false") {
        return res.send({
            busca: busca,
            produtos: produtos
        })
    }

    if (busca === "true") {
        const resultado = produtos.filter((produto) => {
            return produto.isAtivo === true
        })

        return res.send({
            produtos: resultado,
            busca: busca
        })
    } else {
        const resultado = produtos.filter((produto) => {
            return produto.isAtivo === false
        })

        return res.send({
            produtos: resultado,
            busca: busca
        })
    }
})

// Endpoint de busca todos os produtos de um determinado vendedor
app.get("/produtos/:idVendedor", (req: Request, res: Response) => {
    const idVendedor = req.params.idVendedor

    const resultado = produtos.filter((produto) => {
        return produto.idVendedor === idVendedor
    })

    res.send({
        produtos: resultado
    })
})

// Endpoint de criação de produto
app.post("/produtos", (req: Request, res: Response) => {
    const { idVendedor, preco } = req.body

    const ultimoProduto = produtos[produtos.length - 1]

    const novoProduto: Produto = {
        id: ultimoProduto.id + 1,
        idVendedor: idVendedor,
        preco: preco,
        isAtivo: true
    }

    produtos.push(novoProduto)

    res.send({ 
        mensagem: "Produto criado com sucesso",
        produto: novoProduto
     })
})

// Endpoint de deletar produto por id
app.delete("/produtos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const index = produtos.findIndex((produto) => {
        return produto.id === id
    })

    if (index === -1) {
        return res.send({
            mensagem: "Produto não encontrado",
            id: id
        })
    }

    produtos.splice(index, 1)

    res.send({
        mensagem: "Produto deletado com sucesso",
        produtos: produtos
    })
})