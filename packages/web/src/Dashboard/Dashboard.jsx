import * as React from 'react';
import { withRouter } from 'react-router-dom';

import Orders from './Orders';

// @ts-ignore
const Dashboard = props => {
  const { region_route, routeId } = props.match.params;
  console.log('Dashboard')

  return (
      <div>
        <h2>Dashboard</h2>
        <dl>
          <dt>Region</dt>
          <dd>{region_route || 'NA'}</dd>
          <dt>Route</dt>
          <dd>{routeId || 'NA'}</dd>
          <Orders region={'BOG'} />
        </dl>
      </div>
  );
};

// @ts-ignore
export default withRouter(Dashboard);
