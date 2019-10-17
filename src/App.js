import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './sections/home/Home';
import Login from './sections/login/Login';
import Ranking from './sections/ranking/Ranking';
import './App.scss';

function App() {
	return (
		<>
			<div className="header">
				<div className="logo">
					<img src="/logo.png" />
				</div>
			</div>
			<BrowserRouter>
				<div className="content">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login/:id" component={Login} />
						<Route path="/login" component={Login} />
						<Route exact path="/ranking" component={Ranking} />
						<Redirect to="/" />
					</Switch>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
