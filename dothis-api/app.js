document.addEventListener('DOMContentLoaded', () => {
	// Function to fetch and display tasks
	function fetchTasks() {
		fetch('http://localhost:3000/tasks')
			.then(response => response.json())
			.then(tasks => {
				const todoList =document.getElementById('todoList');
				todoList.innerHTML = '';

				tasks.forEach(task =>{
					const listItem = document.createElement('li');
					listItem.textContent = task.task;
					todoList.appendChild(listItem);
				});
			})
			.catch(error => console.error('Error fetching tasks: ', error));
	}

	// Initial fetch of tasks
	fetchTasks();

	// Event listener for adding tasks
	document.addEventListener('submit', function (event) {
		event.preventDefault();

		const taskInput = document.getElementById('newTask');
		const newTask = { task : taskInput.value };

		fetch('http://localhost:3000/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTask),
		})
		.then(response => response.json())
		.then(() => {
			taskInput.value = '';
			fetchTasks(); // Refresh task list
		})
		.catch(error => console.error('Error adding task: ', error));

	});

});