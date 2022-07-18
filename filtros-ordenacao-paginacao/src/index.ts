import express from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { getUsers } from "./endpoints/getUsers";
import { getProducts } from "./endpoints/getProducts";
import { postNewProduct } from "./endpoints/postNewProduct";
import { deleteProduct } from "./endpoints/deleteProduct";
import { putProductPrice } from "./endpoints/putProductPrice";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

// Get users - Com filtro de busca, paginação e ordenação
app.get("/users", getUsers)

// Get products - Com filtro de busca, paginação e ordenação
app.get("/products", getProducts)

// POST new product
app.post("/products", postNewProduct)

//DELETE product
app.delete("/products/:id", deleteProduct)

//PUT product price
app.put("/products/:id", putProductPrice)
