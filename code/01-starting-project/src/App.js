import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
	const dummy_users = [
		{
			id: Math.random().toString(),
			username: "Julian",
			age: "25",
		},
	];
	const [users, setUsers] = useState(dummy_users);

	// Update user list
	const updateUsers = (user) => {
		setUsers((prevUsers) => [user, ...prevUsers]);
	};

	return (
		<div>
			<AddUser update={updateUsers} />
			<UsersList userList={users} />
		</div>
	);
}

export default App;
