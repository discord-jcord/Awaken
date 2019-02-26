module.exports = {
  name: 'GUILD_MEMBER_ADD',
  exec: (client, member, guild) => {
    let { disabledModules } = client.db.get(guild.id);

    if (!disabledModules.includes('greeting') || client._modules.get('greeting').disabled) {

      let { welcomechannel, welcomemessage, welcomeenabled } = client.db.get(`greet_${guild.id}`);

      if (welcomeenabled) {
        welcomemessage = welcomemessage.replace(/{user}/gm, member.user)
          .replace(/{user.tag}/gm, member.user.tag)
          .replace(/{user.name}/gm, member.user.username)
          .replace(/{guild.name}/gm, guild.name)
          .replace(/{guild.owner}/gm, client.users.get(member.user.id))
          .replace(/{guild.owner.tag}/gm, client.users.get(member.user.id).tag)
          .replace(/{guild.owner.name}/gm, client.users.get(member.user.id).username)

        guild.channels.get(welcomechannel).send({ content: welcomemessage });
      } else {
        return;
      };
    };
  }
};