import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useState } from "react";
import constants from "../utils/Constants";
import { toast } from "react-toastify";

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

function UploadFileForm({ quill, isCode, doc }) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = (e) => {
    const currFile = e.target.files[0];
    const extension = currFile.name.split(".").pop().toLowerCase();
    if (extension === "py") {
      setSelectedFile(e.target.files[0]);
      console.log(selectedFile);
    } else {
      toast.error(
        `${currFile.name} has an invalid file type. Please upload a .py file`
      );
    }
  };

  const handleSubmit = () => {
    readFileContent(selectedFile)
      .then((content) => {
        const currLen = quill.getLength();
        const combinedLen = content.length + currLen;
        if (combinedLen > constants.CHAR_LIMIT) {
          toast.error(
            `${combinedLen} exceeds max charater limit of ${constants.CHAR_LIMIT} chars. Uploaded file has been truncated`
          );
          content = content.substring(0, constants.CHAR_LIMIT - currLen);
        }
        const delta = quill.insertText(quill.getLength(), content);
        doc.submitOp(delta, { source: quill });
        quill.formatLine(0, quill.getLength(), { "code-block": isCode });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Upload file
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>Upload a .py file</DialogContentText>
          <form>
            <input
              type="file"
              name="file"
              onChange={handleUpload}
              accept=".py"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!selectedFile}
          >
            add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UploadFileForm;
