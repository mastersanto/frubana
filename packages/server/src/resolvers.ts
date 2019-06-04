// TODO: add Subscriptions
// import { PubSub } from 'apollo-server';
import defaults from './defaults';

const {
  orders
  // regions
} = defaults;

export default {
  Query: {
    // @ts-ignore
    order: (_, { id }) => {
      console.log('Query clip >>> ', id);
      return orders.find(order => order._id === id);
    },
    orders: () => orders,
    ordersByRegion: (obj: any, { regionCode }: { regionCode: string }): any => {
      console.log('RESOLVER ID >>> ', regionCode);
      return orders.filter(order => order.region_code === regionCode);
    },
    productsByOrder: (_, { orderId }: any): any => {
      console.log('RESOLVER ID >>> ', orderId);
      const order = orders.find(order => order._id === orderId);
      return order.products;
      // return orders.filter(order => order._id === id);
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
