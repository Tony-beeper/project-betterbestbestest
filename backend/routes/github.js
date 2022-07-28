const express = require("express");
const dotenv = require("dotenv");
const { param, body, validationResult } = require("express-validator");
dotenv.config();
const router = express.Router();
const client_id = process.env.CLIENT_ID;
const client_secrete = process.env.CLIENT_SECRETE;
const oauth_url = process.env.OAUTH_URL;
const axios = require("axios").default;
const statusCode = require("../utils/StatusCodes");
const Message = require("../utils/defaultMessages");
const { Octokit } = require("octokit");
const base64 = require("base-64");
const sanitize = require("sanitize-filename");

let token;

const withToken = (req, res, next) => {
  if (!token) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(Message.createErrorMessage("no token"));
  }
  next();
};

function b64EncodeUnicode(str) {
  return base64.encode(str);
}

router.post(
  "/oauth",
  body("code").notEmpty().trim().withMessage({ err: "missing code" }),
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(Message.createErrorMessage(err.errors[0].msg.err));
    }
    axios({
      method: "POST",
      url: `${oauth_url}?client_id=${client_id}&client_secret=${client_secrete}&code=${req.body.code}`,
      headers: { "Content-Type": "application/json" },
      data: {},
      withCredentials: true,
    })
      .then((authoRes) => {
        if (!authoRes.data.includes("access_token")) {
          return res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(Message.createErrorMessage("github authorize fail"));
        }
        token = authoRes.data.substring(13, 53);
        console.log(token);
        return res.json({ msg: "github aouth success" });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(Message.createErrorMessage("github authorize fail"));
      });
  }
);

router.get("/repos", withToken, (req, res) => {
  const octokit = new Octokit({
    auth: token,
  });

  octokit
    .request("GET /user/repos", {})
    .then(({ data }) => {
      const parsedData = data.map((repo) => repo["full_name"]);
      return res.json(parsedData);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(Message.createErrorMessage("access github failed"));
    });
});

router.post(
  "/repos/:owner/:repo/",
  param("owner")
    .notEmpty()
    .trim()
    .escape()
    .withMessage({ err: "missing owner" }),
  param("repo").notEmpty().trim().escape().withMessage({ err: "missing repo" }),
  body("path")
    .notEmpty()
    .trim()
    .withMessage({ err: "missing path" })
    .isLength({ max: 50 })
    .withMessage({ err: "file name too long" }),
  body("message")
    .notEmpty()
    .trim()
    .escape()
    .withMessage({ err: "missing message" }),
  body("content").notEmpty().withMessage({ err: "missing content" }),
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(statusCode.BAD_REQUEST)
        .json(Message.createErrorMessage(err.errors[0].msg.err));
    }

    const octokit = new Octokit({
      auth: token,
    });

    octokit
      .request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner: req.params.owner,
        repo: req.params.repo,
        path: sanitize(req.body.path),
        message: req.body.message,
        content: b64EncodeUnicode(req.body.content),
      })
      .then(({ data }) => {
        return res.json({ file: data.content.name });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 422) {
          return res
            .status(422)
            .send(Message.createErrorMessage("file already exists"));
        }
        return res
          .status(statusCode.FORBIDDEN)
          .send(Message.createErrorMessage("access github failed"));
      });
  }
);

module.exports = router;
