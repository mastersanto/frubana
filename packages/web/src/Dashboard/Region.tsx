import * as React from 'react';
import { withRouter } from 'react-router-dom';

import Orders from './Orders';

const Region = props => {
  const { region } = props.match.params;
  console.log('Dashboard', props)

  return (
      <div>
        <h2>Dashboard</h2>
        <dl>
          <dt>Region</dt>
          <dd>{region || 'Cant find this region'}</dd>
          <Orders region={region} />
        </dl>
      </div>
  );
};

export default withRouter(Region);
