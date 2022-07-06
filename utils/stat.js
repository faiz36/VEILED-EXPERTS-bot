const {Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");
const {get_id} = require("./VEILED_EXPERTS-API");
const { data } = require("./modules")

async function IntStat(int = require(Interaction), nick) {
    await int.deferReply()
    let sdata = []
    let id;
    id = await get_id(nick)
    if (id.length === 1) {
        let d = await data.record(id[0]["usn"],202206)
        let r = d.record
        let i = d.info
        let ra = d.ranking
        let embed = new MessageEmbed()
            .setAuthor({name: i.blockFlag === 1 ? i.nickName + "(게임제재)" : i.nickName})
            .setThumbnail(i.img)
            .setTitle(`${i.nickName}님의 프로필`)
            .setURL("https://globalstats.vx.nexon.com/" + id[0]["usn"])
            .setColor("#d94e2f")
            .addFields(
                {name: "랭킹", value: ra.info},
                {name: "승률", value: `${r.winrate}`},
                {name: "K/D", value: `${r.kd}`},
                {name: "대미지율", value: `${r.dmgrate}`},
                {name: "헤드샷율(킬당)", value: r.headrate},
                {name: "라운드 평균 가해(40매치 기준)",value:`${r.avg_atk}`}
            )
        try {
            await int.editReply({embeds: [embed]})
        }catch (e) {
            await data.EError(int.commandName+" "+int.options.getString("유저명"), int.channel.type === "DM" ? "DM" : int.guild.name,e)
            let ue = new MessageEmbed()
                .setTitle("⛔ 에러")
                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                .setColor("#d94e2f")
                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
            await int.editReply({embeds: [ue]})
        }
    } else {
        for (let i = 0; i < id.length; i++) {
            sdata[i] = {}
            sdata[i]["label"] = 0
            sdata[i]["label"] = id[i]["nickname"]
            sdata[i]["value"] = id[i]["usn"]
        }
            int.channel.createMessageComponentCollector()
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('pds')
                    .setPlaceholder('원하는 유저명을 선택해주세요!')
                    .addOptions(sdata)
            );
        try {
            await int.editReply({content: "원하는 유저명을 선택해주세요!", components: [row] })
            setTimeout(()=>{
                int.editReply({components: []})
            },1000*100)
        } catch (e) {
            await data.EError(int.commandName+" "+int.options.getString("유저명"), int.channel.type === "DM" ? "DM" : int.guild.name,e)
            if(e.toString().includes("components[0].components[0].options: This field is required")){
                await int.editReply("존제하지 않는 닉네임입니다! 다시 시도해주세요!")
            }else{
                let ue = new MessageEmbed()
                    .setTitle("⛔ 에러")
                    .setDescription("에러가 발생했습니다 다시시도해주세요!")
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                await int.editReply({embeds: [ue]})
            }
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
            let v = collecter.values[0]
            let d = await data.record(v,202206)
            let r = d.record
            let i = d.info
            let ra = d.ranking
            let embed = new MessageEmbed()
                .setAuthor({name: i.blockFlag === 1 ? i.nickName + "(게임제재)" : i.nickName})
                .setThumbnail(i.img)
                .setTitle(`${i.nickName}님의 프로필`)
                .setURL("https://globalstats.vx.nexon.com/" + id[0]["usn"])
                .setColor("#d94e2f")
                .addFields(
                    {name: "랭킹", value: ra.info},
                    {name: "승률", value: `${r.winrate}`},
                    {name: "K/D", value: `${r.kd}`},
                    {name: "대미지율", value: `${r.dmgrate}`},
                    {name: "헤드샷율(킬당)", value: r.headrate},
                    {name: "라운드 평균 가해(40매치 기준)",value:`${r.avg_atk}`}
                )
            try {
                await int.editReply({embeds: [embed]})
            }catch (e) {
                await data.EError(int.commandName+" "+int.options.getString("유저명"), int.channel.type === "DM" ? "DM" : int.guild.name,e)
                let ue = new MessageEmbed()
                    .setTitle("⛔ 에러")
                    .setDescription("에러가 발생했습니다 다시시도해주세요!")
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                await int.editReply({embeds: [ue]})
            }
        }
    })

}

module.exports = { IntStat }