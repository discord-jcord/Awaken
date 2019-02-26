const { Command } = require('../../../utils/base');

module.exports = class Ping extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      desc: 'Checks the Current shard latency'
    });
  }

  exec(msg) {
    msg.channel.send({ content: 'Pinging...' })
    .then(m => {
      m.patch({ content: `Pong! 💓 Shard **#${msg.channel.guild.shard.id}** took \`${msg.channel.guild.shard.latency}ms\`` });
    });
  }
};