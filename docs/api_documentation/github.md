# Github API

### Generate bearer token

Generate the bearer token with code from user frontend github ouath, then encrype and store the token in our database.

- URL: `POST /api/github/oauth`
  - content-type: `application/json`
  - body: object
    - code: (string) code get from github oauth
- Authentication:
  - users must be authenticated to execute code
  - need valid sesssion (see Users API documentation)
- response: 200
  - content-type: `application/json`
  - body: object
    - github aouth success
- response: 400
  - content-type: `application/json`
  - body: object
    - err: missing code
- response: 500
  - content-type: `application/json`
  - body: object
    - err: github authorize fail

### Get all repos for the authenticated user

- URL: `GET /api/github/repos`
  - content-type: `application/json`
- Authentication:
  - users must be authenticated to execute code
  - need valid sesssion (see Users API documentation)
  - user need to have a bear token associated with them in our database
- response: 200
  - content-type: `application/json`
  - body: object
    - ["repo name", "repo name", ... ]
- response: 400
  - content-type: `application/json`
  - body: object
    - err: can not find a token
- response: 403
  - content-type: `application/json`
  - body: object
    - err: access github failed

### Save a file to the authenticated user's repo

- URL: `POST /api/github/repos/:owner/:repo/`
  - content-type: `application/json`
  - param: object
    - owner: (string) owner of the repo
    - repo: (string) name of the repo
  - body: object
    - path: (string) path of the file
    - message: (string) user commit message
    - content: (string) file content
- Authentication:
  - users must be authenticated to execute code
  - need valid sesssion (see Users API documentation)
  - user need to have a bear token associated with them in our database
- response: 200
  - content-type: `application/json`
  - body: object
    - ${file name}
- response: 400
  - content-type: `application/json`
  - body: object
    - err: missing ${param}
- response: 400
  - content-type: `application/json`
  - body: object
    - err: missing ${body}
- response: 400
  - content-type: `application/json`
  - body: object
    - err: file name too long
- response: 400
  - content-type: `application/json`
  - body: object
    - err: file contains invalid character
- response: 422
  - content-type: `application/json`
  - body: object
    - err: file already exists
- response: 403
  - content-type: `application/json`
  - body: object
    - err: access github failed
 

