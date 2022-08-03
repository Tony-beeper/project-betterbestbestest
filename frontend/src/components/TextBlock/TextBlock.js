import Quill from "quill";
import QuillCursors from "quill-cursors";
import "./TextBlock.css";
import UploadFileForm from "../UploadFileForm/UploadFileForm";
import tinycolor from "tinycolor2";

import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";
import constants from "../../utils/Constants";

function TextBlock(props) {
  const doc = props.doc;
  const [quill, setQuill] = useState(null);
  const [context, setContext] = useContext(ThemeContext);
  let colors = {};

  Quill.register("modules/cursors", QuillCursors);

  useEffect(() => {
    let localPresence;
    doc.subscribe((error) => {
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

      quill.format("color", "white", "user");
    });
    doc.on("op", function (op, source) {
      if (source === quill) return;
      quill.updateContents(op);
      quill.format("color", "white", "user");
    });
    quill.format("color", "white", "user");

    let presence = doc.connection.getDocPresence(props.collection, props.id);

    presence.subscribe(function (error) {
      if (error) throw error;
    });

    presence.on("receive", function (id, range) {
      colors[id] = colors[id] || tinycolor.random().toHexString();
      var name = (range && range.name) || "Anonymous";
      cursors.createCursor(id, name, colors[id]);
      cursors.moveCursor(id, range);
    });

    let localPresence = presence.create();

    quill.on("selection-change", function (range, oldRange, source) {
      if (source !== "user") return;
      if (!range) return;
      range.name = context.username;

      localPresence.submit(range, function (error) {
        if (error) throw error;
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
