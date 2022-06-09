const {Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");
const {get_id, get_stats, get_seasonRecord} = require("./VEILED_EXPERTS-API");

async function IntStat(int = require(Interaction), nick) {
    int.deferReply()
    let data = []
    let id;
    id = await get_id(nick)
    if (id.length === 1) {
        let stats = await get_stats(id[0]["usn"])
        let s_stats = await get_seasonRecord(202206, id[0]["usn"])
        let kill = s_stats.data.kill.replaceAll(',', '')
        let headshot = s_stats.data.headshot.replaceAll(',', '')
        let embed = new MessageEmbed()
            .setAuthor({name: stats.data.userInfo.block_flag === 1 ? stats.data.userInfo.nickname + "(자격박탈)" : stats.data.userInfo.nickname})
            .setThumbnail(stats.data.profile_image)
            .setTitle(`${stats.data.userInfo.nickname}님의 프로필`)
            .setURL("https://globalstats.vx.nexon.com/" + id[0]["usn"])
            .setColor("#d94e2f")
            .addFields(
                {name: "랭킹", value: stats.data.ranking},
                {name: "승률", value: `${stats.data.seasonRecord.win_rate}%`},
                {name: "K/D", value: `${stats.data.seasonRecord.kd}`},
                {name: "대미지율", value: `${stats.data.seasonRecord.damage_rate}`},
                {name: "헤드샷율(킬당)", value: String((headshot / kill * 100).toPrecision(3)) + "%"},
            )
        await int.editReply({embeds: [embed]})
    } else {
        for (let i = 0; i < id.length; i++) {
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
        try {
            await int.editReply({content: "원하는 유저명을 선택해주세요!", components: [row] })
        } catch (e) {
            await int.editReply("에러가 발생했습니다!\n에러 목록 : " + e + "\n**대부분 없는 닉네임 이라 그렇습니다**")
        }
    }

    const filter = f => {
        return f.message.interaction.id === int.id
    }

    const collector = int.channel.createMessageComponentCollector({
        filter,
        time: 1000 * 100
    })

    collector.on('collect',async collecter => {
        if (!collecter.isSelectMenu()) return
        if (collecter.customId === 'pds') {
            await collecter.deferUpdate()
            let stats = await get_stats(collecter.values[0])
            let s_stats = await get_seasonRecord(202202, collecter.values[0])
            let kill = s_stats.data.kill.replaceAll(',', '')
            let headshot = s_stats.data.headshot.replaceAll(',', '')
            let embed = new MessageEmbed()
                .setAuthor({name: stats.data.userInfo.block_flag === 1 ? stats.data.userInfo.nickname + "(자격박탈)" : stats.data.userInfo.nickname})
                .setThumbnail(stats.data.profile_image)
                .setTitle(`${stats.data.userInfo.nickname}님의 프로필`)
                .setURL("https://globalstats.vx.nexon.com/" + collecter.values[0])
                .setColor("#d94e2f")
                .addFields(
                    {name: "랭킹", value: stats.data.ranking},
                    {name: "승률", value: `${stats.data.seasonRecord.win_rate}%`},
                    {name: "K/D", value: `${stats.data.seasonRecord.kd}`},
                    {name: "대미지율", value: `${stats.data.seasonRecord.damage_rate}`},
                    {name: "헤드샷율(킬당)", value: String((headshot / kill * 100).toPrecision(3)) + "%"},
                )
            await int.editReply({embeds: [embed]})
        }
    })

}

module.exports = { IntStat }