import { Router } from "express";

import {
    getTotalSold,
    getHighestStock,
    getSuppliersStartingWithF,
    getNeverSoldProducts,
    getSalesDetails
} from "./reports.controller.js";

const router = Router();

router.get("/total-sold", getTotalSold);
router.get("/highest-stock", getHighestStock);
router.get("/suppliers-start-f", getSuppliersStartingWithF);
router.get("/never-sold", getNeverSoldProducts);
router.get("/sales-details", getSalesDetails);

export default router;