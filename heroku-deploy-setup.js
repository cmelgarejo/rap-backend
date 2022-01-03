const execSync = require('child_process').execSync;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the name of the Heroku app to create: ', (answer) => {
  execSync(`heroku create ${answer} --region eu`);
  execSync('heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack');

  execSync('heroku buildpacks:add heroku/nodejs');
  execSync('heroku config:set PROJECT_PATH=rap-backend');
  execSync('heroku addons:create mongolab:sandbox --as DATABASE');

  const databaseUri = execSync('heroku config:get DATABASE_URI').toString();

  const myRegexp = /mongodb:\/\/(.*):(.*)@(.*).mlab.com:(.*)\/(.*)/g;

  const match = myRegexp.exec(databaseUri);

  execSync(`heroku config:set DATABASE_USERNAME=${match[1]}`);
  execSync(`heroku config:set DATABASE_PASSWORD=${match[2]}`);
  execSync(`heroku config:set DATABASE_PORT=${match[4]}`);
  execSync(`heroku config:set DATABASE_NAME=${match[5]}`);

  console.log(`Heroku app "${answer}" is set up! ✅`);
  console.log(`⚠️ IMPORTANT ⚠️ Your app is not deployed yet!`);
  console.log(`To deploy your app, run "git push heroku"`);

  rl.close();
});