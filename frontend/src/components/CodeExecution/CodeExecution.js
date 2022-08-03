import React, { useEffect, useState } from "react";
import pistonAPI from "../../api/piston";
import ErrorHandler from "../../utils/ErrorHandler";
import Quill from "quill";
import "./CodeExecution.css";
import { toast } from "react-toastify";
import RunButton from "../Buttons/RunButton";
import WhiteTextTypography from "../StyledMuiComponents/WhiteTypography";
import constants from "../../utils/Constants";
function CodeExecution({ quill }) {
    const [consoleOutput, setConsoleOutput] = useState(null);
    const [isRunEnabled, setIsRunEnabled] = useState(true);
    const execute = () => {
        const content = quill.getText();
        setIsRunEnabled(false);

        const call = () =>
            pistonAPI
                .execute(content)
                .then((data) => {
                    if (consoleOutput) {
                        if (data.run.signal === "SIGKILL") {
                            toast.error(
                                "Time limit or memory limit exceeded, code execution was terminated"
                            );
                        }
                        const str = data.run.output;
                        const lines = str.split(/\r\n|\r|\n/);
                        if (lines.length > constants.OUTPUT_LINE_LIMIT) {
                            toast.error(
                                `Output contains more than ${constants.OUTPUT_LINE_LIMIT} lines. Output will be truncated`
                            );
                        }
                        consoleOutput.setText(
                            lines
                                .slice(0, constants.OUTPUT_LINE_LIMIT)
                                .join("\n")
                        );
                        setIsRunEnabled(true);
                    }
                })
                .catch((e) => {
                    if (e.response) {
                        ErrorHandler.handleError(e.response);
                    }
                    setIsRunEnabled(true);
                });
        // call api after delay to limit request from user
        setTimeout(call, constants.CODE_EXECUTE_DELAY);
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
            <RunButton disabled={!isRunEnabled} onClick={execute}>
                {isRunEnabled ? "Run" : "Running..."}
            </RunButton>
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
