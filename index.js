const { Client,MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js')
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] })
const { token, client_id } = require('./config.json')
const { get_id, get_stats, get_seasonRecord} = require('./utils/ProjectDAPI')
const axios = require('axios')
let count = 0;

client.once('ready', () => {
    const Guilds = client.guilds.cache.map(guild => guild.id);
    console.log('준비됨!')
    let scount = 0;
    let repeat = setInterval(() => {
      if (scount === 0){
        client.user.setActivity(`봇이 켜진후 전적을 확인한 수는 ${count}번 입니다!`)
        scount = 1
      }
        else if(scount === 1){
          client.user.setActivity(`들어가 있는 서버 수는 ${Guilds.length}개 입니다!`)
          scount = 0
        }
    },30000)
    
    
})

client.on('interactionCreate', async int => {
    if (!int.isSelectMenu()) return;

    if (int.customId === "pds"){
        let stats = await get_stats(int.values[0])
        let s_stats = await get_seasonRecord(202202,int.values[0])
        let embed = new MessageEmbed()
            .setAuthor({name: stats.data.userInfo.nickname,iconURL: stats.data.profile_image})
            .setTitle(`${stats.data.userInfo.nickname}님의 프로필`)
            .setURL("https://barracks.d.nexon.com/"+int.values[0])
	    .setColor("#d94e2f")
            .addFields(
                {name:"랭킹",value: stats.data.ranking},
                {name: "승률", value: `${stats.data.seasonRecord.win_rate}%`},
                {name: "K/D",value: `${stats.data.seasonRecord.kd}`},
                {name: "대미지율",value: `${stats.data.seasonRecord.damage_rate}`},
                {name: "헤드샷율(킬당)",value: String((s_stats.data.headshot/s_stats["data"]["kill"]*100).toPrecision(3))+"%"}

            )
        int.reply({embeds: [embed]})
        count = count + 1
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
        let s_stats = await get_seasonRecord(202202,id[0]["usn"])

        let embed = new MessageEmbed()
            .setAuthor({name: stats.data.userInfo.nickname,iconURL: stats.data.profile_image})
            .setTitle(`${stats.data.userInfo.nickname}님의 프로필`)
            .setURL("https://barracks.d.nexon.com/"+id[0]["usn"])
            .setColor("#d94e2f")
            .addFields(
                {name:"랭킹",value: stats.data.ranking},
                {name: "승률", value: `${stats.data.seasonRecord.win_rate}%`},
                {name: "K/D",value: `${stats.data.seasonRecord.kd}`},
                {name: "대미지율",value: `${stats.data.seasonRecord.damage_rate}`},
                {name: "헤드샷율(킬당)",value: String((s_stats.data.headshot/s_stats["data"]["kill"]*100).toPrecision(3))+"%"}

            )
        int.reply({embeds: [embed]})
        count = count + 1
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
