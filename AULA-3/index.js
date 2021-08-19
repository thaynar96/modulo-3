const express = require("express");
const { reset } = require("nodemon");
const app = express();
const port = 3000;

app.use(express.json());
const filmes = ["Matrix", "Vingadores", "Velozes e Furiosos"];

app.get("/", (req, res) => res.send("Hello, Bluemer"));

app.get("/filmes", (req, res) => {
	res.send(filmes);
});

app.get("/filmes/:id", (req, res) => {
	const id = req.params.id - 1;
	const filme = filmes[id];

	if (!filme) {
		res.send("Filme não encontrado");
	}
	res.send(filme);
});

app.post("/filmes", (req, res) => {
	const filme = req.body.filme;
	const id = filmes.length;
	filmes.push(filme);
	res.send(`O filme adicionado foi ${filme} no id ${id}`);
});

app.put("/filmes/:id", (req, res) => {
	const id = req.params.id - 1;
	const filme = req.body.filme;
	filmes[id] = filme;
	res.send(`Filme atualizado para ${filme} com sucesso`);
});

app.delete("/filmes/:id", (req, res) => {
	const id = req.params.id - 1;
	delete filmes[id];
	res.send("filme excluido com sucesso");
});

app.listen(port, function () {
	console.log(`App rodando na porta http://localhost:${port}`);
});
