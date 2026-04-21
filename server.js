import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarBanco } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import transacoesRoutes from "./routes/transacoes.routes.js";
import leadsRoutes from "./routes/leads.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    nome: "Ribeiro Bank API",
    status: "online",
    descricao: "Backend do banco virtual com MongoDB Atlas"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/transacoes", transacoesRoutes);
app.use("/api/leads", leadsRoutes);

const PORT = process.env.PORT || 4000;

conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});