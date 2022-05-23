# TFDiscordBot
A remake of the original TF Discord Bot

## Setup

Modules:
- Discord JS
- Axios
- Minecraft Server Util

After installing all modules, make a file named `config.json` with the following contents:
```json
{
    "token":" YOUR DISCORD BOT TOKEN ",
    "prefix":"tf!",
    "channelid":" CHANNEL THAT THE BOT CAN USE ",
    "status": {
        "type":"STREAMING",
        "motd":"from your mothers room.",
        "url":"https://www.youtube.com/watch?v=Ch2kLSKj9Jk"
    },
    "modules": {
        "startupNotifier": true
    }
}
```

## Usage

Tweak the `config.json` file to your liking, the bot has one command and one module at the moment. 

Run `tf!l` in the text channel who's id you put in the config file, it will show all online players at that time.

When `startupNotifier` is enabled, it will check every 60 seconds if the server is online.

## Support

Got any questions, bug reports or ideas? Feel free to open an issue.
