import classes from "./UsersList.module.css";
import Card from "../UI/Card"
const UsersList = (props) => {
	return (
		<Card className={classes.users}>
			<ul>
				{props.userList.map((data) => (
					<li key={data.id}>
						{data.username} {data.age}
					</li>
				))}
			</ul>
		</Card>
	);
};

export default UsersList;
