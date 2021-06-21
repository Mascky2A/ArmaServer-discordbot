const Discord = require('discord.js');
const gamedig = require('gamedig');
const config = require('./config.json')
const functions = require('./functions.js')
const client = new Discord.Client()

const settings = {
    PREFIX: "PREFIX",
    IP: "a3.hwrp.ru",
    PORT: "2302",
    REPORT_CHANNEL: "CHANNEL ID"
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

    setInterval(() => {
       const dt = new Date();

			if(dt.getHours() == 2){
				functions.report(client, settings, gamedig);
			}
    }, 60000);

})

client.on('message', async message => {
    if(!message.content.startsWith(settings.PREFIX)) return;
    

	const commandBody = message.content.slice(settings.PREFIX.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	switch (command) {
		case 'online':
			functions.online(message, gamedig, settings);
			break;
        case 'help':
            functions.help(message, settings)
            break;
        default: 
        const emb = new Discord.MessageEmbed()
        .setTitle(`Unkown command! Please write ${settings.prefix}help, to see all commands.`)
        message.channel.send(emb)
        break;
	}
    
});

client.login(config.token)