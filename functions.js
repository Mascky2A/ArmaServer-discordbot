const Discord = require('discord.js')
let object = {}

module.exports = {
    online: async function(message, gamedig, settings) {

        gamedig.query ({
            type: 'arma3',
            host: settings.IP,
            port: settings.PORT
            }).then((state) => {
            const players = state.players.map(player => player.name)
            const Nplayers = state.raw.numplayers;
            const maxPlayers = state.maxplayers;

            const emb = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle(`Soliders amount: ${Nplayers}/${maxPlayers}`)
            .setDescription("Names: \n" + players.join("\n"))
            .setAuthor(`${state.name}`)
            .setTimestamp()
            message.channel.send({embeds: [emb]});
            }).catch((error) => {
                message.channel.send("Server doesn't responding :(");
            })
    },

    report: async function(client, settings, gamedig) {
        let rchannel = client.channels.cache.get(settings.REPORT_CHANNEL)
        gamedig.query ({
            type: 'arma3',
            host: settings.IP,
            port: settings.PORT
            }).then((state) => {
            const players = state.players.map(player => player.name)
            const Nplayers = state.raw.numplayers;
            const maxPlayers = state.maxplayers;

            const emb = new Discord.MessageEmbed()
            .setColor('#ffff00')
            .setTitle(`Soliders amount: ${Nplayers}/${maxPlayers}`)
            .setDescription("Names: \n" + players.join("\n"))
            .setAuthor(`${state.name}`)
            .setTimestamp()
            rchannel.send({embeds: [emb]});
            }).catch((error) => {
                rchannel.send("Server doesn't responding :(");
            })

    },

    help: async function(message, settings) {
    const prefix = settings.PREFIX
    const emb = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle('List of commands')
    .setDescription(`${prefix}online - Check online on server`)
    .setFooter(message.guild.name)
    .setTimestamp()
    message.channel.send({embeds: [emb]})
    },

    getonline: async function(gamedig, settings, client) {
        const dt = new Date()
        gamedig.query ({
            type: 'arma3',
            host: settings.IP,
            port: settings.PORT
            }).then((state) => {
            const players = state.players.map(player => player.name)

            players.forEach((player) => {
                object[player] = true;
            })
            
            }).catch((error) => {
                console.log('error on get online')
            })

        if(dt.getMinutes() == 00 && dt.getHours() == 0) {
            const emb = new Discord.MessageEmbed()
                .setTitle('Players who were on the server')
                .setColor('RED')
                .setTimestamp()
                .setDescription(Object.keys(object).join("\n"))
                client.channels.cache.get(settings.FINALONLINE_CHANNEL).send({embeds: [emb]})
        }
    }
}