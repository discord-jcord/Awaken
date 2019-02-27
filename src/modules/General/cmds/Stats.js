const { Command } = require('../../../utils/base');
const Jcord = require('jcord');
const os = require('os');
const moment = require('moment');
require('moment-duration-format');

module.exports = class Stats extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      aliases: ['botinfo', 'showstats'],
      desc: 'Get the Statistics of the Bot'
    });
  }

  exec(msg, args) {
    if (!args[0] || args[0] && (args[0].toLowerCase() !== 'shards' && args[0].toLowerCase() !== 'shard')) {
      let usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
      let totalMemory = os.totalmem() / 1024 / 1024;
      let embed = new this.client.embed()
        .makeAuthor({ name: this.client.user.tag, iconURL: this.client.user.avatarURL })
        .makeThumbnail(this.client.user.avatarURL)
        .pushField({ name: 'Client', value: `
**Total Guilds**: ${this.client.guilds.size.toLocaleString()}
**Total Channels**: ${this.client.channels.size.toLocaleString()}
**Total Users**: ${this.client.users.size.toLocaleString()}
**Client Uptime**: ${moment.duration(this.client.uptime).format("w [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]")}
`, inline: true })
        .pushField({ name: 'Process', value: `
**Library**: Jcord
**Version**: v${Jcord.Version}
**Node**: ${process.version}
**Heap Used**: \`${(usedMemory / 1024).toFixed(2)} GB ( ${usedMemory.toFixed(2)} MB ) / ${(totalMemory / 1024).toFixed(2)} GB ( ${totalMemory.toFixed(2)} MB\` )
`, inline: true }) 

      msg.channel.send({ embed });
    } else {

      let embed = new this.client.embed()
        .makeAuthor({ name: this.client.user.tag, iconURL: this.client.user.avatarURL })
        .makeThumbnail(this.client.user.avatarURL)
        .pushField({ name: 'Shards', value: `
• **Total Shards**: ${this.client.shardCount}
• **Current Shard**: [${msg.channel.guild.shard.id}/${this.client.shardCount - 1}]
• **Guilds on this Shard**: ${msg.channel.guild.shard.guilds.size.toLocaleString()}
• **Uptime for this Shard**: ${moment.duration(msg.channel.guild.shard.uptime).format("w [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]")}
• **Connected Shards**: ${this.client.connectedShards.size.toLocaleString()}
• **Current Shard Latency**: \`${msg.channel.guild.shard.latency}ms\`
`, inline: true })
      msg.channel.send({ embed });
    };
  }
};