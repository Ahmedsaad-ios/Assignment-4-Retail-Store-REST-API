import * as supplierService from "./supplier.service.js";

export const createSupplier = async (req, res) => {
    try {
        const { 
            supplierName,
            contactNumber
        } = req.body;
        
        if (!supplierName || !contactNumber) {
            return res.status(400).json({
                message: 'Supplier name and contact number are required'
            });
        }

        const result = await supplierService.createSupplier(supplierName, contactNumber);
        res.status(201).json({
            message: 'Supplier created successfully',
            supplierId: result.insertId
        });
    } catch (error) {
        console.error('Error creating supplier:', error);
        
        res.status(500).json({
            message: error.message
        });
    }
};

export const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        return res.status(200).json(suppliers);
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateSupplier  = async (req, res) => {
    try {
        const {id} = req.params;
        const {supplierName, contactNumber} = req.body;

        if (!supplierName || !contactNumber) {
            return res.status(400).json({
                message: 'Supplier name and contact number are required'
            });
        }

        const result = await supplierService.updateSupplier(id, supplierName, contactNumber);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Supplier not found'
            });
        }

        return res.status(200).json({
            message: 'Supplier updated successfully'
        });
    } catch (error) {
        console.error('Error updating supplier:', error);
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteSupplier = async (req, res) => {
    try {
        const {id} = req.params;

        const result = await supplierService.deleteSupplier(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Supplier not found'
            });
        }

        return res.status(200).json({
            message: 'Supplier deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting supplier:', error);
        return res.status(500).json({
            message: error.message
        });
    }
};
