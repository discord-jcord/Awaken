module.exports = {
  name: 'debug',
  exec: (client, data) => {
    client.customLog('DEBUG', 'RED', `${data.message} | Shard #${data.shard}`);
  }
};