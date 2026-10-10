import {Router} from 'express';
import { createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateBreadPrice,
    deleteEggs
 } from "./products.controller.js";

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);  
router.patch("/bread/price", updateBreadPrice);
router.delete("/eggs", deleteEggs);

export default router;