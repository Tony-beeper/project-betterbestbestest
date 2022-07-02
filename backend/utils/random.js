// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateString = function (length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.trim();
};

const id_arr = "0123456789";
const generateId = function (length) {
  let result = " ";
  const charactersLength = id_arr.length;
  for (let i = 0; i < length; i++) {
    result += id_arr.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.trim();
};

module.exports = { generateString, generateId };
