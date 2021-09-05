require("dotenv").config();
const { googleSheets, auth } = require("../google-sheet");
const getCrypto = require("./getCrypto");
const getUser = require("./getUser");
const date = require("moment")().format("MMMM Do YYYY h:mm:ss a");
const spreadsheetId = process.env.SHEET_ID;

async function buyOrder(request, reply) {
  const { user_name, crypto_name, qty } = request.body;
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "user_data"
  });

  const crypto = await getCrypto(null, null);
  const user = await getUser(null, null);
  const c = crypto.filter(item => crypto_name == item[0]);
  const u = user.filter(item => user_name == item[0]);
  const price = c[0][1] * qty;

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "order_book",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[date, c[0][0], u[0][0], "Buy", qty, price]]
    }
  });

  try {
    reply.send({
      user: user_name,
      message: `invested in ${crypto_name} for ${qty} quantity.`
    });
  } catch {}
}
module.exports = buyOrder;
