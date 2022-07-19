import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
import richText from "rich-text";
import CodeBlock from "../../components/CodeBlock/CodeBlock";
import TextBlock from "../../components/TextBlock/TextBlock";
import "./Notebook.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import roomsAPI from "../../api/rooms";
import errorHandler from "../../utils/ErrorHandler";
import UserNameList from "../../components/UserNameList/UserNameList";

sharedb.types.register(richText.type);
const socket = new ReconnectingWebSocket(process.env.REACT_APP_WS_URL);
const connection = new sharedb.Connection(socket);

function NoteBook() {
  const nav = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [codeBlockDoc, setCodeBlockDoc] = useState(null);
  const [textBlockDoc, setTextBlockDoc] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState({});

  useEffect(() => {
    // hardcoded sharedb connection
    const testRoomId = id;
    roomsAPI
      .getRoom(testRoomId)
      .then((data) => {
        setData(data);
        setCodeBlockDoc(connection.get(id + "_code", data.codeSharedbID));
        setTextBlockDoc(connection.get(id + "_comment", data.commentSharedbID));
      })
      .catch(({ response }) => {
        errorHandler.handleError(response);
        nav("../room");
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let filteredUserInRoom = {};
      const timeNow = new Date();
      for (let user in usersInRoom) {
        console.log(timeNow - new Date(usersInRoom[user]));
        if (timeNow - new Date(usersInRoom[user]) <= 5000) {
          filteredUserInRoom[user] = usersInRoom[user];
        }
      }
      setUsersInRoom(filteredUserInRoom);
    }, 10000);

    return () => {
      console.log(`clear room ${interval}`);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log(usersInRoom);
  }, [usersInRoom]);

  const join = (joinInfo) => {
    let filteredUserInRoom = usersInRoom;
    filteredUserInRoom[[joinInfo.join_name]] = joinInfo.join_time;
    console.log(filteredUserInRoom);
    setUsersInRoom(filteredUserInRoom);
  };

  return (
    <div className="notebook-container">
      <div className="notebook-body">
        <div className="notebook-title">
          <h1>{data && data.name}</h1>
          <UserNameList users={Object.keys(usersInRoom)} />
        </div>
        <div className="notebook-content">
          {codeBlockDoc && (
            <CodeBlock
              doc={codeBlockDoc}
              collection={`${id}_code`}
              id={data.codeSharedbID}
              join={join}
            />
          )}
          {textBlockDoc && <TextBlock doc={textBlockDoc} />}
        </div>
      </div>
    </div>
  );
}

export default NoteBook;
