const express = require("express");
const cors = require('cors');
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config(); // Pastikan ini di baris paling atas!

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


const port = process.env.PORT || 3000;

app.post("/ucapan", async (req, res) => {
  const { name, greetings, date } = req.body;
  console.log("Data diterima:", req.body); // <--- Tambahkan ini

  try {
    await pool.query(
      "INSERT INTO greetings (name, greetings, created_date) VALUES (?, ?, ?)",
      [name, greetings, date]
    );
    res.status(201).send("Berhasil disimpan");
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan");
  }
});

app.get("/ucapan", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM greetings ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
