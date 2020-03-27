import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContainer';
import AuthService from '../../services/auth/AuthService';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';
import './Login.scss';

const Login = () => {
	const { id: landbotId } = useParams();
	const authData = useContext(AuthContext);
	const [redirect, setRedirect] = useState(false);

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
			setTimeout(() => setRedirect(true), 2000);
		};
		triggerWebhook();
	});

	return (
		<div className="login">
			<div className="logo">
				<img src="/logo.png" alt="logo" />
			</div>
			<div className="login-content">
				<div className="box-container">
					{authData ? (
						<>
							{redirect ? (
								<Redirect to={`/ranking/${authData.uid}`} />
							) : (
								<>
									<button
										type="button"
										className="social oumamma-big"
										onClick={() => setRedirect(true)}
									>
										Quiero ver mis resultados!
									</button>
									<button type="button" onClick={logOut}>
										Log out
									</button>
								</>
							)}
						</>
					) : (
						<>
							<button
								type="button"
								className="social facebook-big"
								onClick={loginWithFacebook}
							>
								Facebook
							</button>
							<button
								type="button"
								className="social google-big"
								onClick={loginWithGoogle}
							>
								Google
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
