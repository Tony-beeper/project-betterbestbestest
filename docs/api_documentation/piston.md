# Piston API

### Execute Code

-   URL: `POST /api/piston/execute`
    -   content-type: `application/json`
    -   body: object
        -   content: (string) the python code to execute
-   Authentication:
    -   users must be authenticated to execute code
    -   need valid sesssion (see Users API documentation)
-   response: 200
    -   content-type: `application/json`
    -   body: object
        -   language: (string) Programming language of executed code
        -   version: (string) Language version number
        -   run: object
            -   stdout: (string) stdout of executed code
            -   stderr: (string) stderr of executed code
            -   output: (string) stdout and stderr combined in order of executed code
            -   signal: (string) signal from executed code or null
            -   code: (number) exit code from executed code
-   response: 400
    -   content-type: `application/json`
    -   body: object
        -   err: (string) missing content
-   response: 401
    -   content-type: `application/json`
    -   body: object
        -   err: (string) Access Denied
-   response: 500
    -   content-type: `application/json`
    -   body: object
        -   err: (string) Piston request failed
