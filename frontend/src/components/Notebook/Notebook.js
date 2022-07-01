import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
import richText from "rich-text";
import CodeBlock from "../CodeBlock/CodeBlock";
import TextBlock from "../TextBlock/TextBlock";
import "./Notebook.css";

sharedb.types.register(richText.type);
const socket = new ReconnectingWebSocket("ws://localhost:8080");
const connection = new sharedb.Connection(socket);
const collection = "code";
const id = "richtext";

function NoteBook() {
  const doc1 = connection.get(collection, id);
  const doc2 = connection.get("code", "id2");
  return (
    <div className="notebook-container">
      <h1>NoteBook</h1>
      <div className="notebook-body">
        <CodeBlock doc={doc1} />
        <TextBlock doc={doc2} />
      </div>
    </div>
  );
}

export default NoteBook;
