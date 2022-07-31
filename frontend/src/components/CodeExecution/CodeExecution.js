import React, { useEffect, useState } from "react";
import pistonAPI from "../../api/piston";
import ErrorHandler from "../../utils/ErrorHandler";
import Quill from "quill";
import "./CodeExecution.css";
import { toast } from "react-toastify";
import RunButton from "../Buttons/RunButton";
import WhiteTextTypography from "../StyledMuiComponents/WhiteTypography";
function CodeExecution({ quill }) {
    const [consoleOutput, setConsoleOutput] = useState(null);
    const execute = () => {
        const content = quill.getText();
        console.log(content);
        pistonAPI
            .execute(content)
            .then((data) => {
                console.log(data);
                if (consoleOutput) {
                    //consoleOutput.setText(data.run.output.substring(0, 5000));
                    if (data.run.signal === "SIGKILL") {
                        toast.error(
                            "Time limit or memory limit exceeded, code execution was terminated"
                        );
                    }
                    const str = data.run.output;
                    const lines = str.split(/\r\n|\r|\n/);
                    if (lines.length > 100) {
                        toast.error(
                            "Output contains more than 100 lines. Output will be truncated"
                        );
                    }
                    consoleOutput.setText(lines.slice(0, 100).join("\n"));
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
            <div onClick={execute}>
                <RunButton>Run</RunButton>
            </div>
            <WhiteTextTypography variant="h5">
                Console Output
            </WhiteTextTypography>
            <div
                id="console-output-container"
                style={{ overflow: "scroll" }}
            ></div>
        </div>
    );
}
export default CodeExecution;
