import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	// updates only when dependencies are changed in this case only when it starts
	useEffect(() => {
		const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

		if (storedUserLoggedInInfo === "1") {
			setIsLoggedIn(true);
		}
	}, []);
	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
	};

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
