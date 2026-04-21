import { Router } from "express";
import { listarTransacoes, criarTransacao } from "../controllers/transacaoController.js";

const router = Router();
router.get("/", listarTransacoes);
router.post("/", criarTransacao);

export default router;