# Proposal

### Project title: Pair programming Tool

### Team Members

- Colin Lin
- Shengsong Xu
- Youxin Tan

### Team name: BetterBestBestest

### Description of the web application

- Code editor that allows participants to write code collaboratively in real time
- Users can join and create their own rooms
- Users can run their code and see the console output
- Integration with github so that users can access and save code in their repositories

### 3+ concepts used for the challenge factor, and how each concept will be applied

1.  OAuth 2.0 Client
    - OAuth with github to save and access code in repos
2.  Real-time interactions
    - Websockets and ShareDB to allow for real time collaboration
3.  Users can see each other’s edits and cursor in real time Worker
    - Background process to execute user submitted code
4.  Non-trivial frontend
    - Code editor and console output from code execution

### List the key features that would be completed by the beta version

- User can create/login to an account
- User can create a pair programming room
- User can join pair programming room with join code
- Each room can have 1-2 people
- All room members can code and see the other user’s changes in real time
- Users can upload text files from their computer and insert into code or text blocks of notebook
- Supports one language (python)

### List the additional features that would be completed by the final version

- Users can OAuth with Github to save their code in a repository
- Import code directly from Github
- Users can execute their code. Code is run by server and users can see console output
- Code executed by the server is sanitized and run in a sandbox

### Describe the tech stack that would be used to build the application

- **Frontend**
  - React
  - Typescript
  - Codemirror
    - Code editor component
    - https://codemirror.net/
  - MUI
    - React UI component library
    - https://mui.com/
  - ws
    - Websocket library
    - https://github.com/websockets/ws
- **Backend**
  - Express/Node.js
  - Typescript
  - ShareDB
    - Realtime database backend based on Operation Transformation
    - https://github.com/share/sharedb
  - Judge0
    - Open source code executing system with hosting options
    - https://judge0.com/
  - ws
    - Websocket library
    - https://github.com/websockets/ws
  - Database
    - MongoDB
  - Project management
    - Trello

### The method of deployment

- Dockerise frontend and backend
- Deploy Docker container to VM on Digital Ocean

## How to run

start backend before frontend

- backend
  - `cd backend`
  - `npm install`
  - `npm run start`
- frontend
  - `cd frontend`
  - `npm install`
  - `npm start`
