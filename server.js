const express = require("express");
const app = express();

app.use(express.json());

let games = [];

app.get("/games", (req, res) => {
  const gametitle = games.reduce((acc, game, index) => {
    acc[index] = game;
    return acc;
  }, {});

  res.json({ games: gametitle });
});

app.get("/game/:id", (req, res) => {
  res.json({ game: games[req.params.id] });
});

app.post("/game", (req, res) => {
  games.push(req.body.title);
  res.json({ message: `${req.body.title} berhasil ditambahkan!`, game: games });
});

app.put("/game", (req, res) => {
  const { id, title } = req.body;
  games[id] = title;
  res.json({ message: "Games berhasil diperbarui!", games });
});

app.delete("/game/:id", (req, res) => {
  let game = games.splice(req.params.id, 1);
  res.json({ message: `Game ${game} berhasil dihapus!` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
