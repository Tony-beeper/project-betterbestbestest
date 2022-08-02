
# Room API

### Create a room

- URL: `POST /api/rooms/username`
  - content-type: `application/json`
  - body: object
    - username: (string) name of user who want to create the room
    - roomName: (string) name of the room
- Authentication:
  - users must be authenticated by signin
  - need valid sesssion (see Users API documentation)
- response: 200
  - content-type: `application/json`
  - body: object
    - joinCode: join code,
    - owner: room owner,
    - commentSharedbID: id for access the room's sharedb comment block,
    - codeSharedbID: id for access the room's sharedb code block,
    - members: users in this room,
    - roomNumber: room number,
    - name: room name,
    - date: room created date,
    - _id: room Id,
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) wrong or missing ${body}
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) exceed number of rooms allowed per user
- response: 500
  - content-type: `application/json`
  - body: object
    - err: (string) unable to create the room

### Delete a room

- URL: `DELETE /api/rooms/:roomId/`
  - content-type: `application/json`
  - param: object
    - roomId: (string) room Id
- Authentication:
  - users must be authenticated by signin
  - need valid sesssion (see Users API documentation)
- response: 200
  - content-type: `application/json`
  - body: object
    - joinCode: join code,
    - owner: room owner,
    - commentSharedbID: id for access the room's sharedb comment block,
    - codeSharedbID: id for access the room's sharedb code block,
    - members: users in this room,
    - roomNumber: room number,
    - name: room name,
    - date: room created date,
    - _id: room Id,
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) wrong or missing ${param}
- response: 404
  - content-type: `application/json`
  - body: object
    - err: (string) room does not exist

### Get user's rooms

- URL: `GET /api/rooms/all/:username/`
  - content-type: `application/json`
  - param: object
    - username: (string) username
- Authentication:
  - users must be authenticated by signin
  - need valid sesssion (see Users API documentation)
- response: 200
  - content-type: `application/json`
  - body: object
    - [{room object}, {room object} ...]
    
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) wrong or missing ${param}

### Get a room

- URL: `GET /api/rooms/:roomId/`
  - content-type: `application/json`
  - param: object
    - roomId: (string) roomId
- Authentication:
  - users must be authenticated by signin
  - need valid sesssion (see Users API documentation)
- response: 200
  - content-type: `application/json`
  - body: object
    - joinCode: join code,
    - owner: room owner,
    - commentSharedbID: id for access the room's sharedb comment block,
    - codeSharedbID: id for access the room's sharedb code block,
    - members: users in this room,
    - roomNumber: room number,
    - name: room name,
    - date: room created date,
    - _id: room Id,
    
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) wrong or missing ${param}

- response: 404
  - content-type: `application/json`
  - body: object
    - err: (string) room Not Found

### Join a room

- URL: `PATCH /api/rooms/join/`
  - content-type: `application/json`
  - body: object
    - joinCode: (string) join code
    - roomNumber: (string) room number
- Authentication:
  - users must be authenticated by signin
  - need valid sesssion (see Users API documentation)
- response: 200
  - content-type: `application/json`
  - body: object
    - joinCode: join code,
    - owner: room owner,
    - commentSharedbID: id for access the room's sharedb comment block,
    - codeSharedbID: id for access the room's sharedb code block,
    - members: users in this room,
    - roomNumber: room number,
    - name: room name,
    - date: room created date,
    - _id: room Id,
    
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) wrong or missing ${body}

- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) wrong roomId or join code

- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) room already full

- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) you join the room already

### Leave a room

- URL: `PATCH /api/rooms/leave/`
  - content-type: `application/json`
  - body: object
    - roomId: (string) room Id
- Authentication:
  - users must be authenticated by signin
  - need valid sesssion (see Users API documentation)
- response: 200
  - content-type: `application/json`
  - body: object
    - joinCode: join code,
    - owner: room owner,
    - commentSharedbID: id for access the room's sharedb comment block,
    - codeSharedbID: id for access the room's sharedb code block,
    - members: users in this room,
    - roomNumber: room number,
    - name: room name,
    - date: room created date,
    - _id: room Id,
    
- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) wrong or missing ${body}

- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) room does not exist

- response: 400
  - content-type: `application/json`
  - body: object
    - err: (string) you need to join first
