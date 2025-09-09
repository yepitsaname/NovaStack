const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const knex = require("knex")(require("./knexfile.js")["development"]);
const verifyToken = require("./utils/authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();


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

//user login and signup

app.post("/login", async (req, res) => {

  try {
    const { username, password } = req.body;
    const user = await knex("users").select("*").where("username", username).then((data) => res.json(data));

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign(
      { uid: user.user_id, userName: user.username },
      process.env.JWT_Secret,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) return res.status(500);

        return res.status(200).json({ token });
      }
    )
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
})


app.post('/signup', async (req, res) => {
  const { userName, firstName, lastName, password, email } = req.body;
  if (!userName || !password || !firstName || !lastName || !email) return res.status(500);

  const user = await knex('users').select("*").where("username", userName).first();
  console.log("User: ", user);
  if (user) {
    console.log("error creating user")
    return res.status(409);
  } else {
    console.log("received user information")
  };

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);


  const result = await knex("users").insert({
    username: userName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: passwordHash
  });


  if (!result) { console.log("could not insert user"); return res.status(500); } else {
    console.log('created new user')
  }

  const { insertedId } = result;

  jwt.sign({ uid: insertedId, userName, firstName, lastName, email }, process.env.JWT_Secret,
    { expiresIn: "1d" },
    (error, token) => {
      if (error) {
        console.log("Error generating jwt token: ", error);
        return res.status(500).send(error);
      }
      console.log("token created");
      return res.status(200).json({ token });
    })
})


app.get("/user/:id", verifyToken, (req, res) => {
  knex("users")
    .select("*")
    .where("users.user_id", "=", req.body.uid)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/tasks", verifyToken, (req, res) => {
  knex("tasks")
    .select("*")
    .from("tasks")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/tasks/:id", verifyToken, (req, res) => {
  knex("tasks")
    .select("*")
    .where("task_id", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/status/:id", verifyToken, (req, res) => {
  knex("tasks")
    .select("*")
    .where("status", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/mission", verifyToken, (req, res) => {
  knex("mission")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/mission/:id/tasks", verifyToken, (req, res) => {
  knex("tasks")
    .select("*")
    .where("mission_id", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

// app.get("/mission/:id/systems", (req, res) => { **FIX THIS LATER**
//   knex("mission")
//     .select("*")
//     .where("system_id", req.params.id)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.status(400).json(err));
// });

app.get("/history", verifyToken, (req, res) => {
  knex("history")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/history", verifyToken, (req, res) => {
  knex("history")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/roles/:id", verifyToken, (req, res) => {
  knex("role_list")
    .select("*")
    .where("role", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});







module.exports = app