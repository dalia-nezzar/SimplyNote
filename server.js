const express = require("express");
const bodyParser = require("body-parser");
const kenx = require("knex");
const app = express();
const path = require("path");
require("dotenv").config();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

/*const db = kenx({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
  },
});*/

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: "postgres://default:Cl9gt8ZmhreT@ep-little-cake-71382927-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Route pour la page d'accueil
app.get("/", async (req, res) => {
  const result = await pool.query('SELECT * FROM todo');
  res.render("index", { todos: result.rows });
});

// Ajouter une tâche
app.post("/addTask", async (req, res) => {
  const { textTodo } = req.body;
  const result = await pool.query('INSERT INTO todo (task) VALUES ($1) RETURNING *', [textTodo]);
  res.redirect("/");
});

// Mettre à jour l'état d'une tâche
app.put("/moveTaskDone", async (req, res) => {
  const { name, id } = req.body;
  if (name === "todo") {
    const result = await pool.query('UPDATE todo SET status = 1 WHERE id = $1 RETURNING status', [id]);
    res.json(result.rows[0].status);
    res.redirect("/");
  } else {
    const result = await pool.query('UPDATE todo SET status = 0 WHERE id = $1 RETURNING status', [id]);
    res.json(result.rows[0].status);
    res.redirect("/");

  }
});

// Supprimer une tâche
app.post("/deleteTask", async (req, res) => {
  const { id } = req.body;
  const result = await pool.query('DELETE FROM todo WHERE id = $1', [id]);
  res.json({ message : "Tâche supprimée"});
  res.redirect("/");
});



app.listen(5432, () => {
  console.log("Serveur démarré sur le port 5432");
});