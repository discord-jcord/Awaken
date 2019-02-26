module.exports = {
  name: 'SHARD_READY',
  exec: (client, shard) => {
    client.customLog('SHARD READY!', 'green', `Shard #${shard.id} is ready!`);
  }
};