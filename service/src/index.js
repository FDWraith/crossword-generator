const CrosswordService = require("./CrosswordService");
const express = require("express");
const app = express();
const port = 3500;

app.use(express.json());

function generateCrosswords(req, res) {
    const words = req.body;
    res.send(CrosswordService.default.generate(words));
}

app.post("/generate", generateCrosswords);

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});
