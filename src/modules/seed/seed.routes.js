import { Router } from "express";
import { runSeed } from "./seed.controller.js";

const router = Router();

router.post("/", runSeed);

export default router;