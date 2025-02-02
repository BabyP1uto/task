const express = require('express');
const tasksRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());

app.use('/tasks', tasksRoutes);

module.exports = app;
