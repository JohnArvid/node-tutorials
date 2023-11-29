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

					const completeButton = document.createElement('input');
					completeButton.setAttribute('type', 'checkbox');
					completeButton.classList.add('complete');
					completeButton.setAttribute('value', task.id);
					listItem.prepend(completeButton);
					// add delete button 

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
		}
		// send PUT request to update task w taskid to completed: true
		// disable complete button and add completed styles to task 
		
		// const taskInput = document.getElementById('newTask');
		// const newTask = { task : taskInput.value };

/*
		fetch('http://localhost:3000/tasks/:id', {
			method: 'PUT',
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
*/
	});

});