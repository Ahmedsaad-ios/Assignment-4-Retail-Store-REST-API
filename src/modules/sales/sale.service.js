import { pool } from "../../config/db.js";

// Record a new sale
export const createSale = async (productId, quantitySold, saleDate) => {
    const [result] = await pool.execute(
        `INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
         VALUES (?, ?, ?)`,
        [productId, quantitySold, saleDate]
    );

    return result;
};

// Get all sales
export const getAllSales = async () => {
    const [rows] = await pool.execute(
        `SELECT * FROM Sales ORDER BY SaleID`
    );

    return rows;
};

// Get sales for a specific product
export const getSalesByProduct = async (productId) => {
    const [rows] = await pool.execute(
        `SELECT * FROM Sales
         WHERE ProductID = ?
         ORDER BY SaleID`,
        [productId]
    );

    return rows;
};