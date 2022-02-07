import { useState } from "react";
import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
	const [username, setUsername] = useState('');
	const [age, setAge] = useState('');
	const [modalError, setModalError] = useState('');

	const usernameChangeHandler = (event) => {
		setUsername(event.target.value);
	};

	const ageChangeHandler = (event) => {
		setAge(event.target.value);
	};

	const addUserHandler = (event) => {
		event.preventDefault();

		console.log(username)
		if (username === '' || age === '') {
			setModalError({
				title: "Error Empty Input",
				message: "Please enter username and age values",
			});
			return;
		}

		if (+age < 0) {
			console.log("negative age");
			setModalError({
				title: "Error Age",
				message: "Please enter a nonnegative value (>0)",
			});
			return;
		}

		// define newUser object
		const newUser = {
			id: Math.random().toString(),
			username: username,
			age: age,
		};

		// pass to parent function
		props.update(newUser);

		// Reset Fields
		setUsername("");
		setAge("");
	};

	const modalHide = () => {
		setModalError(null);
	};
	return (
		<div>
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username" className="">
						Username
					</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={usernameChangeHandler}
					/>
					<label htmlFor="age" className="">
						Age (Years)
					</label>
					<input
						id="age"
						type="number"
						value={age}
						onChange={ageChangeHandler}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
			{modalError && (
				<ErrorModal
					title={modalError.title}
					message={modalError.message}
					modalHide={modalHide}
				/>
			)}
		</div>
	);
};

export default AddUser;
