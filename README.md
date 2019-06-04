# Frubana System

Frubana dashboard.


## How did I start it?

```
yarn create apollo-app frubana
```


## Development

Running:

```
yarn
yarn start
```

You'll get:
* Hot reloading enabled for [localhost](http://localhost:3000) environment
* Test graphql with [GraphiQL](http://localhost:8080/graphiql)

## GraphQL playground

```
query orders {
  orders {
    _id
    region_code
    routeId
  }
}

query ordersByRegion($region: String) {
  ordersByRegion(regionCode: $region) {
    region_code
    routeId
  }
}

query productsByOrder($orderId: ID!) {
  productsByOrder(orderId: $orderId) {
    name
    quantity
    price
    total
  }
}
```

### Query Variables

query ordersByRegion

```
{
  "region": "BOG"
}
```

query productsByOrder

```
{
  "orderId": "2d2dc292-b2d8-4017-9ffd-33e17d4bcc40"
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