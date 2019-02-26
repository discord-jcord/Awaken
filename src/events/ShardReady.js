module.exports = {
  name: 'SHARD_READY',
  exec: (client, shard) => {
    shard.setActivity({
      game: {
        name: `Default Prefix: ${client.config.guildConfig.default.prefix} | Shard: #${shard.id}/${client.shardCount - 1}`,
        type: 0
      }
    });

    client.customLog('SHARD READY!', 'green', `Shard #${shard.id} is ready!`);
  }
};