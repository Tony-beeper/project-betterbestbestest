import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
import richText from "rich-text";
import CodeBlock from "../CodeBlock/CodeBlock";
import TextBlock from "../TextBlock/TextBlock";
import "./Notebook.css";
import { useEffect, useState } from "react";
import roomsAPI from "../../api/rooms";

sharedb.types.register(richText.type);
const socket = new ReconnectingWebSocket(process.env.REACT_APP_WS_URL);
const connection = new sharedb.Connection(socket);

function NoteBook() {
  const [codeBlockDoc, setCodeBlockDoc] = useState(null);
  const [textBlockDoc, setTextBlockDoc] = useState(null);
  useEffect(() => {
    // hardcoded sharedb connection
    const testRoomId = "62c06afc2261e5a9d8806395";
    const testRoomName = "colintestDONTDELETE";
    roomsAPI.getRoom(testRoomId).then((data) => {
      setCodeBlockDoc(
        connection.get(testRoomName + "_code", data.code_sharedbID)
      );
      setTextBlockDoc(
        connection.get(testRoomName + "_comment", data.comment_sharedbID)
      );
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
