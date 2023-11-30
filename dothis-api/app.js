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
					listItem.innerHTML = `
					<div id=${"#task"+task.id}>
						<input ${task.completed ? 'checked' : ''} 
						type='checkbox' 
						class='complete' 
						value=${task.id}>
						${task.task}
						<input type='checkbox' class='delete' value=${task.id}>
					</div>`;
					console.log(tasks);
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

	// Event listener for completing tasks

	document.addEventListener('click', function (event) {
		// event.preventDefault();
		const target = event.target;
		const taskId = event.target.value;
		if (target.classList.contains('complete')) {
			console.log(taskId);
		// disable complete button and add completed styles to task 
					

			const updatedTask = {
				id: taskId, 
				task: document.getElementById('#task' + taskId).textContent.trim(),
				completed: true
			};

			console.log(updatedTask);

			fetch('http://localhost:3000/tasks/' + taskId, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedTask),
			})
			.then(response => response.json())
			.then(() => {
				fetchTasks(); // Refresh task list
			})
			.catch(error => console.error('Error updating task: ', error));
		
		}
	});

});