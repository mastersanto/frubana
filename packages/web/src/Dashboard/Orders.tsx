import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

import Order from './Order';

export const GET_ORDERS = gql`
    query ordersByRegionCode($regionCode: String) {
        ordersByRegionCode(regionCode: $regionCode) {
            _id
						region_code
						products {
								_id
								name
								price
								quantity
								total
						}
        }
    }
`;

interface Props {
	region: string;
}

export class Orders extends React.PureComponent<Props> {
	props: Props;
	render() {
		const { region } = this.props;
		console.log('Orders >>>>>>>>>>>>>');
		console.log('render this > ', this);
		console.log('render this.props > ', this.props);

		return (
				<div>
					<h2>Orders in { region }</h2>
					<Query
							query={GET_ORDERS}
							variables={{ regionCode: region }}
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
										{data.ordersByRegionCode.map((order: any, index: string) => (
												<Order
														key={index}
														_id={order._id}
														region={region}
														progress={60}
														products={order.products}
												/>
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