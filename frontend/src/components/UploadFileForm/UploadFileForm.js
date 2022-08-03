import {
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";
import { useState } from "react";
import UploadButton from "../Buttons/UploadButton";
import constants from "../../utils/Constants";
import { toast } from "react-toastify";

function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

function UploadFileForm({ quill, isCode, doc, fileExt }) {
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
        if (currFile.size > constants.MAX_FILE_SIZE) {
            toast.error(
                `File cannot be uploaded. Uploaded file is ${currFile.size} bytes which exceeds the limit of ${constants.MAX_FILE_SIZE} bytes`
            );
            return;
        }

        if (extension === fileExt) {
            setSelectedFile(e.target.files[0]);
        } else {
            toast.error(
                `${currFile.name} has an invalid file type. Please upload a .${fileExt} file`
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
                        `${combinedLen} exceeds max charater limit of ${constants.CHAR_LIMIT} chars. File is too big to upload`
                    );
                    content = "";
                }
                const delta = quill.insertText(quill.getLength(), content);
                doc.submitOp(delta, { source: quill });
                quill.formatLine(0, quill.getLength(), {
                    "code-block": isCode,
                });
            })
            .catch((error) => {})
            .finally(() => {
                setOpen(false);
            });
    };

    return (
        <div style={{ marginBottom: "2px" }}>
            <div onClick={handleClickOpen}>
                <UploadButton variant="contained">Upload file</UploadButton>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Upload</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Upload a ${fileExt} file`}</DialogContentText>
                    <form>
                        <input
                            type="file"
                            name="file"
                            onChange={handleUpload}
                            accept={"." + fileExt}
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
