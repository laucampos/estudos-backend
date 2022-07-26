import { BaseDatabase } from "./BaseDatabase"
import { products, purchases, users } from "./data"
import { ProductDatabase } from "./ProductDatabase"
import { PurchaseDatabase } from "./PurchaseDatabase"
import { UserDatabase } from "./UserDatabase"

class Migrations extends BaseDatabase {
    public async execute() {
        try {
            await this.createTables()
            console.log("Tables created successfully")
            await this.insertData()
            console.log("Tables populated successfully")
        } catch (error) {
            console.log(error.sql || error.message)
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Migrations completed.")
        }
    }

    private async createTables() {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS 
            ${PurchaseDatabase.TABLE_PURCHASES},
            ${ProductDatabase.TABLE_PRODUCTS},
            ${UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS ${ProductDatabase.TABLE_PRODUCTS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(6,2) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS ${PurchaseDatabase.TABLE_PURCHASES}(
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            product_id VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            total_price DECIMAL(6,2) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES ${UserDatabase.TABLE_USERS}(id),
            FOREIGN KEY (product_id) REFERENCES ${ProductDatabase.TABLE_PRODUCTS}(id)
        );
        `)
    }

    private async insertData() {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(users)

        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .insert(products)

        await BaseDatabase
            .connection(PurchaseDatabase.TABLE_PURCHASES)
            .insert(purchases)
    }
}

const migrations = new Migrations()
migrations.execute()