/** @type {import('next').NextConfig} */
const nextConfig = {};

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();
// Instead of module.exports = nextConfig, do this:
export default withVercelToolbar(nextConfig);