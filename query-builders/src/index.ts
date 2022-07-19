import express from "express";
import cors from "cors";
import { ping } from "./endpoints/ping";
import { postPerfume } from "./endpoints/postPerfume";
import { getPerfumes } from "./endpoints/getPerfumes";
import { putPerfumePrice } from "./endpoints/putPerfumePrice";
import { deletePerfume } from "./endpoints/deletePerfume";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});

app.get("/ping", ping)

// Implemente seus endpoints abaixo

//POST Perfume
app.post("/perfume", postPerfume)

//GET Perfumes
app.get("/perfume", getPerfumes)

//PUT Perfume Price
app.put("/perfume/:id", putPerfumePrice)

//DELETE Perfume
app.delete("/perfume/:id", deletePerfume)