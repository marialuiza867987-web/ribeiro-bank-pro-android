import { Router } from "express";
import { listarLeads, criarLead } from "../controllers/leadController.js";

const router = Router();
router.get("/", listarLeads);
router.post("/", criarLead);

export default router;