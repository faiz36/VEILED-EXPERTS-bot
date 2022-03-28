const { Client,MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] })
const axios = require('axios')
const { token, client_id } = require('./config.json')

client.once('ready', () => {
    console.log('준비됨!')
})

client.on('interactionCreate', async int => {
    if (!int.isSelectMenu()) return;

    if (int.customId === "pds"){
        let stats = await get_stats(int.values[0])
        let embed = new MessageEmbed()
            .setAuthor({name: stats.data.userInfo.nickname,iconURL: stats.data.profile_image})
            .setTitle(`${stats.data.userInfo.nickname}님의 프로필`)
            .setURL("https://barracks.d.nexon.com/"+int.values[0])
            .addFields(
                {name:"랭킹",value: stats.data.ranking},
                {name: "승률", value: `${stats.data.seasonRecord.win_rate}%`},
                {name: "K/D",value: `${stats.data.seasonRecord.kd}`},
                {name: "대미지율",value: `${stats.data.seasonRecord.damage_rate}`},

            )
        int.reply({embeds: [embed]})
    }

})

client.on('interactionCreate', async int => {
    if (!int.isCommand()) return;

    if (int.commandName === "전적"){
        let name = int.options.getString("유저명")
        let data = []
        let id;
        id = await get_id(name)
	if(id.length === 1){
let stats = await get_stats(id[0]["usn"])
        let embed = new MessageEmbed()
            .setAuthor({name: stats.data.userInfo.nickname,iconURL: stats.data.profile_image})
            .setTitle(`${stats.data.userInfo.nickname}님의 프로필`)
            .setURL("https://barracks.d.nexon.com/"+id[0]["usn"])
            .addFields(
                {name:"랭킹",value: stats.data.ranking},
                {name: "승률", value: `${stats.data.seasonRecord.win_rate}%`},
                {name: "K/D",value: `${stats.data.seasonRecord.kd}`},
                {name: "대미지율",value: `${stats.data.seasonRecord.damage_rate}`},

            )
        int.reply({embeds: [embed]})
}else{
        for (var i = 0; i < id.length; i++){
            data[i] = {}
            data[i]["label"] = 0
            data[i]["label"] = id[i]["nickname"]
            data[i]["value"] = id[i]["usn"]
        }
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('pds')
                    .setPlaceholder('원하는 유저명을 선택해주세요!')
                    .addOptions(data)
            );
        try{await int.reply({content: "원하는 유저명을 선택해주세요!",components: [row],ephemeral: true})
    }catch(e){int.reply("에러가 발생했습니다!\n에러 목록 : "+e+"\n**대부분 없는 닉네임 이라 그렇습니다**")}}
}
})


client.login(token);

async function get_id(name) {
    let id = await axios({
        url: "https://barracks.d.nexon.com/api/Search/GetSearchRead/"+encodeURI(name),
        method: "POST",

    })
    return id.data["nickname_list"]
}

async function get_stats(id){
    let stats = await axios({
        url: "https://barracks.d.nexon.com/api/Profile/GetGameProfile/"+id,
        method: "POST",
    })
    return stats;
}
