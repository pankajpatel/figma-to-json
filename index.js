try { require('dotenv').config() } catch(e) { console.log(e) }

const path = require('path');
const fs = require('fs');

const Figma = require('figma-js');

const token = process.env.FIGMA_PAT;
const fileId = process.env.FIGMA_FILE_ID;

if (!token || !fileId) {
  console.error('No token or file id');
}

const client = Figma.Client({ personalAccessToken: token });

client.file(fileId).then(({ data }) => {
  console.log(data);
  console.log(data.document.children);
  fs.writeFileSync(
    path.resolve(process.cwd(), 'cache', `${fileId}.json`),
    JSON.stringify(data, null, 2)
  )
});