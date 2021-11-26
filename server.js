const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const PORT = 3000;
const dbUrl = 'mongodb+srv://petudeveloper:petujesusmazo@realtimechat.kkivb.mongodb.net/chatapp?retryWrites=true&w=majority';

const Message = mongoose.model('Message',{ name : String, message : String})

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
    res.sendStatus(200);
  })
})
const server = app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
