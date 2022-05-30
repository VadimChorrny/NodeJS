const express = require("express");
const app = express();

const hostname = "localhost";
const port = 3000;

const database = require("./database");

// file system module to perform file operations
const fs = require("fs");

// For GET request
var data = JSON.parse(JSON.stringify(database));

var jsonData = `
    {
      "id": 100,
      "firstName": "TEST",
      "lastName": "TEST",
      "username": "TEST",
      "email": "admin@gmail.com",
      "password": "TEST",
      "avatar": "https://robohash.org/eaquequasincidunt.png?size=50x50&set=set1",
      "gender": "Genderfluid",
      "phone": "933-658-1213",
      "birthday": "1994-03-23",
      "status": true,
      "createdAt": 1609483221000,
      "modifiedAt": 1609483221000
    },`;

var jsonContent = JSON.parse(JSON.stringify(jsonData));

function createNewUser() {
  fs.appendFile("database.json", jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
}

function removeUser(){
  var removeUser = "TEST";
  var data = fs.readFileSync('database.json');
  var json = JSON.parse(data);
  var users = json.users;
  json.users = users.filter((user) => { return user.firstName !== removeUser });
  fs.writeFileSync('database.json', JSON.stringify(json, null, 2));
}

app.get("/api/users", (req, res) => {
  res.status(200).type("text").send(data);
});
app.post("/api/users", (req, res) => {
  res.status(200).type("text").send(createNewUser());
});
app.get("/api/contacts", (req, res) => {
  res.status(200).type("json").send("List of Contacts!");
});
app.post("/api/users", (req, res) => {
  res.status(200).type("text").send("Users created!");
});

app.listen(port, hostname, () => {
  console.log(`Server is listening ${hostname}:${port}`);
});
