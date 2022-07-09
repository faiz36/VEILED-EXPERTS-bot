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
    await int.editReply({embeds: [REmbed],components: [frow]})
    setTimeout(async ()=> {
        await int.editReply({components:[]})
    },1000*200)
    let filter = f => {
        return int.id === f.message.interaction.id
    }
    let collector = int.channel.createMessageComponentCollector({filter,time: 1000*200})

    collector.on('collect', async c => {
        try {
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
            let listN
            let N
            switch (count) {
                case 1:
                    listN = "exp"
                    N = "1"
                    break
                case 2:
                    listN = "kd"
                    N = "2"
                    break
                case 3:
                    listN = "revive"
                    N = "3"
                    break
                case 4:
                    listN = "juggernaut"
                    N = "4"
                    break
                case 5:
                    listN = "funding"
                    N = "5"
                    break
                case 6:
                    listN = "damage"
                    N = "6"
                    break
                case 7:
                    listN = "coin"
                    N = "7"
                    break
            }
            CEmbed = new MessageEmbed()
                .setTitle(`${N}.` + f(l[count].title))
                .setColor("#d94e2f")
                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                .addFields({name: `1. ${l[count].list[0].nickname}`, value: `${l[count].list[0][listN]}`},
                    {name: `2. ${l[count].list[1].nickname}`, value: `${l[count].list[1][listN]}`},
                    {name: `3. ${l[count].list[2].nickname}`, value: `${l[count].list[2][listN]}`},
                    {name: `4. ${l[count].list[3].nickname}`, value: `${l[count].list[3][listN]}`},
                    {name: `5. ${l[count].list[4].nickname}`, value: `${l[count].list[4][listN]}`})
                .setFooter({text: `자그마치 ${time.toFixed(1)}초를 기다리셨습니다!`})
            await int.editReply({embeds: [CEmbed]})
        } catch (e) {
            await data.EError(int,int.commandName, int.channel.type === "DM" ? "DM" : int.guild.name,e)
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