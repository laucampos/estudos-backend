import { Request, Response } from "express"
import { ProductDatabase } from "../database/ProductDatabase"

export const getProducts = async (req: Request, res: Response) => {
    let errorCode = 400
    try {
        // const result = await connection(TABLE_PRODUCTS).select()
        const productDatabase = new ProductDatabase()
        const result = await productDatabase.getAll()

        res.status(200).send({ products: result })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}