import mongoose from "mongoose";

export async function conectarBanco() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas conectado com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB Atlas:", error.message);
    process.exit(1);
  }
}