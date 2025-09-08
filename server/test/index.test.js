const request = require('supertest');
const index = require('../index.js');

// request(index)
//   .get("/")
//   .expect('Content-Type', /json/)
//   .expect(200)
//   .end(function (err, res) {
//     if (err) { throw err }
//     else {
//       console.log('Got baseline')
//     }
//   })

request(index)
  .get("/user/1")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got single user")
    }
  })

request(index)
  .get("/tasks")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got all tasks")
    }
  })

request(index)
  .get("/tasks/1")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got single tasks")
    }
  })

request(index)
  .get("/status/1")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got task by status")
    }
  })

request(index)
  .get("/mission")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got all missions")
    }
  })

request(index)
  .get("/mission/1/tasks")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got task by mission")
    }
  })

request(index)
  .get("/history")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got history")
    }
  })

request(index)
  .get("/roles/1")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got users by role")
    }
  })

