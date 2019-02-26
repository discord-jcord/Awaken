const { Command } = require('../../../utils/base');

module.exports = class Eval extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      permlevel: 6
    });
  }

  async exec(msg, args) {
    if (!args.join(' ') || args.join(' ').length <= 0) return msg.channel.send({ content: 'Please supply a Code to Evaluate!' });
    try {
      var embed = new this.client.embed()
        .pushField({
          name: ':inbox_tray: Input:',
          value: `\`\`\`js\n${args.join(' ')}\`\`\``
        })
        .pushField({
          name: ':outbox_tray: Output:',
          value: `\`\`\`js\n${await this.client.clean(eval(args.join(' ')))}\`\`\``
        })
      await msg.channel.send({ embed })
    } catch (e) {
      var embed = new this.client.embed()
        .makeAuthor({
          name: ':x: Error!'
        })
        .makeDescription(`\`\`\`js\n${e}\`\`\``)
      await msg.channel.send({ embed })
    }
  }
};