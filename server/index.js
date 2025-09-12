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
    const { userName, password } = req.body;
    const user = await knex("users").select("*").where("username", userName).first();

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
    password: passwordHash,
    preferences: `{"theme": "dark", "layout": "default"}`
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

//////////////////GET FUNCTIONS//////////////////////////
app.get("/user/:id", verifyToken, (req, res) => {
  knex("users")
    .select("user_id", "first_name", "last_name", "email", "username", "preferences")
    .where("users.user_id", "=", req.user.uid)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/username/:name", (req, res) => {
  knex("users").select("user_id")
    .where("username", req.params.name)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
})

app.get("/tasks", verifyToken, (req, res) => {
  knex("tasks")
    .join("mission", "tasks.mission_id", "mission.mission_id")
    .join("status", "tasks.status", "status.status_id")
    .join("users", "tasks.assignee", "users.user_id")
    .select(
      "tasks.task_id",
      "tasks.title",
      "tasks.description",
      "mission.mission_name as mission",
      "status.status as status",
      "tasks.due_date",
      "users.username as assignee")
    .whereNot('tasks.status', 5)
    .then((data) => res.status(200).json(data))
    .catch((err) => { console.log(err); res.status(400).json(err) });
});

app.get("/user/:id/tasks", verifyToken, (req, res) => {
  knex("tasks")
    .join("mission", "tasks.mission_id", "mission.mission_id")
    .join("status", "tasks.status", "status.status_id")
    .join("users", "tasks.assignee", "users.user_id")
    .select(
      "tasks.task_id",
      "tasks.title",
      "tasks.description",
      "mission.mission_name as mission",
      "status.status as status",
      "tasks.due_date",
      "users.username as assignee")
    .where("assignee", req.user.uid)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err))
})

app.get("/tasks/:id", verifyToken, (req, res) => {
  knex("tasks")
    .join("mission", "tasks.mission_id", "mission.mission_id")
    .join("status", "tasks.status", "status.status_id")
    .join("users", "tasks.assignee", "users.user_id")
    .select(
      "tasks.task_id",
      "tasks.title",
      "tasks.description",
      "mission.mission_name as mission",
      "status.status as status",
      "tasks.due_date",
      "users.username as assignee")
    .where("task_id", req.params.id)
    .whereNot('tasks.status', 5)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/status/:id", verifyToken, (req, res) => {
  knex("tasks")
    .join("mission", "tasks.mission_id", "mission.mission_id")
    .join("status", "tasks.status", "status.status_id")
    .join("users", "tasks.assignee", "users.user_id")
    .select(
      "tasks.task_id",
      "tasks.title",
      "tasks.description",
      "mission.mission_name as mission",
      "status.status as status",
      "tasks.due_date",
      "users.username as assignee")
    .where("status", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/mission", verifyToken, (req, res) => {
  console.log("called all missions")
  knex("mission")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/mission/:id", verifyToken, (req, res) => {
  console.log("called mission by ID")
  knex("mission")
    .select("*")
    .where("mission_id", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
})

app.get("/mission/:id/tasks", verifyToken, (req, res) => {
  console.log("called tasks by mission")
  knex("tasks")
    .select("*")
    .where("mission_id", req.params.id)
    .whereNot('tasks.status', 5)
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
    .select("role_name.role_name", "role_name.default_layout")
    .join("role_name", "role_list.role", "=", "role_name.role_name_id")
    .where("role", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get('/system/status', verifyToken, (req, res) => {
  knex("system_status")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
})


//////////////POST FUNCTIONS///////////////////////////
app.post("/tasks/add", verifyToken, async (req, res) => {
  const data = req.body;
  try {
    await knex('tasks').insert({ title: data.title, description: data.description, mission_id: data.mission_id, status: data.status, due_date: data.due_date });
    res.status(200).json({ message: "item saved" })
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ error: "Failed to save item" });
  }
});


app.post("/mission/add", verifyToken, async (req, res) => {
  const data = req.body;
  try {
    await knex('mission').insert({ mission_name: data.mission_name, systems: data.systems });
    res.status(200).json({ message: "item saved" })
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ error: "Failed to save item" });
  }
});


app.post("/history/add", verifyToken, async (req, res) => {
  const data = req.body;
  try {
    await knex('history').insert(data);
    res.status(200).json({ message: "item saved" })
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ error: "Failed to save item" });
  }
});



///////////////DELETE FUNCTIONS///////////////////////////
app.delete('/tasks/:id/delete', verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await knex('tasks').where('task_id', id).del();
    console.log('task deleted');
    res.status(200).json({ message: 'task deleted' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'task failed to delete' });
  }
})

app.delete('/mission/:id/delete', verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await knex('mission').where('mission_id', id).del();
    console.log('mission deleted');
    res.status(200).json({ message: 'mission deleted' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'mission failed to delete' });
  }
})

app.delete('/history/:id/delete', verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    await knex('history').where('history_id', id).del();
    console.log('history deleted');
    res.status(200).json({ message: 'history deleted' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'history failed to delete' });
  }
})



/////////////////////////PATCH FUNCTIONS////////////////////////////////
app.patch('/tasks/:id/patch', verifyToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    await knex('tasks').where('task_id', id)
      .update({ title: data.title, description: data.description, mission_id: data.mission_id, status: data.status, due_date: data.due_date, assignee: data.assignee });
    res.status(200).json({ message: 'task updated' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
})

app.patch('/tasks/:id/archive', verifyToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    await knex('tasks').where('task_id', id)
      .update({ status: data.status });
    res.status(200).json({ message: 'task updated' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
})

app.patch('/mission/:id/patch', verifyToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await knex('mission').where('mission_id', req.params.id).update({ mission_name: data.mission_name, systems: JSON.stringify(data.systems) });
    res.status(200).json({ message: 'mission updated' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to update mission' });
  }
})

app.patch('/history/:id/patch', verifyToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    await knex('history').where('history_id', id).update(data);
    res.status(200).json({ message: 'history updated' });
  } catch (err) {
    console.error('ERROR ', err);
    res.status(500).json({ error: 'Failed to update history' });
  }
})

app.patch("/user/:username", verifyToken, (req, res) => {
  console.log(req.body, req.user)
  knex("users")
    .update(req.body)
    .where("users.username", "=", req.params.username)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = app