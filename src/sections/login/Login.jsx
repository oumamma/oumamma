import React, {
	useState,
	useCallback,
	useEffect,
	useContext,
	useRef,
} from 'react';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContainer';
import AuthService from '../../services/auth/AuthService';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';
import { v1 as uuidv1 } from 'uuid';

import './Login.scss';

const Login = () => {
	const authData = useContext(AuthContext);
	const [redirect, setRedirect] = useState(false);

	const loginWithGoogle = useCallback(() => {
		AuthService.triggerGoogleSignIn();
	}, []);

	const loginWithFacebook = useCallback(() => {
		AuthService.triggerFacebookSignIn();
	}, []);

	// const inputEl = useRef(null);
	const [localAuthUser, setLocalAuthUser] = useState();
	// const noLoginForm = useCallback((e) => {
	// 	e.preventDefault();
	// 	const name = inputEl.current.value;
	// 	if (!name) return;
	// 	setLocalAuthUser({
	// 		uid: uuidv1(),
	// 		providerId: 'local',
	// 		displayName: name,
	// 	});
	// });

	const [updating, setUpdating] = useState(false);
	useEffect(() => {
		const triggerWebhook = async () => {
			if (!SpreadsheetService.chatData()) return;
			if (!authData && !localAuthUser) return;
			if (updating) return;

			const user = authData || localAuthUser;
			setUpdating(true);
			await SpreadsheetService.updateRow(
				user.uid,
				user.providerId,
				user.displayName
			);
			setRedirect(true);
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
									<span>Calculando tus resultados...</span>
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
							{/* <form
								style={{
									display: 'flex',
									flexDirection: 'column'
								}}
								onSubmit={noLoginForm}
							>
								<label className="cool-font">Pasas de conectarte?</label>
								<label>Dinos cómo te llamas al menos, troll</label>
								<input ref={inputEl} className="social oumamma-big"></input>
								<button className="social oumamma-big">Enviar</button>
							</form> */}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
