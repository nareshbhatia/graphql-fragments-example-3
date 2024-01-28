# GraphQL Fragments Example 3

A sample application to demonstrate the use of GraphQL fragments. In this
example, I have included a union in my GraphQL schema to show how unions should
be handled.

```graphql
union Event = OrderEvent | StatementEvent
```

## Getting Started

### Development Build

```shell
npm ci
npm run dev
```

Open a browser window at http://localhost:3000/ to see app.

### Production Build

```shell
npm ci
npm run build
npm start
```

Open a browser window at http://localhost:3000/ to see app.
