import { pool } from "../../config/db.js";

export const seedDatabase = async () => {
    const connection = await pool.getConnection();

    const summary = {
        supplier: null,
        products: [],
        sale: null
    };

    try {
        await connection.beginTransaction();

        //Supplier
        const [suppliers] = await connection.execute(
            `SELECT SupplierID
             FROM Suppliers
             WHERE SupplierName = ?
             ORDER BY SupplierID
             LIMIT 1`,
            ["FreshFoods"]
        );

        let supplierId;

        if (suppliers.length > 0) {
            supplierId = suppliers[0].SupplierID;
            summary.supplier = "already exists";
        } else {
            const [result] = await connection.execute(
                `INSERT INTO Suppliers (SupplierName, ContactNumber)
                 VALUES (?, ?)`,
                ["FreshFoods", "01001234567"]
            );

            supplierId = result.insertId;
            summary.supplier = "created";
        }

        //Products
        const products = [
            { name: "Milk", price: 15, stock: 50 },
            { name: "Bread", price: 10, stock: 30 },
            { name: "Eggs", price: 20, stock: 40 }
        ];

        let milkId;

        for (const product of products) {
            const [existing] = await connection.execute(
                `SELECT ProductID
                 FROM Products
                 WHERE ProductName = ?
                   AND SupplierID = ?
                 ORDER BY ProductID
                 LIMIT 1`,
                [product.name, supplierId]
            );

            let productId;
            let status;

            if (existing.length > 0) {
                productId = existing[0].ProductID;
                status = "already exists";
            } else {
                const [result] = await connection.execute(
                    `INSERT INTO Products
                     (ProductName, Price, StockQuantity, SupplierID)
                     VALUES (?, ?, ?, ?)`,
                    [
                        product.name,
                        product.price,
                        product.stock,
                        supplierId
                    ]
                );

                productId = result.insertId;
                status = "created";
            }

            summary.products.push({
                productId,
                productName: product.name,
                status
            });

            if (product.name === "Milk") {
                milkId = productId;
            }
        }

        //Required sale
        const [sales] = await connection.execute(
            `SELECT SaleID
             FROM Sales
             WHERE ProductID = ?
               AND QuantitySold = ?
               AND SaleDate = ?
             LIMIT 1`,
            [milkId, 2, "2025-05-20"]
        );

        if (sales.length > 0) {
            summary.sale = {
                saleId: sales[0].SaleID,
                status: "already exists"
            };
        } else {
            const [result] = await connection.execute(
                `INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
                 VALUES (?, ?, ?)`,
                [milkId, 2, "2025-05-20"]
            );

            summary.sale = {
                saleId: result.insertId,
                status: "created"
            };
        }

        await connection.commit();

        return summary;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};