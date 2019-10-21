import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth/AuthService';

const AuthContainer = ({ children, fallback }) => {
	const [firebaseUser, setFirebaseUser] = useState();

	useEffect(() => {
		AuthService.init(() => {
			// signOut();
		});
		AuthService.onAuthStateChanged(async user => {
			if (!user) {
				setFirebaseUser();
				return;
			}
			const rawData = await AuthService.buildUserData();
			const parsedData = rawData && rawData.providerData[0];
			setFirebaseUser(parsedData);
		});
	}, []);

	return (
		<React.Fragment>
			{/* <div>{firebaseUser && firebaseUser.uid}</div>
			<div>{firebaseUser && firebaseUser.providerId}</div>
			<div>{firebaseUser && firebaseUser.email}</div> */}
			<AuthContext.Provider value={firebaseUser}>
				{children}
			</AuthContext.Provider>
		</React.Fragment>
	);
};

export const AuthContext = React.createContext();

export default AuthContainer;
