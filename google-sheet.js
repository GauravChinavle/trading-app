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
}