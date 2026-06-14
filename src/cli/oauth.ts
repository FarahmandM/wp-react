import open from 'open';
import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

async function ask<T = any>(questions: any[]): Promise<T> {
  const { default: inquirer } = await import('inquirer');
  const result = await inquirer.prompt(questions);
  return result as T;
}

export async function startOAuthFlow() {
  const port = 5678;
  const redirectUri = `http://localhost:${port}/callback`;

  const { authUrl, tokenUrl, clientId } = await ask([
    { type: 'input', name: 'authUrl', message: 'OAuth Authorization URL:' },
    { type: 'input', name: 'tokenUrl', message: 'OAuth Token Exchange URL:' },
    { type: 'input', name: 'clientId', message: 'OAuth Client ID:' },
  ]);

  const codeVerifier = crypto.randomBytes(32).toString('hex');
  const codeChallenge = codeVerifier;

  const app = express();

  const fullAuthUrl = `${authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=plain`;

  const server = app.listen(port, () => {
    console.log(`🌐 Opening OAuth flow in browser...`);
    open(fullAuthUrl);
  });

  app.get('/callback', async (req, res) => {
    const code = req.query.code;
    res.send('✅ Auth successful. You can close this window.');

    try {
      const tokenRes = await axios.post(tokenUrl, {
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier,
        grant_type: 'authorization_code',
      });
      console.log('✅ Access Token:', tokenRes.data.access_token);
    } catch (err: any) {
      console.error('❌ Token exchange failed:', err.response?.data?.error || err.message);
    }

    server.close();
  });
}
