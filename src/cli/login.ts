import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { startOAuthFlow } from './oauth';

async function ask<T = any>(questions: any[]): Promise<T> {
  const { default: inquirer } = await import('inquirer');
  const result = await inquirer.prompt(questions);
  return result as T;
}

export async function runLogin() {
  // 1. Read existing .env to get the JWT URL
  const envPath = path.resolve(process.cwd(), '.env');
  let existingJwtUrl = '';
  if (fs.existsSync(envPath)) {
    const env = dotenv.parse(fs.readFileSync(envPath));
    existingJwtUrl = env.REACT_APP_JWT_AUTH_URL || '';
  }

  const { method } = await ask([
    {
      type: 'list',
      name: 'method',
      message: 'Select login method:',
      choices: ['JWT', 'OAuth'],
    },
  ]);

  if (method === 'JWT') {
    const { authUrl, username, password } = await ask([
      {
        type: 'input',
        name: 'authUrl',
        message: 'JWT Auth URL:',
        default: existingJwtUrl || 'http://localhost/wp-json/jwt-auth/v1/token', // <--- Use saved URL!
      },
      { type: 'input', name: 'username', message: 'Username:' },
      { type: 'password', name: 'password', message: 'Password:', mask: '*' },
    ]);

    try {
      const res = await axios.post(authUrl, { username, password });
      console.log('✅ JWT Login successful');
      console.log('Token:', res.data.token);
      console.log('User:', res.data.user_display_name);
    } catch (err: any) {
      console.error('❌ JWT Login failed:', err.response?.data?.message || err.message);
    }
  } else if (method === 'OAuth') {
    await startOAuthFlow();
  }
}
