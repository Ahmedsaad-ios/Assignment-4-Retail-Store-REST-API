import { Router } from "express";

import {
    createSale,
    getAllSales,
    getSalesByProduct
} from "./sales.controller.js";

const router = Router();

router.post("/", createSale);
router.get("/", getAllSales);
router.get("/product/:productId", getSalesByProduct);

export default router;