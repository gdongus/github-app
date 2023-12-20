import express, { json } from 'express';
import { App } from '@octokit/app';
import { Webhooks } from '@octokit/webhooks';

const app = express();
const port = 3000;

const appID = process.env.APP_ID || ''; 
const privateKey = process.env.PRIVATE_KEY || '';

app.use(json());

app.post('/webhook', (req, res) => {
  // Handle the webhook event
  console.log(req.body);
});

app.get('/', (req, res) => {
  res.send('Hello, GitHub App!');
});

app.listen(port, () => {
  console.log(`GitHub App listening at http://localhost:${port}`);
});