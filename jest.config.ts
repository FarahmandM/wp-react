import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
//import { compilerOptions } from './tsconfig.json' with { type: 'json' };
import tsconfig from './tsconfig.json' with { type: 'json' };
const { compilerOptions } = tsconfig;

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  }),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ]
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/examples/'],
};

export default config;