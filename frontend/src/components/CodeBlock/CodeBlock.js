import hljs from "highlight.js";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/monokai-sublime.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CodeBlock.css";

import { useEffect, useRef } from "react";

function CodeBlock(props) {
  const doc = props.doc;
  let reactQuillRef = useRef(null);
  let quillRef = null;

  hljs.registerLanguage("python", python);

  useEffect(() => {
    doc.subscribe((error) => {
      console.log(doc);
      initQuill();
      doc.on("op", function (op, source) {
        if (source) return;
        console.log(op);
        // update quill with new op
        quillRef.updateContents(op);
      });
    });
  }, []);

  const initQuill = () => {
    if (
      !reactQuillRef.current ||
      typeof reactQuillRef.current.getEditor !== "function"
    )
      return;
    // init quill ref
    quillRef = reactQuillRef.current.getEditor();
    // set initial content
    quillRef.setContents(doc.data);
    // create a code-block
    quillRef.formatLine(0, quillRef.getLength(), { "code-block": true });
    // init onchange listener
    quillRef.on("text-change", handleChange);
    console.log(quillRef);
  };

  const handleChange = (delta, oldDelta, source) => {
    if (source !== "user") return;
    if (quillRef) {
      const textLength = quillRef.getText().trim().length;
      if (textLength === 0) {
        // create a code-block
        quillRef.formatLine(0, quillRef.getLength(), { "code-block": true });
      }
    }
    doc.submitOp(delta);
  };

  const modules = {
    syntax: {
      highlight: (text) => hljs.highlight(text, { language: "python" }).value,
    },
    toolbar: false,
  };

  return (
    <div className="code-block">
      <ReactQuill ref={reactQuillRef} modules={modules} />
    </div>
  );
}

export default CodeBlock;
