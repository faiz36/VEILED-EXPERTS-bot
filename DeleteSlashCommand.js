const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { server, t_token, t_client } = require('./config.json');
const rest = new REST({ version: '9' }).setToken(t_token);
rest.get(Routes.applicationCommands(t_client))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands(t_client)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });