# User API

### Sign up

- URL: `POST /api/user/signup`
  - content-type: `application/json`
  - body: object
    - username: (string) the user name of the user
    - password: (string) passcode for user account
- Authentication:
  - no authentication needed
- response: 200
  - content-type: `application/json`
  - cookie: browser cookies
    - Session Cookies
    - Secure Cookies: username cookie
  - body: object
    - Message: Sign up success
- response: 409
  - content-type: `application/json`
  - body: object
    - Message: Username Taken
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) missing content
- response: 500
  - content-type: `application/json`
  - body: object
    - err: (string) "Error saving user to database" or "Bcrypt Error"


### Login 

- URL: `POST /api/user/login`
  - content-type: `application/json`
  - body: object
    - username: (string) the user name of the user
    - password: (string) passcode for user account
- Authentication:
  - no authentication needed
- response: 200
  - content-type: `application/json`
  - cookie: browser cookies
    - Session Cookies
    - Secure Cookies: username cookie
  - body: object
    - Message: Login success
- response: 401
  - content-type: `application/json`
  - body: object
    - err: "error message" or "wrong username or password"
- response: 404
  - content-type: `application/json`
  - body: object
    - err: wrong username or password
- response: 500
  - content-type: `application/json`
  - body: object
    - err: (string) "Error when accessing database"

### Sign out
- response: 200
  - content-type: `application/json`
  - body: object
    - err: (string) "Cookie Cleared"
