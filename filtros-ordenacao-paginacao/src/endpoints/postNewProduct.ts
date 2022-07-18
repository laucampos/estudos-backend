import { Request, Response } from "express";
import connection from "../database/connection";
import { TABLE_PRODUCTS } from "../database/tableNames";
import { Product } from "../models/Product";

export const postNewProduct = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const { name, price } = req.body;

        if (!name || !price) {
            throw new Error("Name and price demanded");
        }

        if (typeof name !== "string" || typeof price !== "number") {
            throw new Error("Name must be a string and price must be a number");
        }

        
        // const [ lastId ]  = await connection.raw(`
        // SELECT id FROM ${TABLE_PRODUCTS}
        // `);
        

        // const orderedArray = lastId.map((item) => Number(item.id.split('t')[1])).sort((a, b) => a - b);
        // const newId = orderedArray[orderedArray.length - 1] + 1;

        const newProduct: Product = {
            id: Date.now().toString(),
            name,
            price,
        }

        await connection.raw(`
            INSERT INTO ${TABLE_PRODUCTS} (id, name, price)
            VALUES ("${newProduct.id}", "${newProduct.name}", "${newProduct.price}");
        `)

        res.status(200).send({ message: "Create new product sucessfully", product: newProduct });


    } catch (error) {
        res.status(errorCode).send({ message: error.message });
    }

}