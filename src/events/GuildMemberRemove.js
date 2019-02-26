module.exports = {
  name: 'GUILD_MEMBER_REMOVE',
  exec: (client, member, guild) => {
    let { disabledModules } = client.db.get(guild.id);

    if (!disabledModules.includes('greeting') || client._modules.get('greeting').disabled) {

      let { farewellchannel, farewellmessage, farewellenabled } = client.db.get(`greet_${guild.id}`);

      if (farewellenabled) {
        farewellmessage = farewellmessage.replace(/{user}/gm, member.user)
          .replace(/{user.tag}/gm, member.user.tag)
          .replace(/{user.name}/gm, member.user.username)
          .replace(/{guild.name}/gm, guild.name)
          .replace(/{guild.owner}/gm, client.users.get(member.user.id))
          .replace(/{guild.owner.tag}/gm, client.users.get(member.user.id).tag)
          .replace(/{guild.owner.name}/gm, client.users.get(member.user.id).username)

        guild.channels.get(farewellchannel).send({ content: farewellmessage });
      } else {
        return;
      };
    };
  }
};