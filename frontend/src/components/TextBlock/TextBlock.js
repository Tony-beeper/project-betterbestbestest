import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextBlock.css";
import React from "react";
import { useEffect, useState, useRef } from "react";
import UploadFileForm from "../UploadFileForm";

function TextBlock(props) {
  const doc = props.doc;
  let reactQuillRef = useRef(null);
  let quillRef = null;
  let [quill, setQuill] = useState(null);

  useEffect(() => {
    doc.subscribe((error) => {
      // console.log(doc);
      initQuill();
      doc.on("op", function (op, source) {
        if (source) return;
        // console.log(op);
        // update quill with new op
        quillRef.updateContents(op);
      });
    });
  }, [quill]);
  const initQuill = () => {
    if (
      !reactQuillRef.current ||
      typeof reactQuillRef.current.getEditor !== "function"
    )
      return;
    // init quill ref
    quillRef = reactQuillRef.current.getEditor();
    setQuill(quillRef);
    // set initial content
    quillRef.setContents(doc.data);
    // console.log(quillRef);
  };
  const handleChange = (content, delta, source, editor) => {
    if (source !== "user") return;
    doc.submitOp(delta);
  };
  const modules = {};
  return (
    <div className="text-block">
      {quill && doc ? (
        <UploadFileForm quill={quill} isCode={false} doc={doc} />
      ) : (
        <div></div>
      )}
      <ReactQuill
        ref={reactQuillRef}
        modules={modules}
        onChange={handleChange}
      />
    </div>
  );
}
export default TextBlock;
