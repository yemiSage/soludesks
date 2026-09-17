import { createApp } from './app.js';

// API_PORT wins so the API never inherits a PORT meant for the web dev server.
const port = Number(process.env.API_PORT ?? process.env.PORT ?? 4000);

createApp().listen(port, () => {
  console.log(`LearnHub API listening on http://localhost:${port}`);
});
