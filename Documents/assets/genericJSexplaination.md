# Database Controller Documentation

This file contains functions and utilities for handling database queries and operations. It provides a flexible way to interact with the database using HTTP requests. The primary functionalities include generating and executing SQL queries based on incoming requests, error handling, and simplifying common database operations.

## Functions

### `performQueryFromReq(req)`

This function takes an Express request (`req`) object, auto-generates an SQL query based on the request parameters, and executes the query. It supports various HTTP methods (GET, POST, PUT, DELETE) and handles errors gracefully.

#### Parameters

- `req`: Express request object

#### Returns

- A Promise that resolves to the result of the query or an error object.

### `performSimpleOneQuery(table, method, queryProperty, queryParam)`

This function simplifies the process of querying a single element from the database based on a unique identifier. It is suitable for GET and DELETE operations.

#### Parameters

- `table`: The table to query.
- `method`: The type of query (GET or DELETE).
- `queryProperty`: The property to search for (e.g., "id").
- `queryParam`: The value of the property to search for.

#### Returns

- A Promise that resolves to the result of the query or an error object.

### `performInnerQuery(table, method, query, body = {}, params = {})`

This function generates and executes a more complex query based on the provided parameters. It allows for filtering, updating, and inserting data.

#### Parameters

- `table`: The table to query.
- `method`: The type of query (GET, POST, PUT, DELETE).
- `query`: Query parameters to filter the search.
- `body`: Data for POST and PUT requests.
- `params`: Path parameters.

#### Returns

- A Promise that resolves to the result of the query or an error object.

### `generateQueryForInnerCall(queryProperties = [], queryParams = [], querySettings = [])`

This utility function generates a query object based on three arrays representing query properties, parameters, and settings. It is useful for constructing complex queries.

#### Parameters

- `queryProperties`: Array of property names.
- `queryParams`: Array of parameter values.
- `querySettings`: Array of query settings (e.g., Equals, More).

#### Returns

- An object representing the generated query.

### `arrayToString(array)`

This utility function converts an array of strings or numbers into a single string with elements separated by commas. Useful for creating query parameters.

#### Parameters

- `array`: The array to convert.

#### Returns

- A string representing the elements of the array separated by commas.

### `removeBodyParametersIgnoreCase(req, paramNames)`

This function removes unwanted query parameters from the request body, ignoring case.

#### Parameters

- `req`: Express request object.
- `paramNames`: A string of parameter names separated by commas.

#### Returns

- The modified request object.

### `removeQueryParametersIgnoreCase(req, paramNames)`

This function removes unwanted query parameters from the request query, ignoring case.

#### Parameters

- `req`: Express request object.
- `paramNames`: A string of parameter names separated by commas.

#### Returns

- The modified request object.

### `removeParametersIgnoreCase(part, paramNames)`

This utility function removes unwanted parameters from a part of the request (query or body), ignoring case.

#### Parameters

- `part`: The request part containing parameters.
- `paramNames`: A string of parameter names separated by commas.

#### Returns

- The modified request part.

## Error Handling

The file includes comprehensive error handling for various scenarios, such as invalid queries, missing columns, and operator mismatches. Errors are returned as part of the response, providing useful information for debugging.

## Usage

To interact with the database using these functions, import them into your Express route handlers and utilize them based on your specific requirements.

**Example:**

```javascript
import { performQueryFromReq } from "../controllers/test-controller.js";

const handleDatabaseRequest = async (req, res) => {
  const result = await performQueryFromReq(req);

  if (result.error) {
    // Handle error response
    return res.status(400).json(result);
  }

  // Handle successful response
  return res.status(200).json(result);
};

export default handleDatabaseRequest;
