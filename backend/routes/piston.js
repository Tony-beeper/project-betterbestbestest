const express = require("express");
const dotenv = require("dotenv");
const { param, body, validationResult } = require("express-validator");
dotenv.config();
const router = express.Router();
const PISTON_URL = process.env.PISTON_URL;
const axios = require("axios").default;
const statusCode = require("../utils/StatusCodes");
const Message = require("../utils/defaultMessages");

router.post(
  "/",
  body("content")
    .notEmpty()
    .trim()
    .escape()
    .withMessage({ err: " missing content" }),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(Message.createErrorMessage(err));
    }
    try {
      const pistonRes = await axios({
        method: "POST",
        url: PISTON_URL,
        headers: {},
        data: {
          language: "python",
          version: "3.10.0",
          files: [
            {
              content: content,
            },
          ],
          stdin: "",
          args: [],
          compile_timeout: 3000,
          run_timeout: 3000,
          compile_memory_limit: 30000000,
          run_memory_limit: 30000000,
        },
      });
      return res.json(pistonRes.data);
    } catch ({ response }) {
      if (response && response.data && response.data.err) {
        console.error(response.data.err);
      }
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(Message.createErrorMessage("Piston request failed"));
    }
  }
);
