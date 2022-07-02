import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextBlock.css";
import { useEffect, useRef } from "react";

function TextBlock(props) {
  const doc = props.doc;
  let reactQuillRef = useRef(null);
  let quillRef = null;

  useEffect(() => {
    doc.subscribe((error) => {
      console.log(doc);
      attachQuillRefs();
      // set initial content
      quillRef.setContents(doc.data);
      doc.on("op", function (op, source) {
        if (source) return;
        console.log(op);
        // update quill with new op
        quillRef.updateContents(op);
      });
    });
  }, []);
  const attachQuillRefs = () => {
    if (
      !reactQuillRef.current ||
      typeof reactQuillRef.current.getEditor !== "function"
    )
      return;
    // init quill ref
    quillRef = reactQuillRef.current.getEditor();
    console.log(quillRef);
  };
  const handleChange = (content, delta, source, editor) => {
    if (source !== "user") return;
    doc.submitOp(delta);
  };
  const modules = {};
  return (
    <div className="text-block">
      <ReactQuill
        ref={reactQuillRef}
        modules={modules}
        onChange={handleChange}
      />
    </div>
  );
}
export default TextBlock;
