
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const hora = new Date();
  hora.setHours(hora.getHours() - 3);
  const reason = args.join(' ');
  //Mensagem no Chat
  const embed = new Discord.MessageEmbed()
  .setTitle(`<a:hype:897139138661351434> |Dono!`)
  .setColor("#A020F0")
  .setDescription(`** Divulgação de Instagram!    [@guilhermekenned_](https://www.instagram.com/guilhermekenned_/)  **<a:verificado:908562051927007242> `)
  .setFooter(`Solicitado por: ${message.author.tag}`)
  message.channel.send(embed);
}