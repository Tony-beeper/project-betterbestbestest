import React, { useEffect, useState } from "react";
import pistonAPI from "../../api/piston";
import ErrorHandler from "../../utils/ErrorHandler";
import Quill from "quill";
import "./CodeExecution.css";

function CodeExecution({ quill }) {
    const [consoleOutput, setConsoleOutput] = useState(null);
    const execute = () => {
        const content = quill.getText();
        console.log(content);
        pistonAPI
            .execute(content)
            .then((data) => {
                console.log(data);
                if (data.run.code === 0) {
                    if (consoleOutput) {
                        consoleOutput.setText(data.run.stdout);
                    }
                } else {
                    if (consoleOutput) {
                        consoleOutput.setText(data.run.stderr);
                    }
                }
            })
            .catch((e) => {
                console.error(e);
                if (e.response) {
                    ErrorHandler.handleError(e.response);
                }
            });
    };
    const initQuill = () => {
        const consoleQuill = new Quill("#console-output-container", {
            modules: {
                toolbar: false,
            },
            theme: "snow",
        });
        setConsoleOutput(consoleQuill);
        consoleQuill.on("text-change", function (delta, oldDelta, source) {
            if (source !== "api") {
                consoleQuill.setContents(oldDelta);
            }
            consoleQuill.formatLine(0, consoleQuill.getLength(), {
                "code-block": true,
            });
        });
    };
    useEffect(() => {
        initQuill();
    }, []);
    return (
        <div>
            <button onClick={execute}>Run</button>
            <h3>Console Output</h3>
            <div id="console-output-container"></div>
        </div>
    );
}
export default CodeExecution;
