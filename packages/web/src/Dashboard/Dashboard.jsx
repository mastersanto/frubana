import * as React from 'react';
import { withRouter } from 'react-router-dom';

const Dashboard = props => {
  console.log('Dashboard', props)

  return (
      <div>
        <h2>Dashboard</h2>
        <h3>Regions</h3>
        <ul>
          <li>BOG</li>
          <li>BAQ</li>
        </ul>
      </div>
  );
};

export default withRouter(Dashboard);
