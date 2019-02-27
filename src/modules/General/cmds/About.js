const { Command } = require('../../../utils/base');

module.exports = class About extends Command {
  constructor(client) {
    super(client, {
      name: 'about',
      aliases: ['abt', 'inv', 'invite'],
      desc: 'Checks the Current shard latency'
    });
  }

  exec(msg) {
    let embed = new this.client.embed()
      .makeDescription(`Awaken is a Work In Progress, Moderation ( WIP ), Utility Bot, and the official Discord Bot of the [Jcord](https://discord-jcord/jcord) Library.`)
      .pushField({
        name: 'Bot Owners',
        value: `  \`${this.client.config.owners.map(elem => this.client.users.get(elem).tag).join('`\n`')}\``,
        inline: true
      })
      .pushField({
        name: 'Links',
        value: `[Support Server](https://discord.gg/${this.client.config.links.serverCode})
[Invite](${this.client.config.links.invite(this.client.user.id)})
[Github](https://github.com/discord-jcord/Awaken/)`,
        inline: true
      })

    msg.channel.send({ embed });
  }
};