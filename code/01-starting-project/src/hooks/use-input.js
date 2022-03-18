import { useState, useReducer } from 'react';
const initialInputState = {
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
	return initialInputState;
};
const useInput = (label, type) => {
	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		initialInputState
	);

	const message = label.toString().concat(' must not be empty');
	const [errorMessage, setErrorMessage] = useState(message);

	let valueValid = false;

	if (type === 'text' && inputState.value.trim() !== '') {
		valueValid = true;
	}

	if (type === 'email' && inputState.value.includes('@')) {
		valueValid = true;
	}

	const hasError = !valueValid && inputState.isTouched;

	const valueChange = (event) => {
		dispatch({ type: 'INPUT', value: event.target.value });

		/*
        if (type === 'email' && event.target.value !== '' && !event.target.value.includes('@')) {
            setErrorMessage('email must be valid');
        }*/
	};

	const valueBlur = (event) => {
		dispatch({ type: 'BLUR' });
	};

	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	return {
		value: inputState.value,
		isValid: valueValid,
		hasError,
		valueChange,
		valueBlur,
		reset,
		errorMessage,
	};
};

export default useInput;
