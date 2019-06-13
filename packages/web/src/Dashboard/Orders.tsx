import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

export const GET_ORDERS = gql`
    query Orders {
        orders {
            _id
            region_code
            routeId
        }
    }
`;
/*
// tslint:disable-next-line
interface OrderType {
	id?: any;
	percentage?: number;
}
*/

// tslint:disable-next-line
interface Props {
	region?: string;
}
// tslint:disable-next-line
interface State {}


class Orders extends React.Component<Props, State> {
	props: Props;

	render() {
		const { region } = this.props;

		return (
				<div>
					<h2>Region: { region }</h2>
					<Query query={GET_ORDERS}>
						{({ loading, data }) => {
							console.log(data);
							if (!data) {
								return null;
							}
							if (loading) {
								return <p>Loading...</p>;
							}
							// <div className="ClipsList">
							return (
									<ul>
										{data.orders.map((order: any) => (
												<li>
													_id: {order._id}<br/>
													region_code: {order.region_code}
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

export default Orders;