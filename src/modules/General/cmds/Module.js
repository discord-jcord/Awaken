const { Command } = require('../../../utils/base');

module.exports = class Modules extends Command {
  constructor(client){
    super(client, {
      name: 'module',
      desc: 'Shows a list of Modules, or enable or disable them',
      usage: '<enable|disable|list>',
    })
  }

  exec(msg, args, level) {
    let keys = ['enable', 'disable', 'list'];
    let key = args[0];
    let { disabledModules } = this.client.db.get(msg.channel.guild.id);

    if (!key || !keys.includes(key.toLowerCase()))
      return msg.channel.send({
        content: `Please choose from the following keys:
\`${keys.join('`, `')}\``
      });

    key = key.toLowerCase();

    if (key === 'enable') {
      let module = args[1];

      if (!module || !this.client._modules.has(module.toLowerCase()))
        return msg.channel.send({
          content: `Invalid module ${module ? `**${module}**` : ''}`
        });

      module = this.client._modules.get(module.toLowerCase()).module;

      if (!disabledModules.includes(module.name.toLowerCase()))
        return msg.channel.send({
          content: `Module: **${module.name}** already enabled!`
        });

      let index = disabledModules.indexOf(module.name.toLowerCase())

      if (index > -1) {
        disabledModules.splice(index, 1);
      };

      this.client.db.setProp(msg.channel.guild.id, 'disabledModules', disabledModules);

      return msg.channel.send({
        content: `Successfully enabled the **${module.name}** Module!`
      });
    } else if (key === 'disable') {
      let module = args[1];

      if (!module || !this.client._modules.has(module.toLowerCase()))
        return msg.channel.send({
          content: `Invalid module ${module ? `**${module}**` : ''}`
        });

      module = this.client._modules.get(module.toLowerCase()).module;

      if (disabledModules.includes(module.name.toLowerCase()))
        return msg.channel.send({
          content: `Module: **${module.name}** already disabled!`
        });

      disabledModules.push(module.name.toLowerCase());
      this.client.db.setProp(msg.channel.guild.id, 'disabledModules', disabledModules);

      return msg.channel.send({
        content: `Successfully disabled the **${module.name}** Module!`
      });
    } else if (key === 'list') {
      let embed = new this.client.embed()
        .makeAuthor({
          name: msg.author.tag,
          iconURL: msg.author.avatarURL
        });

      for (var [, value] of this.client._modules) {
        let module = value.module;
        let status;

        let { disabledModules } = this.client.db.get(msg.channel.guild.id);
        
        if (disabledModules.includes(module.name.toLowerCase()) || module.disabled)
          status = '<:toggleoff:549444110449246209>';
        else
          status = '<:toggleon:549444101347606528>';

        embed.pushField({
          name: `» ${module.name} ${status}`,
          value: `  ${module.desc}`
        });
      }

      msg.channel.send({ embed });
    };
  }
};