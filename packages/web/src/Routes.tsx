import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './Dashboard/App';
import Dashboard from './Dashboard/Dashboard';
import Region from './Dashboard/Region';

const Routes = () => (
		<BrowserRouter basename={'/'}>
			<Switch>
				<Route exact={true} path="/" render={() => <Dashboard />} />
				<Route exact={true} path="/start" render={() => <App />} />
				<Route
						path="/region/:region"
						children={props => {
							return (
									<Region history={props.history} location={props.location} match={props.match} />
							);
						}}
				/>
			</Switch>
		</BrowserRouter>
);

export default Routes;
