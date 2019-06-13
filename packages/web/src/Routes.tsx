import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './Dashboard/App';
import Dashboard from './Dashboard/Dashboard';

const Routes = () => (
		<BrowserRouter basename={'/'}>
			<Switch>
				<Route exact={true} path="/" render={() => <App />} />
				<Route exact={true} path="/start" render={() => <App />} />
				<Route
						path="/dashboard/:region_route?/:routeId?"
						children={props => {
							return (
									<Dashboard history={props.history} location={props.location} match={props.match} />
							);
						}}
				/>
			</Switch>
		</BrowserRouter>
);

export default Routes;
