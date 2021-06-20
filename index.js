const Discord = require('discord.js');
const gamedig = require('gamedig');
const config = require('./config.json')
const client = new Discord.Client()

const settings = {
    PREFIX: "YOUR PREFIX",
    IP: "SERVER IP",
    PORT: "SERVER PORT"
}

client.on('ready', async () => {
    console.log(`TAG: ${client.user.tag}/ID: ${client.user.id}` + '\nBot Started!')

    setInterval(() => {
        gamedig.query({
            type: 'arma3',
            host: settings.IP,
            port: settings.PORT
        }).then((state) => {

        const numPlayers = state.raw.numplayers
        const maxPlayers = state.maxplayers

        client.user.setPresence({
                activity: {
                    type: 'WATCHING',
                    name: 'Online: '+ numPlayers + '/' + maxPlayers
                },
                status: 'online'
            });
        }).catch((error) => {
        console.log(error)
        client.user.setPresence({
                activity: {
                    type: 'WATCHING',
                    name: 'Server offline'
                },
                status: 'dnd'
            });
        })
    }, 10000); 
})

client.login(config.token)