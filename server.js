const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config()

const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const PORT = 3000;
const dbUrl = process.env.MONGODB_DB_URL;

const Message = mongoose.model('Message',{ name : String, message : String})
io.on("connection", () =>{
  console.log("a user is connected")
 })

mongoose.connect(dbUrl , (err) => { 
  console.log('mongodb connected',err);
})

app.use(express.static(__dirname));

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

const server = http.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
