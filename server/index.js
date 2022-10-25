const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

// Fake DB
let groups = [{
  id: 1,
  name: 'DC',
}, {
  id: 2,
  name: 'Marvel',
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('access-control-allow-origin', 'http://localhost:3000');
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
app.post('/groups', (req, res) => {
  const id = ++groupsId;
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Body is incorrect');
  }
  groups.push({ id, name });
  res.json({ id });
});
app.post('/users', (req, res) => {
  const id = ++usersId;
  const { name, group } = req.body;
  if (!name || !group) {
    return res.status(400).send('Body is incorrect');
  }
  if (!groups.some(item => item.id === group)) {
    return res.status(403).send('No such group');
  }
  users.push({ id, name, groups: [group] });
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
