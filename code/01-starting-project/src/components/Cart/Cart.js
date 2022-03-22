import React, { Fragment, useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import OrderForm from '../Order/OrderForm';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem(item);
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const orderHandler = () => {
		setIsCheckout(true);
	};

	async function addDataHandler(data) {
		const response = await fetch(
			'https://react-learning-fdb8e-default-rtdb.firebaseio.com/items.json',
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		const dataResponse = await response.json();
	}

	const confirmHandler = async (userData) => {
		setIsSubmitting(true);

		await addDataHandler({
			user: userData,
			orderedItems: cartCtx,
		});

    cartCtx.clearCart();
		setIsSubmitting(false);
		setDidSubmit(true);
	};

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes['button--alt']} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<Fragment>
			{' '}
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckout && (
				<OrderForm onCancel={props.onClose} onConfirm={confirmHandler} />
			)}
			{!isCheckout && modalActions}
		</Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data</p>;

	const didSubmitModalContent = (
		<Fragment>
			<p>Success</p>
			<div className={classes.actions}>
				<button onClick={props.onClose}>
					Close
				</button>
			</div>
		</Fragment>
	);
	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && !didSubmit && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
