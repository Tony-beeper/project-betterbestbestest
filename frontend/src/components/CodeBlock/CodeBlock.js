import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import "react-quill/dist/quill.snow.css";
import "./CodeBlock.css";
import UploadFileForm from "../UploadFileForm/UploadFileForm";
import tinycolor from "tinycolor2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";
import CodeExecution from "../CodeExecution/CodeExecution";
import constants from "../../utils/Constants";
import GithubBlock from "../GithubBlock/GithubBlock";
import LanguageDropDown from "../LanguageDropDown/LanguageDropDown";
function CodeBlock(props) {
  let Nav = useNavigate();
  const doc = props.doc;
  const [quill, setQuill] = useState(null);
  const [context, setContext] = useContext(ThemeContext);
  let colors = {};

  Quill.register("modules/cursors", QuillCursors);

  useEffect(() => {
    let intervalId;
    let localPresence;
    doc.subscribe((err) => {
      let res = initQuill();
      intervalId = res.interval;
      localPresence = res.localPresence;
    });

    return () => {
      doc.unsubscribe();
      localPresence.destroy(() => {});
    };
  }, []);

  const initQuill = () => {
    const quill = new Quill("#editor-container", {
      formats: ["code-block"],
      modules: {
        syntax: {
          highlight: (text) =>
            hljs.highlight(text, { language: "python" }).value,
        },
        cursors: true,
        toolbar: false,
      },
      theme: "snow",
    });
    setQuill(quill);
    let cursors = quill.getModule("cursors");

    quill.setContents(doc.data);
    quill.formatLine(0, quill.getLength(), { "code-block": true });
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

      quill.formatLine(0, quill.getLength(), { "code-block": true });
    });
    doc.on("op", function (op, source) {
      if (source === quill) return;
      quill.updateContents(op);
      quill.formatLine(0, quill.getLength(), { "code-block": true });
    });

    doc.on("del", function (data, source) {
      toast.error("room is deleted by the owner");
      Nav("../room");
    });

    let presence = doc.connection.getDocPresence(props.collection, props.id);

    presence.subscribe(function (error) {
      if (error) throw error;
    });

    presence.on("receive", function (id, range) {
      if (range?.index) {
        colors[id] = colors[id] || tinycolor.random().toHexString();
        var name = (range && range.name) || "Anonymous";
        cursors.createCursor(id, name, colors[id]);
        cursors.moveCursor(id, range);
      } else if (range === null) {
        cursors.removeCursor(id);
      }
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

    return { localPresence, presence };
  };

  return (
    <div className="code-block">
      <div className="form-group">
        <UploadFileForm
          quill={quill}
          doc={doc}
          isCode={true}
          fileExt={constants.CODE_BLOCK_FILE_EXT}
        />

        {props.oauth && <GithubBlock quill={quill} />}
      </div>
      <LanguageDropDown />
      <div id="editor-container"></div>

      <CodeExecution quill={quill} />
    </div>
  );
}

export default CodeBlock;
