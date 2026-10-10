import { Router } from "express";

import {
    addCategory,
    removeCategory,
    changeContactNumberType,
    makeProductNameRequired
} from "./schema.controller.js";

const router = Router();

router.post("/products/category", addCategory);
router.delete("/products/category", removeCategory);
router.put("/suppliers/contact-number", changeContactNumberType);
router.put("/products/name-required", makeProductNameRequired);

export default router;