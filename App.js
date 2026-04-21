import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const cores = {
  fundo: "#0B0B0D",
  card: "#17171C",
  card2: "#1E1E24",
  borda: "#2B2B33",
  dourado: "#D9A441",
  dourado2: "#F2C46D",
  branco: "#FFFFFF",
  cinza: "#A6A6B0",
  verde: "#41D98D",
  vermelho: "#FF7272",
};

const transacoesBase = [
  { id: 1, tipo: "entrada", titulo: "PIX recebido", descricao: "Cliente João Martins", valor: 2450.00, data: "Hoje • 08:42" },
  { id: 2, tipo: "saida", titulo: "Boleto pago", descricao: "Energia elétrica", valor: 389.90, data: "Hoje • 07:10" },
  { id: 3, tipo: "entrada", titulo: "Transferência", descricao: "Parceiro comercial", valor: 1200.00, data: "Ontem • 18:20" },
  { id: 4, tipo: "saida", titulo: "Compra no cartão", descricao: "Assinatura profissional", valor: 79.90, data: "Ontem • 11:15" },
];

function moeda(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function BotaoPrincipal({ title, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.botaoPrincipal} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.botaoPrincipalIcone}>{icon}</View>
      <Text style={styles.botaoPrincipalTexto}>{title}</Text>
    </TouchableOpacity>
  );
}

function Atalho({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.atalho} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.atalhoIcone}>{icon}</View>
      <Text style={styles.atalhoTexto}>{label}</Text>
    </TouchableOpacity>
  );
}

function LoginScreen({ onEntrar }) {
  const [nome, setNome] = useState("Gabriel Ribeiro");
  const [email, setEmail] = useState("admin@ribeirobank.com");
  const [senha, setSenha] = useState("123456");
  const [mensagem, setMensagem] = useState("");

  const entrar = () => {
    if (!email || !senha) {
      setMensagem("Preencha email e senha.");
      return;
    }
    onEntrar({ nome, email });
  };

  return (
    <LinearGradient colors={["#0B0B0D", "#111216", "#5E4311"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.loginContainer}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <MaterialCommunityIcons name="bank-outline" size={26} color={cores.dourado2} />
            </View>
            <View>
              <Text style={styles.logoTitulo}>Ribeiro Bank</Text>
              <Text style={styles.logoSubtitulo}>Banco digital em português</Text>
            </View>
          </View>

          <Text style={styles.loginTitulo}>Aplicativo profissional de banco digital</Text>
          <Text style={styles.loginTexto}>
            Estrutura pronta para Android, com telas bonitas, área de clientes, transações e suporte a backend com MongoDB Atlas.
          </Text>

          <Card style={{ marginTop: 26 }}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Seu nome" placeholderTextColor={cores.cinza} />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Seu email" placeholderTextColor={cores.cinza} autoCapitalize="none" />

            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} value={senha} onChangeText={setSenha} placeholder="Sua senha" placeholderTextColor={cores.cinza} secureTextEntry />

            <BotaoPrincipal
              title="Entrar no app"
              onPress={entrar}
              icon={<Feather name="log-in" size={18} color="#111" />}
            />

            {mensagem ? <Text style={styles.erro}>{mensagem}</Text> : null}
          </Card>

          <View style={styles.beneficios}>
            {[
              "Tela premium estilo banco digital",
              "Base para publicação com Expo/EAS",
              "Versão 100% em português",
              "Estrutura pronta para MongoDB Atlas",
            ].map((item) => (
              <View key={item} style={styles.beneficioItem}>
                <Feather name="check-circle" size={16} color={cores.dourado2} />
                <Text style={styles.beneficioTexto}>{item}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function HomeScreen({ usuario, saldo, setSaldo, transacoes, setTransacoes }) {
  const [aba, setAba] = useState("inicio");
  const [leadNome, setLeadNome] = useState("");
  const [leadTelefone, setLeadTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  const totalEntradas = useMemo(
    () => transacoes.filter((t) => t.tipo === "entrada").reduce((acc, t) => acc + t.valor, 0),
    [transacoes]
  );
  const totalSaidas = useMemo(
    () => transacoes.filter((t) => t.tipo === "saida").reduce((acc, t) => acc + t.valor, 0),
    [transacoes]
  );

  const simularPix = () => {
    const nova = {
      id: Date.now(),
      tipo: "saida",
      titulo: "PIX enviado",
      descricao: "Operação simulada",
      valor: 150.00,
      data: "Agora mesmo",
    };
    setTransacoes([nova, ...transacoes]);
    setSaldo((prev) => prev - 150);
    setMensagem("Transferência simulada com sucesso.");
  };

  const cadastrarLead = () => {
    if (!leadNome || !leadTelefone) {
      setMensagem("Preencha nome e telefone do cliente.");
      return;
    }
    setMensagem(`Lead cadastrado com sucesso: ${leadNome}`);
    setLeadNome("");
    setLeadTelefone("");
  };

  return (
    <LinearGradient colors={["#0B0B0D", "#111216", "#5E4311"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.homeContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.topoRow}>
            <View>
              <Text style={styles.boasVindas}>Olá, {usuario.nome}</Text>
              <Text style={styles.topoSub}>Construtora Ribeiro Nunes</Text>
            </View>
            <View style={styles.topoIcones}>
              <TouchableOpacity style={styles.iconeTopo}>
                <Feather name="bell" size={18} color={cores.branco} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconeTopo}>
                <Feather name="shield" size={18} color={cores.branco} />
              </TouchableOpacity>
            </View>
          </View>

          <LinearGradient colors={["#111216", "#1E1E24", "#D9A441"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.cartaoSaldo}>
            <Text style={styles.cartaoSaldoLabel}>Saldo disponível</Text>
            <View style={styles.saldoRow}>
              <Text style={styles.cartaoSaldoValor}>{mostrarSaldo ? moeda(saldo) : "R$ ••••••"}</Text>
              <TouchableOpacity onPress={() => setMostrarSaldo((v) => !v)} style={styles.olhoBtn}>
                <Feather name={mostrarSaldo ? "eye-off" : "eye"} size={18} color={cores.branco} />
              </TouchableOpacity>
            </View>
            <Text style={styles.cartaoSaldoSub}>Conta premium • app em português • pronto para crescer</Text>
          </LinearGradient>

          <View style={styles.resumoGrid}>
            <Card style={styles.resumoCard}>
              <Text style={styles.resumoLabel}>Entradas</Text>
              <Text style={styles.resumoValor}>{moeda(totalEntradas)}</Text>
              <Text style={styles.resumoInfo}>Recebimentos recentes</Text>
            </Card>
            <Card style={styles.resumoCard}>
              <Text style={styles.resumoLabel}>Saídas</Text>
              <Text style={styles.resumoValor}>{moeda(totalSaidas)}</Text>
              <Text style={styles.resumoInfo}>Pagamentos processados</Text>
            </Card>
          </View>

          <View style={styles.atalhosGrid}>
            <Atalho icon={<MaterialCommunityIcons name="qrcode-scan" size={22} color={cores.dourado2} />} label="PIX" onPress={simularPix} />
            <Atalho icon={<Feather name="send" size={22} color={cores.dourado2} />} label="Transferir" onPress={simularPix} />
            <Atalho icon={<Feather name="credit-card" size={22} color={cores.dourado2} />} label="Cartão" onPress={() => setAba("cartao")} />
            <Atalho icon={<Feather name="users" size={22} color={cores.dourado2} />} label="Clientes" onPress={() => setAba("clientes")} />
          </View>

          {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}

          <View style={styles.abasLinha}>
            {[
              ["inicio", "Início"],
              ["extrato", "Extrato"],
              ["cartao", "Cartão"],
              ["clientes", "Clientes"],
            ].map(([valor, label]) => (
              <TouchableOpacity
                key={valor}
                style={[styles.abaBtn, aba === valor && styles.abaAtiva]}
                onPress={() => setAba(valor)}
              >
                <Text style={[styles.abaTexto, aba === valor && styles.abaTextoAtivo]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {aba === "inicio" && (
            <>
              <Card>
                <Text style={styles.secaoTitulo}>Cartão principal</Text>
                <LinearGradient colors={["#0E0E11", "#202028", "#A7771B"]} style={styles.cartaoVisual}>
                  <View style={styles.cartaoVisualHeader}>
                    <Text style={styles.cartaoBadge}>Premium</Text>
                    <Feather name="credit-card" size={22} color={cores.dourado2} />
                  </View>
                  <Text style={styles.cartaoNumero}>4589 •••• •••• 1024</Text>
                  <View style={styles.cartaoRodape}>
                    <Text style={styles.cartaoNome}>RIBEIRO BANK</Text>
                    <Text style={styles.cartaoNome}>12/31</Text>
                  </View>
                </LinearGradient>
              </Card>

              <Card>
                <Text style={styles.secaoTitulo}>Crescimento do app</Text>
                <Text style={styles.textoSecao}>
                  Compartilhe seu link e gere clientes novos para o banco digital da sua marca.
                </Text>
                <View style={styles.linkBox}>
                  <Text style={styles.linkTitulo}>Link de convite</Text>
                  <Text style={styles.linkTexto}>https://ribeirobank.app/convite/RIBEIRO-2026</Text>
                </View>
              </Card>
            </>
          )}

          {aba === "extrato" && (
            <Card>
              <Text style={styles.secaoTitulo}>Últimas transações</Text>
              {transacoes.map((t) => (
                <View key={t.id} style={styles.itemTransacao}>
                  <View style={styles.itemEsquerda}>
                    <View style={[styles.transacaoIcone, { backgroundColor: t.tipo === "entrada" ? "rgba(65,217,141,0.14)" : "rgba(255,114,114,0.14)" }]}>
                      <Feather name={t.tipo === "entrada" ? "arrow-down-left" : "arrow-up-right"} size={18} color={t.tipo === "entrada" ? cores.verde : cores.vermelho} />
                    </View>
                    <View>
                      <Text style={styles.itemTitulo}>{t.titulo}</Text>
                      <Text style={styles.itemDescricao}>{t.descricao}</Text>
                      <Text style={styles.itemData}>{t.data}</Text>
                    </View>
                  </View>
                  <Text style={[styles.itemValor, { color: t.tipo === "entrada" ? cores.verde : cores.vermelho }]}>
                    {t.tipo === "entrada" ? "+" : "-"}{moeda(t.valor)}
                  </Text>
                </View>
              ))}
            </Card>
          )}

          {aba === "cartao" && (
            <Card>
              <Text style={styles.secaoTitulo}>Gestão de cartão</Text>
              <Text style={styles.textoSecao}>Cartão virtual, limite, bloqueio temporário e compras online.</Text>
              <View style={styles.listaInfo}>
                {[
                  "Gerar cartão virtual",
                  "Bloquear temporariamente",
                  "Ajustar limite de uso",
                  "Ver compras e assinaturas",
                ].map((item) => (
                  <View key={item} style={styles.infoRow}>
                    <Feather name="check" size={16} color={cores.dourado2} />
                    <Text style={styles.infoTexto}>{item}</Text>
                  </View>
                ))}
              </View>
            </Card>
          )}

          {aba === "clientes" && (
            <Card>
              <Text style={styles.secaoTitulo}>Gerar clientes por indicação</Text>
              <Text style={styles.textoSecao}>
                Cadastre leads e acompanhe o crescimento do seu banco virtual.
              </Text>

              <Text style={styles.label}>Nome do cliente</Text>
              <TextInput
                style={styles.input}
                value={leadNome}
                onChangeText={setLeadNome}
                placeholder="Nome do cliente"
                placeholderTextColor={cores.cinza}
              />

              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                value={leadTelefone}
                onChangeText={setLeadTelefone}
                placeholder="Telefone do cliente"
                placeholderTextColor={cores.cinza}
              />

              <BotaoPrincipal
                title="Cadastrar lead"
                onPress={cadastrarLead}
                icon={<Feather name="user-plus" size={18} color="#111" />}
              />
            </Card>
          )}

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [saldo, setSaldo] = useState(18750.90);
  const [transacoes, setTransacoes] = useState(transacoesBase);

  if (!usuario) {
    return <LoginScreen onEntrar={setUsuario} />;
  }

  return (
    <HomeScreen
      usuario={usuario}
      saldo={saldo}
      setSaldo={setSaldo}
      transacoes={transacoes}
      setTransacoes={setTransacoes}
    />
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    padding: 22,
    paddingTop: 34,
    paddingBottom: 40,
  },
  homeContainer: {
    padding: 18,
    paddingBottom: 30,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(217,164,65,0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(217,164,65,0.18)",
  },
  logoTitulo: {
    color: cores.branco,
    fontSize: 24,
    fontWeight: "800",
  },
  logoSubtitulo: {
    color: cores.cinza,
    fontSize: 13,
    marginTop: 2,
  },
  loginTitulo: {
    color: cores.branco,
    fontSize: 28,
    fontWeight: "800",
    marginTop: 30,
    lineHeight: 34,
  },
  loginTexto: {
    color: cores.cinza,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  card: {
    backgroundColor: "rgba(23,23,28,0.92)",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginTop: 16,
  },
  label: {
    color: cores.branco,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 16,
    backgroundColor: cores.card2,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 14,
    color: cores.branco,
  },
  botaoPrincipal: {
    marginTop: 18,
    backgroundColor: cores.dourado,
    borderRadius: 18,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  botaoPrincipalIcone: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  botaoPrincipalTexto: {
    color: "#111",
    fontWeight: "800",
    fontSize: 16,
  },
  erro: {
    color: "#ff8f8f",
    marginTop: 12,
    fontWeight: "600",
  },
  beneficios: {
    marginTop: 18,
    gap: 10,
  },
  beneficioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  beneficioTexto: {
    color: cores.branco,
    fontSize: 14,
  },
  topoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  boasVindas: {
    color: cores.branco,
    fontSize: 26,
    fontWeight: "800",
  },
  topoSub: {
    color: cores.cinza,
    fontSize: 13,
    marginTop: 4,
  },
  topoIcones: {
    flexDirection: "row",
    gap: 10,
  },
  iconeTopo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  cartaoSaldo: {
    marginTop: 20,
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cartaoSaldoLabel: {
    color: "#ECECEC",
    fontSize: 14,
  },
  saldoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cartaoSaldoValor: {
    color: cores.branco,
    fontSize: 31,
    fontWeight: "800",
  },
  olhoBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  cartaoSaldoSub: {
    color: "#F7F1E2",
    fontSize: 13,
    marginTop: 10,
  },
  resumoGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
  resumoCard: {
    flex: 1,
    marginTop: 0,
  },
  resumoLabel: {
    color: cores.cinza,
    fontSize: 13,
  },
  resumoValor: {
    color: cores.branco,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
  },
  resumoInfo: {
    color: cores.cinza,
    fontSize: 12,
    marginTop: 6,
  },
  atalhosGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 16,
  },
  atalho: {
    flex: 1,
    backgroundColor: "rgba(23,23,28,0.95)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
  },
  atalhoIcone: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(217,164,65,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  atalhoTexto: {
    color: cores.branco,
    marginTop: 10,
    fontWeight: "700",
    fontSize: 13,
  },
  mensagem: {
    color: cores.dourado2,
    marginTop: 14,
    fontWeight: "700",
  },
  abasLinha: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    marginBottom: 2,
    flexWrap: "wrap",
  },
  abaBtn: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  abaAtiva: {
    backgroundColor: cores.dourado,
    borderColor: cores.dourado,
  },
  abaTexto: {
    color: cores.branco,
    fontWeight: "700",
  },
  abaTextoAtivo: {
    color: "#111",
  },
  secaoTitulo: {
    color: cores.branco,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 10,
  },
  textoSecao: {
    color: cores.cinza,
    lineHeight: 21,
    fontSize: 14,
  },
  cartaoVisual: {
    borderRadius: 24,
    padding: 18,
    marginTop: 14,
  },
  cartaoVisualHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartaoBadge: {
    color: "#111",
    backgroundColor: cores.dourado2,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontWeight: "800",
    overflow: "hidden",
  },
  cartaoNumero: {
    color: cores.branco,
    fontSize: 24,
    letterSpacing: 2,
    fontWeight: "800",
    marginTop: 36,
  },
  cartaoRodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cartaoNome: {
    color: "#F1E7D1",
    fontWeight: "700",
  },
  linkBox: {
    borderRadius: 18,
    backgroundColor: cores.card2,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 14,
    marginTop: 14,
  },
  linkTitulo: {
    color: cores.branco,
    fontWeight: "700",
  },
  linkTexto: {
    color: cores.dourado2,
    marginTop: 8,
  },
  itemTransacao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  itemEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 10,
  },
  transacaoIcone: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitulo: {
    color: cores.branco,
    fontWeight: "700",
    fontSize: 14,
  },
  itemDescricao: {
    color: cores.cinza,
    fontSize: 13,
    marginTop: 3,
  },
  itemData: {
    color: cores.cinza,
    fontSize: 12,
    marginTop: 4,
  },
  itemValor: {
    fontWeight: "800",
    fontSize: 14,
  },
  listaInfo: {
    marginTop: 10,
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  infoTexto: {
    color: cores.branco,
    fontSize: 14,
  },
});