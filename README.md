# Tasks Management API

This is a simple API for managing tasks. It allows you to create, read, update and delete tasks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and MongoDB installed on your machine.

### Installing

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install`.
3. Create a `.env` file in the root of the project and add the following environment variables:
4. Start the server by running `npm run start:dev`.

### Routes

The following routes are available:

| Method | Route | Description |
|--------|-------|-------------|
| POST   | /auth/register | Register a new user |
| POST   | /auth/login | Log in an existing user |
| GET    | /tasks | Get all tasks |
| GET    | /tasks/:id | Get a single task by ID |
| POST   | /tasks | Create a new task |
| PUT    | /tasks/:id | Update a task by ID |
| DELETE | /tasks/:id | Delete a task by ID |

### Pagination

To paginate the results for the `/tasks` route, you can add the following query parameters:

| Parameter | Description |
|-----------|-------------|
| page      | The page number to retrieve (default is 1) |
| limit     | The number of items to retrieve per page (default is 10) |

### Testing

You can run the tests by running the following:

```bash
npm run test
npm run test:e2e
```

### Environment Variable
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_secret_key

### Author

Arvin Kent Lazaga
- Email: arvinkent121816@gmail.com
- LinkedIn: https://www.linkedin.com/in/arvin-kent-lazaga-895783a8/


