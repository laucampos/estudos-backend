import { Request, Response } from "express"
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";

export const deletePerfume = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const id = req.params.id;

        const perfumeExists = await connection(TABLE_PERFUMES)
            .select()
            .where("id", "=", `${id}`);

        if (perfumeExists.length === 0) {
            errorCode = 404;
            throw new Error("Perfume not found");
        }

        await connection(TABLE_PERFUMES)
            .delete()
            .where({
                id: id
            });

        res.status(200).send({ message: "Perfume deleted" });

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}