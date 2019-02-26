const { Command } = require('../../../utils/base');
const axios = require('axios');

module.exports = class Help extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['h'],
      desc: 'The help command, gives a list of commands or get information about a single command',
      usage: '[command]'
    })
  }

  exec(msg, args, level) {
    let _cmd = args[0];
    let { disabledModules, prefix } = this.client.db.get(msg.channel.guild.id);

    let embed = new this.client.embed()

    if (!_cmd || !this.client.commands.has(_cmd.toLowerCase())) {
      embed.makeDescription(`Run \`${prefix}help [command]\` for more information about a Command.`);
      embed.makeAuthor({ name: `List of Available Commands`, iconURL: msg.author.avatarURL })
      embed.makeThumbnail(msg.author.avatarURL);
      
      for (var [, value] of this.client._modules) {
        if (disabledModules.includes(value.module.name.toLowerCase()) || value.module.disabled) continue;
        let commands = value.commands.filter(cmd => cmd.permlevel <= level);

        // No available command for you
        if (commands.length === 0) continue;

        embed.pushField({
          name: `» ${value.module.name}`,
          value: `\`${commands.map(cmd => cmd.name).join('`, `')}\``
        });
      }

      msg.channel.send({ embed });
    } else {
      _cmd = args[0].toLowerCase();

      let command = this.client.commands.get(_cmd) || this.client.commands.find(cmd => cmd.aliases.includes(_cmd));

      if (command.permlevel > level)
        return msg.channel.send({
          content: `
Sorry, but you cannot use this Command! You lack the permissions.
You need the permission: **${this.client.config.permissions[cmd.permlevel]}** to execute this Command!`
        });

      embed.makeAuthor({
        name: `${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`,
        iconURL: msg.author.avatarURL
      })
      .pushField({
        name: '» Usage',
        value: `  \`${prefix}${command.name} ${command.usage}\``
      })
      .pushField({
        name: '» Permissions Required',
        value: `  ${this.client.config.permissions[command.permlevel]}`
      })
      .pushField({
        name: '» Module',
        value: `  ${command.module}`
      })
      .pushField({
        name: '» Aliases',
        value: command.aliases.length > 0 ? `\`${command.aliases.join('`, `')}\`` : 'No Aliases Found!'
      })
      .pushField({
        name: '» Desc',
        value: command.desc
      })

      msg.channel.send({ embed })
    };
  }
};