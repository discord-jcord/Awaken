const { Module } = require('../../utils/base');

module.exports = class Greeting extends Module {
  constructor(client) {
    super(client, {
      commands_dir: `${__dirname}/cmds`,
      name: 'Greeting',
      desc: 'The module that handles the farewell and welcome messages'
    })
  }

  exec(msg) {
    if (!this.client.db.has(`greet_${msg.channel.guild.id}`))
      this.client.db.set(`greet_${msg.channel.guild.id}`, this.client.config.guildConfig.greet);
  }
};