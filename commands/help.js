module.exports.run = async (bot, message, args) => {

  const Discord = require('discord.js');

    let Embed = new Discord.RichEmbed()
    .setTitle("Gunzar Discord Bot")
    .setColor("#f45f42")
    .addField("Member Commands", "`info`, `report`", false)
    .addField("Moderation Commands", "`say`, `ban`, `clear`, `kick`", false)
    .setTimestamp();

  message.channel.send(Embed);
}
