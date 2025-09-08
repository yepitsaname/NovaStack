const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const table = await knex.schema.hasTable("tasks");

    if (!table) {
      console.log("Setting up DB");
      await knex.migrate.latest();

      console.log("Seeding initial data");
      await knex.seed.run();
    } else {
      console.log("Database exists");
    }

    console.log("Database ready");

    app.listen(port, () => {
      console.log("Server Ready on port: ", port);
    });
  } catch (err) {
    console.error("Database setup failed: ", err);
  }
})();

app.get("/", (req, res) => {
  res.status(200).send("Application up and running");
});

app.get("/user/:id", (req, res) => {
  knex("users")
    .select("*")
    .where("users.user_id", "=", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/tasks", (req, res) => {
  knex("tasks")
    .select("*")
    .from("tasks")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/tasks/:id", (req, res) => {
  knex("tasks")
    .select("*")
    .where("task_id", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/status/:id", (req, res) => {
  knex("tasks")
    .select("*")
    .where("status", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/mission", (req, res) => {
  knex("mission")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/mission/:id/tasks", (req, res) => {
  knex("tasks")
    .select("*")
    .where("mission_id", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/mission/:id/systems", (req, res) => {
  knex("system_status")
    .select("*")
    .where("mission_id", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});
