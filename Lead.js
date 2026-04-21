import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  origem: { type: String, default: "indicacao_app" },
  status: { type: String, default: "novo" },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model("Lead", LeadSchema);