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
    headers: { Authorization: token },
  }).then((res) => res.json());
}

/**
 *
 * @param {string} username Must be a valid Username.
 * @param {token} token Must be valid. Query will take the userID off of the token
 * @returns returns single item array with user information
 */
export async function UpdateUser(username, token, payload) {
  return fetch(`${backend}/user/${username}`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  }).then((res) => res.status)
    .catch(err => err);
};

export async function UpdatePassword(username, token, payload) {
  return fetch(`${backend}/user/${username}/reset_pass`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then((res) => res.status)
    .catch(err => err);
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
      password: password,
    }),
  }).then((res) => res.json());
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
export async function UserSignup(
  userName,
  password,
  firstName,
  lastName,
  email
) {
  return fetch(`${backend}/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      userName: userName,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
    }),
  }).then((res) => res.json());
}

/**
 *
 * @param {string} username username
 * @returns returns user ID of given username
 */
export async function CheckUsername(username) {
  const nameExists = await fetch(`${backend}/username/${username}`).then(
    (res) => res.json()
  );
  console.log(nameExists);
  let check = nameExists.length > 0 ? false : true;
  return check;
}

/**
 *
 * @param {token} token
 * @returns Return array of user IDs and names
 */
export async function GetAllUsers(token) {
  return fetch(`${backend}/all/users`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json())
}
/**
 *
 * @param {token} token Context token provided upon login
 * @returns Tasks: task_id, title, description, mission_id, mission, status_id, status, due_date, assignee_id, assignee
 */
export async function GetAllTasks(token) {
  return fetch(`${backend}/tasks`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

/**
 *
 * @param {integer} id ID of task being queried
 * @param {Token} token Context token provided upon login
 * @returns Tasks: task_id, title, description, mission_id, mission, status_id, status, due_date, assignee_id, assignee
 */
export async function GetTaskById(id, token) {
  return fetch(`${backend}/tasks/${id}`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json());
}

/**
 *
 * @param {integer} id ID of status being queried
 * @param {Token} token Context token provided upon login
 * @returns Tasks: task_id, title, description, mission_id, mission, status_id, status, due_date, assignee_id, assignee
 */
export async function GetTaskByStatus(id, token) {
  return fetch(`${backend}/status/${id}`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json());
}

/**
 *
 * @param {Token} token Context token provided upon login
 * @returns returns array
 */
export async function GetAllMissions(token) {
  return fetch(`${backend}/mission`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json());
}

/**
 *
 * @param {Token} token
 * @returns returns array of status information
 */
export async function GetAllStatus(token) {
  return fetch(`${backend}/status`, {
    method: "GET",
    headers: { Authorization: token }
  }).then((res) => res.json());
}
/**
 *
 * @param {integer} id ID of the mission being queried
 * @param {Token} token context token provided upon login
 * @returns returns mission name and list of systems
 */
export async function GetMissionByID(id, token) {
  return fetch(`${backend}/mission/${id}`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json());
}

export async function GetSystems(token) {
  return fetch("http://localhost:3000/system/status", {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json())
}

/**
 *
 * @param {Token} token
 * @returns Tasks: task_id, title, description, mission_id, mission, status_id, status, due_date, assignee_id, assignee
 */
export async function GetTaskByUser(token) {
  return fetch(`${backend}/user/tasks`, {
    method: "GET",
    headers: { Authorization: token },
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
    headers: { Authorization: token },
  }).then((res) => res.json());
}

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
    headers: { Authorization: token },
  }).then((res) => res.json());
}

/**
 *
 * @param {integer} id ID of role being queried
 * @param {Token} token Context token provided upon login
 * @returns returns array
 */
export async function GetUsersByRole(id, token) {
  return fetch(`${backend}/roles/${id}`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json());
}

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
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      mission_id: data.mission_id,
      status: data.status,
      due_date: data.due_date,
      assignee: data.assignee
    }),
  });
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
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mission_name: data.mission_name,
      systems: data.systems,
    }),
  });
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
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      mission_id: data.mission_id,
      status: data.status,
      due_date: data.due_date,
      assignee: data.assignee
    }),
  });
}

/**
 *
 * @param {Token} token Context token provided upon login
 * @param {integer} taskID ID of task being altered
 * @returns returns fetch data
 */
export async function ArchivedTask(token, data) {
  console.log(data.status);
  return fetch(`${backend}/tasks/${data.task_id}/archive`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: 5,
    }),
  });
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
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mission_name: data.mission_name,
      systems: data.systems,
    }),
  });
}

/**
 *
 * @param {token} token Context token provided upon login
 * @param {integer} taskID ID of task being deleted
 */
export async function DeleteTask(token, taskID) {
  return fetch(`${backend}/tasks/${taskID}/delete`, {
    method: "DELETE",
    headers: { Authorization: token },
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
    headers: { Authorization: token },
  }).then((res) => res.json());
}



//Conversion functions:
export async function ConvertFieldsToID(token, data) {
  const missionId = await fetch(`${backend}/`)
}

//REPORT functions
/**
 *
 * @param {token} token
 * @returns array with multiple entries: report_id, user_id, username, system, system_name, title, classification, opscap, syscap, short_description, long_description, start, stop, impact, fix_action, cause
 */
export async function GetAllReports(token) {
  return fetch(`${backend}/all/reports`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json())
}

/**
 *
 * @param {token} token user token
 * @param {integer} id ID of requested report
 * @returns array with single entry: report_id, user_id, username, system, system_name, title, classification, opscap, syscap, short_description, long_description, start, stop, impact, fix_action, cause
 */
export async function GetReportById(token, id) {
  return fetch(`${backend}/reports/report/${id}`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json())
}

/**
 *
 * @param {token} token
 * @param {integer} userId ID of user who wrote the reports
 * @returns array with multiple entries: report_id, user_id, username, system, system_name, title, classification, opscap, syscap, short_description, long_description, start, stop, impact, fix_action, cause
 */
export async function GetReportByUser(token, userId) {
  return fetch(`${backend}/reports/user/${userId}`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json())
}

/**
 *
 * @param {token} token
 * @param {integer} systemId ID of system associated with the report
 * @returns array with multiple entries: report_id, user_id, username, system, system_name, title, classification, opscap, syscap, short_description, long_description, start, stop, impact, fix_action, cause
 */
export async function GetReportBySystem(token, systemId) {
  return fetch(`${backend}/reports/system/${systemId}`, {
    method: "GET",
    headers: { Authorization: token },
  }).then((res) => res.json())
}

/**
 *
 * @param {token} token
 * @param {object{user_id, system, title, classification, opscap, syscap, short_description, long_description, start, stop, impact, fix_action, cause}} data
 * @returns Success/fail codes
 */
export async function AddReport(token, data) {
  return fetch(`${backend}/reports/add`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: data.user_id,
      system: data.system,
      title: data.title,
      classification: data.classification,
      opscap: data.opscap,
      syscap: data.syscap,
      short_description: data.short_description,
      long_description: data.long_description,
      start: data.start,
      stop: data.stop,
      impact: data.impact,
      fix_action: data.fix_action,
      cause: data.cause
    })
  }).then((res) => res.json())
}

/**
 *
 * @param {token} token user token
 * @param {integer} id ID of report being updated
 * @param {object{user_id, system, title, classification, opscap, syscap, short_description, long_description, start, stop, impact, fix_action, cause}} data } data
 * @returns
 */
export async function EditReport(token, id, data) {
  return fetch(`${backend}/reports/report/${id}/patch`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: data.user_id,
      system: data.system,
      title: data.title,
      classification: data.classification,
      opscap: data.opscap,
      syscap: data.syscap,
      short_description: data.short_description,
      long_description: data.long_description,
      start: data.start,
      stop: data.stop,
      impact: data.impact,
      fix_action: data.fix_action,
      cause: data.cause
    })
  }).then((res) => res.json())
}