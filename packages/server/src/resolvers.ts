// TODO: add Subscriptions
// import { PubSub } from 'apollo-server';
import defaults from './defaults';

const {
  orders
} = defaults;

const getSameValuesArray = (obj: any, key: string) => obj.reduce((newArray: [string], obj: any) => (newArray.indexOf(obj[key]) < 0 ? newArray.concat([obj[key]]) : newArray), []);

export default {
  Query: {
    order: (obj: any, { id }: { id: string }): any => {
      console.log('Query clip >>> ', id);
      return orders.find(order => order._id === id);
    },
    orders: () => orders,
		regions: () => getSameValuesArray(orders, 'region_code'),
		ordersByRegionCode: (obj: any, { regionCode }: { regionCode: string }): any => {
      console.log('ordersByRegionCode ID >>> ', regionCode);
      return orders.filter(order => order.region_code === regionCode);
    },
    ordersByRouteId: (obj: any, { routeId }: { routeId: string }): any => {
      console.log('ordersByRouteId ID >>> ', routeId);
      return orders.filter(order => order.routeId === routeId);
    },
	  routes: () => getSameValuesArray(orders, 'routeId'),
	  productsByOrderId: (obj: any, { orderId }: any): any => {
      console.log('productsByOrderId ID >>> ', orderId);
      const selectedOrder = orders.find(order => order._id === orderId);
      return selectedOrder.products;
    },
    hello(obj: any, { subject }: { subject: string }) {
      return `Hello, ${subject}! from Server`;
    }
  }
  /*,
  Region: {
    orders(regionCode) {
      return orders.find(order => order.region_code === regionCode);
      // return filter(orders, { region_code: regionCode });
    },
  },
  */
};
