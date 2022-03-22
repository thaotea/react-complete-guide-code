import { useState, useReducer } from 'react';

const initialStateInput = {
	value: '',
	isTouched: false,
};

const inputStateReducer = (state, action) => {
	if (action.type === 'INPUT') {
		return { value: action.value, isTouched: state.isTouched };
	}

	if (action.type === 'BLUR') {
		return { value: state.value, isTouched: true };
	}

	if (action.type === 'RESET') {
		return { value: '', isTouched: false };
	}

	return initialStateInput;
};
const useInput = (label, type) => {
	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		initialStateInput
	);

    let hasError = false;
	let isValid = false;
	let errorMessage = label.toString().concat(' should not be empty.');

	if (type === 'text' && inputState.value !== '') {
		isValid = true;
	}

	if (type === 'email' && inputState.value.includes('@')) {
		isValid = true;
	}

	hasError = !isValid && inputState.isTouched;

	const valueChange = (event) => {
		dispatch({ type: 'INPUT', value: event.target.value });
	};

	const blurChange = (event) => {
		dispatch({ type: 'BLUR' });
	};

	const reset = (event) => {
		dispatch({ type: 'RESET' });
	};


	return {
		value: inputState.value,
		isValid,
		hasError,
		errorMessage,
		onChange: valueChange,
		onBlur: blurChange,
		reset,
	};
};

export default useInput;
