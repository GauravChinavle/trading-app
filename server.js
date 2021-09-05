const myRoute = require("./routes/exchange");
const fastify = require("fastify")();

const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "creds.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets"
});
const client = auth.getClient();

// Instance of Google Sheets API
const googleSheets = google.sheets({ version: "v4", auth: client });
module.exports = {
  googleSheets,
  auth
};
fastify.register(myRoute);

fastify.listen(3006, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

