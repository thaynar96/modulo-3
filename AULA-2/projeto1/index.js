const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const filmes = [
	{
		id: 1,
		nome: "Caçador de curioso",
		imagemUrl:
			"https://thumbs.dreamstime.com/b/ca%C3%A7ador-maduro-que-visa-algo-com-uma-arma-43007983.jpg",
	},
	{
		id: 2,
		nome: "O Sangue do crepusculo",
		imagemUrl:
			"http://4.bp.blogspot.com/_L0ljW-xbcA0/TT3UOomsFFI/AAAAAAAAAEY/8ugtAA1SuIQ/s1600/amanecer-crepusculo-bella.jpg",
	},
	{
		id: 3,
		nome: "Bem vindo a Notre Dame",
		imagemUrl:
			"https://www.gndi.com.br/documents/20195/3200358/6.png/a8c9c0a0-0bff-4e39-93c4-bcf31b9c3b65?t=1463669686399",
	},
	{
		id: 4,
		nome: "A Era do gelo",
		imagemUrl:
			"https://br.web.img3.acsta.net/medias/nmedia/18/90/29/80/20109874.jpg",
	},
	{
		id: 5,
		nome: "Nascidos para morrer",
		imagemUrl:
			"https://br.web.img3.acsta.net/medias/nmedia/18/92/58/41/20254527.jpg",
	},
];

const getFilmesValidos = () => filmes.filter(Boolean);
const getFilmeById = (id) =>
	getFilmesValidos().find((filme) => filme.id === id);
const getIndexByFilme = (id) =>
	getFilmesValidos().findIndex((filme) => filme.id === id);

app.get("/", (req, res) => {
	res.send("Boa sorte!");
});

app.get("/filmes", (req, res) => {
	res.send(getFilmesValidos());
});

app.get("/filmes/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const filme = getFilmeById(id);
	if (!filme) {
		res.send("Filme não Encontrado");
	}
	res.send(filme);
});

app.post("/filmes", (req, res) => {
	const filme = req.body;

	if (!filme || !filme.nome || !filme.imagemUrl) {
		res.status(400).send({
			message: "Filme invalido. Tente novamente mais tarde",
		});
		return;
	}

	const ultimoFilme = filmes[filmes.length - 1];

	if (filmes.length) {
		filme.id = ultimoFilme.id + 1;
		filmes.push(filme);
	} else {
		filme.id = 1;
		filmes.push(filme);
	}

	res.send(`Filme adicionado com sucesso: ${filme.nome}. 
  O ID do filme é ${filme.id}`);
});

app.put("/filmes/:id", (req, res) => {
	const id = +req.params.id - 1;

	const filmeIndex = getIndexByFilme(id);

	if (filmeIndex < 0) {
		res.status(404).send({
			message: "O filme nao foi encontrado, tente novamente.",
		});
		return;
	}

	const novoFilme = req.body;

	if (!Object.keys(novoFilme).length) {
		res.status(400).send({
			message: "O body esta vazio!",
		});
		return;
	}

	if (!novoFilme || !novoFilme.nome || !novoFilme.imagemUrl) {
		res.status(400).send({
			message: "filme invalido, tente novamente.",
		});
		return;
	}

	const filme = getFilmeById(id);

	console.log(filmeIndex);
	filmes[filmeIndex] = {
		...filme,
		...novoFilme,
	};

	res.send(filmes[filmeIndex]);
});

app.delete("/filmes/:id", (req, res) => {
	const id = +req.params.id;

	const filmeIndex = getIndexByFilme(id);

	if (filmeIndex < 0) {
		res.status(404).send({
			message: "Filme nao encontrado, tente novamente.",
		});
		return;
	}

	filmes.splice(filmeIndex, 1);
	res.send({
		message: "Filme removido com sucesso",
	});
});

app.listen(port, function () {
	console.info(`App rodando na porta http://localhost:${port}/`);
});
