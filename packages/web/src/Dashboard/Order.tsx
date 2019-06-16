import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

export const GET_ORDER = gql`
  query productsByOrderId($orderId: String) {
    productsByOrderId(orderId: $orderId) {
      _id
      name
      quantity
    }
  }
`;

interface Props {
  order: string!;
}

class Order extends React.PureComponent<Props> {
  props: Props;
  render() {
    const { order } = this.props;
    console.log('Order > render this.props > ', this.props);

    return (
        <div>
          Order: {order}<br/>
          <Query
              query={GET_ORDER}
              variables={{ orderId: order }}
          >
            {({ loading, error, data }) => {
              console.log('QUERY data > ', data);
              console.log('QUERY error > ', error);
              console.log('QUERY this.props > ', this.props);
              if (!data) {
                return null;
              }
              if (loading) {
                return <p>Loading...</p>;
              }
              return (
                  <ul>
                    {data.productsByOrderId.map((product: any, index: string) => (
                        <li key={index}>
                          ID: {product._id}<br/>
                          Name: {product._id}<br/>
                          Quantity: {product.quantity}<br/>
                          Status: ???
                        </li>
                    ))}
                  </ul>
              );
            }}
          </Query>
        </div>
    );
  }
}

export default withRouter(Order);
