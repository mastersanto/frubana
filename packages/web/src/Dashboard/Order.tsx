import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation, Query, Subscription } from 'react-apollo';
import { withRouter } from 'react-router-dom';

export const GET_ORDER = gql`
  query productsByOrderId($orderId: String) {
    productsByOrderId(orderId: $orderId) {
      _id
      name
      quantity
      completed
    }
  }
`;

const COMPLETE_PRODUCT = gql`
  mutation completeProduct($orderId: String, $productId: String) {
    completeProduct(orderId: $orderId, productId: $productId) {
      _id
      completed
    }
  }
`;

const ON_COMPLETE_PRODUCT = gql`
  subscription onCompleteProduct($orderId: String!, $productId: String!) {
    onCompleteProduct(orderId: $orderId, productId: $productId) {
      name
      completed
    }
  }
`;

interface Props {
  order: string;
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
                          Status: ???<br/>
                          <Mutation mutation={COMPLETE_PRODUCT} key={product._id}>
                            {COMPLETE_PRODUCT => (
                                <button
                                    onClick={() => {
                                      COMPLETE_PRODUCT({
                                        variables: {
                                          orderId: order,
                                          productId: product._id
                                        }});
                                    }}
                                    type="submit"
                                >
                                  Completed: {product.completed ? 'YES' : 'NO'}
                                </button>
                            )}
                          </Mutation>
                          <Subscription
                              subscription={ON_COMPLETE_PRODUCT}
                              variables={{
                                orderId: order,
                                productId: product._id
                              }}
                          >
                            {() => {return null;}}
                          </Subscription>
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
