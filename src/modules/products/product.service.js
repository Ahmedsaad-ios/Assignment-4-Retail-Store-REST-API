import {pool} from '../../config/db.js';

//Create a new product
export const createProduct = async (
    productName,
    price,
    stockQuantity,
    supplierId
) => {
    const [result] = await pool.execute(
        `INSERT INTO Products
         (ProductName, Price, StockQuantity, SupplierID)
         VALUES (?, ?, ?, ?)`,
        [productName, price, stockQuantity, supplierId]
    );
    return result;
};

//Get all products
export const getAllProducts = async () => {
    const [rows] = await pool.execute(
        `SELECT p.*, s.SupplierName
         FROM Products p
         LEFT JOIN Suppliers s ON p.SupplierID = s.SupplierID
         ORDER BY p.ProductID`
    );
    return rows;
};

//get product by id
export const getProductById = async (id) => {
    const [rows] = await pool.execute(
        `SELECT p.*, s.SupplierName
            FROM Products p
            LEFT JOIN Suppliers s ON p.SupplierID = s.SupplierID
            WHERE p.ProductID = ?`,
        [id]
    );
    return rows[0] || null;
};

//Update a product
export const updateProduct = async (
    id,
    productName,
    price,
    stockQuantity,
    supplierId
) => {
    const [result] = await pool.execute(
        `UPDATE Products
         SET ProductName = ?, 
         Price = ?, 
         StockQuantity = ?, 
         SupplierID = ?
         WHERE ProductID = ?`,
        [productName, price, stockQuantity, supplierId, id]
    );
    return result;
};

//Delete a product
export const deleteProduct = async (id) => {
    const [result] = await pool.execute(
        `DELETE FROM Products WHERE ProductID = ?`,
        [id]
    );
    return result;
};


//update the price of the product named "Bread" to 25.00
export const updateBreadPrice = async () => {
    const [result] = await pool.execute(
        `UPDATE Products
         SET Price = 25.00
         WHERE ProductName = ?`,
        ["Bread"]
    );

    return result;
};

//Delete the product named "Eggs" and all its associated sales records
export const deleteEggs = async () => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [products] = await connection.execute(
            `SELECT ProductID
             FROM Products
             WHERE ProductName = ?
             LIMIT 1
             FOR UPDATE`,
            ["Eggs"]
        );

        if (products.length === 0) {
            await connection.rollback();
            return { deleted: false };
        }

        const productId = products[0].ProductID;

        const [salesResult] = await connection.execute(
            "DELETE FROM Sales WHERE ProductID = ?",
            [productId]
        );

        await connection.execute(
            "DELETE FROM Products WHERE ProductID = ?",
            [productId]
        );

        await connection.commit();

        return {
            deleted: true,
            deletedProductId: productId,
            deletedSalesCount: salesResult.affectedRows
        };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};