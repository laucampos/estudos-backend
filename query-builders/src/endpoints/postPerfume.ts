import { Request, Response } from "express"
import connection from "../database/connection";
import { TABLE_PERFUMES } from "../database/tableNames";
import { Perfume } from "../models/Perfume";

export const postPerfume = async (req: Request, res: Response) => {
    let errorCode = 400;
    try {
        const { name, brand, price, ml } = req.body;

        if (!name || !brand || !price || !ml) {
            errorCode = 422;
            throw new Error("Insufficient data. Please provide 'name', 'brand', 'price' and 'ml'");
        }

        if (typeof name !== "string") {
            errorCode = 422;
            throw new Error("name must be a string");
        }

        if (typeof brand !== "string") {
            errorCode = 422;
            throw new Error("brand must be a string");
        }

        if (typeof price !== "number") {
            errorCode = 422;
            throw new Error("price must be a number");
        }

        if (typeof ml !== "number") {
            errorCode = 422;
            throw new Error("ml must be a number");
        }

        if (name.length < 3) {
            errorCode = 422;
            throw new Error("name must be at least 3 characters long");
        }

        if (price <= 0) {
            errorCode = 422;
            throw new Error("price must be greater than 0");
        }

        const newPerfume: Perfume = {
            id: Date.now().toString(),
            name,
            brand,
            price,
            ml
        }

        await connection(TABLE_PERFUMES)
            .insert({
                id: newPerfume.id,
                name: newPerfume.name,
                brand: newPerfume.brand,
                price: newPerfume.price,
                ml: newPerfume.ml
            })

        res.status(200).send({ product: newPerfume, message: "Perfume added successfully" });


    } catch (error) {
        res.status(errorCode).send({ message: error.message });
    }
}