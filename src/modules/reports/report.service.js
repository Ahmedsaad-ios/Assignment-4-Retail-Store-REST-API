import { pool } from "../../config/db.js";

//Total quantity sold for each product
export const getTotalSold = async () => {
    const [rows] = await pool.execute(`
        SELECT
            p.ProductID,
            p.ProductName,
            COALESCE(SUM(s.QuantitySold), 0) AS TotalSold
        FROM Products p
        LEFT JOIN Sales s
            ON p.ProductID = s.ProductID
        GROUP BY p.ProductID, p.ProductName
        ORDER BY p.ProductID
    `);

    return rows;
};

// Product with the highest stock
export const getHighestStock = async () => {
    const [rows] = await pool.execute(`
        SELECT *
        FROM Products
        ORDER BY StockQuantity DESC
        LIMIT 1
    `);

    return rows[0] || null;
};

//Suppliers starting with F
export const getSuppliersStartingWithF = async () => {
    const [rows] = await pool.execute(`
        SELECT *
        FROM Suppliers
        WHERE SupplierName LIKE 'F%'
    `);

    return rows;
};

//Products that have never been sold
export const getNeverSoldProducts = async () => {
    const [rows] = await pool.execute(`
        SELECT p.*
        FROM Products p
        WHERE NOT EXISTS (
            SELECT 1
            FROM Sales s
            WHERE s.ProductID = p.ProductID
        )
    `);

    return rows;
};

//Sales with product details
export const getSalesDetails = async () => {
    const [rows] = await pool.execute(`
        SELECT
            s.SaleID,
            p.ProductName,
            s.QuantitySold,
            s.SaleDate
        FROM Sales s
        INNER JOIN Products p
            ON s.ProductID = p.ProductID
        ORDER BY s.SaleID
    `);

    return rows;
};