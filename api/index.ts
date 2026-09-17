import { createApp } from '../server/src/app.js';

// Vercel serverless entry: every /api/* request is rewritten here (see vercel.json)
// and handled by the same Express app used in local development.
export default createApp();
