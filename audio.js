const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js'); // npm i discord.js@latest
const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice'); // npm i @discordjs/voice
const { readdirSync } = require('fs'); // npm i fs

module.exports = {
  name: 'audio',
  author: 'ryukkj#0666',
  /**
   * @param {Client} client
   * @param {Message} message
   */
  run: async (client, message) => {
    
    //===============> Made by: ryukkj#0666 <===============//
    
    if (!message.member.voice.channel) {
      return message.reply('💢 | Você deve estar `conectado em um canal` de voz para usar este comando.');
    } else if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
      return message.reply(`💢 | Já estou conectado em ${message.guild.me.voice.channel}.`);
    } else {
      
      let audiosFiles = readdirSync(`./Áudios`).filter(file => file.endsWith(".mp3"));
      let audios = audiosFiles.map((a, i) => `${i + 1}. ` + a.split('.')[0]).join('\n');

      let embed = new MessageEmbed()
        .setColor(message.member.roles.highest.hexColor)
        .setTitle(`Audios Disponíveis:`)
        .setDescription(audiosFiles.length === 0 ? `\`Nenhum\`` : `\`${audios}\``)

      let menu = new MessageSelectMenu()
        .setCustomId('audio')
        .setPlaceholder('🎶 Escolha um áudio:');

      if (audiosFiles.length === 0) {
        menu.addOptions({ value: 'empty', label: 'empty' });
        menu.setDisabled(true);
      } else {
        for (var i in audiosFiles) {
          menu.addOptions({ value: audiosFiles[i], label: audiosFiles[i].split('.')[0] })
        }
      }

      let row = new MessageActionRow().addComponents(menu);
      let msg = await message.reply({ embeds: [embed], components: [row] });
      let filter = (i) => i.isSelectMenu() && i.message.id === msg.id;
      let collector = msg.createMessageComponentCollector({ filter: filter });

      collector.on("collect", async (i) => {
        if (i.user.id !== message.author.id)
          return i.reply({
            content: `${i.user}, essa interação não é pra você. 👀`,
            ephemeral: true,
          });
          
        let connection = getVoiceConnection(message.guild.id);

        if (!connection) {
          connection = joinVoiceChannel({
            'adapterCreator': message.guild.voiceAdapterCreator,
            'channelId': message.member.voice.channel.id,
            'guildId': message.guild.id,
            'selfDeaf': true,
          });
        }
        
        let player = createAudioPlayer();
        let resource = createAudioResource(`./Áudios/${i.values[0]}`, {
          metadata: {
            title: i.values[0],
          },
        });

        connection.subscribe(player);
        player.play(resource);
        i.deferUpdate();

        player.on(AudioPlayerStatus.Playing, (playing) => {
          console.log(`Tocando: ${playing.resource.metadata.title}`);
        });
      });
      
      //===============> Made by: ryukkj#0666 <===============//
    }
  }
}