import app from 'firebase/app';
import 'firebase/auth';

class AuthService {
	userLSKey = 'user';
	ready = false;
	onSignOut;

	constructor() {
		var firebaseConfig = {
			apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // "AIzaSyDEjSZd_s1FMtBOrkqTAy91U94LoB2X1pU",
			authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, //"demiumsuite-dev.firebaseapp.com",
			databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, //"https://demiumsuite-dev.firebaseio.com",
			projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, //"demiumsuite-dev",
			storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, //"demiumsuite-dev.appspot.com",
			messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, //"88990529615",
			appId: process.env.REACT_APP_FIREBASE_APP_ID // "1:88990529615:web:45d3aad8647cf7bc"
		};

		// Initialize Firebase
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
	}

	init(onSignOut) {
		this.onSignOut = onSignOut;
	}

	onAuthStateChanged(callback) {
		this.auth.onAuthStateChanged(callback);
	}

	async buildUserData() {
		return this.auth.currentUser;
	}

	async accessToken() {
		const user = await this.buildUserData();

		return user && user.token;
	}

	triggerGoogleSignIn() {
		var provider = new app.auth.GoogleAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		provider.setCustomParameters({
			//https://groups.google.com/forum/#!topic/firebase-talk/gxBm0WKCuIY
			prompt: 'select_account'
		});
		this.auth.signInWithPopup(provider);
	}

	triggerFacebookSignIn() {
		var provider = new app.auth.FacebookAuthProvider();
		this.auth.signInWithPopup(provider);
	}

	signOut() {
		return this.auth.signOut();
	}
}

let instance;
if (!instance) instance = new AuthService();

export default instance;
