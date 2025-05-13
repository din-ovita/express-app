const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.post("/ucapan", async (req, res) => {
  const { nama, pesan } = req.body;
  await pool.query("INSERT INTO form (name, greetings) VALUES ($1, $2)", [nama, pesan]);
  res.status(201).send("Berhasil disimpan");
});

app.get("/ucapan", async (req, res) => {
  const result = await pool.query("SELECT * FROM form ORDER BY id DESC");
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
