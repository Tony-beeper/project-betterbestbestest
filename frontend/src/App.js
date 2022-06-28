import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/monokai-sublime.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

function App() {
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("python", python);

    const modules = {
        syntax: {
            highlight: (text) =>
                hljs.highlight(text, { language: "python" }).value,
        },
        toolbar: [["code-block"]],
    };
    return (
        <div className="App">
            <ReactQuill modules={modules} />
        </div>
    );
}

export default App;
