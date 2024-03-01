# API Documentation

## Table of Contents


1. [Users](#base-url-users)
2. [Sprints](#base-url-sprint)
3. [Modules](#base-url-module)
4. [Roles](#base-url-role)
5. [Statuses](#base-url-status)
6. [Test-Module](#base-url-testmodule)
7. [Testing](#base-url-testing)
8. [Test Steps](#base-url-testtestidteststeps)
9. [Tests](#base-url-test)

## <a name="users"></a>Users

### Base URL: `/users`

#### Endpoints:

- **GET `/`**: Retrieve all users
    - **Example Request:**
      ```bash
      curl http://localhost:3000/users
      ```
    - **Example Response:**
      ```json
      [
        {
          "userid": 1,
          "email": "admin",
          "roleid": 1,
          "password": "$2a$12$vsDm8ca0k/BhR/FiCVJn3.dUoUMw2.x64T2PmgAAnfvFI7pUA.FrC"
        },
        {
          "userid": 2,
          "email": "developer",
          "roleid": 2,
          "password": "$2a$12$JtIJIApdrVJL3KKctEERJOXfMc2bXzawugrLoeUllGERgDOm6IuuS"
        },
        {
          "userid": 3,
          "email": "tester",
          "roleid": 3,
          "password": "$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy"
        },
        {
          "userid": 4,
          "email": "tester2",
          "roleid": 3,
          "password": "$2a$12$Tx9Ny6wMjMLtjEmG52/k1OSveL7ZHY7oBfbeQy22hUQM4hLC5Yscy"
        }
      ]
      ```

- **GET `/mappedRoles`**: Retrieve users with mapped roles
    - **Example Request:**
      ```bash
      curl http://localhost:3000/users/mappedRoles
      ```
    - **Example Response:**
      ```json
      [
        {
          "userid": 1,
          "email": "admin",
          "role": "admin"
        },
        {
          "userid": 2,
          "email": "developer",
          "role": "developer"
        },
        {
          "userid": 3,
          "email": "tester",
          "role": "tester"
        },
        {
          "userid": 4,
          "email": "tester2",
          "role": "tester"
        }
      ]
      ```

- **GET `/allUsernames`**: Retrieve a list of all usernames
    - **Example Request:**
      ```bash
      curl http://localhost:3000/users/allUsernames
      ```
    - **Example Response:**
      ```json
       [
      {
        "email": "admin",
        "userid": 1
      },
      {
        "email": "developer",
        "userid": 2
      },
      {
       "email": "tester",
        "userid": 3
      },
      {
        "email": "tester2",
        "userid": 4
      }

      ]

      ```

- **GET `/:userid/email`**: Retrieve the username for a specific user by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/users/1/email
      ```
    - **Example Response:**
      ```json
      {
        "email": "admin"
      }
      ```

- **POST `/`**: Create a new user
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"email": "newuser", "roleid": 2, "password": "newuserpassword"}'
      ```
    - **Example Response (Empty Body):**
      ```json
      {
        "message": [
          "Required email attribute is missing",
          "Required password attribute is missing",
          "Required roleid attribute is missing"
        ]
      }
      ```

- **PUT `/:userid`**: Edit a user by ID
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"email": "editeduser", "roleid": 3}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "User updated successfully"
      }
      ```

- **DELETE `/:userid`**: Delete a user

by ID

- **Example Request:**
  ```bash
  curl -X DELETE http://localhost:3000/users/1
  ```
- **Example Response:**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

Certainly! I'll continue with the remaining sections in the same detailed format.

## <a name="sprints"></a>Sprints

### Base URL: `/sprint`

#### Endpoints:

- **GET `/`**: Retrieve all sprints
    - **Example Request:**
      ```bash
      curl http://localhost:3000/sprint
      ```
    - **Example Response:**
      ```json
      [
        {
          "sprintid": 1,
          "title": "Sprint 0",
          "startdate": "2024-01-20T23:00:00.000Z",
          "duedate": "2024-01-30T23:00:00.000Z"
        }
        // Additional sprints...
      ]
      ```
- **GET `/:sprintId`**: Retrieve a specific sprint by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/sprint/1
      ```
    - **Example Response:**
      ```json
      {
        "sprintid": 1,
        "title": "Sprint 0",
        "startdate": "2024-01-20T23:00:00.000Z",
        "duedate": "2024-01-30T23:00:00.000Z"
      }
      ```
- **POST `/`**: Add a new sprint
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/sprint -H "Content-Type: application/json" -d '{"title": "New Sprint", "startdate": "2024-03-10T23:00:00.000Z", "duedate": "2024-03-20T23:00:00.000Z"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Sprint added successfully"
      }
      ```
- **POST `/:sprintid`**: Restarts a sprint
  - **Example Request:**
    ```bash
    curl -X POST http://localhost:3000/sprint/1 -H "Content-Type: application/json" -d '{"title": "Restarted Sprint 1", "startdate": "2024-03-10T23:00:00.000Z", "duedate": "2024-03-20T23:00:00.000Z"}'
    ```
  - **Example Response:**
    ```json
    {
      "message": "Sprint added successfully"
    }
    ```
- **PUT `/:sprintId`**: Edit a sprint by ID
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/sprint/1 -H "Content-Type: application/json" -d '{"title": "Updated Sprint", "startdate": "2024-03-10T23:00:00.000Z", "duedate": "2024-03-25T23:00:00.000Z"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Sprint updated successfully"
      }
      ```
- **DELETE `/:sprintId`**: Remove a sprint by ID
    - **Example Request:**
      ```bash
      curl -X DELETE http://localhost:3000/sprint/1
      ```
    - **Example Response:**
      ```json
      {
        "message": "Sprint removed successfully"
      }
      ```

## <a name="modules"></a>Modules

### Base URL: `/module`

#### Endpoints:

- **GET `/`**: Retrieve all modules
    - **Example Request:**
      ```bash
      curl http://localhost:3000/module
      ```
    - **Example Response:**
      ```json
      [
        {"moduleid": 1, "label": "LogIn Page"},
        {"moduleid": 2, "label": "Register Page"},
        {"moduleid": 3, "label": "Home Page"},
        {"moduleid": 4, "label": "Users Page"}
        // Additional modules...
      ]
      ```
- **GET `/:moduleid`**: Retrieve a specific module by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/module/1
      ```
    - **Example Response:**
      ```json
      {
        "moduleid": 1,
        "label": "LogIn Page"
      }
      ```
- **POST `/`**: Create a new module
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/module -H "Content-Type: application/json" -d '{"label": "New Module Label"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Module added successfully"
      }
      ```
- **PUT `/:moduleid`**: Edit a module by ID
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/module/1 -H "Content-Type: application/json" -d '{"label": "Edited Module Label"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Module updated successfully"
      }
      ```
    - **DELETE `/:moduleid`**: Delete a module by ID
        - **Example Request:**
      ```bash
        curl -X DELETE http://localhost:3000/module/1
      ```
  - **Example Response:**

    ```json
    {
      "message": "Module deleted successfully"
    }

## <a name="roles"></a>Roles

### Base URL: `/role`

#### Endpoints:

- **GET `/`**: Retrieve all roles
    - **Example Request:**
      ```bash
      curl http://localhost:3000/role
      ```
    - **Example Response:**
      ```json
      [
        {"roleid": 1, "name": "Admin"},
        {"roleid": 2, "name": "Developer"},
        {"roleid": 3, "name": "Tester"}
        // Additional roles...
      ]
      ```
- **GET `/:roleid`**: Retrieve a specific role by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/role/1
      ```
    - **Example Response:**
      ```json
      {
        "roleid": 1,
        "name": "Admin"
      }
      ```
- **POST `/`**: Create a new role
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/role -H "Content-Type: application/json" -d '{"name": "New Role"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Role added successfully"
      }
      ```
- **PUT `/:roleid`**: Edit a role by ID
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/role/1 -H "Content-Type: application/json" -d '{"name": "Edited Role"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Role updated successfully"
      }
      ```
- **DELETE `/:roleid`**: Delete a role by ID
    - **Example Request:**
      ```bash
      curl -X DELETE http://localhost:3000/role/1
      ```
    - **Example Response:**
      ```json
      {
        "message": "Role deleted successfully"
      }
      ```

## <a name="statuses"></a>Statuses

### Base URL: `/status`

#### Endpoints:

- **GET `/`**: Retrieve all statuses
    - **Example Request:**
      ```bash
      curl http://localhost:3000/status
      ```
    - **Example Response:**
      ```json
      [
        {"statusid": 1, "name": "To Do"},
        {"statusid": 2, "name": "In Progress"},
        {"statusid": 3, "name": "Done"}
        // Additional statuses...
      ]
      ```
- **GET `/:statusid`**: Retrieve a specific status by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/status/1
      ```
    - **Example Response:**
      ```json
      {
        "statusid": 1,
        "name": "To Do"
      }
      ```

## <a name="testmodule"></a>Test-Module

### Base URL: `/testmodule`

#### Endpoints:

- **GET `/`**: Retrieve all test-module relationships
    - **Example Request:**
      ```bash
      curl http://localhost:3000/testmodule
      ```
    - **Example Response:**
      ```json
      [
          {
              "testid": 1,
              "moduleid": 1
          },
          {
              "testid": 1,
              "moduleid": 4
          },
          {
              "testid": 2,
              "moduleid": 2
          },
          {
              "testid": 2,
              "moduleid": 3
          },
          {
              "testid": 3,
              "moduleid": 3
          },
          {
              "testid": 4,
              "moduleid": 1
          },
          {
              "testid": 4,
              "moduleid": 2
          },
          {
              "testid": 4,
              "moduleid": 3
          },
          {
              "testid": 4,
              "moduleid": 4
          },
          {
              "testid": 5,
              "moduleid": 3
          },
          {
              "testid": 5,
              "moduleid": 4
          },
          {
              "testid": 6,
              "moduleid": 2
          },
          {
              "testid": 7,
              "moduleid": 3
          },
          {
              "testid": 7,
              "moduleid": 4
          },
          {
              "testid": 8,
              "moduleid": 1
          },
          {
              "testid": 9,
              "moduleid": 2
          },
          {
              "testid": 9,
              "moduleid": 2
          },
          {
              "testid": 10,
              "moduleid": 3
          },
          {
              "testid": 11,
              "moduleid": 1
          },
          {
              "testid": 11,
              "moduleid": 2
          },
          {
              "testid": 11,
              "moduleid": 4
          },
          {
              "testid": 12,
              "moduleid": 3
          },
          {
              "testid": 13,
              "moduleid": 1
          },
          {
              "testid": 14,
              "moduleid": 2
          },
          {
              "testid": 15,
              "moduleid": 4
          },
          {
              "testid": 15,
              "moduleid": 3
          },
          {
              "testid": 16,
              "moduleid": 2
          },
          {
              "testid": 16,
              "moduleid": 1
          },
          {
              "testid": 16,
              "moduleid": 3
          },
          {
              "testid": 17,
              "moduleid": 1
          },
          {
              "testid": 17,
              "moduleid": 4
          },
          {
              "testid": 18,
              "moduleid": 2
          }
      ]
      ```
- **GET `/test/:testid`**: Retrieve test-module relationships for a specific test by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/testmodule/test/1
      ```
    - **Example Response:**
      ```json
      [
          {
              "testid": 1,
              "moduleid": 1
          },
          {
              "testid": 1,
              "moduleid": 4
          }
      ]
      ```
- **GET `/module/:moduleid`**: Retrieve test-module relationships for a specific module by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/testmodule/module/1
      ```
    - **Example Response:**
      ```json
      [
          {
              "testid": 1,
              "moduleid": 1
          },
          {
              "testid": 4,
              "moduleid": 1
          },
          {
              "testid": 11,
              "moduleid": 1
          },
          {
              "testid": 16,
              "moduleid": 1
          },
          {
              "testid": 17,
              "moduleid": 1
          },
          {
              "testid": 13,
              "moduleid": 1
          }
      ]
      ```
- **POST `/`**: Create a new test-module
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/testmodule -H "Content-Type: application/json" -d '{"testid": 1, "moduleid": 1}'
      ```
    - **Example Response:**
      ```json
      {
          "message": "Test-module  added successfully"
      }
      ```
- **DELETE `/:id`**: Delete a test-module relationship by ID
    - **Example Request:**
      ```bash
      curl -X DELETE http://localhost:3000/testmodule/1
      ```
    - **Example Response:**
      ```json
      {
          "message": "Test-module  deleted successfully"
      }
      ```

## <a name="testing"></a>Testing

### Base URL: `/testing`

#### Endpoints:

- **GET `/`**: Retrieve all tests
    - **Example Request:**
      ```bash
      curl http://localhost:3000/testing
      ```
    - **Example Response:**
      ```json
      [
        {
          "sprintid": 1,
          "testid": 14,
          "statusid": 1,
          "userid": 1,
          "completiondate": null
        },
        {
          "sprintid": 1,
          "testid": 4,
          "statusid": 1,
          "userid": null,
          "completiondate": null
        },
        // Additional tests...
      ]
      ```

- **GET `/:sprintid/assignee/:testid`**: Retrieve test assignee information for a specific test in a sprint
    - **Example Request:**
      ```bash
      curl http://localhost:3000/testing/:sprintid/assignee/:testid
      ```
    - **Example Response:**
      ```json
      {
        "testid": 1,
        "assignee": "User 1"
      }
      ```

- **PUT `/:sprintid/status/:testid`**: Update the status of a test in a sprint
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/testing/:sprintid/status/:testid -H "Content-Type: application/json" -d '{"statusid": 2}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test status updated successfully"
      }
      ```

- **PUT `/:sprintid/assignee/:testid`**: Update the assignee of a test in a sprint
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/testing/:sprintid/assignee/:testid -H "Content-Type: application/json" -d '{"assignee": "User 2"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test assignee updated successfully"
      }
      ```

- **POST `/`**: Create a new test
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/testing -H "Content-Type: application/json" -d '{"name": "New Test", "statusid": 1}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test added successfully"
      }
      ```


## <a name="test"></a>Test

### Base URL: `/test`

#### Endpoints:

- **GET `/`**: Retrieve all tests
    - **Example Request:**
      ```bash
      curl http://localhost:3000/test
      ```
    - **Example Response:**
      ```json
      [
        {
          "testid": 1,
          "name": "Check if first and last name are added correctly",
          "description": "first and last name shall be correct",
          "lastupdate": "2024-01-25T23:00:00.000Z"
        },
        {
          "testid": 2,
          "name": "Check if wrong passwords are rejected",
          "description": "wrong passwords shall be rejected",
          "lastupdate": "2024-01-25T23:00:00.000Z"
        },
        // Additional tests...
      ]
      ```

- **GET `/:testid`**: Retrieve a specific test by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/test/:testid
      ```
    - **Example Response:**
      ```json
      {
        "testid": 1,
        "name": "Check if first and last name are added correctly",
        "description": "first and last name shall be correct",
        "lastupdate": "2024-01-25T23:00:00.000Z"
      }
      ```

- **GET `/:testid/weight`**: Retrieve the total weight of a specific test
    - **Example Request:**
      ```bash
      curl http://localhost:3000/test/:testid/weight
      ```
    - **Example Response:**
      ```json
      {
        "totalWeight": 5
      }
      ```

- **PUT `/:testid`**: Update a specific test by ID
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/test/:testid -H "Content-Type: application/json" -d '{"name": "Updated Test Name", "description": "Updated test description"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test updated successfully"
      }
      ```

- **DELETE `/:testid`**: Delete a specific test by ID
    - **Example Request:**
      ```bash
      curl -X DELETE http://localhost:3000/test/:testid
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test deleted successfully"
      }
      ```

- **POST `/`**: Create a new test
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/test -H "Content-Type: application/json" -d '{"name": "New Test", "description": "Description of the new test"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test added successfully"
      }
      ```

## <a name="teststep"></a>TestStep

### Base URL: `/test/:testid/teststeps`

#### Endpoints:

- **GET `/`**: Retrieve all test steps for a specific test
    - **Example Request:**
      ```bash
      curl http://localhost:3000/test/:testid/teststeps
      ```
    - **Example Response:**
      ```json
      [
        {
          "stepid": 1,
          "name": "Step 1",
          "description": "Description of Step 1"
        },
        {
          "stepid": 2,
          "name": "Step 2",
          "description": "Description of Step 2"
        },
        // Additional test steps...
      ]
      ```

- **GET `/:stepid`**: Retrieve a specific test step by ID
    - **Example Request:**
      ```bash
      curl http://localhost:3000/test/:testid/teststeps/:stepid
      ```
    - **Example Response:**
      ```json
      {
        "stepid": 1,
        "name": "Step 1",
        "description": "Description of Step 1"
      }
      ```

- **PUT `/:stepid`**: Update a specific test step by ID
    - **Example Request:**
      ```bash
      curl -X PUT http://localhost:3000/test/:testid/teststeps/:stepid -H "Content-Type: application/json" -d '{"name": "Updated Step Name", "description": "Updated step description"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test step updated successfully"
      }
      ```

- **DELETE `/:stepid`**: Delete a specific test step by ID
    - **Example Request:**
      ```bash
      curl -X DELETE http://localhost:3000/test/:testid/teststeps/:stepid
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test step deleted successfully"
      }
      ```

- **POST `/`**: Create a new test step for a specific test
    - **Example Request:**
      ```bash
      curl -X POST http://localhost:3000/test/:testid/teststeps -H "Content-Type: application/json" -d '{"name": "New Test Step", "description": "Description of the new test step"}'
      ```
    - **Example Response:**
      ```json
      {
        "message": "Test step added successfully"
      }
      ```



      

      


      


