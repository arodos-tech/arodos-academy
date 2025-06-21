# FrontQL API Integration Guide

This README provides documentation for using the FrontQL API implementation in the Arodos Academy project. FrontQL allows you to build full-scale applications using only frontend technologies by providing a way to interact with your database directly from the frontend.

## Table of Contents

- [Overview](#overview)
- [API Structure](#api-structure)
- [Authentication](#authentication)
- [Basic Usage](#basic-usage)
- [Request Options](#request-options)
- [Query Syntax](#query-syntax)
- [Examples](#examples)
- [Best Practices](#best-practices)

## Overview

FrontQL is a platform that empowers developers to create full-scale applications using only frontend technologies. It eliminates the need for traditional backend development by allowing you to interact with your database directly from the frontend using a REST-like API with SQL capabilities.

In this project, FrontQL is implemented in the `src/lib/frontql` directory and used throughout the application for data operations.

## API Structure

The FrontQL implementation consists of the following files:

- **Api.ts**: The core API client that handles HTTP requests to the FrontQL server
- **users.ts**: User authentication and management functions
- **tokens.json**: Pre-generated authentication tokens for API endpoints

## Authentication

FrontQL uses a token-based authentication system. Tokens are stored in `tokens.json` and are automatically used by the API client. The API client will:

1. Generate a unique key for each request based on the endpoint and parameters
2. Check if a token exists for that key in `tokens.json`
3. If a token exists, it will be used for authentication
4. If no token exists, the API will include the key and token path in the request headers

## Basic Usage

Import the API client:

```typescript
import Api from "@/lib/frontql/Api";
```

### HTTP Methods

The API client provides the following methods:

```typescript
// GET request
const response = await Api.get(endpoint, options);

// POST request
const response = await Api.post(endpoint, options);

// PUT request
const response = await Api.put(endpoint, options);

// DELETE request
const response = await Api.delete(endpoint, options);

// SQL query (uses POST internally)
const response = await Api.sql(endpoint, options);
```

## Request Options

The API client accepts an options object with the following properties:

```typescript
type RequestOptions = {
  loading?: boolean;                          // Show loading indicator
  body?: SQLBody | SQLBody[] | AnyBody | AnyBody[]; // Request body
  key?: string;                               // Custom key
  page?: string;                              // Pagination
  sort?: string;                              // Sorting
  joins?: string;                             // Join collections
  filter?: string;                            // Filter results
  search?: string;                            // Search query
  nearby?: string;                            // Geospatial search
  hidden?: string;                            // Include hidden fields
  fields?: string;                            // Select specific fields
  session?: string;                           // Session token
  validation?: string;                        // Validation rules
  permissions?: string;                       // Permission rules
};
```

## Query Syntax

FrontQL uses a simple yet powerful syntax for querying data:

### Operators

- Equal to: `:`
- Not equal to: `!:`
- Greater than: `>`
- Less than: `<`
- Greater than or equal to: `>:`
- Less than or equal to: `<:`
- And: `,`
- Or: `|`
- Like: `~`
- Contains: `~*`

### Example Queries

- `id: 1` - Equal to
- `id: 1, name: John` - AND condition
- `id: 1 | id: 2` - OR condition
- `id: 1, age > 18` - Greater than
- `age >: 18, age <: 32` - Range query
- `name ~ John*` - Starts with
- `name ~ *John*` - Contains

## Examples

### Fetching Data

```typescript
// Get all recipes
const recipes = await Api.get("/recipes");

// Get recipes with pagination and sorting
const recipes = await Api.get("/recipes", {
  page: "1",
  sort: "-created_at"
});

// Get recipes with search filter
const recipes = await Api.get("/recipes", {
  search: "category: dessert, is_deleted: false"
});

// Get specific fields
const recipes = await Api.get("/recipes", {
  fields: "id, title, description, image"
});
```

### Creating Data

```typescript
// Create a new recipe
const newRecipe = await Api.post("/recipes", {
  body: {
    title: "Chocolate Cake",
    description: "Delicious chocolate cake recipe",
    ingredients: ["flour", "sugar", "cocoa powder"]
  }
});
```

### Updating Data

```typescript
// Update a recipe
const updatedRecipe = await Api.put("/recipes/123", {
  body: {
    title: "Updated Chocolate Cake"
  }
});
```

### Deleting Data

```typescript
// Soft delete (recommended)
const deletedRecipe = await Api.put("/recipes/123", {
  body: { is_deleted: true }
});

// Hard delete (use with caution)
const deletedRecipe = await Api.delete("/recipes/123");
```

## Best Practices

1. **Use soft deletes**: Instead of hard deleting records, set an `is_deleted` flag to true
2. **Specify fields**: Only request the fields you need to reduce payload size
3. **Use session tokens**: For user-specific operations, include the session token
4. **Use filters**: Apply filters to limit data access based on user permissions

For more information, visit the [FrontQL documentation](https://frontql.dev/guides/get-started/).
