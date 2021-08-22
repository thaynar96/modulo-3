const express = require("express");
const app = express();
const port = 3100;
app.use(express.json());
const games = [
	{
		id: 1,
		nome: "Fortnite",
		imagemUrl:
			"https://s2.glbimg.com/OYTEmu7x1Dz3-RegZiqD7EGyrS4=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/k/7/YiF45ST2inQDIxlDEc4w/en-14br-social-subscriptions-newsheader-1920x1080-616872430.jpg",
	},
	{
		id: 2,
		nome: "The Last Of Us",
		imagemUrl:
			"https://s2.glbimg.com/dlIj7buHFmigYQMgZdd3ubMgRlY=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/v/J/A7wxsCS9Cg23fDUW4Ueg/the-last-of-us-remastered-screenshot-full-hd-joel-e-ellie.jpg",
	},
	{
		id: 3,
		nome: "The Sims 4",
		imagemUrl:
			"https://media.contentapi.ea.com/content/dam/gin/images/2017/01/the-sims-4-keyart.jpg.adapt.crop1x1.767w.jpg",
	},
	{
		id: 4,
		nome: "CS:GO",
		imagemUrl:
			"https://s2.glbimg.com/btDsdKAb7R9NsomF5cvsF8IIBwg=/0x0:795x597/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/r/D/0my8teTCWaRrTLpQfNZg/7.jpg",
	},
];

// utilizando o método de array filter para filtrar apenas o que é apenas true
const getGamesValidos = () => games.filter(Boolean);
const getGameById = (id) => getGamesValidos().find((game) => game.id === id);
const getIndexByGame = (id) =>
	getGamesValidos().findIndex((game) => game.id === id);

function randomMinMax(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function listaGames(num) {
	return games[num];
}
app.get("/", (req, res) => {
	res.send(
		`<h1>${JSON.stringify(listaGames(randomMinMax(0, games.length)))}</h1>`
	);
});

app.get("/games", (req, res) => {
	res.send(getGamesValidos());
});

app.get("/games/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const game = getGameById(id);
	if (!game) {
		res.send("Não há um jogo para o id informado");
	}
	res.send(game);
});

// adicionando com POST
app.post("/games", (req, res) => {
	const game = req.body;
	if (!game || !game.nome || !game.imagemUrl) {
		res.status(400).send({
			message: "Jogo inválido.Tente novamente!",
		});
		return;
	}
	const ultimoGame = games[games.length - 1];

	if (games.length) {
		game.id = ultimoGame.id + 1;
		games.push(game);
	} else {
		game.id = 1;
		games.push(game);
	}
	res.send(
		`Você adicionou ${game.nome} na lista de games e o id dele é ${game.id} `
	);
});
// atualizando com put
app.put("/games/:id", (req, res) => {
	const id = +req.params.id - 1;
	const gameIndex = getIndexByGame(id);
	if (gameIndex < 0) {
		res.status(404).send({
			message: "O Jogo não foi encontrado. Tente novamente mais tarde",
		});
		return;
	}
	const novoGame = req.body;

	if (!Object.keys(novoGame).length) {
		res.status(400).send({
			message: "O body está vazio",
		});
		return;
	}

	if (!novoGame || !novoGame.nome || !novoGame.imagemUrl) {
		res,
			status(400).send({
				message: "Jogo inválido, tente novamente mais tarde.",
			});
		return;
	}

	const game = getGameById(id);
	games[gameIndex] = {
		...game,
		...novoGame,
	};

	res.send(games[gameIndex]);
});
// deletando com splice
app.delete("/games/:id", (req, res) => {
	const id = +req.params.id;
	const gameIndex = getIndexByGame(id);
	if (gameIndex < 0) {
		res.status(404).send({
			message: "Jogo não encontrado, tente novamente",
		});
		return;
	}
	games.splice(gameIndex, 1);
	res.send({
		message: "Filme removido com sucesso",
	});
});

app.listen(port, () => {
	console.info(`O app está rodando em http://localhost:${port}/`);
});
