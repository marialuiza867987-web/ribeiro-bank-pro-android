import mongoose from "mongoose";

const TransacaoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  tipo: { type: String, enum: ["entrada", "saida"], required: true },
  titulo: { type: String, required: true },
  descricao: String,
  valor: { type: Number, required: true },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model("Transacao", TransacaoSchema);