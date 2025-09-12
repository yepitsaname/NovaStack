const backend = "http://localhost:3000";

/**
 *
 * @param {integer} id User ID. Any number can be passed as long as a valid token is present
 * @param {token} token Must be valid. Query will take the userID off of the token
 * @returns returns single item array with user information
 */
export async function GetUser(id, token) {
  return fetch(`${backend}/user/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

/**
 *
 * @param {string} username Username
 * @param {password} password Password
 * @returns returns token
 */
export async function UserLogin(username, password) {
  return fetch(`${backend}/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      userName: username,
      password: password
    })
  })
    .then((res) => res.json());
}

/**
 *
 * @param {string} userName Username, no spaces
 * @param {password} password Password, no spaces
 * @param {string} firstName User's first name
 * @param {string} lastName User's last name
 * @param {string} email User's email
 * @returns returns Token
 */
export async function UserSignup(userName, password, firstName, lastName, email) {
  return fetch(`${backend}/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    })
  })
    .then((res) => res.json());
}

export async function CheckUsername(username) {
  const nameExists = await fetch(`${backend}/username/${username}`).then((res) => res.json());
  console.log(nameExists);
  let check = nameExists.length > 0 ? false : true;
  return check;
}
/**
 *
 * @param {token} token Context token provided upon login
 * @returns Tasks: task_id, title, description, mission, status, due_date, assignee
 */
export async function GetAllTasks(token) {
  return fetch(`${backend}/tasks`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

/**
 *
 * @param {integer} id ID of task being queried
 * @param {Token} token Context token provided upon login
 * @returns Tasks: task_id, title, description, mission, status, due_date, assignee
 */
export async function GetTaskById(id, token) {
  return fetch(`${backend}/tasks/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

/**
 *
 * @param {integer} id ID of status being queried
 * @param {Token} token Context token provided upon login
 * @returns Tasks: task_id, title, description, mission, status, due_date, assignee
 */
export async function GetTaskByStatus(id, token) {
  return fetch(`${backend}/status/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

/**
 *
 * @param {Token} token Context token provided upon login
 * @returns returns array
 */
export async function GetAllMissions(token) {
  return fetch(`${backend}/mission`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

/**
 *
 * @param {integer} id ID of the mission being queried
 * @param {Token} token context token provided upon login
 * @returns returns mission name and list of systems
 */
export async function GetMissionByID(id, token) {
  return fetch(`${backend}/mission/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json())
}

/**
 *
 * @param {Token} token
 * @returns Tasks: task_id, title, description, mission, status, due_date, assignee
 */
export async function GetTaskByUser(token) {
  return fetch(`${backend}/user/tasks`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());

}
/**
 *
 * @param {integer} id ID of mission being queried
 * @param {Token} token Context token provided upon login
 * @returns returns array
 */
export async function GetTaskByMission(id, token) {
  return fetch(`${backend}/mission/${id}/tasks`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

// export function GetSystemStatus(id) {
//   return fetch(`${backend}/mission/${id}/systems`).then((res) => res.json());
// };

/**
 *
 * @param {Token} token Context token provided upon login
 * @returns returns array
 */
export async function GetAllHistory(token) {
  return fetch(`${backend}/history`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

/**
 *
 * @param {integer} id ID of role being queried
 * @param {Token} token Context token provided upon login
 * @returns returns array
 */
export async function GetUsersByRole(id, token) {
  return fetch(`${backend}/roles/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

//POST functions
/**
 *
 * @param {Token} token Context token provided upon login
 * @param {Object} data title: string, description: text, mission_id: integer, status: integer, due_date: date/time
 * @returns returns fetch data
 */
export async function AddTask(token, data) {
  return fetch(`${backend}/tasks/add`, {
    method: "POST",
    headers: { Authorization: token },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      mission_id: data.mission_id,
      status: data.status,
      due_date: data.due_date
    })
  })
}

/**
 *
 * @param {Token} token Context token provided upon login
 * @param {Object} data mission_name: string, systems: integer
 * @returns returns fetch data
 */
export async function AddMission(token, data) {
  return fetch(`${backend}/tasks/add`, {
    method: "POST",
    headers: { Authorization: token },
    body: JSON.stringify({
      mission_name: data.mission_name,
      systems: data.systems
    })
  })
}

/**
 *
 * @param {Token} token Context token provided upon login
 * @param {integer} taskID ID of task being altered
 * @param {Object} data title: string, description: text, mission_id: integer, status: integer, due_date: date/time
 * @returns returns fetch data
 */
export async function EditTask(token, taskID, data) {
  return fetch(`${backend}/tasks/${taskID}/patch`, {
    method: "PATCH",
    headers: { Authorization: token },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      mission_id: data.mission_id,
      status: data.status,
      due_date: data.due_date
    })
  })
}

/**
 *
 * @param {Token} token Context token provided upon login
 * @param {integer} taskID ID of task being altered
 * @returns returns fetch data
 */
export async function ArchievedTask(token, data) {
  console.log(data.status)
  return fetch(`${backend}/tasks/${data.task_id}/archive`, {
    method: "PATCH",
    headers: { Authorization: token },
    body: JSON.stringify({
      status: 5
    })
  })
}

/**
 *
 * @param {Token} token Context token provided upon login
 * @param {integer} missionID ID of mission being altered
 * @param {Object} data mission_name: string, systems: integer
 * @returns returns fetch data
 */
export async function EditMission(token, missionID, data) {
  return fetch(`${backend}/mission/${missionID}/patch`, {
    method: "PATCH",
    headers: { Authorization: token },
    body: JSON.stringify({
      mission_name: data.mission_name,
      systems: data.systems
    })
  })
}

/**
 *
 * @param {token} token Context token provided upon login
 * @param {integer} taskID ID of task being deleted
 */
export async function DeleteTask(token, taskID) {
  return fetch(`${backend}/tasks/${taskID}/delete`, {
    method: "DELETE",
    headers: { Authorization: token }
  }).then((res) => res.json());
}

/**
 *
 * @param {token} token Context token provided upon login
 * @param {integer} missionID ID of task being deleted
 */
export async function DeleteMission(token, missionID) {
  return fetch(`${backend}/mission/${missionID}/delete`, {
    method: "DELETE",
    headers: { Authorization: token }
  }).then((res) => res.json());
}

