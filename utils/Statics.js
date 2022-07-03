const {Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageComponentInteraction, MessageButton} = require("discord.js");
const {get_statics} = require("./VEILED_EXPERTS-API");
const {Embed} = require("@discordjs/builders");
const { f } = require('./modules')

async function Int_statics(int = require(Interaction)) {
    let acount = 0
    let wcount = 0
    let data = await get_statics()
    data = data.data
    let FEmbed = new MessageEmbed()
        .setTitle("**통계 - 평균**")
        .addFields(
            {name: "**폭탄 해체**",value:`${data.avg.bomb_defuse}회`},
            {name: "**폭탄 폭발**",value:`${data.avg.bomb_explode}회`},
            {name: "**폭탄 설치**",value:`${data.avg.bomb_install}회`},
            {name: "**저거넛 킬**",value:`${data.avg.juggernaut_kill}킬`},
            {name: "**킬**",value:`${data.avg.match_kill}킬`},
            {name: "**헤드샷 킬**",value:`${data.avg.match_kill_head}킬`},
            {name: "**회복 아이템 사용**",value:`${data.avg.recover}회`}
        )
        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
        .setColor("#d94e2f")
    let row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("VX_Statics")
                .addOptions([
                    {
                        label: "평균",
                        value: "avg"
                    },
                    {
                        label: "요원 별",
                        value: "agent"
                    },
                    {
                        label: "무기 별",
                        value: "weapon"
                    },
                    {
                        label: "저거넛 사용 평균",
                        value: "juggernaut"
                    },
                    {
                        label: "아이템 사용",
                        value: "item"
                    },
                    {
                        label: "펀딩",
                        value: "funding"
                    },
                    {
                        label: "렙톤 선호도",
                        value: "perk"
                    }
                ])
        )
    int.reply({embeds: [ FEmbed ],components: [ row ]})

    setTimeout(()=>{
        int.editReply({components: []})
    },1000*100)

    let filter = f => {
        return int.id === f.message.interaction.id
    }

    let collector = int.channel.createMessageComponentCollector({
        filter,
        time: 1000*100
    })

    collector.on('collect', c =>{
        if(!c.isSelectMenu()) return
        if(!c.customId === "VX_Statics") return;
        switch (c.values[0]) {
            case "avg":
                c.deferUpdate()
                let AEmbed = new MessageEmbed()
                    .setTitle("**통계 - 평균**")
                    .addFields(
                        {name: "**폭탄 해체**",value:`${data.avg.bomb_defuse}회`},
                        {name: "**폭탄 폭발**",value:`${data.avg.bomb_explode}회`},
                        {name: "**폭탄 설치**",value:`${data.avg.bomb_install}회`},
                        {name: "**저거넛 킬**",value:`${data.avg.juggernaut_kill}킬`},
                        {name: "**킬**",value:`${data.avg.match_kill}킬`},
                        {name: "**헤드샷 킬**",value:`${data.avg.match_kill_head}킬`},
                        {name: "**회복 아이템 사용**",value:`${data.avg.recover}회`}
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                int.editReply({embeds: [ AEmbed ],components: [row]})
                break
            case "agent":
                acount = 0
                c.deferUpdate()
                let AGEmbed = new MessageEmbed()
                    .setTitle("**통계 - 요원(가해량 순)**")
                    .addFields(
                        {name: `1. ${f(data.character.damage_list[0]["name"])}`,value:`${data.character.damage_list[0]["damage_str"]}`},
                        {name: `2. ${f(data.character.damage_list[1]["name"])}`,value:`${data.character.damage_list[1]["damage_str"]}`},
                        {name: `3. ${f(data.character.damage_list[2]["name"])}`,value:`${data.character.damage_list[2]["damage_str"]}`},
                        {name: `4. ${f(data.character.damage_list[3]["name"])}`,value:`${data.character.damage_list[3]["damage_str"]}`},
                        {name: `5. ${f(data.character.damage_list[4]["name"])}`,value:`${data.character.damage_list[4]["damage_str"]}`},
                        {name: `6. ${f(data.character.damage_list[5]["name"])}`,value:`${data.character.damage_list[5]["damage_str"]}`},
                        {name: `7. ${f(data.character.damage_list[6]["name"])}`,value:`${data.character.damage_list[6]["damage_str"]}`},
                        {name: `8. ${f(data.character.damage_list[7]["name"])}`,value:`${data.character.damage_list[7]["damage_str"]}`},
                        {name: `9. ${f(data.character.damage_list[8]["name"])}`,value:`${data.character.damage_list[8]["damage_str"]}`}
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                let arow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("ABack")
                            .setStyle("DANGER")
                            .setEmoji("942384949762342972")
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("ANext")
                            .setStyle("DANGER")
                            .setEmoji("933926552800989226")
                    )
                int.editReply({embeds: [ AGEmbed ],components: [arow,row]})
                break
            case "weapon":
                wcount = 0
                c.deferUpdate()
                WEmbed = new MessageEmbed()
                    .setTitle("통계 - 무기(선호도 순)")
                    .addFields(
                        {name: `1. ${data.weapon[0]["name"].startsWith("W") ? f(data.weapon[0]["name"]) : data.weapon[0]["name"]}`,value:`${data.weapon[0]["value"]}%`},
                        {name: `2. ${data.weapon[1]["name"].startsWith("W") ? f(data.weapon[1]["name"]) : data.weapon[1]["name"]}`,value:`${data.weapon[1]["value"]}%`},
                        {name: `3. ${data.weapon[2]["name"].startsWith("W") ? f(data.weapon[2]["name"]) : data.weapon[2]["name"]}`,value:`${data.weapon[2]["value"]}%`},
                        {name: `4. ${data.weapon[3]["name"].startsWith("W") ? f(data.weapon[3]["name"]) : data.weapon[3]["name"]}`,value:`${data.weapon[3]["value"]}%`},
                        {name: `5. ${data.weapon[4]["name"].startsWith("W") ? f(data.weapon[4]["name"]) : data.weapon[4]["name"]}`,value:`${data.weapon[4]["value"]}%`}
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                let wrow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("WBack")
                            .setStyle("DANGER")
                            .setEmoji("942384949762342972")
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("WNext")
                            .setStyle("DANGER")
                            .setEmoji("933926552800989226")
                    )
                int.editReply({embeds: [WEmbed],components: [wrow,row]})
                break
            case "juggernaut":
                c.deferUpdate()
                let JEmbed = new MessageEmbed()
                    .setTitle("통계 - 저거넛 사용 평균(라운드별)")
                    .addFields(
                        {name: "1라운드",value:`${data.juggernaut[0]["juggernaut_per"]}회`,inline:true},
                        {name: "2라운드",value:`${data.juggernaut[1]["juggernaut_per"]}회`,inline:true},
                        {name: "3라운드",value:`${data.juggernaut[2]["juggernaut_per"]}회`,inline:true},
                        {name: "4라운드",value:`${data.juggernaut[3]["juggernaut_per"]}회`,inline:true},
                        {name: "5라운드",value:`${data.juggernaut[4]["juggernaut_per"]}회`,inline:true},
                        {name: "6라운드",value:`${data.juggernaut[5]["juggernaut_per"]}회`,inline:true},
                        {name: "7라운드",value:`${data.juggernaut[6]["juggernaut_per"]}회`,inline:true},
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                int.editReply({embeds: [ JEmbed ],components: [ row ]})
                break
            case "item":
                c.deferUpdate()
                let IEmbed = new MessageEmbed()
                    .setTitle("통계 - 아이템 사용 평균")
                    .addFields(
                        {name: `1. ${f(data.item_use[0]["item_name"])}`,value:`${data.item_use[0]["use_per"]}회`},
                        {name: `2. ${f(data.item_use[1]["item_name"])}`,value:`${data.item_use[1]["use_per"]}회`},
                        {name: `3. ${f(data.item_use[2]["item_name"])}`,value:`${data.item_use[2]["use_per"]}회`},
                        {name: `4. ${f(data.item_use[3]["item_name"])}`,value:`${data.item_use[3]["use_per"]}회`},
                        {name: `5. ${f(data.item_use[4]["item_name"])}`,value:`${data.item_use[4]["use_per"]}회`},
                        {name: `6. ${f(data.item_use[5]["item_name"])}`,value:`${data.item_use[5]["use_per"]}회`},
                        {name: `7. ${f(data.item_use[6]["item_name"])}`,value:`${data.item_use[6]["use_per"]}회`},
                        {name: `8. ${f(data.item_use[7]["item_name"])}`,value:`${data.item_use[7]["use_per"]}회`}
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                int.editReply({embeds: [IEmbed],components: [ row ]})
                break
            case "funding":
                c.deferUpdate()
                let FEmbed = new MessageEmbed()
                    .setTitle("통계 - 펀딩")
                    .addFields(
                        {name: "1라운드",value: `전술 : ${data.round.funding_list[0]["tactic"]}%\n장비 : ${data.round.funding_list[0]["equipment"]}%\n화기 : ${data.round.funding_list[0]["weapon"]}%`,inline:true},
                        {name: "2라운드",value: `전술 : ${data.round.funding_list[1]["tactic"]}%\n장비 : ${data.round.funding_list[1]["equipment"]}%\n화기 : ${data.round.funding_list[1]["weapon"]}%`,inline:true},
                        {name: "3라운드",value: `전술 : ${data.round.funding_list[2]["tactic"]}%\n장비 : ${data.round.funding_list[2]["equipment"]}%\n화기 : ${data.round.funding_list[2]["weapon"]}%`,inline:true},
                        {name: "4라운드",value: `전술 : ${data.round.funding_list[3]["tactic"]}%\n장비 : ${data.round.funding_list[3]["equipment"]}%\n화기 : ${data.round.funding_list[3]["weapon"]}%`,inline:true},
                        {name: "5라운드",value: `전술 : ${data.round.funding_list[4]["tactic"]}%\n장비 : ${data.round.funding_list[4]["equipment"]}%\n화기 : ${data.round.funding_list[4]["weapon"]}%`,inline:true},
                        {name: "6라운드",value: `전술 : ${data.round.funding_list[5]["tactic"]}%\n장비 : ${data.round.funding_list[5]["equipment"]}%\n화기 : ${data.round.funding_list[5]["weapon"]}%`,inline:true},
                        {name: "7라운드",value: `전술 : ${data.round.funding_list[6]["tactic"]}%\n장비 : ${data.round.funding_list[6]["equipment"]}%\n화기 : ${data.round.funding_list[6]["weapon"]}%`,inline:true},
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                int.editReply({embeds: [FEmbed],components: [ row ]})
                break
            case "perk":
                c.deferUpdate()
                let PEmbed = new MessageEmbed()
                    .setTitle("통계 - 렙톤 선호도")
                    .addFields(
                        {name: `1. ${f(data.perk[0]["name"])}`,value:`${data.perk[0]["value"]}%`},
                        {name: `2. ${f(data.perk[1]["name"])}`,value:`${data.perk[1]["value"]}%`},
                        {name: `3. ${f(data.perk[2]["name"])}`,value:`${data.perk[2]["value"]}%`},
                        {name: `4. ${f(data.perk[3]["name"])}`,value:`${data.perk[3]["value"]}%`},
                        {name: `5. ${f(data.perk[4]["name"])}`,value:`${data.perk[4]["value"]}%`},
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                int.editReply({embeds: [PEmbed],components: [row]})
                break
        }
    })

    // 요원
    collector.on('collect',c => {
        if(!c.isButton()) return
        let AGEmbed
        switch (c.customId) {
            case "ABack":
                if (acount === 0) acount = 3
                else acount -= 1
                switch (acount) {
                    case 0:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("**통계 - 요원(가해량 순)**")
                            .addFields(
                                {name: `1. ${f(data.character.damage_list[0]["name"])}`,value:`${data.character.damage_list[0]["damage_str"]}`},
                                {name: `2. ${f(data.character.damage_list[1]["name"])}`,value:`${data.character.damage_list[1]["damage_str"]}`},
                                {name: `3. ${f(data.character.damage_list[2]["name"])}`,value:`${data.character.damage_list[2]["damage_str"]}`},
                                {name: `4. ${f(data.character.damage_list[3]["name"])}`,value:`${data.character.damage_list[3]["damage_str"]}`},
                                {name: `5. ${f(data.character.damage_list[4]["name"])}`,value:`${data.character.damage_list[4]["damage_str"]}`},
                                {name: `6. ${f(data.character.damage_list[5]["name"])}`,value:`${data.character.damage_list[5]["damage_str"]}`},
                                {name: `7. ${f(data.character.damage_list[6]["name"])}`,value:`${data.character.damage_list[6]["damage_str"]}`},
                                {name: `8. ${f(data.character.damage_list[7]["name"])}`,value:`${data.character.damage_list[7]["damage_str"]}`},
                                {name: `9. ${f(data.character.damage_list[8]["name"])}`,value:`${data.character.damage_list[8]["damage_str"]}`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [ AGEmbed ]})
                        break
                    case 1:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(K/D 순)")
                            .addFields(
                                {name: `1. ${f(data.character.kd_list[0]["name"])}`,value:`${data.character.kd_list[0]["kd"]}`},
                                {name: `2. ${f(data.character.kd_list[1]["name"])}`,value:`${data.character.kd_list[1]["kd"]}`},
                                {name: `3. ${f(data.character.kd_list[2]["name"])}`,value:`${data.character.kd_list[2]["kd"]}`},
                                {name: `4. ${f(data.character.kd_list[3]["name"])}`,value:`${data.character.kd_list[3]["kd"]}`},
                                {name: `5. ${f(data.character.kd_list[4]["name"])}`,value:`${data.character.kd_list[4]["kd"]}`},
                                {name: `6. ${f(data.character.kd_list[5]["name"])}`,value:`${data.character.kd_list[5]["kd"]}`},
                                {name: `7. ${f(data.character.kd_list[6]["name"])}`,value:`${data.character.kd_list[6]["kd"]}`},
                                {name: `8. ${f(data.character.kd_list[7]["name"])}`,value:`${data.character.kd_list[7]["kd"]}`},
                                {name: `9. ${f(data.character.kd_list[8]["name"])}`,value:`${data.character.kd_list[8]["kd"]}`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [AGEmbed]})
                        break
                    case 2:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(선호도 순)")
                            .addFields(
                                {name: `1. ${f(data.character.use_list[0]["name"])}`,value:`${data.character.use_list[0]["use_rate"]}%`},
                                {name: `2. ${f(data.character.use_list[1]["name"])}`,value:`${data.character.use_list[1]["use_rate"]}%`},
                                {name: `3. ${f(data.character.use_list[2]["name"])}`,value:`${data.character.use_list[2]["use_rate"]}%`},
                                {name: `4. ${f(data.character.use_list[3]["name"])}`,value:`${data.character.use_list[3]["use_rate"]}%`},
                                {name: `5. ${f(data.character.use_list[4]["name"])}`,value:`${data.character.use_list[4]["use_rate"]}%`},
                                {name: `6. ${f(data.character.use_list[5]["name"])}`,value:`${data.character.use_list[5]["use_rate"]}%`},
                                {name: `7. ${f(data.character.use_list[6]["name"])}`,value:`${data.character.use_list[6]["use_rate"]}%`},
                                {name: `8. ${f(data.character.use_list[7]["name"])}`,value:`${data.character.use_list[7]["use_rate"]}%`},
                                {name: `9. ${f(data.character.use_list[8]["name"])}`,value:`${data.character.use_list[8]["use_rate"]}%`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [AGEmbed]})
                        break
                    case 3:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(승률 순)")
                            .addFields(
                                {name: `1. ${f(data.character.win_list[0]["name"])}`,value:`${data.character.win_list[0]["win_rate"]}%`},
                                {name: `2. ${f(data.character.win_list[1]["name"])}`,value:`${data.character.win_list[1]["win_rate"]}%`},
                                {name: `3. ${f(data.character.win_list[2]["name"])}`,value:`${data.character.win_list[2]["win_rate"]}%`},
                                {name: `4. ${f(data.character.win_list[3]["name"])}`,value:`${data.character.win_list[3]["win_rate"]}%`},
                                {name: `5. ${f(data.character.win_list[4]["name"])}`,value:`${data.character.win_list[4]["win_rate"]}%`},
                                {name: `6. ${f(data.character.win_list[5]["name"])}`,value:`${data.character.win_list[5]["win_rate"]}%`},
                                {name: `7. ${f(data.character.win_list[6]["name"])}`,value:`${data.character.win_list[6]["win_rate"]}%`},
                                {name: `8. ${f(data.character.win_list[7]["name"])}`,value:`${data.character.win_list[7]["win_rate"]}%`},
                                {name: `9. ${f(data.character.win_list[8]["name"])}`,value:`${data.character.win_list[8]["win_rate"]}%`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [AGEmbed]})
                        break
                }
                break
            case "ANext":
                if (acount === 3) acount = 0
                else acount += 1
                switch (acount) {
                    case 0:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("**통계 - 요원(가해량 순)**")
                            .addFields(
                                {name: `1. ${f(data.character.damage_list[0]["name"])}`,value:`${data.character.damage_list[0]["damage_str"]}`},
                                {name: `2. ${f(data.character.damage_list[1]["name"])}`,value:`${data.character.damage_list[1]["damage_str"]}`},
                                {name: `3. ${f(data.character.damage_list[2]["name"])}`,value:`${data.character.damage_list[2]["damage_str"]}`},
                                {name: `4. ${f(data.character.damage_list[3]["name"])}`,value:`${data.character.damage_list[3]["damage_str"]}`},
                                {name: `5. ${f(data.character.damage_list[4]["name"])}`,value:`${data.character.damage_list[4]["damage_str"]}`},
                                {name: `6. ${f(data.character.damage_list[5]["name"])}`,value:`${data.character.damage_list[5]["damage_str"]}`},
                                {name: `7. ${f(data.character.damage_list[6]["name"])}`,value:`${data.character.damage_list[6]["damage_str"]}`},
                                {name: `8. ${f(data.character.damage_list[7]["name"])}`,value:`${data.character.damage_list[7]["damage_str"]}`},
                                {name: `9. ${f(data.character.damage_list[8]["name"])}`,value:`${data.character.damage_list[8]["damage_str"]}`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [ AGEmbed ]})
                        break
                    case 1:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(K/D 순)")
                            .addFields(
                                {name: `1. ${f(data.character.kd_list[0]["name"])}`,value:`${data.character.kd_list[0]["kd"]}`},
                                {name: `2. ${f(data.character.kd_list[1]["name"])}`,value:`${data.character.kd_list[1]["kd"]}`},
                                {name: `3. ${f(data.character.kd_list[2]["name"])}`,value:`${data.character.kd_list[2]["kd"]}`},
                                {name: `4. ${f(data.character.kd_list[3]["name"])}`,value:`${data.character.kd_list[3]["kd"]}`},
                                {name: `5. ${f(data.character.kd_list[4]["name"])}`,value:`${data.character.kd_list[4]["kd"]}`},
                                {name: `6. ${f(data.character.kd_list[5]["name"])}`,value:`${data.character.kd_list[5]["kd"]}`},
                                {name: `7. ${f(data.character.kd_list[6]["name"])}`,value:`${data.character.kd_list[6]["kd"]}`},
                                {name: `8. ${f(data.character.kd_list[7]["name"])}`,value:`${data.character.kd_list[7]["kd"]}`},
                                {name: `9. ${f(data.character.kd_list[8]["name"])}`,value:`${data.character.kd_list[8]["kd"]}`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [AGEmbed]})
                        break
                    case 2:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(선호도 순)")
                            .addFields(
                                {name: `1. ${f(data.character.use_list[0]["name"])}`,value:`${data.character.use_list[0]["use_rate"]}%`},
                                {name: `2. ${f(data.character.use_list[1]["name"])}`,value:`${data.character.use_list[1]["use_rate"]}%`},
                                {name: `3. ${f(data.character.use_list[2]["name"])}`,value:`${data.character.use_list[2]["use_rate"]}%`},
                                {name: `4. ${f(data.character.use_list[3]["name"])}`,value:`${data.character.use_list[3]["use_rate"]}%`},
                                {name: `5. ${f(data.character.use_list[4]["name"])}`,value:`${data.character.use_list[4]["use_rate"]}%`},
                                {name: `6. ${f(data.character.use_list[5]["name"])}`,value:`${data.character.use_list[5]["use_rate"]}%`},
                                {name: `7. ${f(data.character.use_list[6]["name"])}`,value:`${data.character.use_list[6]["use_rate"]}%`},
                                {name: `8. ${f(data.character.use_list[7]["name"])}`,value:`${data.character.use_list[7]["use_rate"]}%`},
                                {name: `9. ${f(data.character.use_list[8]["name"])}`,value:`${data.character.use_list[8]["use_rate"]}%`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [AGEmbed]})
                        break
                    case 3:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(승률 순)")
                            .addFields(
                                {name: `1. ${f(data.character.win_list[0]["name"])}`,value:`${data.character.win_list[0]["win_rate"]}%`},
                                {name: `2. ${f(data.character.win_list[1]["name"])}`,value:`${data.character.win_list[1]["win_rate"]}%`},
                                {name: `3. ${f(data.character.win_list[2]["name"])}`,value:`${data.character.win_list[2]["win_rate"]}%`},
                                {name: `4. ${f(data.character.win_list[3]["name"])}`,value:`${data.character.win_list[3]["win_rate"]}%`},
                                {name: `5. ${f(data.character.win_list[4]["name"])}`,value:`${data.character.win_list[4]["win_rate"]}%`},
                                {name: `6. ${f(data.character.win_list[5]["name"])}`,value:`${data.character.win_list[5]["win_rate"]}%`},
                                {name: `7. ${f(data.character.win_list[6]["name"])}`,value:`${data.character.win_list[6]["win_rate"]}%`},
                                {name: `8. ${f(data.character.win_list[7]["name"])}`,value:`${data.character.win_list[7]["win_rate"]}%`},
                                {name: `9. ${f(data.character.win_list[8]["name"])}`,value:`${data.character.win_list[8]["win_rate"]}%`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [AGEmbed]})
                        break
                }
                break
        }

    })

    // 무기
    collector.on('collect',c => {
        if(!c.isButton()) return
        let WEmbed
        if(!c.customId === "WBack" || !c.customId === "WNext") return
        switch (c.customId) {
            case "WBack":
                if (wcount === 0) wcount = 3
                else wcount -= 1
                switch (wcount) {
                    case 0:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(선호도 순)")
                            .addFields(
                                {name: `1. ${data.weapon[0]["name"].startsWith("W") ? f(data.weapon[0]["name"]) : data.weapon[0]["name"]}`,value:`${data.weapon[0]["value"]}%`},
                                {name: `2. ${data.weapon[1]["name"].startsWith("W") ? f(data.weapon[1]["name"]) : data.weapon[1]["name"]}`,value:`${data.weapon[1]["value"]}%`},
                                {name: `3. ${data.weapon[2]["name"].startsWith("W") ? f(data.weapon[2]["name"]) : data.weapon[2]["name"]}`,value:`${data.weapon[2]["value"]}%`},
                                {name: `4. ${data.weapon[3]["name"].startsWith("W") ? f(data.weapon[3]["name"]) : data.weapon[3]["name"]}`,value:`${data.weapon[3]["value"]}%`},
                                {name: `5. ${data.weapon[4]["name"].startsWith("W") ? f(data.weapon[4]["name"]) : data.weapon[4]["name"]}`,value:`${data.weapon[4]["value"]}%`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                    case 1:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(킬 순위 순)")
                            .addFields(
                                {name: `1. ${data.kill[0]["name"].startsWith("W") ? f(data.kill[0]["name"]) : data.kill[0]["name"]}`,value:`${data.kill[0]["value"]}`},
                                {name: `2. ${data.kill[1]["name"].startsWith("W") ? f(data.kill[1]["name"]) : data.kill[1]["name"]}`,value:`${data.kill[1]["value"]}`},
                                {name: `3. ${data.kill[2]["name"].startsWith("W") ? f(data.kill[2]["name"]) : data.kill[2]["name"]}`,value:`${data.kill[2]["value"]}`},
                                {name: `4. ${data.kill[3]["name"].startsWith("W") ? f(data.kill[3]["name"]) : data.kill[3]["name"]}`,value:`${data.kill[3]["value"]}`},
                                {name: `5. ${data.kill[4]["name"].startsWith("W") ? f(data.kill[4]["name"]) : data.kill[4]["name"]}`,value:`${data.kill[4]["value"]}`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                    case 2:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(평균 킬 거리 순)")
                            .addFields(
                                {name: `1. ${data.distance[0]["name"].startsWith("W") ? f(data.distance[0]["name"]) : data.distance[0]["name"]}`,value:`${data.distance[0]["value"]}m`},
                                {name: `2. ${data.distance[1]["name"].startsWith("W") ? f(data.distance[1]["name"]) : data.distance[1]["name"]}`,value:`${data.distance[1]["value"]}m`},
                                {name: `3. ${data.distance[2]["name"].startsWith("W") ? f(data.distance[2]["name"]) : data.distance[2]["name"]}`,value:`${data.distance[2]["value"]}m`},
                                {name: `4. ${data.distance[3]["name"].startsWith("W") ? f(data.distance[3]["name"]) : data.distance[3]["name"]}`,value:`${data.distance[3]["value"]}m`},
                                {name: `5. ${data.distance[4]["name"].startsWith("W") ? f(data.distance[4]["name"]) : data.distance[4]["name"]}`,value:`${data.distance[4]["value"]}m`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                    case 3:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(라운드 별 선호도 순)")
                            .addFields(
                                {name: `1라운드`,value:`\`\`\`1. ${data.weapon_round.round_1[0]["name"].startsWith("W") ? f(data.weapon_round.round_1[0]["name"]) : data.weapon_round.round_1[0]["name"]} : ${data.weapon_round.round_1[0]["value"]}%\n2. ${data.weapon_round.round_1[1]["name"].startsWith("W") ? f(data.weapon_round.round_1[1]["name"]) : data.weapon_round.round_1[1]["name"]} : ${data.weapon_round.round_1[1]["value"]}%\n3. ${data.weapon_round.round_1[2]["name"].startsWith("W") ? f(data.weapon_round.round_1[2]["name"]) : data.weapon_round.round_1[2]["name"]} : ${data.weapon_round.round_1[2]["value"]}%\`\`\``,inline:true},
                                {name: `2라운드`,value:`\`\`\`1. ${data.weapon_round.round_2[0]["name"].startsWith("W") ? f(data.weapon_round.round_2[0]["name"]) : data.weapon_round.round_2[0]["name"]} : ${data.weapon_round.round_2[0]["value"]}%\n2. ${data.weapon_round.round_2[1]["name"].startsWith("W") ? f(data.weapon_round.round_2[1]["name"]) : data.weapon_round.round_2[1]["name"]} : ${data.weapon_round.round_2[1]["value"]}%\n3. ${data.weapon_round.round_2[2]["name"].startsWith("W") ? f(data.weapon_round.round_2[2]["name"]) : data.weapon_round.round_2[2]["name"]} : ${data.weapon_round.round_2[2]["value"]}%\`\`\``,inline:true},
                                {name: `3라운드`,value:`\`\`\`1. ${data.weapon_round.round_3[0]["name"].startsWith("W") ? f(data.weapon_round.round_3[0]["name"]) : data.weapon_round.round_3[0]["name"]} : ${data.weapon_round.round_3[0]["value"]}%\n2. ${data.weapon_round.round_3[1]["name"].startsWith("W") ? f(data.weapon_round.round_3[1]["name"]) : data.weapon_round.round_3[1]["name"]} : ${data.weapon_round.round_3[1]["value"]}%\n3. ${data.weapon_round.round_3[2]["name"].startsWith("W") ? f(data.weapon_round.round_3[2]["name"]) : data.weapon_round.round_3[2]["name"]} : ${data.weapon_round.round_3[2]["value"]}%\`\`\``,inline:true},
                                {name: `4라운드`,value:`\`\`\`1. ${data.weapon_round.round_4[0]["name"].startsWith("W") ? f(data.weapon_round.round_4[0]["name"]) : data.weapon_round.round_4[0]["name"]} : ${data.weapon_round.round_4[0]["value"]}%\n2. ${data.weapon_round.round_4[1]["name"].startsWith("W") ? f(data.weapon_round.round_4[1]["name"]) : data.weapon_round.round_4[1]["name"]} : ${data.weapon_round.round_4[1]["value"]}%\n3. ${data.weapon_round.round_4[2]["name"].startsWith("W") ? f(data.weapon_round.round_4[2]["name"]) : data.weapon_round.round_4[2]["name"]} : ${data.weapon_round.round_4[2]["value"]}%\`\`\``,inline:true},
                                {name: `5라운드`,value:`\`\`\`1. ${data.weapon_round.round_5[0]["name"].startsWith("W") ? f(data.weapon_round.round_5[0]["name"]) : data.weapon_round.round_5[0]["name"]} : ${data.weapon_round.round_5[0]["value"]}%\n2. ${data.weapon_round.round_5[1]["name"].startsWith("W") ? f(data.weapon_round.round_5[1]["name"]) : data.weapon_round.round_5[1]["name"]} : ${data.weapon_round.round_5[1]["value"]}%\n3. ${data.weapon_round.round_5[2]["name"].startsWith("W") ? f(data.weapon_round.round_5[2]["name"]) : data.weapon_round.round_5[2]["name"]} : ${data.weapon_round.round_5[2]["value"]}%\`\`\``,inline:true},
                                {name: `6라운드`,value:`\`\`\`1. ${data.weapon_round.round_6[0]["name"].startsWith("W") ? f(data.weapon_round.round_6[0]["name"]) : data.weapon_round.round_6[0]["name"]} : ${data.weapon_round.round_6[0]["value"]}%\n2. ${data.weapon_round.round_6[1]["name"].startsWith("W") ? f(data.weapon_round.round_6[1]["name"]) : data.weapon_round.round_6[1]["name"]} : ${data.weapon_round.round_6[1]["value"]}%\n3. ${data.weapon_round.round_6[2]["name"].startsWith("W") ? f(data.weapon_round.round_6[2]["name"]) : data.weapon_round.round_6[2]["name"]} : ${data.weapon_round.round_6[2]["value"]}%\`\`\``,inline:true},
                                {name: `7라운드`,value:`\`\`\`1. ${data.weapon_round.round_7[0]["name"].startsWith("W") ? f(data.weapon_round.round_7[0]["name"]) : data.weapon_round.round_7[0]["name"]} : ${data.weapon_round.round_7[0]["value"]}%\n2. ${data.weapon_round.round_7[1]["name"].startsWith("W") ? f(data.weapon_round.round_7[1]["name"]) : data.weapon_round.round_7[1]["name"]} : ${data.weapon_round.round_7[1]["value"]}%\n3. ${data.weapon_round.round_7[2]["name"].startsWith("W") ? f(data.weapon_round.round_7[2]["name"]) : data.weapon_round.round_7[2]["name"]} : ${data.weapon_round.round_7[2]["value"]}%\`\`\``,inline:true}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                }
                break
            case "WNext":
                if (wcount === 3) wcount = 0
                else wcount += 1
                switch (wcount) {
                    case 0:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(선호도 순)")
                            .addFields(
                                {name: `1. ${data.weapon[0]["name"].startsWith("W") ? f(data.weapon[0]["name"]) : data.weapon[0]["name"]}`,value:`${data.weapon[0]["value"]}%`},
                                {name: `2. ${data.weapon[1]["name"].startsWith("W") ? f(data.weapon[1]["name"]) : data.weapon[1]["name"]}`,value:`${data.weapon[1]["value"]}%`},
                                {name: `3. ${data.weapon[2]["name"].startsWith("W") ? f(data.weapon[2]["name"]) : data.weapon[2]["name"]}`,value:`${data.weapon[2]["value"]}%`},
                                {name: `4. ${data.weapon[3]["name"].startsWith("W") ? f(data.weapon[3]["name"]) : data.weapon[3]["name"]}`,value:`${data.weapon[3]["value"]}%`},
                                {name: `5. ${data.weapon[4]["name"].startsWith("W") ? f(data.weapon[4]["name"]) : data.weapon[4]["name"]}`,value:`${data.weapon[4]["value"]}%`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                    case 1:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(킬 순위 순)")
                            .addFields(
                                {name: `1. ${data.kill[0]["name"].startsWith("W") ? f(data.kill[0]["name"]) : data.kill[0]["name"]}`,value:`${data.kill[0]["value"]}`},
                                {name: `2. ${data.kill[1]["name"].startsWith("W") ? f(data.kill[1]["name"]) : data.kill[1]["name"]}`,value:`${data.kill[1]["value"]}`},
                                {name: `3. ${data.kill[2]["name"].startsWith("W") ? f(data.kill[2]["name"]) : data.kill[2]["name"]}`,value:`${data.kill[2]["value"]}`},
                                {name: `4. ${data.kill[3]["name"].startsWith("W") ? f(data.kill[3]["name"]) : data.kill[3]["name"]}`,value:`${data.kill[3]["value"]}`},
                                {name: `5. ${data.kill[4]["name"].startsWith("W") ? f(data.kill[4]["name"]) : data.kill[4]["name"]}`,value:`${data.kill[4]["value"]}`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                    case 2:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(평균 킬 거리 순)")
                            .addFields(
                                {name: `1. ${data.distance[0]["name"].startsWith("W") ? f(data.distance[0]["name"]) : data.distance[0]["name"]}`,value:`${data.distance[0]["value"]}m`},
                                {name: `2. ${data.distance[1]["name"].startsWith("W") ? f(data.distance[1]["name"]) : data.distance[1]["name"]}`,value:`${data.distance[1]["value"]}m`},
                                {name: `3. ${data.distance[2]["name"].startsWith("W") ? f(data.distance[2]["name"]) : data.distance[2]["name"]}`,value:`${data.distance[2]["value"]}m`},
                                {name: `4. ${data.distance[3]["name"].startsWith("W") ? f(data.distance[3]["name"]) : data.distance[3]["name"]}`,value:`${data.distance[3]["value"]}m`},
                                {name: `5. ${data.distance[4]["name"].startsWith("W") ? f(data.distance[4]["name"]) : data.distance[4]["name"]}`,value:`${data.distance[4]["value"]}m`}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                    case 3:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(라운드 별 선호도 순)")
                            .addFields(
                                {name: `1라운드`,value:`\`\`\`1. ${data.weapon_round.round_1[0]["name"].startsWith("W") ? f(data.weapon_round.round_1[0]["name"]) : data.weapon_round.round_1[0]["name"]} : ${data.weapon_round.round_1[0]["value"]}%\n2. ${data.weapon_round.round_1[1]["name"].startsWith("W") ? f(data.weapon_round.round_1[1]["name"]) : data.weapon_round.round_1[1]["name"]} : ${data.weapon_round.round_1[1]["value"]}%\n3. ${data.weapon_round.round_1[2]["name"].startsWith("W") ? f(data.weapon_round.round_1[2]["name"]) : data.weapon_round.round_1[2]["name"]} : ${data.weapon_round.round_1[2]["value"]}%\`\`\``,inline:true},
                                {name: `2라운드`,value:`\`\`\`1. ${data.weapon_round.round_2[0]["name"].startsWith("W") ? f(data.weapon_round.round_2[0]["name"]) : data.weapon_round.round_2[0]["name"]} : ${data.weapon_round.round_2[0]["value"]}%\n2. ${data.weapon_round.round_2[1]["name"].startsWith("W") ? f(data.weapon_round.round_2[1]["name"]) : data.weapon_round.round_2[1]["name"]} : ${data.weapon_round.round_2[1]["value"]}%\n3. ${data.weapon_round.round_2[2]["name"].startsWith("W") ? f(data.weapon_round.round_2[2]["name"]) : data.weapon_round.round_2[2]["name"]} : ${data.weapon_round.round_2[2]["value"]}%\`\`\``,inline:true},
                                {name: `3라운드`,value:`\`\`\`1. ${data.weapon_round.round_3[0]["name"].startsWith("W") ? f(data.weapon_round.round_3[0]["name"]) : data.weapon_round.round_3[0]["name"]} : ${data.weapon_round.round_3[0]["value"]}%\n2. ${data.weapon_round.round_3[1]["name"].startsWith("W") ? f(data.weapon_round.round_3[1]["name"]) : data.weapon_round.round_3[1]["name"]} : ${data.weapon_round.round_3[1]["value"]}%\n3. ${data.weapon_round.round_3[2]["name"].startsWith("W") ? f(data.weapon_round.round_3[2]["name"]) : data.weapon_round.round_3[2]["name"]} : ${data.weapon_round.round_3[2]["value"]}%\`\`\``,inline:true},
                                {name: `4라운드`,value:`\`\`\`1. ${data.weapon_round.round_4[0]["name"].startsWith("W") ? f(data.weapon_round.round_4[0]["name"]) : data.weapon_round.round_4[0]["name"]} : ${data.weapon_round.round_4[0]["value"]}%\n2. ${data.weapon_round.round_4[1]["name"].startsWith("W") ? f(data.weapon_round.round_4[1]["name"]) : data.weapon_round.round_4[1]["name"]} : ${data.weapon_round.round_4[1]["value"]}%\n3. ${data.weapon_round.round_4[2]["name"].startsWith("W") ? f(data.weapon_round.round_4[2]["name"]) : data.weapon_round.round_4[2]["name"]} : ${data.weapon_round.round_4[2]["value"]}%\`\`\``,inline:true},
                                {name: `5라운드`,value:`\`\`\`1. ${data.weapon_round.round_5[0]["name"].startsWith("W") ? f(data.weapon_round.round_5[0]["name"]) : data.weapon_round.round_5[0]["name"]} : ${data.weapon_round.round_5[0]["value"]}%\n2. ${data.weapon_round.round_5[1]["name"].startsWith("W") ? f(data.weapon_round.round_5[1]["name"]) : data.weapon_round.round_5[1]["name"]} : ${data.weapon_round.round_5[1]["value"]}%\n3. ${data.weapon_round.round_5[2]["name"].startsWith("W") ? f(data.weapon_round.round_5[2]["name"]) : data.weapon_round.round_5[2]["name"]} : ${data.weapon_round.round_5[2]["value"]}%\`\`\``,inline:true},
                                {name: `6라운드`,value:`\`\`\`1. ${data.weapon_round.round_6[0]["name"].startsWith("W") ? f(data.weapon_round.round_6[0]["name"]) : data.weapon_round.round_6[0]["name"]} : ${data.weapon_round.round_6[0]["value"]}%\n2. ${data.weapon_round.round_6[1]["name"].startsWith("W") ? f(data.weapon_round.round_6[1]["name"]) : data.weapon_round.round_6[1]["name"]} : ${data.weapon_round.round_6[1]["value"]}%\n3. ${data.weapon_round.round_6[2]["name"].startsWith("W") ? f(data.weapon_round.round_6[2]["name"]) : data.weapon_round.round_6[2]["name"]} : ${data.weapon_round.round_6[2]["value"]}%\`\`\``,inline:true},
                                {name: `7라운드`,value:`\`\`\`1. ${data.weapon_round.round_7[0]["name"].startsWith("W") ? f(data.weapon_round.round_7[0]["name"]) : data.weapon_round.round_7[0]["name"]} : ${data.weapon_round.round_7[0]["value"]}%\n2. ${data.weapon_round.round_7[1]["name"].startsWith("W") ? f(data.weapon_round.round_7[1]["name"]) : data.weapon_round.round_7[1]["name"]} : ${data.weapon_round.round_7[1]["value"]}%\n3. ${data.weapon_round.round_7[2]["name"].startsWith("W") ? f(data.weapon_round.round_7[2]["name"]) : data.weapon_round.round_7[2]["name"]} : ${data.weapon_round.round_7[2]["value"]}%\`\`\``,inline:true}
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        int.editReply({embeds: [WEmbed]})
                        break
                }
                break
        }

    })

}

module.exports = { Int_statics }