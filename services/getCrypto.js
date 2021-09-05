require("dotenv").config();
const { googleSheets, auth } = require("../google-sheet");

const spreadsheetId = process.env.SHEET_ID;

async function getCrypto(request, reply) {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "crypto_data"
  });
  try {
    reply.send(getRows.data.values);
  } catch {
    return getRows.data.values;
  }
}

module.exports = getCrypto;
