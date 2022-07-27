import { useState, useEffect } from "react";
import {
  Select,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import useStyles from "./GithubBlockStyles";
import { toast } from "react-toastify";

import githubAPI from "../../api/github";
import errorHandler from "../../utils/ErrorHandler";

const GithubBlock = ({ quill }) => {
  const classes = useStyles();
  const [repo, setRepo] = useState("");
  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState([]);
  const [message, setMessage] = useState([]);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    githubAPI
      .getRepos()
      .then((data) => {
        setRepos(data);
      })
      .catch(({ response }) => {
        errorHandler.handleError(response);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRepoChange = (event) => {
    setRepo(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    setDisable(true);
    const params = repo.split("/");
    const path = `codeBook_${new Date().toJSON().slice(0, 10)}.py`.replace(
      "-",
      "_"
    );
    const content = quill.getText(0, quill.getLength());
    githubAPI
      .writeFile(params[0], params[1], path, message, content)
      .then((data) => {
        toast.success(`${data.file} created in ${repo}`);
      })
      .catch(({ response }) => {
        errorHandler.handleError(response);
      })
      .finally(() => {
        setOpen(false);
        setDisable(false);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <GitHubIcon className={classes.iconStyle} />
        download
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Downloading this file to your Github repo!
        </DialogTitle>
        <DialogContent>
          {repo && (
            <DialogContentText>
              {`codeBook_${new Date().toJSON().slice(0, 10)}.py`.replace(
                "-",
                "_"
              )}{" "}
              will be added to {repo}
            </DialogContentText>
          )}
          <FormControl className={classes.formControl}>
            <InputLabel id="repo-select-label">Repo</InputLabel>
            <Select
              labelId="repo-select-label"
              id="repo-select"
              value={repo}
              onChange={handleRepoChange}
              fullWidth
            >
              {repos.map((repo, idx) => (
                <MenuItem key={`repo_${idx}`} value={repo}>
                  {repo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.commitMessageFeild}
            required
            value={message}
            fullWidth
            onChange={handleMessageChange}
            label="commit message"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDownload} color="primary" disabled={disable}>
            download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GithubBlock;
