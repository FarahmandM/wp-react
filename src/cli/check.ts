import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export function checkEnv() {
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env file not found. Run `wp-react-cli init` first.');
        process.exit(1);
    }

    const env = dotenv.parse(fs.readFileSync(envPath));

    const requiredKeys = [
        'REACT_APP_WP_REST_URL',
        'REACT_APP_WP_GRAPHQL_URL',
        'REACT_APP_JWT_AUTH_URL'
    ];

    const missing = requiredKeys.filter((k) => !env[k]);
    if (missing.length) {
        console.error('❌ Missing required keys in .env:', missing.join(', '));
        process.exit(1);
    }

    console.log('🔍 Checking endpoints...\n');

    Promise.all(
        requiredKeys.map(async (k) => {
            try {
                const res = await axios.get(env[k]);
                console.log(`✅ ${k} reachable (Status: ${res.status})`);
            } catch (error: any) {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 404) {
                        console.warn(`⚠️  ${k} reachable, but endpoint not found (404). Is the plugin active?`);
                    } else if (status === 401 || status === 403) {
                        console.log(`✅ ${k} reachable (Server responded with ${status} - Auth required)`);
                    } else {
                        console.log(`✅ ${k} reachable (Server responded with ${status})`);
                    }
                } else if (error.request) {
                    console.error(`❌ ${k} is not reachable (No response from server)`);
                } else {
                    console.error(`❌ ${k} error: ${error.message}`);
                }
            }
        })
    );
}