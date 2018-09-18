const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    if(args[0] == "help"){
      message.reply("Usage: !report <user> <reason>");
      return;
    }

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let rreason = args.join(" ").slice(22);
    const avatar = message.author.avatarURL

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#f45f42")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By",`${message.author.tag}`, avatar)
    .addField("Channel", message.channel)
    .addField("Reason", rreason)
    .setTimestamp();

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel :sad:.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
