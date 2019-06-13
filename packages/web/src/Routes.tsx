import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';

const Routes = () => (
		<BrowserRouter basename={'/'}>
			<Switch>
				<Route exact={true} path="/start" render={() => <App />} />
			</Switch>
		</BrowserRouter>
);

export default Routes;
