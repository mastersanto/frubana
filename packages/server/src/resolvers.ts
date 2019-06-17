import { PubSub, withFilter } from 'apollo-server-express';
//import { PubSub, withFilter } from 'apollo-server';

import defaults from './defaults';

const {
  orders
} = defaults;

const getSameValuesArray = (obj: any, key: string) => obj.reduce((newArray: [string], obj: any) => (newArray.indexOf(obj[key]) < 0 ? newArray.concat([obj[key]]) : newArray), []);

const ON_COMPLETE_PRODUCT = 'ON_COMPLETE_PRODUCT';

const pubsub = new PubSub();

export default {
  Query: {
    order: (obj: any, { id }: { id: string }): any => {
      console.log('Query clip >>> ', id);
      return orders.find(order => order._id === id);
    },
    orders: async () => orders,
		regions: () => getSameValuesArray(orders, 'region_code'),
		ordersByRegionCode: (obj: any, { regionCode }: { regionCode: string }): any => {
      console.log('ordersByRegionCode ID >>> ', regionCode);
      const ordersResult = [];
      const filteredOrders = orders.filter(order => {
        const selectedOrder: any = order.region_code === regionCode;
        ordersResult.push({
          ...selectedOrder,
          completed: !selectedOrder.completed
        });
        return selectedOrder;
      });
      return filteredOrders;
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
  },
  Mutation: {
    async completeProduct(obj: any, { orderId, productId }: { orderId: string; productId: string }) {
      let product;
      let selectedProduct;
      const selectedOrder = orders.find(order => order._id === orderId);
      if (!selectedOrder) {
        throw new Error(`Couldn't find order with id ${orderId}`);
      }
      selectedProduct = selectedOrder.products.find(products => products._id === productId);
      if (!selectedProduct) {
        throw new Error(`Couldn't find product with id ${productId}`);
      }
      // TODO: incomplete
      product = {
        ...selectedProduct,
        completed: true
      };
      pubsub.publish(ON_COMPLETE_PRODUCT, { onProductComplete: product });
      return product;
    }
  },
  Subscription: {
    onCompleteProduct: {
      subscribe: withFilter(
          () => pubsub.asyncIterator('ON_COMPLETE_PRODUCT'),
          (payload, variables) => {
            return payload.onCompleteProduct.productId === variables.productId;
            }),
    }
  }
};
