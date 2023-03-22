import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContent } from "../App";
import "./style.css";
const Login = () => {
	const [account, setAccount] = useState([]);
	const emailRef = useRef();

	const nameRef = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((res) => {
				setAccount(res);
			});
	}, []);
	const { setUser } = useContext(UserContent);
	const handleLogin = () => {
		const username = nameRef.current.value;
		const email = emailRef.current.value;
		if (!username || !email) {
			return window.alert("Please enter all input");
		}
		const some = account.find(
			(item) => item?.username === username && item?.email === email
		);
		if (!some) {
			return window.alert("Username or email is not correct");
		}
		setUser({ ...some });
		navigate("/albums/all");
	};
	return (
		<div className="login">
			<div className="login_form">
				<div className="login_title">Login System</div>
				<div className="login_input">
					<label>Username:</label>
					<input ref={nameRef} type="text" />
				</div>
				<div className="login_input">
					<label>email:</label>
					<input ref={emailRef} type="text" />
				</div>
				<div className="login_button">
					<button onClick={handleLogin}>Login</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
