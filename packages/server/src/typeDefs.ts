import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Product {
        _id: String
        name: String
        price: Int
        quantity: Int
        total: Int
        completed: Boolean
    }

    type Order {
        _id: String
        region_code: String
        routeId: String
        products: [Product]
    }

    type Query {
        hello(subject: String): String
        order(id: String): Order
        orders: [Order]
        regions: [String]
        ordersByRegionCode(regionCode: String): [Order]
        routes: [String]
        ordersByRouteId(routeId: String): [Order]
        productsByOrderId(orderId: String): [Product]
    }

    type Mutation {
        completeProduct(orderId: String, productId: String): Product
    }

    type Subscription {
        onCompleteProduct(orderId: String, productId: String): Product
    }

    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`;

export default typeDefs;
