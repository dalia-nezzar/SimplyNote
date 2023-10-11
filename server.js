const express = require("express");
const bodyParser = require("body-parser");
const kenx = require("knex");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

const db = kenx({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "YOURUSER",
    password: "YOURPASSWORD",
    database: "YOURDATABASE"
  },
  debug: true,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Route pour la page d'accueil
app.get("/", (req, res) => {
  db.select("*")
    .from("todo")
    .then(data => {
      res.render("index", { todos: data });
    })
    .catch(err => res.status(400).json(err));
});

// Créer une nouvelle tâche
app.post("/addTask", (req, res) => {
  const { textTodo } = req.body;
  db("todo")
    .insert({ task: textTodo })
    .returning("*")
    .then(task => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(400).json({ message: "Impossible de créer une nouvelle tâche" });
    });
});

// Mettre à jour l'état d'une tâche
app.put("/moveTaskDone", (req, res) => {
  const { name, id } = req.body;
  if (name === "todo") {
    db("todo")
      .where("id", "=", id)
      .update("status", 1)
      .returning("status")
      .then(todo => {
        res.json(todo[0]);
      });
  } else {
    db("todo")
      .where("id", "=", id)
      .update("status", 0)
      .returning("status")
      .then(todo => {
        res.json(todo[0]);
      });
  }
});

// Supprimer une tâche
app.post("/deleteTask", (req, res) => {
  const { id } = req.body;
  db("todo")
    .where("id", "=", id)
    .del()
    .then(() => {
      res.json({ message: "Tâche supprimée" });
    })
    .catch(err => res.status(400).json(err));
});

app.listen(8080, () => {
  console.log("Serveur démarré sur le port 8080");
});
