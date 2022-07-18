import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";

export const putProductPrice = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const id = String(req.params.id);
        const price = Number(req.body.price);

        if (!id || !price) {
            throw new Error("Id and price demanded");
        }

        const [ checkProduct ]  = await connection.raw(`
            SELECT * FROM ${TABLE_PRODUCTS}
            WHERE id = "${id}";
        `);

        if (checkProduct.length === 0) {
            throw new Error("Product not found");
        }

        await connection.raw(`
            UPDATE ${TABLE_PRODUCTS}
            SET price = "${price}"
            WHERE id = "${id}";
        `);

        res.status(200).send({ message: "Product price updated" });
        
    } catch (error) {
        res.status(errorCode).send({ message: error.message });
    }
    
}