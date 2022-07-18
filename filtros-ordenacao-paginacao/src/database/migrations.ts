import connection from "./connection";
import { products, users } from "./data";
import { TABLE_PRODUCTS, TABLE_USERS } from "./tableNames";

const createTables = async () => {
    await connection.raw(`
            DROP TABLE IF EXISTS ${TABLE_USERS}, ${TABLE_PRODUCTS};

            CREATE TABLE IF NOT EXISTS ${TABLE_USERS}(
                id VARCHAR(255) PRIMARY KEY,
	            email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
	            role ENUM("ADMIN", "NORMAL") DEFAULT "NORMAL"
            );

            CREATE TABLE IF NOT EXISTS ${TABLE_PRODUCTS}(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(6,2) NOT NULL
            );
        `)
        .then(() => {
            console.log(`Tables ${TABLE_USERS}, ${TABLE_PRODUCTS} created successfully!`);
            insertData();
        })
        .catch((error: any) => printError(error));
};

const insertData = async () => {
    try {
        await connection(TABLE_USERS)
            .insert(users)
            .then(() => console.log(`${TABLE_USERS} populated!`))
            .catch((error: any) => printError(error));

        await connection(TABLE_PRODUCTS)
            .insert(products)
            .then(() => console.log(`${TABLE_PRODUCTS} populated!`))
            .catch((error: any) => printError(error));

    } catch (error: any) {
        console.log(error.sqlMessage || error.message);
    } finally {
        console.log("Ending connection!");

        return connection.destroy();
    };
};

const printError = (error: any) => {
    console.log(error.sqlMessage || error.message);
};

createTables();