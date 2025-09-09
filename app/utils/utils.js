const backend = "http://localhost:3000";

export async function GetUser(id, token) {
  return fetch(`${backend}/user/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

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

export async function GetAllTasks(token) {
  return fetch(`${backend}/tasks`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

export async function GetTaskById(id, token) {
  return fetch(`${backend}/tasks/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

export async function GetTaskByStatus(id, token) {
  return fetch(`${backend}/status/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

export async function GetAllMissions(token) {
  return fetch(`${backend}/missions`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

export async function GetTaskByMission(id, token) {
  return fetch(`${backend}/mission/${id}/tasks`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

// export function GetSystemStatus(id) {
//   return fetch(`${backend}/mission/${id}/systems`).then((res) => res.json());
// };

export function GetAllHistory(token) {
  return fetch(`${backend}/history`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};

export function GetUsersByRole(id, token) {
  return fetch(`${backend}/roles/${id}`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
};