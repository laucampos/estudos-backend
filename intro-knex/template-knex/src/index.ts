import express, { Request, Response } from "express";
import cors from "cors";
import { Funcionarios } from "./types";
import connection from "./database/connection";

const app = express();

app.use(express.json());
app.use(cors());

  

//GET Usuários (com busca)
app.get("/users", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const busca = req.query.busca as string

    if (busca) {
      const [ resultado ] = await connection.raw(`
        SELECT * FROM Funcionarios 
        WHERE LOWER(nome) LIKE "%${busca.toLowerCase()}%"
        `)

      return res.status(200).send({ usuários:  resultado });
    }

    const [ resultado ] = await connection.raw(`
    SELECT * FROM Funcionarios;
    `)

    res.status(200).send({ usuários: resultado });

  } catch (error) {
    res.status(errorCode).send({ mensagem: error.message });
  }
})

//POST Usuário 
app.post("/users", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const { nome, email} = req.body;

    if(!nome || !email) {
      errorCode = 401
      throw new Error("Nome e email são obrigatórios");
    }

    if(typeof nome !== "string" || typeof email !== "string") {
      errorCode = 402
      throw new Error("Nome e email devem ser strings");
    }

    if (!email.includes("@")) {
      throw new Error("Email invalido");
    }

    const checkEmail: Funcionarios [] = await connection.raw(`
      SELECT * FROM Funcionarios 
      WHERE email = '${email}'
    `)

    if(checkEmail.length > 0){
      errorCode = 401
      throw new Error("Email já cadastrado")
    }

    if(nome.length < 4) {
      errorCode = 401
      throw new Error("Nome deve ter mais de 4 caracteres")
    }

    const novoUsuario: Funcionarios = {
      id: Date.now(),
      nome: nome,
      email: email
    }

    await connection.raw(`
    INSERT INTO Funcionarios (id, nome, email)
    VALUES (${novoUsuario.id}, "${novoUsuario.nome}", "${novoUsuario.email}");
    `)

    res.status(201).send({ mensagem: "Usuário criado com sucesso!", usuário: novoUsuario });

  } catch (error) {
    res.status(errorCode).send({ mensagem: error.message });
  }
})

//PUT Edição de email
app.put("/users/:id", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const id = Number(req.params.id);
    const email = req.body.email as string;

    if(!email) {
      errorCode = 401
      throw new Error("Email é obrigatório");
    }

    if(typeof email !== "string") {
      errorCode = 402
      throw new Error("Email deve ser uma string");
    }

    if (!email.includes("@")) {
      throw new Error("Email invalido");
    }

    const [ checkId ]: string[] = await connection.raw(`
      SELECT * FROM Funcionarios
      WHERE id = ${id}
    `)

    if(checkId.length === 0) {
      errorCode = 403
      throw new Error("Usuário não encontrado")
    }

    const [ checkEmail ]: string[] = await connection.raw(`
      SELECT * FROM Funcionarios
      WHERE email = '${email}'
    `)

    if(checkEmail.length > 0){
      errorCode = 401
      throw new Error("Email já cadastrado")
    } 

    await connection.raw(`
    UPDATE Funcionarios
    SET email = "${email}"
    WHERE id = ${id}
    `)
    
    res.status(200).send({ mensagem: "Email atualizado com sucesso!" });

  } catch (error) {
    res.status(errorCode).send({ mensagem: error.message });
  }
    
})

//DELETE Usuário
app.delete("/users/:id", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const id = Number(req.params.id);

    const [ checkId ]: string[] = await connection.raw(`
      SELECT * FROM Funcionarios
      WHERE id = ${id}
    `)

    if(checkId.length === 0) {
      errorCode = 404
      throw new Error("Usuário não encontrado")
    }
    
    await connection.raw(`
    DELETE FROM Funcionarios
    WHERE id = ${id}`)

    res.status(200).send({ mensagem: "Usuário deletado com sucesso!" });

  } catch (error) {
    res.status(errorCode).send({ mensagem: error.message });
  }
})


app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
});