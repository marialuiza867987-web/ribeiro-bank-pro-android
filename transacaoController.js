import Transacao from "../models/Transacao.js";

export async function listarTransacoes(req, res) {
  try {
    const transacoes = await Transacao.find().sort({ criadoEm: -1 }).limit(50);
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar transações.", erro: error.message });
  }
}

export async function criarTransacao(req, res) {
  try {
    const transacao = await Transacao.create(req.body);
    res.status(201).json(transacao);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar transação.", erro: error.message });
  }
}