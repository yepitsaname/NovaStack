
Table users {
  user_id integer [primary key]
  username varchar
  email string
  password password
  role varchar
  created_at timestamp
}

Table tasks {
  task_id integer [primary key]
  title string
  description text
  mission_id integer
  status integer
  due_date datetime
  assignee integer
}

Table status {
  status_id integer [primary key]
  status string
}

Table mission {
  mission_id integer [primary key]
  mission_name string
  systems integer
}

Table role_list {
  role_id integer [primary key]
  user integer
  role integer
}

Table role_name {
  role_name_id integer [primary  key]
  role_name string
}

Table history {
  history_id integer
  task integer
  operation integer
  user integer
  date_time timestamp
}

Table operations {
  operation_id integer
  operation_name string
}

Table audit_log {
  audit_id integer [primary key]
  user integer
  action integer
  result integer
  date_time timestamp
}

Table audit_action {
  action_id integer [primary key]
  action_name string
}

Table audit_result {
  result_id integer [primary key]
  result_name string
}

Table system_status {
  system_id integer
  system_name string
}


Ref: users.user_id > tasks.assignee
Ref: status.status_id > tasks.status
Ref: mission.mission_id > tasks.mission_id
Ref: role_name.role_name > role_list.role
Ref: users.user_id > role_list.user
Ref: tasks.task_id > history.task
Ref: users.user_id > history.user
Ref: operations.operation_id > history.operation
Ref: users.user_id > audit_log.user
Ref: audit_action.action_id > audit_log.action
Ref: audit_result.result_id > audit_log.result
Ref: system_status.system_id > mission.systems