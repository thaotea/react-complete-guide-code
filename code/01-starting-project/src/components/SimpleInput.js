import { useState } from 'react';

import useInput from '../hooks/use-input';
const SimpleInput = (props) => {
	const {
		value: name,
		isValid: nameValid,
		hasError: nameHasError,
		valueChange: nameChange,
		valueBlur: nameBlur,
		reset: nameReset,
    errorMessage: nameErrorMessage
	} = useInput('name');

  const {
		value: email,
		isValid: emailValid,
		hasError: emailHasError,
		valueChange: emailChange,
		valueBlur: emailBlur,
		reset: emailReset,
    errorMessage: emailErrorMessage
	} = useInput('email');

	let formIsValid = false;

	if (nameValid && emailValid) {
		formIsValid = true;
	}


	const formSubmit = (event) => {
		event.preventDefault();

		if (!nameValid && !emailValid) {
			return;
		}

		nameReset();
    emailReset();
	};

	const nameClasses = nameHasError ? 'form-control invalid' : 'form-control';
	const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

	return (
		<form onSubmit={formSubmit}>
			<div className={nameClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					onChange={nameChange}
					onBlur={nameBlur}
					value={name}
				/>
				{nameHasError && <p className='error-text'>{nameErrorMessage}</p>}
			</div>
			<div className={emailClasses}>
				<label htmlFor='email'>Your Email</label>
				<input
					type='email'
					id='email'
					onChange={emailChange}
					onBlur={emailBlur}
					value={email}
				/>
				{emailHasError && <p className='error-text'>{emailErrorMessage}</p>}
			</div>

			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
