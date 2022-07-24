import React, { useState } from "react";
import pistonAPI from "../../api/piston";
import ErrorHandler from "../../utils/ErrorHandler";
function CodeExecution({ quill }) {
  const [consoleOuput, setConsoleOutput] = useState("");
  const execute = () => {
    const content = quill.getText();
    console.log(content);
    pistonAPI
      .execute(content)
      .then((data) => {
        console.log(data);
        if (data.run.code === 0) {
          setConsoleOutput(data.run.stdout);
        } else {
          setConsoleOutput(data.run.stderr);
        }
      })
      .catch((e) => {
        console.error(e);
        if (e.response) {
          ErrorHandler.handleError(e.response);
        }
      });
  };
  return (
    <div>
      <button onClick={execute}>Run</button>
      <h3>Console Output</h3>
      <p>{consoleOuput}</p>
    </div>
  );
}
export default CodeExecution;
