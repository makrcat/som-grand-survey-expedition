const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(express.static("public"));

app.get("/data", (req, res) => {
	res.json(JSON.parse(fs.readFileSync("data.json")));
});
app.post("/addmoney", (req, res) => {
	const { money } = req.query;
	if (!money) {
		return res.status(400).send("Missing money parameter");
	}
	let data = JSON.parse(fs.readFileSync("data.json"));
	data.money += parseInt(money);
	fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
	res.sendStatus(200);
});


app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});