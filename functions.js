const Discord = require('discord.js')

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
            message.channel.send(emb);
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
            rchannel.send(emb);
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
    message.channel.send(emb)
    }

}