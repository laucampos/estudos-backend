import { Product } from "../models/Product"
import { BaseDatabase } from "./BaseDatabase"

export class ProductDatabase extends BaseDatabase {
    TABLE_NAME = "Labe_Products"
    public static TABLE_PRODUCTS = "Labe_Products"

    public async getAll() {
        return super.getAll()
    }

    public async create(product: Product) {
        return super.create(product)
    }

    public async getItemById(id: string) {
        return super.getItemById(id)
    }
}
