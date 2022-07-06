const {Interaction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { get_statics } = require("./VEILED_EXPERTS-API");
const { f, data} =require('./modules')
const axios = require("axios");

async function Int_Ranking(int = require(Interaction)) {
    let count = 1
    let FEmbed = new MessageEmbed()
        .setTitle("랭킹을 불러오는중...")
        .setDescription("시간이 많이 걸릴수도 있습니다. 기다려주세요!")
        .setColor("#d94e2f")
        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
    int.reply({embeds: [FEmbed]})
    let l = {}
    let time = 0.0
    let l1,l2,l3,l4,l5,l6,l7 = false
    // 기초과정
    let s = setInterval(() => {
        time += 0.1
    },100)
    while(true){
        let r = await axios.post('https://globalstats.vx.nexon.com/api/Statistics/GetRead')
        l[r.data.ranking.rank_type] = r.data.ranking
        switch (r.data.ranking.rank_type) {
            case 1:
                l1 = true
                break
            case 2:
                l2 = true
                break
            case 3:
                l3 = true
                break
            case 4:
                l4 = true
                break
            case 5:
                l5 = true
                break
            case 6:
                l6 = true
                break
            case 7:
                l7 = true
        }
        if (l1 && l2 && l3 && l4 && l5 && l6 && l7){
            break
        }
    }
    clearInterval(s)
    let REmbed = new MessageEmbed()
        .setTitle("1. "+f(l[1].title))
        .setColor("#d94e2f")
        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
        .addFields({name: `1. ${l[count].list[0].nickname}`,value:`${l[count].list[0].exp}`},
            {name: `2. ${l[count].list[1].nickname}`,value:`${l[count].list[1].exp}`},
            {name: `3. ${l[count].list[2].nickname}`,value:`${l[count].list[2].exp}`},
            {name: `4. ${l[count].list[3].nickname}`,value:`${l[count].list[3].exp}`},
            {name: `5. ${l[count].list[4].nickname}`,value:`${l[count].list[4].exp}`})
        .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
    let frow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setEmoji("942384949762342972")
                .setStyle("DANGER")
                .setCustomId("RBACK")
        )
        .addComponents(
            new MessageButton()
                .setEmoji("933926552800989226")
                .setStyle("DANGER")
                .setCustomId("RNEXT")
        )
    try{
        await int.editReply({embeds: [REmbed],components: [frow]})
    }catch (e) {
        await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
        let ue = new MessageEmbed()
            .setTitle("⛔ 에러")
            .setDescription("에러가 발생했습니다 다시시도해주세요!")
            .setColor("#d94e2f")
            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
        await int.editReply({embeds: [ue]})
    }
    setTimeout(async ()=> {
        await int.editReply({components:[]})
    },1000*200)
    let filter = f => {
        return int.id === f.message.interaction.id
    }
    let collector = int.channel.createMessageComponentCollector({filter,time: 1000*200})

    collector.on('collect', async c => {
        if (!c.isButton()) return
        if (c.customId === "RBACK") {
            if (count === 1) count = 7
            else count -= 1
            c.deferUpdate()
        }
        if (c.customId === "RNEXT") {
            if (count === 7) count = 1
            else count += 1
            c.deferUpdate()
        }
        let CEmbed
        switch (count) {
            case 1:
                CEmbed = new MessageEmbed()
                    .setTitle("1. " + f(l[count].title))
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0].exp}`},
                        {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1].exp}`},
                        {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2].exp}`},
                        {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3].exp}`},
                        {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4].exp}`})
                    .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
                break
            case 2:
                CEmbed = new MessageEmbed()
                    .setTitle("2. " + f(l[count].title))
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0].kd}`},
                        {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1].kd}`},
                        {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2].kd}`},
                        {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3].kd}`},
                        {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4].kd}`})
                    .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
                break
            case 3:
                CEmbed = new MessageEmbed()
                    .setTitle("3. " + f(l[count].title))
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0].revive}`},
                        {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1].revive}`},
                        {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2].revive}`},
                        {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3].revive}`},
                        {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4].revive}`})
                    .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
                break
            case 4:
                CEmbed = new MessageEmbed()
                    .setTitle("4. " + f(l[count].title))
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0].juggernaut}`},
                        {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1].juggernaut}`},
                        {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2].juggernaut}`},
                        {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3].juggernaut}`},
                        {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4].juggernaut}`})
                    .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
                break
            case 5:
                CEmbed = new MessageEmbed()
                    .setTitle("5. " + f(l[count].title))
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0].funding}`},
                        {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1].funding}`},
                        {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2].funding}`},
                        {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3].funding}`},
                        {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4].funding}`})
                    .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
                break
            case 6:
                CEmbed = new MessageEmbed()
                    .setTitle("6. " + f(l[count].title))
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0].damage}`},
                        {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1].damage}`},
                        {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2].damage}`},
                        {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3].damage}`},
                        {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4].damage}`})
                    .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
                break
            case 7:
                CEmbed = new MessageEmbed()
                    .setTitle("7. " + f(l[count].title))
                    .setColor("#d94e2f")
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0].coin}`},
                        {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1].coin}`},
                        {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2].coin}`},
                        {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3].coin}`},
                        {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4].coin}`})
                    .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
                break
        }
        try {
            int.editReply({embeds: [CEmbed]})
        } catch (e) {
            await data.EError(int.commandName + "(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name, e)
            let ue = new MessageEmbed()
                .setTitle("⛔ 에러")
                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                .setColor("#d94e2f")
                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
            await int.editReply({embeds: [ue]})
        }
    })
}

module.exports = { Int_Ranking }