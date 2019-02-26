module.exports = {
  name: 'READY',
  exec: (client) => {
    client.customLog('CONNECTED!', 'green', `All Shards are now connected!`);
  }
};