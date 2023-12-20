import express from 'express';
import { App } from '@octokit/app';

const app = express();
const port = 3000;

const appID = process.env.APP_ID || ''; 
const privateKey = process.env.PRIVATE_KEY || '';


const githubApp = new App({ appId: appID, privateKey: privateKey });

app.get('/', (req, res) => {
  res.send('Hello, GitHub App!');
});

app.listen(port, () => {
  console.log(`GitHub App listening at http://localhost:${port}`);
});