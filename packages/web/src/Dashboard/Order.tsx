import gql from 'graphql-tag';
import * as React from 'react';
import { Query, Subscription } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Products from './Products';

export const GET_PRODUCTS = gql`
  query productsByOrderId($orderId: String) {
    productsByOrderId(orderId: $orderId) {
      _id
      name
      quantity
      completed
    }
  }
`;
/*
const ON_COMPLETE_PRODUCT = gql`
  subscription onCompleteProduct($orderId: String!, $productId: String!) {
    onCompleteProduct(orderId: $orderId, productId: $productId) {
      _id
      completed
    }
  }
`;
 */

interface Props {
  order: any;
  //subscribeToMore: any;
}

class Order extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { order } = this.props;
    console.log('Order > render this.props > ', this.props);

    return (
        <div>
          Order: {order}<br/>
          <Query
              query={GET_PRODUCTS}
              variables={{ orderId: order }}
          >
            {({ loading, error, data, subscribeToMore }) => {
              console.log('ORDER > QUERY data > ', data);
              console.log('QUERY error > ', error);
              console.log('QUERY this.props > ', this.props);
              if (!data) {
                return null;
              }
              if (loading) {
                return <p>Loading...</p>;
              }
              return (
                  <Products
                      order={order}
                      products={data.productsByOrderId}
                      subscribeToMore={() => subscribeToMore}
                  />
              );
            }}
          </Query>
        </div>
    );
  }
}

export default withRouter(Order);
