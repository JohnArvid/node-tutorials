#!/usr/bin/env node
const axios = require('axios');
const program = require('commander');

program
  .version('1.0.0')
  .description('My first cli-tool, fetches github user info');

program
  .requiredOption('-u, --user <username>', 'GitHub username');

program.parse(process.argv);

const { user } = program.opts();

const apiUrl = `https://api.github.com/users/${user}`;

axios
  .get(apiUrl)
  .then((response)=> {
    userData = response.data;
    console.log('User information:');
    console.log(`Username: ${userData.login}`);
    console.log(JSON.stringify(userData, null, 2));
  })
  .catch((error) => {
      console.log(`Error fetching: ${error.message}`);
  });

