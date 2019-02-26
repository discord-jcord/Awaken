let walk = require('walk');

module.exports = {
  name: 'MESSAGE_CREATE',
  exec: (client, msg) => {
    if (!msg.channel.guild || msg.author.bot) return;

    if (!client.db.has(msg.channel.guild.id))
      client.db.set(msg.channel.guild.id , client.config.guildConfig.default);

    let { disabledModules, prefix } = client.db.get(msg.channel.guild.id);
    let args = msg.content.slice(prefix.length).split(/ +/g);
    let command = args.shift().toLowerCase();
    let level = client.permissionCheck(msg);

    let _modules = client._modules.keyArray();

    for (var i of _modules) {
      let module = client._modules.get(i).module;

      if (disabledModules.includes(i) || module.disabled) continue;

      module.exec(msg, args);
    };

    if (msg.content.indexOf(prefix) !== 0) return;

    let cmd = client.commands.get(command) || client.commands.find(c => c.aliases.includes(command));

    if (cmd) {
      if (disabledModules.includes(cmd.module.toLowerCase())) return;

      if (cmd.permlevel > level)
        return msg.channel.send({ 
          content: `
Sorry, but you cannot use this Command! You lack the permissions.
You need the permission: **${client.config.permissions[cmd.permlevel]}** to execute this Command!`
        });

      cmd.exec(msg, args, level);
    };
  }
};