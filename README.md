# Frubana System

Frubana dashboard based on React Router:

* Pages are fragment queries based on url params: `/:order`

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

### NOTES

* `ORDER` is being set in `packages/web/src/Routes.tsx`
* Check with viewport < 768

#### Resources

* [Create Apollo App](https://github.com/sysgears/create-apollo-app)
* [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
* [Styled Components](https://www.styled-components.com/)

#### TODO

* Clean up code
* Ignore `schema.graphql`
* Add `.env` config file to set every environment.
* Add Docz
* Add tests
* Responsive design
* Add workspace for Mobile package with React Native