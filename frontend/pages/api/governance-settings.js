import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ data: "Governance settings not found" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.tokenAddress,
            body.votingDelay,
            body.votingPeriod,
            body.quorumPercentage,
            body.minExecutionDelay,
          ],
        ],
      },
    });

    res.status(200).json({ response, data: `${body} uploaded successfully!` });
  }

  if (req.method === "GET") {
    const body = req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet2!A2:E",
    });

    if (!response.data.values) {
      return res.status(400).json({ data: "No data available!" });
    }

    const governanceSettings = response.data.values;

    res.status(200).json({ data: governanceSettings });
  }
}
