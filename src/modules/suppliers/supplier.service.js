import {pool} from '../../config/db.js';

// Create a new supplier
export const createSupplier = async (supplierName, contactNumber) => {
    const [result] = await pool.execute(
        `INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES (?, ?)`,
        [supplierName, contactNumber]
    );
    return result;
};

// get all suppliers
export const getAllSuppliers = async () => {
    const [rows] = await pool.execute(`SELECT * FROM Suppliers`);
    return rows;
};

//update supplier
export const updateSupplier = async (id, supplierName, contactNumber) => {
    const [result] = await pool.execute(
        `UPDATE Suppliers 
        SET SupplierName = ?, 
        ContactNumber = ? 
        WHERE SupplierID = ?`,
        [supplierName, contactNumber, id]
    );
    return result;
};

//delete supplier
export const deleteSupplier = async (id) => {
    const [result] = await pool.execute(
        `DELETE FROM Suppliers WHERE SupplierID = ?`,
        [id]
    );
    return result;
}