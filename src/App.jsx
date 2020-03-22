import React from 'react';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import Home from './sections/home/Home';
import Login from './sections/login/Login';
import Ranking from './sections/ranking/Ranking';
import AuthContainer from './sections/AuthContainer';
import CookieConsent from 'react-cookie-consent';
import Privacy from './sections/legal/Privacy';
import Cookies from './sections/legal/Cookies';
import './App.scss';

function App() {
	return (
		<>
			<div className="header">
				<div className="logo">
					<img src="/logo.png" alt="logo" />
				</div>
			</div>
			<BrowserRouter>
				<AuthContainer>
					<div className="content">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login/:id" component={Login} />
							<Route path="/login" component={Login} />
							<Route path="/ranking/:loginId" component={Ranking} />
							<Route path="/ranking" component={Ranking} />
							<Route path="/privacidad" component={Privacy} />
							<Route path="/cookies" component={Cookies} />
							<Redirect to="/" />
						</Switch>
					</div>
				</AuthContainer>
			</BrowserRouter>
			<div className="footer">
				<a href="/privacidad" target="_blank">
					Aviso de privacidad
				</a>
			</div>
			<CookieConsent
				style={{ background: 'var(--color-violet-position)' }}
				buttonText="Pues de lujo!"
				buttonStyle={{ backgroundColor: 'var(--color-blue-light)' }}
			>
				<span>Esta web usa cookies para que </span>
				<a
					href="/cookies"
					target="_blank"
					style={{ color: 'var(--color-blue-dark)' }}
				>
					lo flipes en colores
				</a>
				.
			</CookieConsent>
		</>
	);
}

export default App;
