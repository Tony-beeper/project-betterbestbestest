import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/monokai-sublime.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

import ReconnectingWebSocket from "reconnecting-websocket";
import sharedb from "sharedb/lib/client";
import richText from "rich-text";

import { useEffect, useState } from "react";

const collection = "code";
const id = "richtext";
sharedb.types.register(richText.type);
const socket = new ReconnectingWebSocket("ws://localhost:8080");
const connection = new sharedb.Connection(socket);
const doc = connection.get(collection, id);

function CodeEditor() {
  const [pageContent, setPageContent] = useState({});

  useEffect(() => {
    doc.subscribe((error) => {
      doc.on("op", function (op, source) {
        if (source) return;
        console.log(op);
        setPageContent(op);
      });
    });
  }, []);
  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getContents());
    doc.submitOp(editor.getContents());
  };
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("python", python);

  const modules = {
    syntax: {
      highlight: (text) => hljs.highlight(text, { language: "python" }).value,
    },
    toolbar: [["code-block"]],
  };
  return (
    <div>
      <ReactQuill
        modules={modules}
        onChange={handleChange}
        value={pageContent}
      />
    </div>
  );
}

export default CodeEditor;
