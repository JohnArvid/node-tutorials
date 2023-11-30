document.addEventListener('DOMContentLoaded', () => {


	const todoList = document.getElementById('todoList');

	// Function to fetch and display tasks
	function fetchTasks() {
		fetch('http://localhost:3000/tasks')
			.then(response => response.json())
			.then(tasks => {
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
					//console.log(tasks);
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

	todoList.addEventListener('change', function (event) {
		const target = event.target;
		const taskId = target.value;
		if (target.classList.contains('complete')) {
			console.log('complete: ' + taskId );
		// disable complete button and add completed styles to task 
					

			const updatedTask = {
				id: taskId, 
				task: document.getElementById('#task' + taskId).textContent.trim(),
				completed: true,
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

		if (target.classList.contains('delete')) {
			console.log( 'delete: ' + taskId );

			// Hide the element first 

/*			const deletedTask = {
				id: taskId, 
				task: document.getElementById('#task' + taskId).textContent.trim(),
				completed: true
			};*/


			fetch('http://localhost:3000/tasks/' + taskId, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: null,
			})
			.then(response => response.json())
			.then(() => {
				fetchTasks(); // Refresh task list
			})
			.catch(error => console.error('Error deleting task: ', error));
		
		}
		
	});

});