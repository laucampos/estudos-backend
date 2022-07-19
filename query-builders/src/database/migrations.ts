import connection from "./connection";
import { perfumes } from "./data";
import { TABLE_PERFUMES } from "./tableNames";

const createTables = async () => {
    await connection.raw(`
            DROP TABLE IF EXISTS ${TABLE_PERFUMES};

            CREATE TABLE IF NOT EXISTS ${TABLE_PERFUMES}(
                id VARCHAR(255) PRIMARY KEY,
	            name VARCHAR(255) NOT NULL,
                brand VARCHAR(255) NOT NULL,
                price DECIMAL(6,2) NOT NULL,
                ml INT NOT NULL
            );
        `)
        .then(() => {
            console.log(`Table ${TABLE_PERFUMES} created successfully!`);
            insertData();
        })
        .catch((error: any) => printError(error));
};

const insertData = async () => {
    try {
        await connection(TABLE_PERFUMES)
            .insert(perfumes)
            .then(() => console.log(`${TABLE_PERFUMES} populated!`))
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