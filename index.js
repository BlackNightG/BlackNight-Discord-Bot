
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
  console.log(`${bot.user.username}`, "is online!");
  bot.user.setActivity("Developing", {type: "Watching"});
});


//BOT WELCOME
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcome');
  if (!channel) return;
  channel.send(`Awww welcome our friend ${member}.\n Thanks for coming to my server!\n ~Enjoy your stay`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray [0]
  let args = messageArray.slice(1)

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

//BOT HELP
  if(cmd === `${prefix}help`){
    let serverembed = new Discord.RichEmbed()
    .setDescription("Member Commands")
    .setColor("#6f1796")
    .addField(":hammer: Report [`${prefix}report`]", `If someone breaks the rules please report them`)
    .addField(":thinking: Suggestion `[${prefix}suggestion`]", `Suggest us new things to do, so we can improve`)
    .addField(":tickets: Tickets [`${prefix}tickets`]", `If you need any help type this in the chat`)
    .setFooter("Thanks for using DrYunkee");
    message.channel.send(serverembed);

  //BOT COMMANDS HELP
    if(cmd === `${prefix}report`)
    return message.channel.send(`:hammer: Try using » ${prefix}report @person reason`)


    if(cmd === `${prefix}suggestions`){
      return message.channel.send(`:thinking: Try using » ${prefix}suggestion your suggestion`)
    }

    if(cmd === `${prefix}tickets`){
      return message.channel.send(`:tickets: Try using » ${prefix}tickets your ticket`)
    }
  }

//CLEAR COMMAND
if(cmd === `${prefix}clear`){

    const Discord = require('discord.js');

    const ModRole = message.guild.roles.find("name", "Staff")
      if(!ModRole) return;
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

  }


//REPORT COMMAND
  if(cmd === `${prefix}report`){
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
      .addField("Reported User", `${rUser}`)
      .addField("Reported By",`${message.author.tag}`)
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

//SAY COMMAND
if(cmd === `${prefix}say`){

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);

}

module.exports.help = {
  name: "say"
}



  //BOT PREFIX
  if(cmd === `prefix`){
    const px = botconfig.prefix;
    return message.channel.send(`My prefix is » ${px}`);
  }



});
bot.login(botconfig.token);
