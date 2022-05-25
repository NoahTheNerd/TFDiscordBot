const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');
const axios = require('axios')
const mcutil = require('minecraft-server-util');

const conoptions = {
    timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
/*
I know this code sucks balls, but i really couldn't care less.
If you want to fix it yourself, go make a PR on the GitHub.
I'll gladly merge.
*/

const botIntents = new Intents(46593)
const client = new Client({ intents: botIntents });

client.once('ready', () => {
    client.user.setPresence({ activities: [{ name: config.status.motd, type: config.status.type, url: config.status.url }] });
    console.log('Bot started')
});

client.on('messageCreate', (message) => {
    if (!message.channel.id == config.channelid) return
    if (message.content.startsWith(config.prefix)) {
        switch (message.content.replace(config.prefix, '')) {

            case "l":
            case "list":
                if (isServOn == false) { return message.channel.send("Server is offline") }
                axios.get('http://mc-02.infra.totalfreedom.me:25600/list?json=true').then(res => {
                    let listFix = res.data.owners.concat(res.data.executives, res.data.senior_admins, res.data.admins, res.data.developers, res.data.master_builders, res.data.operators, res.data.impostors)
                    message.channel.send(`**Players online:** ${res.data.online}/${res.data.max}\n\`\`\`${listFix.join(', ').substring(0, listFix.join(', ').length - 2)}\`\`\``)})
            break;

        }
    }
})

var isServOn = true
if (config.modules.startupNotifier) {
    setInterval(() => {
        console.log("Checking server status...")
        mcutil.status('freedom.play.totalfreedom.me', 25565, conoptions).then((res) => {
            if (!isServOn) {
                isServOn = true
                console.log("Server has started")
                client.channels.cache.get(config.channelid).send('Server has started')
            } 
            console.log("Server is online")
        })
        .catch((error) => {isServOn = false;console.log("Server is offline")});
    }, 60000)
}

client.login(config.token);
