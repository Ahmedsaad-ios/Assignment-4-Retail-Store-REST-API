import * as productService from './product.service.js';

const validProduct= (body)=>{
    const {productName, price, stockQuantity, supplierId} = body;
    return (
        typeof productName === 'string' &&
        productName.trim().length >0 &&
        Number.isFinite(price) &&
        price > 0 &&
        Number.isInteger(stockQuantity) &&
        stockQuantity >= 0 &&
        Number.isInteger(supplierId) &&
        supplierId > 0
    );
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        if (!validProduct(req.body)) {
            return res.status(400).json({
                message: 'Valid productName, price, stockQuantity and supplierId are required'
            });
        }

            const { 
            productName,
            price, 
            stockQuantity, 
            supplierId 
        } = req.body;

        const result = await productService.createProduct(
            productName,
            price,
            stockQuantity,
            supplierId
        );
        
        return res.status(201).json({ 
            message: 'Product created successfully', 
            productId: result.insertId 
        });
    } catch (error) {
         if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "Supplier does not exist"
            });
        }
        console.error('Failed to create product:',  error.message);
        return res.status(500).json({
            message: 'Failed to create product' 
        });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error.message);
        return res.status(500).json({
            message: 'Failed to fetch products'
        });
    }       
};  

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Failed to fetch product:', error.message);
        return res.status(500).json({
            message: 'Failed to fetch product'
        });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        if (!validProduct(req.body)) {
            return res.status(400).json({
                message: 'Valid productName, price, stockQuantity and supplierId are required'
            });
        }
        const { id } = req.params;
        const { 
            productName,
            price,
            stockQuantity,
            supplierId 
        } = req.body;

        const result = await productService.updateProduct(
            req.params.id,
            productName,
            price,
            stockQuantity,
            supplierId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        
        return res.status(200).json({
            message: 'Product updated successfully'
        });
    } catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "Supplier does not exist"
            });
        }
        console.error('Failed to update product:', error.message);
        return res.status(500).json({
            message: 'Failed to update product'
        });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;  
        const result = await productService.deleteProduct(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Failed to delete product:', error.message);
        return res.status(500).json({
            message: 'Failed to delete product'
        });
    }
};

// Update the price of the product named "Bread" to 25.00
export const updateBreadPrice = async (req, res) => {
    try {
        const result = await productService.updateBreadPrice();

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Bread product not found"
            });
        }

        return res.status(200).json({
            message: "Bread price updated to 25.00 successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Delete the product named "Eggs" and all its associated sales records
export const deleteEggs = async (req, res) => {
    try {
        const result = await productService.deleteEggs();

        if (!result.deleted) {
            return res.status(404).json({
                message: "Eggs product not found"
            });
        }

        return res.status(200).json({
            message: "Eggs deleted successfully",
            deletedProductId: result.deletedProductId,
            deletedSalesCount: result.deletedSalesCount
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};