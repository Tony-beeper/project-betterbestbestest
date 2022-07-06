// Define structure of a generic message back to the caller (used to indicate
// validation errors, authorization errors, server errors, etc.)
const createTextMessage = (message) => ({
  message: message,
});

module.exports = createTextMessage;
