const express = require("express");
const app = express();
const port = 3100;

const games = ["fortnite", "CS:GO", "Grandi", "Mario Bros"];

function randomMinMax(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function listaGames(num) {
	return games[num];
}
app.get("/", (req, res) => {
	res.send(`<h1>${listaGames(randomMinMax(0, games.length))}</h1>`);
});

app.get("/games", (req, res) => {
	res.send(games);
});

app.get("/games/:id", (req, res) => {
	const id = req.params.id - 1;
	const game = games[id];
	res.send(game);
});

app.listen(port, () => {
	console.info(`O app está rodando em http://localhost:${port}/`);
});
