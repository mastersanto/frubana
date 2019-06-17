import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

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
            _id
            completed
        }
    }
`;

interface Props {
	orderId: string;
	productId: string;
	_id: string;
	name: string;
	quantity: number;
	completed: boolean;
	subscribeToMore: any;
}

class Product extends React.Component<Props> {
	//props: Props;
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		console.log('ORDER this.props > ', this.props);
		this.props.subscribeToMore({
			document: ON_COMPLETE_PRODUCT,
			updateQuery: (prev, {subscriptionData}) => {
				if (!subscriptionData.data) return prev;
				return {
					products: [
						subscriptionData.data.onCompleteProduct,
						...prev.products,
					],
				};
			},
		});
	}

	render() {
		const { orderId, _id, name, quantity, completed } = this.props;
		console.log('Order > render this.props > ', this.props);

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
	}
}

export default Product;
//export default withRouter(Product);
