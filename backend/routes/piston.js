const express = require("express");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");
dotenv.config();
const router = express.Router();
const PISTON_URL = process.env.PISTON_URL;
const axios = require("axios").default;
const statusCode = require("../utils/StatusCodes");
const Message = require("../utils/defaultMessages");

router.post("/execute", body("content").notEmpty().trim(), async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(Message.createErrorMessage(err));
    }
    const requestBody = {
        language: "python",
        version: "3.10.0",
        files: [
            {
                content: req.body.content,
            },
        ],
        stdin: "",
        args: [],
        compile_timeout: 3000, // compile_ does not apply to python
        run_timeout: 3000, // 3 sec timeout
        compile_memory_limit: 30000000,
        run_memory_limit: 30000000, // 30MB
    };
    axios({
        method: "POST",
        url: PISTON_URL + "/execute",
        headers: {},
        data: requestBody,
    })
        .then((pistonRes) => {
            return res.json(pistonRes.data);
        })
        .catch((error) => {
            console.log(error);
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            }
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(Message.createErrorMessage("Piston request failed"));
        });
});

module.exports = router;
