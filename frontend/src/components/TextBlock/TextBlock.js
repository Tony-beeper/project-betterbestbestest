import Quill from "quill";
import QuillCursors from "quill-cursors";
import "./TextBlock.css";
import UploadFileForm from "../UploadFileForm";
import tinycolor from "tinycolor2";

import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";
import constants from "../../utils/Constants";
import { useNavigate } from "react-router-dom";

function TextBlock(props) {
  let Nav = useNavigate();
  const doc = props.doc;
  const [quill, setQuill] = useState(null);
  const [context, setContext] = useContext(ThemeContext);
  let colors = {};

  Quill.register("modules/cursors", QuillCursors);

  useEffect(() => {
    let localPresence;
    doc.subscribe((error) => {
      // console.log(doc);
      localPresence = initQuill();
    });

    return () => {
      localPresence.destroy();
      doc.unsubscribe();
    };
  }, []);

  const initQuill = () => {
    const quill = new Quill("#text-editor-container", {
      modules: {
        cursors: true,
      },
      theme: "snow", // or 'bubble'
      color: "white",
    });
    setQuill(quill);
    let cursors = quill.getModule("cursors");

    quill.setContents(doc.data);
    quill.on("text-change", function (delta, oldDelta, source) {
      if (source !== "user") return;
      const currLength = quill.getLength();
      if (currLength > constants.CHAR_LIMIT) {
        quill.setContents(oldDelta);
        toast.error(
          `${currLength} exceeds max charater limit of ${constants.CHAR_LIMIT}`
        );
      } else {
        doc.submitOp(delta, { source: quill });
      }
    });
    doc.on("op", function (op, source) {
      if (source === quill) return;
      quill.updateContents(op);
    });

    let presence = doc.connection.getDocPresence(props.collection, props.id);

    presence.subscribe(function (error) {
      console.log("subscribed");
      if (error) throw error;
    });

    presence.on("receive", function (id, range) {
      console.log(range);
      colors[id] = colors[id] || tinycolor.random().toHexString();
      var name = (range && range.name) || "Anonymous";
      cursors.createCursor(id, name, colors[id]);
      cursors.moveCursor(id, range);
    });

    let localPresence = presence.create();
    console.log(presence);

    quill.on("selection-change", function (range, oldRange, source) {
      // We only need to send updates if the user moves the cursor
      // themselves. Cursor updates as a result of text changes will
      // automatically be handled by the remote client.
      if (source !== "user") return;
      // Ignore blurring, so that we can see lots of users in the
      // same window. In real use, you may want to clear the cursor.
      if (!range) return;
      // In this particular instance, we can send extra information
      // on the presence object. This ability will vary depending on
      // type.
      range.name = context.username;

      console.log(presence);
      localPresence.submit(range, function (error) {
        if (error) throw error;
        console.log(range);
      });
    });
    return localPresence;
  };

  return (
    <div className="text-block">
      <UploadFileForm
        quill={quill}
        isCode={false}
        doc={doc}
        fileExt={constants.TEXT_BLOCK_FILE_EXT}
      />
      <div id="text-editor-container"></div>
    </div>
  );
}
export default TextBlock;
