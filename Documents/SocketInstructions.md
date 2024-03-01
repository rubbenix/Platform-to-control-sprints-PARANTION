Certainly! I've updated the usage guide to include the additional information about sending a "notify" command to receive blocker updates.

---

# WebSocket Server for Blocker Notifications - Usage Guide

1. The server will start, listening at `ws://localhost:3001`.

## Client Interaction:

### 1. Authentication:

- To authenticate, send a JSON message with your email and password:
  ```json
  {
    "command": "authenticate",
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```

  **Example:**
  ```javascript
  ws.send('{"command": "authenticate", "email": "john.doe@example.com", "password": "securepassword"}');
  ```

  - Upon successful authentication, receive a success message. In case of authentication failure, get notified.

### 2. Subscription:

- After successful authentication, subscribe to receive blocker notifications:
  ```json
  {
    "command": "subscribe"
  }
  ```

  **Example:**
  ```javascript
  ws.send('{"command": "subscribe"}');
  ```

  - Upon successful subscription, receive a confirmation message and start receiving blocker updates.

### 3. Blocker Updates:

- To start receiving blocker updates, send a "notify" command with a valid token:
  ```json
  {
    "command": "notify",
    "token": "your-authentication-token"
  }
  ```

  **Example:**
  ```javascript
  ws.send('{"command": "notify", "token": "LrNz0wGflK67oQmu8MVthntnvbzTBkmH"}');
  ```

  - The server fetches blockers every 3 seconds, and subscribed clients automatically receive these updates.
--