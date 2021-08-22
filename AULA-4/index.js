const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); //  reconhecer o objeto pedido como um objeto JSON

const carro = {
	modelo: ["onix", "uno", "toro"],
	tipoCarro: ["SUV", "Sedan", "Hatch"],
	combustivel: ["alcool", "gasolina", "flex", "diesel"],
	marca: ["chevrolet", "fiat", "citroen"],
	anoCarro: [1970, 2005, 2015],
};

app.get("/", (req, res) => {
	res.send(`Bem vindo a nossa concessionária`);
});

app.get("/carros", (req, res) => {
	res.send(carro);
});

app.get("/modelo/:id", (req, res) => {
	const modelo = req.params.id - 1;
	const car = carro.modelo[modelo];
	res.send(car);
});

app.get("/tipocarro/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = carro.tipoCarro[id];
	res.send(car);
});
app.get("/combustivel/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = carro.combustivel[id];
	res.send(car);
});

app.get("/marca/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = carro.marca[id];
	res.send(car);
});

app.get("/anocarro/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = carro.anoCarro[id];
	res.send(car);
});
// adicionanddo com POST
app.post("/carros", (req, res) => {
	const modelo = req.body.modelo;
	const tipoCarro = req.body.tipoCarro;
	const combustivel = req.body.combustivel;
	const marca = req.body.marca;
	const anoCarro = req.body.anoCarro;
	carro.tipoCarro.push(tipoCarro);
	carro.combustivel.push(combustivel);
	carro.modelo.push(modelo);
	carro.marca.push(marca);
	carro.anoCarro.push(anoCarro);

	if (tipoCarro == null) {
		carro.tipoCarro.pop();
	}
	if (combustivel == null) {
		carro.combustivel.pop();
	}
	if (modelo == null) {
		carro.modelo.pop();
	}
	if (marca == null) {
		carro.marca.pop();
	}
	if (anoCarro == null) {
		carro.anoCarro.pop();
	}
	res.send(`As informações do carro foram cadastradas com sucesso`);
});
// atualizando com PUT
app.put("/marca/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = req.body.marca;
	const old = carro.marca[id];
	carro.marca[id] = car;
	res.send(car);
});

app.put("/modelo/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = req.body.modelo;
	const old = carro.modelo[id];
	carro.modelo[id] = car;
	res.send(car);
});

app.put("/anocarro/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = req.body.anoCarro;
	const old = carro.anoCarro[id];
	carro.anoCarro[id] = car;
	res.send(car);
});

app.put("/combustivel/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = req.body.combustivel;
	const old = carro.combustivel[id];
	carro.combustivel[id] = car;
	res.send(car);
});

app.put("/tipocarro/:id", (req, res) => {
	const id = req.params.id - 1;
	const car = req.body.tipoCarro;
	const old = carro.tipoCarro[id];
	carro.tipoCarro[id] = car;
	res.send(car);
});
// deletando

app.delete("/modelo/:id", (req, res) => {
	const id = req.params.id - 1;
	delete carro.modelo[id];
	res.send("Modelo excluído com sucesso");
});

app.delete("/marca/:id", (req, res) => {
	const id = req.params.id - 1;
	delete carro.marca[id];
	res.send("Marca excluída com sucesso");
});
app.delete("/anocarro/:id", (req, res) => {
	const id = req.params.id - 1;
	delete carro.anoCarro[id];
	res.send("Modelo excluído com sucesso");
});
app.delete("/tipocarro/:id", (req, res) => {
	const id = req.params.id - 1;
	delete carro.tipoCarro[id];
	res.send("Modelo excluído com sucesso");
});

// Criar um Endpoint para cada lista e CRUD respectivamente
//
app.listen(port, () => {
	console.info(`O app está rodando em http://localhost:${port}/`);
});
