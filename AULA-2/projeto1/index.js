const express = require("express");
const app = express();
const port = 3500;

const filmes = ["Matrix", "Vingadores", "Velozes e Furiosos"];

app.get("/", (req, res) => {
	res.send("Bem vindos amiges.");
});

app.get("/filmes", (req, res) => {
	res.send(filmes);
});

app.get("/filmes/:id", (req, res) => {
	const id = req.params.id - 1;
	const filme = filmes[id];
	res.send(filme);
});

app.listen(port, () => {
	console.info(`O app está rodando em http://localhost:${port}/`);
});
