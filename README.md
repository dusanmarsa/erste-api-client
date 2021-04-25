# Client library for ERSTE API

This library is built as a JS/TS wrapper for ERSTE API's so that you don't have to figure out what types and shapes of data which endpoint returns.

## Getting Started

Install this library to your project

```
yarn add erste-api-client
```

Import which endpoint of erste API you want to use e.g. `csasTransparentAccountV3`

```
import { csasTransparentAccountV3 } from 'erste-api-client'
```

Then you can use this api to fetch what data you need. For example transactions.
```
const transactions = await csasTransparentAccountV3.transactions({
  apiToken: <API_TOKEN>,
  accountId: <YOUR_ACCOUNT_ID>
})
```

## Built With

* [query-string](https://github.com/sindresorhus/query-string) - Query string generator for url parametters
* [node-fetch](https://github.com/node-fetch/node-fetch) - Fetch polyfill

## Contributing

Feel free to contribute to this library. There are many endpoints of ERSTE API that are not yet supported. 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

#### Supported endpoints so far
- Česká spořitelna a.s., Czech Republic
  - Transparent accounts API v3
