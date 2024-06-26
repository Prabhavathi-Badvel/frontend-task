const users = [];
let selectedUserId = null;

function addUser() {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;

	if (!name || !email) {
		alert('Name and email cannot be empty');
		return;
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		alert('Please input a valid e-mail address');
		return;
	}

	if (selectedUserId !== null) {
		const user = users.find(user => user.id === selectedUserId);
		if (user) {
			user.name = name;
			user.email = email;
		}
		selectedUserId = null;
	} else {
		const newUser = {
			id: users.length + 1,
			name,
			email
		};
		users.push(newUser);
	}

	displayUsers();
	clearForm();
}

function displayUsers() {
	const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
	tableBody.innerHTML = '';

	users.forEach(user => {
		const row = document.createElement('tr');

		const cellId = document.createElement('td');
		cellId.textContent = user.id;
		row.appendChild(cellId);

		const cellName = document.createElement('td');
		cellName.textContent = user.name;
		row.appendChild(cellName);

		const cellEmail = document.createElement('td');
		cellEmail.textContent = user.email;
		row.appendChild(cellEmail);

		const cellAction = document.createElement('td');

		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.addEventListener('click', () => editUser(user.id));
		cellAction.appendChild(editButton);

		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.addEventListener('click', () => deleteUser(user.id));
		cellAction.appendChild(deleteButton);

		row.appendChild(cellAction);
		tableBody.appendChild(row);
	});
}

function editUser(userId) {
	const user = users.find(user => user.id === userId);
	if (user) {
		document.getElementById('name').value = user.name;
		document.getElementById('email').value = user.email;
		selectedUserId = userId;
	}
}

function deleteUser(userId) {
	const index = users.findIndex(user => user.id === userId);
	if (index !== -1) {
		users.splice(index, 1);
		displayUsers();
	}
}

function clearForm() {
	document.getElementById('name').value = '';
	document.getElementById('email').value = '';
	selectedUserId = null;
}

displayUsers();