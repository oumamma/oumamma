import React, { useCallback, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContainer';
import AuthService from '../../services/auth/AuthService';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';

const Login = () => {
	const { id: landbotId } = useParams();
	const authData = useContext(AuthContext);

	const loginWithGoogle = useCallback(() => {
		AuthService.triggerGoogleSignIn();
	}, []);

	const loginWithFacebook = useCallback(() => {
		AuthService.triggerFacebookSignIn();
	}, []);

	const logOut = useCallback(() => {
		AuthService.signOut();
	}, []);

	useEffect(() => {
		const triggerWebhook = async () => {
			if (!landbotId) return;
			if (!authData) return;
			await SpreadsheetService.updateRow(
				landbotId,
				authData.uid,
				authData.providerId,
				authData.displayName
			);
		};
		triggerWebhook();
	});

	return (
		<React.Fragment>
			{authData ? (
				<div>
					<span>Login: {landbotId}</span>
					<button type="button" onClick={logOut}>
						Log out
					</button>
				</div>
			) : (
				<>
					<button type="button" onClick={loginWithGoogle}>
						Google
					</button>
					<button type="button" onClick={loginWithFacebook}>
						Facebook
					</button>
				</>
			)}
		</React.Fragment>
	);
};

export default Login;
