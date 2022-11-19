const express = require('express');
const { port, token, appId } = require('./config.json');
const path = require('path');
const { fetch } = require('undici');
const perms = require('./perms');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname + '/public')));

app.get('/config/:id', async (request, response) => {
  let configData = await getGuildCommands(request.params.id);

  let guild = await getBotGuilds(request.params.id);

  response.render('config', {
    data: configData,
    guild: guild
  });
});

const getGuildCommands = async (id) => {
  const response = await fetch(`https://discord.com/api/v10/applications/${appId}/commands`, {
    headers: {
      authorization: `Bot ${token}`,
    },
  });
  return response.json();
};

const getBotGuilds = async (id) => {
  const response = await fetch(`https://discord.com/api/users/@me/guilds`, {
    headers: {
      authorization: `Bot ${token}`,
    },
  });
  let guilds = await response.json();
  for(let i=0; i < guilds.length; i++){
    if(guilds[i]['id'] == id) {
      console.log('bot is in server!');
      console.log(perms.checkPerms(guilds[i]['permissions']));
      return guilds[i];
    } else {
      console.log('bot is not in server');
    }
  }
  return;
}

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
