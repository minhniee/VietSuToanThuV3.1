const fs = require('fs/promises');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(token: any) {
  await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
}

export async function authorize() {
  const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const token = await loadSavedCredentialsIfExist();
  if (token) {
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const code = await new Promise<string>((resolve) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      resolve(code);
    });
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  await saveCredentials(tokens);
  return oAuth2Client;
}

export async function getUnreadCakeMails(gmail: any, labelName: string) {
  // Lấy labelId từ labelName
  const labelsRes = await gmail.users.labels.list({ userId: 'me' });
  const label = labelsRes.data.labels?.find((l: any) => l.name === labelName);
  if (!label) throw new Error('Label not found');
  const labelId = label.id;

  // Lấy mail chưa đọc trong label
  const res = await gmail.users.messages.list({
    userId: 'me',
    labelIds: [labelId],
    q: 'is:unread',
    maxResults: 10,
  });
  const messages = res.data.messages || [];
  const result = [];
  for (const msg of messages) {
    const msgRes = await gmail.users.messages.get({ userId: 'me', id: msg.id, format: 'full' });
    const body = Buffer.from(
      msgRes.data.payload?.parts?.[0]?.body?.data || msgRes.data.payload?.body?.data || '',
      'base64'
    ).toString('utf8');
    result.push({ id: msg.id, body });
  }
  return result;
}

export async function markMailAsRead(gmail: any, messageId: string) {
  await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    requestBody: {
      removeLabelIds: ['UNREAD'],
    },
  });
} 