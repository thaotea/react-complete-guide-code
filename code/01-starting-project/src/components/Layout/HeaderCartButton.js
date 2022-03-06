import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon.js';
import CartContext from '../../store/CartContext.js';
import classes from './HeaderCartButton.module.css';
const HeaderCartButton = (props) => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);
	const { items } = cartCtx;

	//reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
	// add the number of cart items in items from context
	const numberOfCartItems = items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	// btnClasses adds classes.bump if btn is highlighted
	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ''
	}`;

	// add useEffect with items from context as dependency
	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
