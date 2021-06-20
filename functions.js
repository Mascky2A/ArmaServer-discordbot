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
            .setTitle(`Количество бойцов: ${Nplayers}/${maxPlayers}`)
            .setDescription("Имена бойцов находящихся на сервере: \n" + players.join("\n"))
            .setAuthor(`${state.name}`)
            .setTimestamp()
            message.channel.send(emb);
            }).catch((error) => {
                message.channel.send("Сервер не отвечает :(");
            })
    }

}