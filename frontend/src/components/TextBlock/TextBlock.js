import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";

function TextBlock(props) {
  const doc = props.doc;
  const [blockContent, setBlockContent] = useState({});

  useEffect(() => {
    doc.subscribe((error) => {
      doc.on("op", function (op, source) {
        if (source) return;
        console.log(op);
        setBlockContent(op);
      });
    });
  }, []);
  const handleChange = (content, delta, source, editor) => {
    if (source !== "user") return;
    console.log(editor.getContents());
    doc.submitOp(editor.getContents());
  };
  const modules = {};
  return (
    <div>
      <ReactQuill
        modules={modules}
        onChange={handleChange}
        value={blockContent}
      />
    </div>
  );
}
export default TextBlock;
