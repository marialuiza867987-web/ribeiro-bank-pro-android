import Lead from "../models/Lead.js";

export async function listarLeads(req, res) {
  try {
    const leads = await Lead.find().sort({ criadoEm: -1 }).limit(50);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar leads.", erro: error.message });
  }
}

export async function criarLead(req, res) {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar lead.", erro: error.message });
  }
}