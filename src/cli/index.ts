#!/usr/bin/env node
import { runInit } from './init';
import { runLogin } from './login';
import { checkEnv } from './check';

const command = process.argv[2];
const args = process.argv.slice(3);

(async () => {
  switch (command) {
    case 'init':
      await runInit(args);
      break;
    case 'login':
      await runLogin();
      break;
    case 'check':
      await checkEnv();
      break;
    default:
      console.log(`🧰 wp-react CLI

Usage:
    wp-react-cli init         Bootstrap .env (or .env.dev, etc.)
    wp-react-cli login        Test login via JWT or OAuth
    wp-react-cli check        Validate REST, GraphQL, and Auth URLs

Flags:
    --dry-run                 Show .env preview only

Examples:
    npx wp-react-cli init --dry-run
    npx wp-react-cli login
    npx wp-react-cli check
`);
  }
})();
