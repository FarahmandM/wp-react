import fs from 'fs';
import path from 'path';
//import inquirer from 'inquirer';
//import * as inquirer from 'inquirer';
//import prompt from 'inquirer';
import axios from 'axios';
import dotenv from 'dotenv';
import { URL } from 'url';

type PromptQuestion = {
    type: string;
    name: string;
    message: string;
    default?: string;
    choices?: string[];
    mask?: string;
};

async function ask<T = any>(questions: any[]): Promise<T> {
    const { default: inquirer } = await import('inquirer');
    const result = await inquirer.prompt(questions);
    return result as T;
}

interface EnvAnswers {
    REACT_APP_WP_REST_URL: string;
    REACT_APP_WP_GRAPHQL_URL: string;
    REACT_APP_JWT_AUTH_URL: string;
    REACT_APP_CACHE_TTL: string;
    authType?: string;
    envTarget?: string;
}

const envFilePath = path.resolve(process.cwd(), '.env');

const askEnvConfig = async () => {
    let existingEnv: Record<string, string> = {};
    if (fs.existsSync(envFilePath)) {
        existingEnv = dotenv.parse(fs.readFileSync(envFilePath));
    }

    const answers = await ask<EnvAnswers>([
        {
            type: 'input',
            name: 'REACT_APP_WP_REST_URL',
            message: 'WordPress REST API base URL:',
            default: existingEnv.REACT_APP_WP_REST_URL || 'http://localhost/wp-json/wp/v2'
        },
        {
            type: 'input',
            name: 'REACT_APP_WP_GRAPHQL_URL',
            message: 'WordPress GraphQL endpoint:',
            default: existingEnv.REACT_APP_WP_GRAPHQL_URL || 'http://localhost/graphql'
        },
        {
            type: 'input',
            name: 'REACT_APP_JWT_AUTH_URL',
            message: 'JWT Auth endpoint:',
            default: existingEnv.REACT_APP_JWT_AUTH_URL || 'http://localhost/wp-json/jwt-auth/v1/token'
        },
        {
            type: 'input',
            name: 'REACT_APP_CACHE_TTL',
            message: 'Cache TTL (ms):',
            default: existingEnv.REACT_APP_CACHE_TTL || '300000'
        },
        {
            type: 'list',
            name: 'authType',
            message: 'Test authentication with:',
            choices: ['Skip', 'JWT Login', 'OAuth Login']
        },
        {
            type: 'input',
            name: 'envTarget',
            message: 'Save to which env file? (e.g. .env, .env.dev, .env.prod)',
            default: '.env'
        }
    ]);

    return answers;
};

const validateUrl = async (url: string, label: string) => {
    try {
        new URL(url);
        const res = await axios.get(url);
        console.log(`✅ ${label} reachable (${res.status})`);
    } catch (err: any) {
        console.error(`❌ ${label} unreachable or invalid: ${err.message}`);
    }
};

const testJWTLogin = async (url: string) => {
    const { username, password } = await ask([
        { type: 'input', name: 'username', message: 'Username:' },
        { type: 'password', name: 'password', message: 'Password:', mask: '*' }
    ]);

    try {
        const res = await axios.post(url, { username, password });
        console.log(`✅ Logged in. Token: ${res.data.token}`);
    } catch (err: any) {
        console.error(`❌ JWT Login failed: ${err.response?.data?.message || err.message}`);
    }
};

const testOAuthLogin = () => {
    console.log('🔒 OAuth flow not implemented yet (redirect/token exchange UI needed)');
};

function mergeEnv(newVars: Record<string, string>, dryRun = false, filePath = envFilePath) {
    const envContent = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, 'utf-8')
        : '';

    const parsed = dotenv.parse(envContent);
    const merged = { ...parsed, ...newVars };

    const result = Object.entries(merged)
        .filter(([key]) => key.startsWith('REACT_APP_'))
        .map(([k, v]) => `${k}="${v}"`)
        .join('\n');

    if (dryRun) {
        console.log('🧪 .env preview:\n' + result);
        return;
    }

    fs.writeFileSync(filePath, result);
    console.log(`✅ .env updated at ${filePath}`);
}


export async function runInit(args: string[]) {
    console.log('🔧 wp-react CLI Configurator\n');

    const vars = await askEnvConfig();
    const isDryRun = args.includes('--dry-run');
    const targetPath = path.resolve(process.cwd(), vars.envTarget || '.env');

    const envVars = {
        REACT_APP_WP_REST_URL: vars.REACT_APP_WP_REST_URL,
        REACT_APP_WP_GRAPHQL_URL: vars.REACT_APP_WP_GRAPHQL_URL,
        REACT_APP_JWT_AUTH_URL: vars.REACT_APP_JWT_AUTH_URL,
        REACT_APP_CACHE_TTL: vars.REACT_APP_CACHE_TTL
    };

    await validateUrl(envVars.REACT_APP_WP_REST_URL, 'REST URL');
    await validateUrl(envVars.REACT_APP_WP_GRAPHQL_URL, 'GraphQL URL');

    if (vars.authType === 'JWT Login') {
        await testJWTLogin(envVars.REACT_APP_JWT_AUTH_URL);
    }

    mergeEnv(envVars, isDryRun, targetPath);

}

//main();
