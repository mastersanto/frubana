import * as React from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface Props {
  region: string;
  progress: number;
  products: [Product];
}

export class Order extends React.PureComponent<Props> {
  props: Props;
  render() {
    const { _id, region, products, progress } = this.props;
    console.log('Orders > render this.props > ', this.props);

    return (
        <div>
          Region: {region}<br/>
          ID: {_id}<br/>
          Progress: {progress}
          <ul>
            {products.map((product: any, index: string) => (
                <li key={index}>
                  Name: {product.name}<br/>
                  Quantity: {product.quantity}<br/>
                </li>
            ))}
          </ul>
        </div>
    );
  }
}

export default Order;
// export default withRouter(Order);
