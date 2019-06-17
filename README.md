# Frubana System

Frubana dashboard.

## Development

Running:

```
yarn
yarn start
```

You'll get:
* Hot reloading enabled for [localhost](http://localhost:3000) environment
* Test graphql with [GraphQL Playgroud](http://localhost:8080/graphql)

## Routes

* [Orders By Region](http://localhost:3000/region/BAQ)
```
/region/:region
```
* [Products By Order](http://localhost:3000/order/2d2dc292-b2d8-4017-9ffd-33e17d4bcc40)
```
/order/:order
```

## GraphQL playground

```
query orders {
  orders {
    _id
    region_code
    routeId
  }
}

query regions {
  regions
}

query ordersByRegionCode($regionCode: String) {
  ordersByRegionCode(regionCode: $regionCode) {
    region_code
    routeId
  }
}

query routes {
  routes
}

query ordersByRouteId($routeId: String) {
  ordersByRouteId(routeId: $routeId) {
    region_code
    products {
      name
      price
      quantity
      total
    }
    routeId
  }
}

query productsByOrderId($orderId: String!) {
  productsByOrderId(orderId: $orderId) {
    name
    quantity
    price
    total
    completed
  }
}

mutation completeProduct($orderId: String!, $productId: String!) {
  completeProduct(orderId: $orderId, productId: $productId) {
    name
    completed
  }
}

subscription onCompleteProduct($orderId: String!, $productId: String!) {
  onCompleteProduct(orderId: $orderId, productId: $productId) {
    name
    completed
  }
}
```

### Query Variables

query ordersByRegion

```
{
  "regionCode": "BOG"
}
```

query ordersByRouteId

```
{
  "routeId": "bcfccef8-c9ae-4879-9fa2-6c68874643e7"
}
```

query productsByOrderId

```
{
  "orderId": "2d2dc292-b2d8-4017-9ffd-33e17d4bcc40"
}
```

mutation completeProduct

```
{
  "orderId": "2d2dc292-b2d8-4017-9ffd-33e17d4bcc40",
  "productId": "91f77c18-1222-40e2-95d1-d653dd0c3cfa"
}
```

subscription onCompleteProduct

```
{
  "orderId": "2d2dc292-b2d8-4017-9ffd-33e17d4bcc40",
  "productId": "91f77c18-1222-40e2-95d1-d653dd0c3cfa"
}
```


### NOTES

TODO

#### Resources

* [Create Apollo App](https://github.com/sysgears/create-apollo-app)
* [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
* [Styled Components](https://www.styled-components.com/)

#### TODO

* Create UI
* Clean up code
* Ignore `schema.graphql`
* Add `.env` config file to set every environment.
* Add Docz
* Add tests
* Responsive design
* Add workspace for Mobile package with React Native


* Pages are fragment queries based on url params: `/:order`
* TODO: set `ORDER` in `packages/web/src/Routes.tsx`
* Check with viewport < 768