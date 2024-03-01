const porta = 3003;

const express = require("express");
const app = express();
const bancoDeDados = require("./bancodedados");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/produtos", (req, res, next) => {
  res.send(bancoDeDados.getProdutos()); // O método send converte o objeto para json
});

app.get("/produtos/:id", (req, res, next) => {
  res.send(bancoDeDados.getProduto(req.params.id));
});

app.post("/produtos", (req, res, next) => {
  const produto = bancoDeDados.salvarProduto({
    nome: req.body.nome,
    preco: req.body.preco,
  });
  res.send(produto);
});

app.put("/produtos/:id", (req, res, next) => {
  const produto = bancoDeDados.salvarProduto({
    id: req.params.id,
    nome: req.body.nome,
    preco: req.body.preco,
  });
  res.send(produto);
});

app.delete("/produtos/:id", (req, res, next) => {
  console.log(req.params.id);
  bancoDeDados.excluirProduto(req.params.id);
});

app.listen(porta, () => {
  console.log(`Servidor executando na porta ${porta}.`);
});
