const { Message, Client, MessageEmbed } = require("discord.js");
const db = require("quick.db")
const ms = require("pretty-ms");

    exports.run = async (bot, message, args) => {
  
    let autor = message.author;
    
    let user = message.mentions.users.first();
    
    if(!user) {
        let embed3 = new MessageEmbed()

        .setColor(`#0060EE`)
        .setTitle(`${message.author.username}`)
        
        .setDescription(` ${autor}, você tem que mencionar um membro para realizar seu roubo!`);
        
        message.channel.send({embeds: [embed3]})
        
    };

    if(user.id == autor.id){

        let embed2 = new MessageEmbed()

        .setColor(`#0060EE`)
        .setTitle(`${message.author.username}`)
        
        .setFooter(``)
        .setDescription(` ${autor}, você não pode se auto-roubar!`);

        
        message.channel.send({embeds: [embed2]})
        
    };

    let user_money = await db.fetch(`gizmo.${user.id}`)
    if(user_money == null) user_money = 0;

    let autor_money = await db.fetch(`gizmo.${autor.id}`)
    if(autor_money == null) autor_money = 0;
        
    if(user_money <= 0) {


        let embed1 = new MessageEmbed()

        .setColor(`#0060EE`)
        .setTitle(`${message.author.username}`)
        
        .setDescription(` ${autor}, você não pode roubar alguém que não possui dinheiro!`);

        
        message.channel.send({embeds: [embed1]})
    };

    let timeout = 1800000;

    let daily = await db.fetch(`roubo_${autor.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {

        let time = ms(timeout - (Date.now() - daily));
  
        let timeEmbed = new MessageEmbed()
        
        .setColor("#000001")
        .setDescription(` Você já realizou um roubo hoje!\n\nTente novamente daqui a **${time}**`);
        
        message.reply({embeds: [timeEmbed]})
    } else {
        
        let sorte = Math.floor(Math.random() * 4) + 1;
        
        if(sorte == 2) {
            
            let amount = Math.floor(Math.random() * autor_money) + 1;
            
            let moneyEmbed = new MessageEmbed()
            .setTitle("👮 Seu roubo falhou e você foi preso!")
            .setColor("#000001")
            .setDescription(`Você realizou um roubo e não se saiu muito bem!\nE você perdeu um total de **${amount}** Gizmo Coins!`);
           
            message.channel.send(`${autor}`, moneyEmbed);
            db.subtract(`gizmo.${autor.id}`, amount);
            db.set(`roubo_${autor.id}`, Date.now());
        }else{
            
            let amount = Math.floor(Math.random() * user_money) + 1;
            
            let moneyEmbed = new MessageEmbed()
            .setTitle("🔫 Roubo Realizado Com sucesso!")
            .setColor("#000001")
            .setDescription(`Você roubou o ${user}!\nE você conseguiu uma quantia de **${amount}** Gizmo Coins!`);
            
            message.channel.send({content: `${user}`, embeds: [moneyEmbed] });
            db.subtract(`gizmo.${user.id}`, amount);
            db.add(`gizmo.${autor.id}`, amount);
            db.set(`roubo_${autor.id}`, Date.now());
        };
    };
}