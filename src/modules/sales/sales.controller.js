import * as saleService from "./sale.service.js";

// Create sale
export const createSale = async (req, res) => {
    try {
        const { productId, quantitySold, saleDate } = req.body;

        if (
            !Number.isInteger(productId) ||
            productId <= 0 ||
            !Number.isInteger(quantitySold) ||
            quantitySold <= 0 ||
            typeof saleDate !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(saleDate) ||
            Number.isNaN(Date.parse(saleDate)) ||
            new Date(saleDate).toISOString().slice(0, 10) !== saleDate
        ) {
            return res.status(400).json({
                message: "Valid productId, quantitySold and saleDate (YYYY-MM-DD) are required"
            });
        }

        const result = await saleService.createSale(
            productId,
            quantitySold,
            saleDate
        );

        return res.status(201).json({
            message: "Sale recorded successfully",
            saleId: result.insertId
        });

    } catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "Product does not exist"
            });
        }

        return res.status(500).json({
            message: error.message
        });
    }
};

// Get all sales
export const getAllSales = async (req, res) => {
    try {
        const sales = await saleService.getAllSales();
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Get sales by product
export const getSalesByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!/^[1-9]\d*$/.test(productId)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const sales = await saleService.getSalesByProduct(productId);
        return res.status(200).json(sales);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};