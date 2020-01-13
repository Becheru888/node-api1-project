// implement your API here
const express = require("express");
const DB = require("./data/db");

const server = express();
server.use(express.json());

const port = 1000;

server.get("/users", (req, res) => {
  DB.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/user/:id", (req, res) => {

  const userId = req.params.id;

  DB.findById(userId).then(user => {
    if (Number(userId) === user.id) {
      res.status(200).json(user);
    }
  }).catch(error => {
      res.status(400).json({error: 'User not found'})
  });
});

server.post('/addUser', (req, res) => {
    const newUser = req.body
    DB.insert(newUser).then(data => {
      res.status(200).json(data)
    })
})

server.put('/editUser/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  DB.update(Number(userId), updatedUser).then(data => {
    res.status(200).json(data)
  }).catch(error => {
    res.status(400).json({error: 'Something went wrong'})
  })
})


server.delete('/delete/:id', (req, res) => {
  DB.remove(req.params.id)
  .then(data => {
    res.status(200).json(data)
  }).catch(error => {
    res.status(400).json({error: 'Something went wrong'})
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
