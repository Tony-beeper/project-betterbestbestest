import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
import richText from "rich-text";
import CodeBlock from "../CodeBlock/CodeBlock";
import TextBlock from "../TextBlock/TextBlock";
import "./Notebook.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import roomsAPI from "../../api/rooms";

sharedb.types.register(richText.type);
const socket = new ReconnectingWebSocket(process.env.REACT_APP_WS_URL);
const connection = new sharedb.Connection(socket);

function NoteBook() {
  let { id } = useParams();
  const [codeBlockDoc, setCodeBlockDoc] = useState(null);
  const [textBlockDoc, setTextBlockDoc] = useState(null);
  useEffect(() => {
    // hardcoded sharedb connection
    const testRoomId = id;
    roomsAPI.getRoom(testRoomId).then((data) => {
      setCodeBlockDoc(connection.get(id + "_code", data.codeSharedbID));
      setTextBlockDoc(connection.get(id + "_comment", data.commentSharedbID));
    });
  }, []);
  return (
    <div className="notebook-container">
      <h1>NoteBook</h1>
      <div className="notebook-body">
        {codeBlockDoc && <CodeBlock doc={codeBlockDoc} />}
        {textBlockDoc && <TextBlock doc={textBlockDoc} />}
      </div>
    </div>
  );
}

export default NoteBook;
