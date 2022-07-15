import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import "react-quill/dist/quill.snow.css";
import "./CodeBlock.css";
import UploadFileForm from "../UploadFileForm";
import tinycolor from "tinycolor2";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CodeBlock(props) {
  let Nav = useNavigate();
  const doc = props.doc;
  const [quill, setQuill] = useState(null);
  let colors = {};

  // hljs.registerLanguage("python", python);
  Quill.register("modules/cursors", QuillCursors);

  useEffect(() => {
    doc.subscribe((err) => {
      if (err) console.log(err);
      initQuill();
    });
  }, []);

  const initQuill = () => {
    const quill = new Quill("#editor-container", {
      modules: {
        syntax: {
          highlight: (text) =>
            hljs.highlight(text, { language: "python" }).value,
        },
        cursors: true,
        toolbar: false,
      },
      theme: "snow", // or 'bubble'
    });
    setQuill(quill);
    // let cursors = quill.getModule("cursors");

    quill.setContents(doc.data);
    quill.formatLine(0, quill.getLength(), { "code-block": true });
    quill.on("text-change", function (delta, oldDelta, source) {
      if (source !== "user") return;
      doc.submitOp(delta, { source: quill });
    });
    doc.on("op", function (op, source) {
      if (source === quill) return;
      quill.updateContents(op);
    });

    doc.on("del", function (data, source) {
      toast.error("room is deleted by the owner");
      Nav("../room");
    });

    // let presence = doc.connection.getDocPresence(props.collection, props.id);

    // presence.subscribe(function (error) {
    //   if (error) throw error;
    //   console.log("down");
    // });

    // let localPresence = presence.create(props.id);
    // console.log(presence);

    // quill.on("selection-change", function (range, oldRange, source) {
    //   // We only need to send updates if the user moves the cursor
    //   // themselves. Cursor updates as a result of text changes will
    //   // automatically be handled by the remote client.
    //   if (source !== "user") return;
    //   // Ignore blurring, so that we can see lots of users in the
    //   // same window. In real use, you may want to clear the cursor.
    //   if (!range) return;
    //   // In this particular instance, we can send extra information
    //   // on the presence object. This ability will vary depending on
    //   // type.
    //   range.name = "test";

    //   console.log(localPresence);
    //   localPresence.submit(range, function (error) {
    //     if (error) throw error;
    //     console.log(range);
    //   });
    // });

    // presence.on("error", function (error) {
    //   console.log(error);
    // });
    // presence.on("error", function (error) {
    //   console.log(error);
    // });

    // presence.on("receive", function (id, range) {
    //   console.log(range);
    //   colors[id] = colors[id] || tinycolor.random().toHexString();
    //   var name = (range && range.name) || "Anonymous";
    //   cursors.createCursor(id, name, colors[id]);
    //   cursors.moveCursor(id, range);
    // });
  };

  return (
    <div className="code-block">
      <UploadFileForm quill={quill} doc={doc} isCode={true} />
      <div id="editor-container"></div>
    </div>
  );
}

export default CodeBlock;
