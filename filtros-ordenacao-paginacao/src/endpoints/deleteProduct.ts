import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const deleteProduct = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const id = String(req.params.id)

        if (!id) {
            throw new Error("Id demanded");
        }

        const [ checkProduct ]  = await connection.raw(`
            SELECT * FROM ${TABLE_PRODUCTS}
            WHERE id = "${id}";
        `);

        if (checkProduct.length === 0) {
            throw new Error("Product not found");
        }

        await connection.raw(`
            DELETE FROM ${TABLE_PRODUCTS}
            WHERE id = "${id}";
        `);

        res.status(200).send({ message: "Product deleted" });

    } catch (error) {
        res.status(errorCode).send({ message: error.message });
    }
        
}