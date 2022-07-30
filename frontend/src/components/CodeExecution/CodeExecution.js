import React, { useState } from "react";
import pistonAPI from "../../api/piston";
import ErrorHandler from "../../utils/ErrorHandler";
import RunButton from "../Buttons/RunButton";
import WhiteTextTypography from "../StyledMuiComponents/WhiteTypography";
// import RunButton from "../Buttons/RunButton"
import "./CodeExecution.css";
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
      <div onClick={execute}>
        <RunButton>Run</RunButton>
      </div>

      <WhiteTextTypography variant="h5">Console Output</WhiteTextTypography>
      <div class="output">
        <p>{consoleOuput}</p>
      </div>
    </div>
  );
}
export default CodeExecution;
