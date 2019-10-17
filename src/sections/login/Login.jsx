import React from 'react';
import { useParams } from 'react-router-dom';

const Login = () => {
	const { id } = useParams();

	return (
		<div>
			<span>Login: {id}</span>
		</div>
	);
};

export default Login;
