import type { RollupOptions } from 'rollup';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import json from '@rollup/plugin-json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isNodeBuiltin = (id) => {
    return id.startsWith('node:') || [
        'fs', 'path', 'url', 'crypto', 'os', 'http', 'https', 
        'stream', 'util', 'events', 'child_process', 'module', 
        'assert', 'buffer', 'querystring', 'net', 'tls', 'zlib'
    ].includes(id);
};

const external = (id, importer) => {
    if (!importer) return false; 
    
    if (id.startsWith('node:') || ['fs', 'path', 'url', 'crypto', 'os', 'http', 'https', 'stream', 'util', 'events', 'child_process'].includes(id)) {
        return true;
    }
    
    return !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0');
};

const sharedPlugins = [
    alias({
        entries: [
            { find: /^@utils\/(.*)$/, replacement: path.resolve(__dirname, 'src/utils/$1') },
            { find: /^@api\/(.*)$/, replacement: path.resolve(__dirname, 'src/api/$1') },
            { find: /^@components\/(.*)$/, replacement: path.resolve(__dirname, 'src/components/$1') },
            { find: /^@hooks\/(.*)$/, replacement: path.resolve(__dirname, 'src/hooks/$1') },
            { find: /^@models\/(.*)$/, replacement: path.resolve(__dirname, 'src/types/$1') },
            { find: /^@core\/(.*)$/, replacement: path.resolve(__dirname, 'src/core/$1') },
        ]
    }),
    nodeResolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    typescriptPaths(),
    commonjs({
        include: /node_modules/,
        defaultIsModuleExports: true,
    }),
    json(),
];

const config: RollupOptions[] = [
    {
        input: 'src/index.ts',
        output: [
            {
                dir: 'dist',
                entryFileNames: 'index.cjs',
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
            },
            {
                dir: 'dist',
                entryFileNames: 'index.js',
                format: 'es',
                sourcemap: true,
            },
        ],
        plugins: [
            ...sharedPlugins,
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                declarationDir: 'dist',
                exclude: ['**/*.test.*', 'src/cli/**/*'],
                outputToFilesystem: true,
            }),
        ],
        external: (id, importer) => {
            if (!importer) return false;
            
            if (id.startsWith('@utils/') || id.startsWith('@api/') || 
                id.startsWith('@components/') || id.startsWith('@hooks/') || 
                id.startsWith('@models/') || id.startsWith('@core/')) {
                return false; 
            }

            return !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0');
        },
    },
    {
        input: 'src/cli/index.ts',
        output: {
            file: 'dist/cli/index.js',
            format: 'es',
            sourcemap: true,
            //banner: '#!/usr/bin/env node', // No need!
            inlineDynamicImports: true,
        },
        plugins: [
            ...sharedPlugins,
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                declarationMap: false,
                exclude: ['**/*.test.*'],
                outputToFilesystem: true,
            }),
        ],
        external: (id) => isNodeBuiltin(id),
    }
];

export default config;
