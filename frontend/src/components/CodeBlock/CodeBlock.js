import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import "react-quill/dist/quill.snow.css";
import "./CodeBlock.css";
import UploadFileForm from "../UploadFileForm";
import tinycolor from "tinycolor2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "../../App";
import CodeExecution from "../CodeExecution/CodeExecution";
import constants from "../../utils/Constants";
import GithubBlock from "../GithubBlock/GithubBlock";
import LanguageDropDown from "../../LanguageDropDown/LanguageDropDown";
function CodeBlock(props) {
  let Nav = useNavigate();
  const doc = props.doc;
  const [quill, setQuill] = useState(null);
  const [context, setContext] = useContext(ThemeContext);
  let colors = {};

  // hljs.registerLanguage("python", python);
  Quill.register("modules/cursors", QuillCursors);

  useEffect(() => {
    let intervalId;
    let localPresence;
    doc.subscribe((err) => {
      if (err) console.log(err);
      let res = initQuill();
      // setIntervalId(res.interval);
      intervalId = res.interval;
      localPresence = res.localPresence;
      // if (!localPresenceS) setLocalPresenceS(res.localPresence);
    });

    return () => {
      doc.unsubscribe();
      console.log(localPresence);
      // if (localPresenceS) localPresenceS.destroy();
      localPresence.destroy(() => {
        console.log(`cleared localpresense`);
        // console.log(`cleared interval ${intervalId}`);
        // clearInterval(intervalId);
      });
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     console.log(`cleared interval ${JSON.stringify(intervalId)}`);
  //     console.log(localPresenceS);
  //     doc.unsubscribe();
  //     // if (localPresenceS) localPresenceS.destroy();
  //     console.log(localPresenceS);
  //     clearInterval(intervalId);
  //     // intervalId.forEach((id) => {
  //     //   clearInterval(id);
  //     // });
  //   };
  // }, [intervalId]);

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
      theme: "snow", // or 'bubble'
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
      console.log("subscribed");
      if (error) throw error;
    });

    presence.on("receive", function (id, range) {
      console.log(range);
      if (range?.join_name) {
        if (range.join_name !== context.username) {
          props.join(range);
        }
      } else if (range?.index) {
        colors[id] = colors[id] || tinycolor.random().toHexString();
        var name = (range && range.name) || "Anonymous";
        cursors.createCursor(id, name, colors[id]);
        cursors.moveCursor(id, range);
      } else if (range === null) {
        cursors.removeCursor(id);
        props.leave({
          join_name: context.username,
          localPresenceId: localPresence.id,
        });
      }
    });

    let localPresence = presence.create();
    localPresence.submit({ join_name: context.username, id: localPresence.id });

    // const interval = setInterval(() => {
    //   localPresence.submit(
    //     { join_name: context.username, join_time: new Date() },
    //     function (err) {
    //       if (err) throw err;
    //     }
    //   );
    //   console.log("submit");
    // }, 5000);

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
      {/* <div className="editorbar"> */}
      <div className="form-group">
        <UploadFileForm
          quill={quill}
          doc={doc}
          isCode={true}
          fileExt={constants.CODE_BLOCK_FILE_EXT}
        />

        {/* <WhiteTextTypography variant="h5">Python</WhiteTextTypography> */}
        {props.oauth && <GithubBlock quill={quill} />}
      </div>
      {/* </div> */}
      <LanguageDropDown />
      <div id="editor-container"></div>

      <CodeExecution quill={quill} />
    </div>
  );
}

export default CodeBlock;
