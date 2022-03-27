// eslint-disable-next-line no-unused-vars
const { Message, MessageEmbed } = require('discord.js');
const { getAudioUrl } = require('google-tts-api');
const {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
    getVoiceConnection
} = require('@discordjs/voice');

/**
* @param { Message } message
* @param { string[] } args
*/
const run = async (client, message, args) => {
    
    // Criado por 163015758140538880
    // https://discord.com/users/163015758140538880
    const author = `${message.member.displayName} disse:`;
    const text = `${args.join(' ')}`;
    const audioUrl = getAudioUrl(`${author} ${text}`, {
        lang: 'pt-BR',
    });

    const channel = message.member.voice.channel;
    if (!channel) return message.reply('Você não está em um canal de voz');

    let connection = getVoiceConnection(message.guildId);

    if (!connection) {
        connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guildId,
            adapterCreator: channel.guild.voiceAdapterCreator
        });
    }

    const player = createAudioPlayer();

    const resource = createAudioResource(audioUrl);

    connection.subscribe(player);
    player.play(resource);

    const color = message.member.roles.highest.hexColor;

    const embed = new MessageEmbed()
        .setColor(color)
        .setAuthor({ name: message.member.displayName,
            iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setDescription(text);

    await message.delete();
    message.channel.send({ embeds: [ embed ] });

};


module.exports = {	
    run,
    name: 'falar',
    perms: [],
};
