require("dotenv").config();
const { googleSheets, auth } = require("../google-sheet");

const spreadsheetId = process.env.SHEET_ID;

async function getUser(request, reply) {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "user_data"
  });
  try {
    reply.send(getRows.data.values);
  } catch {
    return getRows.data.values;
  }
}

module.exports = getUser;
