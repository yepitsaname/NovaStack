const backend = "http://localhost:3000";

export function GetUser(id) {
  return fetch(`${backend}/user/${id}`).then((res) => res.json());
};

export function GetAllTasks() {
  return fetch(`${backend}/tasks`).then((res) => res.json());
};

export function GetTaskById(id) {
  return fetch(`${backend}/tasks/${id}`).then((res) => res.json());
};

export function GetTaskByStatus(id) {
  return fetch(`${backend}/status/${id}`).then((res) => res.json());
};

export function GetAllMissions() {
  return fetch(`${backend}/missions`).then((res) => res.json());
};

export function GetTaskByMission(id) {
  return fetch(`${backend}/mission/${id}/tasks`).then((res) => res.json());
};

// export function GetSystemStatus(id) {
//   return fetch(`${backend}/mission/${id}/systems`).then((res) => res.json());
// };

export function GetAllHistory() {
  return fetch(`${backend}/history`).then((res) => res.json());
};

export function GetUsersByRole(id) {
  return fetch(`${backend}/roles/${id}`).then((res) => res.json());
};