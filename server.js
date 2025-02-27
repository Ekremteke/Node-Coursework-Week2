const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser")
let changeID = 0;


const app = express();
const port = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }))

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");


});
app.get("/messages", function (request, response) {

  response.status(200).send({ messages })
});
app.get("/messages/search", (request, response) => {
  const term = request.query.term.toLocaleLowerCase();
  const filter = messages.filter(eachMessage => eachMessage.from.toLocaleLowerCase().includes(term) || eachMessage.text.toLocaleLowerCase().includes(term));
  response.status(200).send(filter);
});

app.get("/messages/:id", function (request, response) {
  const idToFind = Number(request.params.id);
  const message = messages.find((message) => message.id === idToFind);
  response.status(200).send({ message })
});

app.delete('/messages/:id', (request, response) => {
  const idToFind = +request.params.id
  messages = messages.filter(item => item.id !== idToFind)
  response.status(200).send(messages)

})

app.post("/messages", function (request, response) {
  console.log(request.body)
  const newMessage = request.body;
  messages.push(newMessage);
  response.status(201).send({ newMessage })
});


app.listen(port);
