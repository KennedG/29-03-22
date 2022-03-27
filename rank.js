const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

    let splita = args.join(" ").split(" ")
    let subc = splita[0]
    let bank = db.all().filter(data => data.ID.startsWith(`bank`)).sort((a, b) => b.data - a.data);
    
    if(bank.length > 10){
        bank1 = 10
    }else{
        bank1 = bank.length
    
    }
let content = "";
        for (let i = 0; i < bank1; i++) {
            let member = client.users.cache.get(bank[i].ID.split('_')[1])
            if(member != undefined) member  = client.users.cache.get(bank[i].ID.split('_')[1]).username
            if(member == undefined) member = "Não Encontrado"
            content += `${i+1}º \`${member}\` - **<:coinGizmo:940747974206713886> ${bank[i].data}**\n`
        }

    const embed = new Discord.MessageEmbed()
        .setTitle(`<:coinGizmo:940747974206713886> **|** Rank de Coins`)
        .setDescription(content)
        .setColor('RED')
        .setTimestamp()
        .setFooter("Rank GLOBAL de Gizmo Coins!", client.user.avatarURL())

        message.reply({embeds:[embed]});
}   
