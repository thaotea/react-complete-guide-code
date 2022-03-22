import { useContext, useCallback, useEffect, useState } from 'react';

import useInput from '../../hooks/use-input';
import CartContext from '../../store/cart-context';
import classes from './OrderForm.module.css'

const OrderForm = (props) => {

	const {
		value: nameValue,
		isValid: nameValid,
		hasError: nameHasError,
		errorMessage: nameErrorMessage,
		onChange: nameOnChange,
		onBlur: nameOnBlur,
		reset: nameReset,
        checkValid: nameCheckValid,
	} = useInput('Name', 'text');

	const formValid = nameValid;

    

	const formSubmit = (e) => {
		e.preventDefault();

        nameOnBlur();

		if (formValid) {
			console.log('form submitted');
            const userData = {
                name: nameValue,
            };

            props.onConfirm(userData);
			nameReset();

		}
	};


    const nameClassName = `${classes.control} ${nameHasError ? classes.invalid : ''}`

	return (
		<form onSubmit={formSubmit}>
			<div className={nameClassName}>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					type='text'
					onChange={nameOnChange}
					onBlur={nameOnBlur}
					value={nameValue}
				></input>
				{nameHasError && <p>{nameErrorMessage}</p>}
			</div>
			<button type='button' onClick={props.onCancel}>
				Cancel
			</button>

			<button>Submit</button>
		</form>
	);
};

export default OrderForm;
