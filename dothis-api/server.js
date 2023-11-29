// Require express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlerware to parse JSON requests
app.use(bodyParser.json());

// Todo list data (in-memory)
let todolist = [
	{id: 1, task: 'Complete Node.js tutorial', completed: false	},
	{id: 2, task: 'Build RESTful API', completed: false},
];


// GET endpoint to retrive all tasks
app.get('/tasks', (req, res) => {
	res.json(todolist);
});

// GET endpoint to retrive a specific task 
app.get('/tasks/:id', (req, res) => {
	const taskId = parseInt(req.params.id);
	const task = todolist.find(item => item.id === taskId);

	if (task) {
		res.json(task);
	} else {
		res.status(404).json({error: 'Task not found'});
	}
});

// POST endpoint to create a new task
app.post('/tasks', (req, res) => {
	const newTask = req.body;
	newTask.id = todolist.length + 1;
	newTask.cmopleted = false;
	todolist.push(newTask);
	res.status(201).json(newTask);
});

// PUT endpoint to update a task
app.put('tasks/:id', (req, res) => {
	const taskId = parseInt(req.params.id);
	const updatedTask = req.body;

	// Find task in todolist
	const = taskIndex = todolist.findIndex(item => item.id === taskId);

	if (taskIndex !== -1){
		todolist[taskIndex] = { ...todolist[taskIndex], updatedTask};
		res.json(todolist[taskIndex]);
	} else {
		res.status(404).json({error: 'Task not found'});
	}
});

// DELETE endpoint to delete a task 