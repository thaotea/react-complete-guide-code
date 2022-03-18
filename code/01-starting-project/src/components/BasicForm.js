import { useState } from 'react';
import useInput from '../hooks/use-input';
const BasicForm = (props) => {
	
	const {
		value: firstNameValue,
		isValid: firstNameValid,
		hasError: firstNameHasError,
		valueChange: firstNameValueChange,
		valueBlur: firstNameValueBlur,
		reset: firstNameReset,
		errorMessage: firstNameErrorMessage,
	} = useInput('First Name', 'text');

  let formIsValid = false;

	if (firstNameValid) {
		formIsValid = true;
	}


	const formSubmit = (e) => {
		e.preventDefault();

		if (!formIsValid) {
			return;
		}

		firstNameReset();
	};

	const firstNameClass = firstNameHasError
		? 'form-control'
		: 'form-control error';

	return (
		<form onSubmit={formSubmit}>
			<div className='control-group'>
				<div className={firstNameClass}>
					<label htmlFor='name'>First Name</label>
					<input
						type='text'
						id='name'
						onChange={firstNameValueChange}
						onBlur={firstNameValueBlur}
						value={firstNameValue}
					/>
					{firstNameHasError && <p>{firstNameErrorMessage}</p>}
				</div>
				<div className='form-control'>
					<label htmlFor='name'>Last Name</label>
					<input type='text' id='name' />
				</div>
			</div>
			<div className='form-control'>
				<label htmlFor='name'>E-Mail Address</label>
				<input type='text' id='name' />
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
