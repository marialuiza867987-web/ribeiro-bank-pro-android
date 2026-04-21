import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export async function cadastrar(req, res) {
  try {
    const { nome, email, senha, telefone } = req.body;
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ mensagem: "Email já cadastrado." });

    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: senhaHash, telefone, saldo: 18750.90 });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso.",
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email }
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao cadastrar.", erro: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: "Senha inválida." });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email, saldo: usuario.saldo }
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro no login.", erro: error.message });
  }
}