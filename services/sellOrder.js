require("dotenv").config();
const { googleSheets, auth } = require("../google-sheet");
const getCrypto = require("./getCrypto");
const getUser = require("./getUser");
const getTradeBook = require("./getTradeBook");

const date = require("moment")().format("MMMM Do YYYY h:mm:ss a");
const spreadsheetId = process.env.SHEET_ID;

async function sellOrder(request, reply) {
  const { user_name, crypto_name, qty } = request.body;
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "user_data"
  });
  const crypto = await getCrypto(null, null);
  const c = crypto.filter(item => crypto_name == item[0]);
  const trade = await getTradeBook(null, null);

  const t = trade.filter(
    item => crypto_name == item[1] && user_name == item[2]
  );
  const newQty =
    qty < t[0][3] ? qty : reply.send("Qty is greater than holdings!");
  const price = c[0][1] * qty;
  //   Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "order_book",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[date, crypto_name, user_name, "Sell", -1 * newQty, price]]
    }
  });
  try {
    reply.send({
      user: user_name,
      message: `sold ${crypto_name} for ${qty} quantity.`
    });
  } catch {}
}
module.exports = sellOrder;
