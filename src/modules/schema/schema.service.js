import { pool } from "../../config/db.js";

// Add Category column
export const addCategory = async () => {
    await pool.query(`
        ALTER TABLE Products
        ADD COLUMN Category VARCHAR(100)
    `);
};

// Remove Category column
export const removeCategory = async () => {
    await pool.query(`
        ALTER TABLE Products
        DROP COLUMN Category
    `);
};

// Change ContactNumber to VARCHAR(15)
export const changeContactNumberType = async () => {
    await pool.query(`
        ALTER TABLE Suppliers
        MODIFY COLUMN ContactNumber VARCHAR(15)
    `);
};

// Make ProductName NOT NULL
export const makeProductNameRequired = async () => {
    await pool.query(`
        ALTER TABLE Products
        MODIFY COLUMN ProductName VARCHAR(255) NOT NULL
    `);
};