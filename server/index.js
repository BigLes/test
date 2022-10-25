const express = require('express');
const bodyParser = require('body-parser');
const randomColor = require('randomcolor');
const app = express();
const port = 3001;

// Fake DB
let groups = [{
  id: 1,
  name: 'DC',
  color: '#0476f2',
}, {
  id: 2,
  name: 'Marvel',
  color: '#F0131E',
}];
let groupsId = 2;

let users = [{
  id: 1,
  name: 'Batman',
  groups: [1],
}, {
  id: 2,
  name: 'Superman',
  groups: [1],
}, {
  id: 3,
  name: 'Iron Man',
  groups: [2],
}, {
  id: 4,
  name: 'Hulk',
  groups: [2],
}, {
  id: 5,
  name: 'Wonder Woman',
  groups: [1],
}, {
  id: 6,
  name: 'Spider-Man',
  groups: [1],
}];
let usersId = 6;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});

// GET
app.get('/groups', (req, res) => {
  res.json(groups);
});
app.get('/users', (req, res) => {
  res.json(users);
});

// POST
app.post('/groups/:name', (req, res) => {
  const id = ++groupsId;
  const { name } = req.params;
  if (!name) {
    return res.status(400).send('Body is incorrect');
  }
  groups.push({ id, name, color: randomColor() });
  res.json({ id });
});
app.post('/users/:name/:group', (req, res) => {
  const id = ++usersId;
  const { name, group } = req.params;
  const groupNumber = parseInt(group, 10);
  if (!name || !group) {
    return res.status(400).send('Body is incorrect');
  }
  if (!groups.some(item => item.id === groupNumber)) {
    return res.status(403).send('No such group');
  }
  users.push({ id, name, groups: [groupNumber] });
  res.json({ id });
});

// DELETE
app.delete('/groups/:groupId', (req, res) => {
  const groupId = parseInt(req.params.groupId, 10);
  if (users.some(item => item.groups.includes(groupId)) || !groups.some(item => item.id === groupId)) {
    return res.status(403).send('Group is not empty');
  }
  groups = groups.filter(item => item.id !== groupId);
  res.json({ groupId });
});
app.delete('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (!users.some(item => item.id === userId)) {
    return res.status(403).send('No such user');
  }
  users = users.filter(item => item.id !== userId);
  res.json({ userId });
});

//PUT
app.delete('/users/:userId/:groupId/', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const groupId = parseInt(req.params.groupId, 10);

  const user = users.filter(item => item.id === userId)[0];

  if (!user) {
    return res.status(403).send('No such user');
  }

  if (user.groups.includes(groupId)) {
    // MODIFYING OBJECT (DON'T DO IT LIKE ME HE-HE-HE)
    user.groups = user.groups.filter(item => item !== groupId);
  } else {
    // AGAIN...
    user.groups = [...user.groups, groupId];
  }
  res.json({ userId });
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
