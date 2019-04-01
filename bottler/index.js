const { join, resolve } = require('path');
const origin = require('git-origin-url');
const dotenv = require('dotenv');
const bundleDocs = require('./bundleDocs');

const entryFolder = 'docs';
const docRoot = resolve(join(__dirname, '../'), entryFolder);

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

origin((err, url) => {
  if (err) throw err;

  const branch = process.env.BRANCH_NAME;

  if (!branch) throw new Error('no branch name');

  const githubUrl = `${url.split('.git')[0]}/tree/${branch}/${entryFolder}`;
  const fileName = branch === 'master' ? 'bundle.json' : 'bundleDev.json';

  bundleDocs(fileName, githubUrl, docRoot);
});
