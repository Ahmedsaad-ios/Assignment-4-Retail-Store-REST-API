import { Router } from "express";

import {
    createSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier
}from "./suppliers.controller.js";

const router = Router();

router.post('/', createSupplier);
router.get('/', getAllSuppliers);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;