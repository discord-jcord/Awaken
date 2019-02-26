const { Module } = require('../../utils/base');

module.exports = class General extends Module {
  constructor(client) {
    super(client, {
      commands_dir: `${__dirname}/cmds`,
      name: 'General',
      desc: 'The default Module, can\'t be disabled, nor deleted'
    })
  }

  exec(msg) {
    if (!this.client.db.has(msg.channel.guild.id))
      this.client.db.set(msg.channel.guild.id, this.client.config.guildConfig.default);
  }
};
