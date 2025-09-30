# Parallel programming with your friends
<img width="1536" height="818" alt="image" src="https://github.com/user-attachments/assets/b559d799-d289-4d04-8b2d-174e0d29a8c6" />
<img width="1536" height="823" alt="image" src="https://github.com/user-attachments/assets/f64bafb5-7ddd-4139-84f2-5e54299a5b68" />


## Project Demo Link
https://youtu.be/brnRWoJ8780

# Proposal

### Project title: CodeBook

### Team Members

- Colin Lin
- Shengsong Xu
- Youxin Tan

### Team name: BetterBestBestest

### Description of the web application

- Code editor that allows participants to write code collaboratively in real time
- Text editor that allows participants to work collaboratively in real time 
- Users can join and create their own rooms
- Users can run their code and see the console output
- Integration with github so that users can save code in their repositories

### 3+ concepts used for the challenge factor, and how each concept will be applied

1.  OAuth 2.0 Client
    - OAuth with github to save code in repos
2.  Real-time interactions
    - Websockets, ShareDB and Quill to allow for real time collaboration
3.  Worker
    - Background process to execute user submitted code
4.  Non-trivial frontend
    - Reatltime Code editor, Richtext editor, and console output from code execution

### List the key features that would be completed by the beta version

- User can create/login to an account
- User can create a pair programming room
- User can join pair programming room with room number and join code
- Each room can have 1-3 people
- All room members can type in CodeBlock and TextBlock see the other user’s changes and cursors in real time
- Users can upload .py files from their computer and insert into code block of notebook
- Users can upload .txt files from their computer and insert into text block of notebook
- Supports one language (python)

### List the additional features that would be completed by the final version

- Users can OAuth with Github to save their code in a repository
- Users can execute their code. Code is run by server and users can see console output
- Code executed by the server is run in a sandboxed environment

### Describe the tech stack that would be used to build the application

- **Frontend**
  - React
  - Quill
    - Code editor component
    - https://quilljs.com/
  - MUI
    - React UI component library
    - https://mui.com/
  - ws
    - Websocket library
    - https://github.com/websockets/ws
- **Backend**
  - Express/Node.js
  - ShareDB
    - Realtime database backend based on Operation Transformation
    - https://github.com/share/sharedb
  - Piston
    - Open source code executing system
    - https://github.com/engineer-man/piston
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

## How to run on local

start backend before frontend

- backend
  - `cd backend`
  - `npm install`
  - `npm run dev`
- frontend
  - `cd frontend`
  - `npm install`
  - `npm start`
