import gql from 'graphql-tag';
import * as React from 'react';
import {Mutation, Subscription} from 'react-apollo';
import { withRouter } from 'react-router-dom';

import Product from './Product';

const ON_COMPLETE_PRODUCT = gql`
    subscription onCompleteProduct($orderId: String, $productId: String) {
        onCompleteProduct(orderId: $orderId, productId: $productId) {
            _id
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

interface Props {
	order: any;
	products: any;
	subscribeToMore: any;
	/*
	orderId: string;
	_id: string;
	name: string;
	quantity: number;
	completed: boolean;
	subscribeToMore: any;
	 */
}

class Products extends React.Component<Props> {
	//props: Props;
	constructor(props: Props) {
		super(props);
	}

	render() {
		const { products, order, subscribeToMore } = this.props;
		// const { orderId, _id, name, quantity, completed } = this.props;
		console.log('Products > render this.props > ', this.props);

		return (
				<ul>
					{products.map((product: any, index: string) => (
							<li key={index}>
								<Product
										orderId={order}
										productId={product._id}
										_id={product._id}
										name={product.name}
										quantity={product.quantity}
										completed={product.completed}
										subscribeToMore={subscribeToMore}
								/>
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

		/*
		return (
				<div>
					ID: {_id}<br/>
					Name: {name}<br/>
					Quantity: {quantity}<br/>
					Status: ???<br/>
					<Mutation mutation={COMPLETE_PRODUCT} key={_id}>
						{COMPLETE_PRODUCT => (
								<button
										onClick={() => {
											COMPLETE_PRODUCT({
												variables: {
													orderId: orderId,
													productId: _id
												}});
										}}
										type="submit"
								>
									Completed: {completed ? 'YES' : 'NO'}
								</button>
						)}
					</Mutation>
				</div>
		);
 	*/
	}
}

export default Products;
//export default withRouter(Product);
