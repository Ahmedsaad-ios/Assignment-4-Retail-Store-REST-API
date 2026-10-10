import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const initializeDatabase = async () => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });         

        await connection.query(
            `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
        );    
            
        await connection.query(
            `USE \`${process.env.DB_NAME}\`;`
        );

        //Create Suppliers table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Suppliers (
                SupplierID INT AUTO_INCREMENT PRIMARY KEY,
                SupplierName VARCHAR(255),
                ContactNumber TEXT
            )
        `);

        // Create Products table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Products (
                ProductID INT AUTO_INCREMENT PRIMARY KEY,
                ProductName VARCHAR(255),
                Price DECIMAL(10, 2),
                StockQuantity INT,
                SupplierID INT,
                FOREIGN KEY (SupplierID)
                    REFERENCES Suppliers(SupplierID)
            )
        `);

        // Create Sales table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Sales (
                SaleID INT AUTO_INCREMENT PRIMARY KEY,
                ProductID INT,
                QuantitySold INT,
                SaleDate DATE,
                FOREIGN KEY (ProductID)
                    REFERENCES Products(ProductID)
            )
        `);
        console.log("Database and tables initialized successfully");

    } catch (error) {
        console.error("Database initialization failed:", error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};