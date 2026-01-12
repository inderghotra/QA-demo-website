import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env from tests/playwright/.env
dotenv.config({
  path: path.resolve(__dirname, 'tests/playwright/.env'),
});

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
  },
});