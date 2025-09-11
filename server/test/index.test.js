const request = require('supertest');
const index = require('../index.js');

let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsInVzZXJOYW1lIjoidGVzdCIsImlhdCI6MTc1NzYwMzczNywiZXhwIjoxNzU3NjkwMTM3fQ.jU3xdaUJDV2no7J7Nx6Ssm5ArELhUe2vex-X9thjGQw";
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




// request(index)
//   .post("/signup")
//   .send({ userName: "test", firstName: "test", lastName: "test", password: "test", email: "test" })
//   .expect(200)
//   .end(function (err, res) {
//     if (err) { throw err }
//     else {
//       testToken = res.token;
//       console.log("Test user created")
//     }
//   })



request(index)
  .get("/user/2")
  .set("Authorization", testToken)
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got Test user")
    }
  })



request(index)
  .get("/tasks")
  .set("Authorization", testToken)
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
  .set("Authorization", testToken)
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
  .set("Authorization", testToken)
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
  .set("Authorization", testToken)
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got all missions")
    }
  })

request(index)
  .get("/mission/2")
  .set("Authorization", testToken)
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got Mission by id")
    }
  })

request(index)
  .get("/mission/1/tasks")
  .set("Authorization", testToken)
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got task by mission")
    }
  })


request(index)
  .get("/roles/1")
  .set("Authorization", testToken)
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got users by role")
    }
  })


request(index)
  .get("/history")
  .set("Authorization", testToken)
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Got history")
    }
  })


// request(app)
//   .post('/books')
//   .send({ title: 'Test Book', author: 'Test Author', cover: 'cover', genres: 'Some Genre', synopsis: 'best book ever' })
//   .expect(200)
//   .end(function (err, res) {
//     if (err) { throw err }
//     else {
//       console.log('Posted single book')
//     };
//   })

request(index)
  .post("/tasks/add")
  .set("Authorization", testToken)
  .send({ title: "Test Task", description: "Description", mission_id: 1, status: 1, due_date: "20201001" })
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Added task")
    }
  })

request(index)
  .post("/mission/add")
  .set("Authorization", testToken)
  .send({ mission_name: "Test Mission", systems: {} })
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Added mission")
    }
  })



// request(app)
//   .patch('/books/10')
//   .send({ title: 'New Title', cover: 'New Cover' })
//   .expect(200)
//   .expect('Content-Type', /json/)
//   .end(function (err, res) {
//     if (err) { throw err }
//     else {
//       console.log('Patched single book')
//     };
//   })

request(index)
  .patch("/tasks/2/patch")
  .set("Authorization", testToken)
  .send({ title: "Test Task", description: "Description again", mission_id: 1, status: 1, due_date: "20201001" })
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Edited task")
    }
  })

request(index)
  .patch("/mission/2/patch")
  .set("Authorization", testToken)
  .send({ mission_name: "Test2 Mission", systems: {} })
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Edited mission")
    }
  })


// // request(app)
// //   .delete('/books/11')
// //   .expect(200)
// //   .expect('Content-Type', /json/)
// //   .end(function (err, res) {
// //     if (err) { throw err }
// //     else {
// //       console.log('Book deleted')
// //     };
// //   })

request(index)
  .patch("/tasks/2/delete")
  .set("Authorization", testToken)
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Deleted task")
    }
  })

request(index)
  .post("/mission/2/delete")
  .set("Authorization", testToken)
  .send({ mission_name: "Test2 Mission", systems: {} })
  .expect(200)
  .end(function (err, res) {
    if (err) { throw err }
    else {
      console.log("Deleted mission")
    }
  })







