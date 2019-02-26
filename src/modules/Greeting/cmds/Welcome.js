const { Command } = require('../../../utils/base');

module.exports = class Welcome extends Command {
  constructor(client) {
    super(client, {
      name: 'welcome',
      desc: 'Set the by-server configuration of the Welcome Message',
      usage: '<key> [value]',
      permlevel: 4
    })
  }

  exec(msg, args) {
    let keys = ['channel', 'message', 'enable', 'disable'];
    let key = args[0];

    let { welcomeenabled, welcomechannel, welcomemessage } = this.client.db.get(`greet_${msg.channel.guild.id}`);

    let embed = new this.client.embed()
      .makeAuthor({ name: msg.channel.guild.name, iconURL: msg.channel.guild.iconURL })
      .makeThumbnail(msg.channel.guild.iconURL)

    if (!key || key && (!keys.includes(key.toLowerCase()))) {
      embed.makeDescription(`Invalid key Given! Please choose from the following: \`
${keys.join('`, `')}\`

**I| Data |I**
  Status: ${welcomeenabled ? '<:toggleon:549444101347606528>' : '<:toggleoff:549444110449246209>'}
  Channel: ${this.client.channels.get(welcomechannel) || 'None'}
  Message: ${welcomemessage ? `\`\`\`${welcomemessage}\`\`\`` : 'None'}
`)

      return msg.channel.send({ embed });
    }

    key = args[0].toLowerCase()

    if (key === 'channel') {
      let channel = msg.channelMentions[0];

      if (!channel)
        return msg.channel.send({
          content: 'Please mention a valid channel!'
        });
      
      if (channel && (!channel.permissionsFor(this.client.user.id, 'readMessages') && !channel.permissionsFor(this.client.users.id, 'sendMessages')))
        return msg.channel.send({
          content: 'I don\'t have the proper permissions to use that channel!'
        });

      welcomechannel = channel;
      this.client.db.setProp(`greet_${msg.channel.guild.id}`, 'welcomechannel', welcomechannel.id);

      return msg.channel.send({
        content: `I will now send greeting messages to: ${channel} !`
      });
    } else if (key === 'message') {
      let message = args.slice(1).join(' ');

      if (!message || message && message.length > 1500) {
        embed.makeDescription(`The maximum characters of the welcome message must be 1,500 Characters!

**I| Keys |I**
  {user} - The mentioned user who joined ( e.g ${this.client.user} )
  {user.tag} - The tag of the user who joined ( e.g **${this.client.user.tag}** )
  {user.name} - The name of the user who joined ( e.g **${this.client.user.username}** )
  {guild.name} - The name of the guild the user joined ( e.g **${msg.channel.guild.name}** )
  {guild.owner} - The mention of the guild owner ( e.g **${this.client.user}** )
  {guild.owner.tag} - The tag of the guild owner ( e.g **${this.client.user.tag}** )
  {guild.owner.name} - The name of the guild owner ( e.g **${this.client.user.username}** )
`)

        return msg.channel.send({ embed });
      }

      welcomemessage = args.slice(1).join(' ');
      this.client.db.setProp(`greet_${msg.channel.guild.id}`, 'welcomemessage', welcomemessage);

      return msg.channel.send({
        content: 'I have sucessfully updated the Welcome Message!'
      });
    } else if (key === 'enable') {
      if (!welcomemessage)
        return msg.channel.send({
          content: 'Sorry, but you can\'t enable this key feature yet! There is no welcome message for the guild, which is required!'
        });

      if (!welcomechannel)
        return msg.channel.send({
          content: 'Sorry, but you can\'t enable this key feature yet! There is no welcome channel for the guild, which is required!'
        });

      if (welcomeenabled)
        return msg.channel.send({
          content: 'Feature already enabled!'
        });

      welcomeenabled = true;

      this.client.db.setProp(`greet_${msg.channel.guild.id}`, 'welcomeenabled', welcomeenabled);
      return msg.channel.send({
        content: 'I have enabled the Welcome Feature!'
      });
    } else if (key === 'disabled') {
      if (!welcomeenabled)
        return msg.channel.send({
          content: 'Welcome feature already disabled!'
        });

      welcomeenabled = false;

      this.client.db.setProp(`greet_${msg.channel.guild.id}`, 'welcomeenabled', welcomeenabled);
      return msg.channel.send({
        content: 'I have disabled the Welcome Feature!'
      });
    };
  }
};