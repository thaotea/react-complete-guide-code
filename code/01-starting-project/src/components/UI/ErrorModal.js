import useState from "react";
import classes from "./ErrorModal.module.css";
import Button from "./Button";
import Card from "./Card";

const ErrorModal = (props) => {
	return (
		<div>
			<div className={classes.backdrop} onClick={props.modalHide}></div>
			<Card className={classes.modal}>
				<div className={classes.header}>
					<h2>{props.title}</h2>
				</div>
				<div className={classes.content}>
					<p>{props.message}</p>
				</div>
				<div className={classes.actions}>
					<Button onClick={props.modalHide}>Close</Button>
				</div>
			</Card>
		</div>
	);
};

export default ErrorModal;
