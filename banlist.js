const { MessageEmbed, DiscordAPIError } = require("discord.js")//ignore isso aqui, tava querendo fazer embed mas fiquei com preguiça 
module.exports = {
  name: "bans",
  aliases: ["listban", "list-ban", "banimentos"],
  //by baliza hehehe :)
  run: async (client, message, args) => {

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Você não possui permissão de \`Administrador\` bobão!`)
   const bybaliza = message.guild.bans.fetch()
   const baliza_color = "DARK BLUE"
   const baliza_d = (await bybaliza).map((baliza) => baliza.user.tag).join("\n") || "\`\`\`Ninguém foi banido\`\`\`"
    const bybaliza2 = new MessageEmbed()
    .setTitle('<:branco_escudoRDM:957672402593153044> | Lista de banidos')
    .setDescription(baliza_d)
    .setColor(baliza_color)
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL({dinamyc : true}))
    .setTimestamp(new Date())
    
    message.channel.send({embeds: [bybaliza2]})
  }
  }