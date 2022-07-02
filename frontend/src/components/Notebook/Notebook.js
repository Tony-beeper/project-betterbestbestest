import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
import richText from "rich-text";
import CodeBlock from "../CodeBlock/CodeBlock";
import TextBlock from "../TextBlock/TextBlock";
import "./Notebook.css";
import { useEffect, useState } from "react";
import roomsAPI from "../../api/rooms";

sharedb.types.register(richText.type);
const socket = new ReconnectingWebSocket("ws://localhost:8080");
const connection = new sharedb.Connection(socket);
const collection = "code";
const id = "richtext";

function NoteBook() {
  const [codeBlockDoc, setCodeBlockDoc] = useState(null);
  const doc2 = connection.get("code", "id2");
  useEffect(() => {
    const dummyName = "dummy" + Math.floor(Math.random() * 10000);
    // roomsAPI.createRoom(dummyName).then((data) => {
    //   console.log(data);
    //   setCodeBlockDoc(
    //     connection.get(dummyName + "_code", data.newRoom.code_sharedbID)
    //   );
    // });
  }, []);
  return (
    <div className="notebook-container">
      <h1>NoteBook</h1>
      <div className="notebook-body">
        {codeBlockDoc && <CodeBlock doc={codeBlockDoc} />}

        <TextBlock doc={doc2} />
      </div>
    </div>
  );
}

export default NoteBook;
