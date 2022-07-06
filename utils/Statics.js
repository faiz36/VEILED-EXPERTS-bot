const {Interaction, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageComponentInteraction, MessageButton} = require("discord.js");
const {get_statics} = require("./VEILED_EXPERTS-API");
const {Embed} = require("@discordjs/builders");
const { data,f } = require('./modules')


async function Int_statics(int = require(Interaction)) {
    let acount = 0
    let wcount = 0
    let SData = await get_statics()
    SData = SData.data
    let FEmbed = new MessageEmbed()
        .setTitle("**통계 - 평균**")
        .addFields(
            {name: "**폭탄 해체**",value:`${SData.avg.bomb_defuse}회`},
            {name: "**폭탄 폭발**",value:`${SData.avg.bomb_explode}회`},
            {name: "**폭탄 설치**",value:`${SData.avg.bomb_install}회`},
            {name: "**저거넛 킬**",value:`${SData.avg.juggernaut_kill}킬`},
            {name: "**킬**",value:`${SData.avg.match_kill}킬`},
            {name: "**헤드샷 킬**",value:`${SData.avg.match_kill_head}킬`},
            {name: "**회복 아이템 사용**",value:`${SData.avg.recover}회`}
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
    try{
        int.reply({embeds: [ FEmbed ],components: [ row ]})
    }catch (e) {
        await SData.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
        let ue = new MessageEmbed()
            .setTitle("⛔ 에러")
            .setDescription("에러가 발생했습니다 다시시도해주세요!")
            .setColor("#d94e2f")
            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
        await int.editReply({embeds: [ue]})
    }

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

    collector.on('collect', async c => {
        if (!c.isSelectMenu()) return
        if (!c.customId === "VX_Statics") return;
        switch (c.values[0]) {
            case "avg":
                c.deferUpdate()
                let AEmbed = new MessageEmbed()
                    .setTitle("**통계 - 평균**")
                    .addFields(
                        {name: "**폭탄 해체**", value: `${SData.avg.bomb_defuse}회`},
                        {name: "**폭탄 폭발**", value: `${SData.avg.bomb_explode}회`},
                        {name: "**폭탄 설치**", value: `${SData.avg.bomb_install}회`},
                        {name: "**저거넛 킬**", value: `${SData.avg.juggernaut_kill}킬`},
                        {name: "**킬**", value: `${SData.avg.match_kill}킬`},
                        {name: "**헤드샷 킬**", value: `${SData.avg.match_kill_head}킬`},
                        {name: "**회복 아이템 사용**", value: `${SData.avg.recover}회`}
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                try {
                    await int.editReply({embeds: [AEmbed], components: [row]})
                    break
                } catch (e) {
                    await data.EError(int.commandName + "(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name, e)
                    let ue = new MessageEmbed()
                        .setTitle("⛔ 에러")
                        .setDescription("에러가 발생했습니다 다시시도해주세요!")
                        .setColor("#d94e2f")
                        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    await int.editReply({embeds: [ue]})
                    break
                }
            case "agent":
                acount = 0
                c.deferUpdate()
                let AGEmbed = new MessageEmbed()
                    .setTitle("**통계 - 요원(가해량 순)**")
                    .addFields(
                        {
                            name: `1. ${f(SData.character.damage_list[0]["name"])}`,
                            value: `${SData.character.damage_list[0]["damage_str"]}`
                        },
                        {
                            name: `2. ${f(SData.character.damage_list[1]["name"])}`,
                            value: `${SData.character.damage_list[1]["damage_str"]}`
                        },
                        {
                            name: `3. ${f(SData.character.damage_list[2]["name"])}`,
                            value: `${SData.character.damage_list[2]["damage_str"]}`
                        },
                        {
                            name: `4. ${f(SData.character.damage_list[3]["name"])}`,
                            value: `${SData.character.damage_list[3]["damage_str"]}`
                        },
                        {
                            name: `5. ${f(SData.character.damage_list[4]["name"])}`,
                            value: `${SData.character.damage_list[4]["damage_str"]}`
                        },
                        {
                            name: `6. ${f(SData.character.damage_list[5]["name"])}`,
                            value: `${SData.character.damage_list[5]["damage_str"]}`
                        },
                        {
                            name: `7. ${f(SData.character.damage_list[6]["name"])}`,
                            value: `${SData.character.damage_list[6]["damage_str"]}`
                        },
                        {
                            name: `8. ${f(SData.character.damage_list[7]["name"])}`,
                            value: `${SData.character.damage_list[7]["damage_str"]}`
                        },
                        {
                            name: `9. ${f(SData.character.damage_list[8]["name"])}`,
                            value: `${SData.character.damage_list[8]["damage_str"]}`
                        }
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
                try {
                    await int.editReply({embeds: [AGEmbed], components: [arow, row]})
                    break
                }catch (e) {
                    await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                    let ue = new MessageEmbed()
                        .setTitle("⛔ 에러")
                        .setDescription("에러가 발생했습니다 다시시도해주세요!")
                        .setColor("#d94e2f")
                        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    await int.editReply({embeds: [ue]})
                    break
                }
            case "weapon":
                wcount = 0
                c.deferUpdate()
                WEmbed = new MessageEmbed()
                    .setTitle("통계 - 무기(선호도 순)")
                    .addFields(
                        {
                            name: `1. ${SData.weapon[0]["name"].startsWith("W") ? f(SData.weapon[0]["name"]) : SData.weapon[0]["name"]}`,
                            value: `${SData.weapon[0]["value"]}%`
                        },
                        {
                            name: `2. ${SData.weapon[1]["name"].startsWith("W") ? f(SData.weapon[1]["name"]) : SData.weapon[1]["name"]}`,
                            value: `${SData.weapon[1]["value"]}%`
                        },
                        {
                            name: `3. ${SData.weapon[2]["name"].startsWith("W") ? f(SData.weapon[2]["name"]) : SData.weapon[2]["name"]}`,
                            value: `${SData.weapon[2]["value"]}%`
                        },
                        {
                            name: `4. ${SData.weapon[3]["name"].startsWith("W") ? f(SData.weapon[3]["name"]) : SData.weapon[3]["name"]}`,
                            value: `${SData.weapon[3]["value"]}%`
                        },
                        {
                            name: `5. ${SData.weapon[4]["name"].startsWith("W") ? f(SData.weapon[4]["name"]) : SData.weapon[4]["name"]}`,
                            value: `${SData.weapon[4]["value"]}%`
                        }
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
                try {
                    int.editReply({embeds: [WEmbed], components: [wrow, row]})
                    break
                }catch (e) {
                    await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                    let ue = new MessageEmbed()
                        .setTitle("⛔ 에러")
                        .setDescription("에러가 발생했습니다 다시시도해주세요!")
                        .setColor("#d94e2f")
                        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    await int.editReply({embeds: [ue]})
                    break
                }
            case "juggernaut":
                c.deferUpdate()
                let JEmbed = new MessageEmbed()
                    .setTitle("통계 - 저거넛 사용 평균(라운드별)")
                    .addFields(
                        {name: "1라운드", value: `${SData.juggernaut[0]["juggernaut_per"]}회`, inline: true},
                        {name: "2라운드", value: `${SData.juggernaut[1]["juggernaut_per"]}회`, inline: true},
                        {name: "3라운드", value: `${SData.juggernaut[2]["juggernaut_per"]}회`, inline: true},
                        {name: "4라운드", value: `${SData.juggernaut[3]["juggernaut_per"]}회`, inline: true},
                        {name: "5라운드", value: `${SData.juggernaut[4]["juggernaut_per"]}회`, inline: true},
                        {name: "6라운드", value: `${SData.juggernaut[5]["juggernaut_per"]}회`, inline: true},
                        {name: "7라운드", value: `${SData.juggernaut[6]["juggernaut_per"]}회`, inline: true},
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                try {
                    int.editReply({embeds: [JEmbed], components: [row]})
                    break
                }catch (e) {
                    await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                    let ue = new MessageEmbed()
                        .setTitle("⛔ 에러")
                        .setDescription("에러가 발생했습니다 다시시도해주세요!")
                        .setColor("#d94e2f")
                        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    await int.editReply({embeds: [ue]})
                    break
                }
            case "item":
                c.deferUpdate()
                let IEmbed = new MessageEmbed()
                    .setTitle("통계 - 아이템 사용 평균")
                    .addFields(
                        {name: `1. ${f(SData.item_use[0]["item_name"])}`, value: `${SData.item_use[0]["use_per"]}회`},
                        {name: `2. ${f(SData.item_use[1]["item_name"])}`, value: `${SData.item_use[1]["use_per"]}회`},
                        {name: `3. ${f(SData.item_use[2]["item_name"])}`, value: `${SData.item_use[2]["use_per"]}회`},
                        {name: `4. ${f(SData.item_use[3]["item_name"])}`, value: `${SData.item_use[3]["use_per"]}회`},
                        {name: `5. ${f(SData.item_use[4]["item_name"])}`, value: `${SData.item_use[4]["use_per"]}회`},
                        {name: `6. ${f(SData.item_use[5]["item_name"])}`, value: `${SData.item_use[5]["use_per"]}회`},
                        {name: `7. ${f(SData.item_use[6]["item_name"])}`, value: `${SData.item_use[6]["use_per"]}회`},
                        {name: `8. ${f(SData.item_use[7]["item_name"])}`, value: `${SData.item_use[7]["use_per"]}회`}
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                try {
                    int.editReply({embeds: [IEmbed], components: [row]})
                    break
                }catch (e) {
                    await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                    let ue = new MessageEmbed()
                        .setTitle("⛔ 에러")
                        .setDescription("에러가 발생했습니다 다시시도해주세요!")
                        .setColor("#d94e2f")
                        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    await int.editReply({embeds: [ue]})
                    break
                }
            case "funding":
                c.deferUpdate()
                let FEmbed = new MessageEmbed()
                    .setTitle("통계 - 펀딩")
                    .addFields(
                        {
                            name: "1라운드",
                            value: `전술 : ${SData.round.funding_list[0]["tactic"]}%\n장비 : ${SData.round.funding_list[0]["equipment"]}%\n화기 : ${SData.round.funding_list[0]["weapon"]}%`,
                            inline: true
                        },
                        {
                            name: "2라운드",
                            value: `전술 : ${SData.round.funding_list[1]["tactic"]}%\n장비 : ${SData.round.funding_list[1]["equipment"]}%\n화기 : ${SData.round.funding_list[1]["weapon"]}%`,
                            inline: true
                        },
                        {
                            name: "3라운드",
                            value: `전술 : ${SData.round.funding_list[2]["tactic"]}%\n장비 : ${SData.round.funding_list[2]["equipment"]}%\n화기 : ${SData.round.funding_list[2]["weapon"]}%`,
                            inline: true
                        },
                        {
                            name: "4라운드",
                            value: `전술 : ${SData.round.funding_list[3]["tactic"]}%\n장비 : ${SData.round.funding_list[3]["equipment"]}%\n화기 : ${SData.round.funding_list[3]["weapon"]}%`,
                            inline: true
                        },
                        {
                            name: "5라운드",
                            value: `전술 : ${SData.round.funding_list[4]["tactic"]}%\n장비 : ${SData.round.funding_list[4]["equipment"]}%\n화기 : ${SData.round.funding_list[4]["weapon"]}%`,
                            inline: true
                        },
                        {
                            name: "6라운드",
                            value: `전술 : ${SData.round.funding_list[5]["tactic"]}%\n장비 : ${SData.round.funding_list[5]["equipment"]}%\n화기 : ${SData.round.funding_list[5]["weapon"]}%`,
                            inline: true
                        },
                        {
                            name: "7라운드",
                            value: `전술 : ${SData.round.funding_list[6]["tactic"]}%\n장비 : ${SData.round.funding_list[6]["equipment"]}%\n화기 : ${SData.round.funding_list[6]["weapon"]}%`,
                            inline: true
                        },
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                try {
                    int.editReply({embeds: [FEmbed], components: [row]})
                    break
                }catch (e) {
                    await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                    let ue = new MessageEmbed()
                        .setTitle("⛔ 에러")
                        .setDescription("에러가 발생했습니다 다시시도해주세요!")
                        .setColor("#d94e2f")
                        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    await int.editReply({embeds: [ue]})
                    break
                }
            case "perk":
                c.deferUpdate()
                let PEmbed = new MessageEmbed()
                    .setTitle("통계 - 렙톤 선호도")
                    .addFields(
                        {name: `1. ${f(SData.perk[0]["name"])}`, value: `${SData.perk[0]["value"]}%`},
                        {name: `2. ${f(SData.perk[1]["name"])}`, value: `${SData.perk[1]["value"]}%`},
                        {name: `3. ${f(SData.perk[2]["name"])}`, value: `${SData.perk[2]["value"]}%`},
                        {name: `4. ${f(SData.perk[3]["name"])}`, value: `${SData.perk[3]["value"]}%`},
                        {name: `5. ${f(SData.perk[4]["name"])}`, value: `${SData.perk[4]["value"]}%`},
                    )
                    .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    .setColor("#d94e2f")
                try {
                    int.editReply({embeds: [PEmbed], components: [row]})
                    break
                }catch (e) {
                    await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                    let ue = new MessageEmbed()
                        .setTitle("⛔ 에러")
                        .setDescription("에러가 발생했습니다 다시시도해주세요!")
                        .setColor("#d94e2f")
                        .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                    await int.editReply({embeds: [ue]})
                    break
                }
        }
    })

    // 요원
    collector.on('collect',async c => {
        if (!c.isButton()) return
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
                                {
                                    name: `1. ${f(SData.character.damage_list[0]["name"])}`,
                                    value: `${SData.character.damage_list[0]["damage_str"]}`
                                },
                                {
                                    name: `2. ${f(SData.character.damage_list[1]["name"])}`,
                                    value: `${SData.character.damage_list[1]["damage_str"]}`
                                },
                                {
                                    name: `3. ${f(SData.character.damage_list[2]["name"])}`,
                                    value: `${SData.character.damage_list[2]["damage_str"]}`
                                },
                                {
                                    name: `4. ${f(SData.character.damage_list[3]["name"])}`,
                                    value: `${SData.character.damage_list[3]["damage_str"]}`
                                },
                                {
                                    name: `5. ${f(SData.character.damage_list[4]["name"])}`,
                                    value: `${SData.character.damage_list[4]["damage_str"]}`
                                },
                                {
                                    name: `6. ${f(SData.character.damage_list[5]["name"])}`,
                                    value: `${SData.character.damage_list[5]["damage_str"]}`
                                },
                                {
                                    name: `7. ${f(SData.character.damage_list[6]["name"])}`,
                                    value: `${SData.character.damage_list[6]["damage_str"]}`
                                },
                                {
                                    name: `8. ${f(SData.character.damage_list[7]["name"])}`,
                                    value: `${SData.character.damage_list[7]["damage_str"]}`
                                },
                                {
                                    name: `9. ${f(SData.character.damage_list[8]["name"])}`,
                                    value: `${SData.character.damage_list[8]["damage_str"]}`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        } catch (e) {
                            await data.EError(int.commandName + "(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name, e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 1:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(K/D 순)")
                            .addFields(
                                {
                                    name: `1. ${f(SData.character.kd_list[0]["name"])}`,
                                    value: `${SData.character.kd_list[0]["kd"]}`
                                },
                                {
                                    name: `2. ${f(SData.character.kd_list[1]["name"])}`,
                                    value: `${SData.character.kd_list[1]["kd"]}`
                                },
                                {
                                    name: `3. ${f(SData.character.kd_list[2]["name"])}`,
                                    value: `${SData.character.kd_list[2]["kd"]}`
                                },
                                {
                                    name: `4. ${f(SData.character.kd_list[3]["name"])}`,
                                    value: `${SData.character.kd_list[3]["kd"]}`
                                },
                                {
                                    name: `5. ${f(SData.character.kd_list[4]["name"])}`,
                                    value: `${SData.character.kd_list[4]["kd"]}`
                                },
                                {
                                    name: `6. ${f(SData.character.kd_list[5]["name"])}`,
                                    value: `${SData.character.kd_list[5]["kd"]}`
                                },
                                {
                                    name: `7. ${f(SData.character.kd_list[6]["name"])}`,
                                    value: `${SData.character.kd_list[6]["kd"]}`
                                },
                                {
                                    name: `8. ${f(SData.character.kd_list[7]["name"])}`,
                                    value: `${SData.character.kd_list[7]["kd"]}`
                                },
                                {
                                    name: `9. ${f(SData.character.kd_list[8]["name"])}`,
                                    value: `${SData.character.kd_list[8]["kd"]}`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 2:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(선호도 순)")
                            .addFields(
                                {
                                    name: `1. ${f(SData.character.use_list[0]["name"])}`,
                                    value: `${SData.character.use_list[0]["use_rate"]}%`
                                },
                                {
                                    name: `2. ${f(SData.character.use_list[1]["name"])}`,
                                    value: `${SData.character.use_list[1]["use_rate"]}%`
                                },
                                {
                                    name: `3. ${f(SData.character.use_list[2]["name"])}`,
                                    value: `${SData.character.use_list[2]["use_rate"]}%`
                                },
                                {
                                    name: `4. ${f(SData.character.use_list[3]["name"])}`,
                                    value: `${SData.character.use_list[3]["use_rate"]}%`
                                },
                                {
                                    name: `5. ${f(SData.character.use_list[4]["name"])}`,
                                    value: `${SData.character.use_list[4]["use_rate"]}%`
                                },
                                {
                                    name: `6. ${f(SData.character.use_list[5]["name"])}`,
                                    value: `${SData.character.use_list[5]["use_rate"]}%`
                                },
                                {
                                    name: `7. ${f(SData.character.use_list[6]["name"])}`,
                                    value: `${SData.character.use_list[6]["use_rate"]}%`
                                },
                                {
                                    name: `8. ${f(SData.character.use_list[7]["name"])}`,
                                    value: `${SData.character.use_list[7]["use_rate"]}%`
                                },
                                {
                                    name: `9. ${f(SData.character.use_list[8]["name"])}`,
                                    value: `${SData.character.use_list[8]["use_rate"]}%`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 3:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(승률 순)")
                            .addFields(
                                {
                                    name: `1. ${f(SData.character.win_list[0]["name"])}`,
                                    value: `${SData.character.win_list[0]["win_rate"]}%`
                                },
                                {
                                    name: `2. ${f(SData.character.win_list[1]["name"])}`,
                                    value: `${SData.character.win_list[1]["win_rate"]}%`
                                },
                                {
                                    name: `3. ${f(SData.character.win_list[2]["name"])}`,
                                    value: `${SData.character.win_list[2]["win_rate"]}%`
                                },
                                {
                                    name: `4. ${f(SData.character.win_list[3]["name"])}`,
                                    value: `${SData.character.win_list[3]["win_rate"]}%`
                                },
                                {
                                    name: `5. ${f(SData.character.win_list[4]["name"])}`,
                                    value: `${SData.character.win_list[4]["win_rate"]}%`
                                },
                                {
                                    name: `6. ${f(SData.character.win_list[5]["name"])}`,
                                    value: `${SData.character.win_list[5]["win_rate"]}%`
                                },
                                {
                                    name: `7. ${f(SData.character.win_list[6]["name"])}`,
                                    value: `${SData.character.win_list[6]["win_rate"]}%`
                                },
                                {
                                    name: `8. ${f(SData.character.win_list[7]["name"])}`,
                                    value: `${SData.character.win_list[7]["win_rate"]}%`
                                },
                                {
                                    name: `9. ${f(SData.character.win_list[8]["name"])}`,
                                    value: `${SData.character.win_list[8]["win_rate"]}%`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
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
                                {
                                    name: `1. ${f(SData.character.damage_list[0]["name"])}`,
                                    value: `${SData.character.damage_list[0]["damage_str"]}`
                                },
                                {
                                    name: `2. ${f(SData.character.damage_list[1]["name"])}`,
                                    value: `${SData.character.damage_list[1]["damage_str"]}`
                                },
                                {
                                    name: `3. ${f(SData.character.damage_list[2]["name"])}`,
                                    value: `${SData.character.damage_list[2]["damage_str"]}`
                                },
                                {
                                    name: `4. ${f(SData.character.damage_list[3]["name"])}`,
                                    value: `${SData.character.damage_list[3]["damage_str"]}`
                                },
                                {
                                    name: `5. ${f(SData.character.damage_list[4]["name"])}`,
                                    value: `${SData.character.damage_list[4]["damage_str"]}`
                                },
                                {
                                    name: `6. ${f(SData.character.damage_list[5]["name"])}`,
                                    value: `${SData.character.damage_list[5]["damage_str"]}`
                                },
                                {
                                    name: `7. ${f(SData.character.damage_list[6]["name"])}`,
                                    value: `${SData.character.damage_list[6]["damage_str"]}`
                                },
                                {
                                    name: `8. ${f(SData.character.damage_list[7]["name"])}`,
                                    value: `${SData.character.damage_list[7]["damage_str"]}`
                                },
                                {
                                    name: `9. ${f(SData.character.damage_list[8]["name"])}`,
                                    value: `${SData.character.damage_list[8]["damage_str"]}`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 1:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(K/D 순)")
                            .addFields(
                                {
                                    name: `1. ${f(SData.character.kd_list[0]["name"])}`,
                                    value: `${SData.character.kd_list[0]["kd"]}`
                                },
                                {
                                    name: `2. ${f(SData.character.kd_list[1]["name"])}`,
                                    value: `${SData.character.kd_list[1]["kd"]}`
                                },
                                {
                                    name: `3. ${f(SData.character.kd_list[2]["name"])}`,
                                    value: `${SData.character.kd_list[2]["kd"]}`
                                },
                                {
                                    name: `4. ${f(SData.character.kd_list[3]["name"])}`,
                                    value: `${SData.character.kd_list[3]["kd"]}`
                                },
                                {
                                    name: `5. ${f(SData.character.kd_list[4]["name"])}`,
                                    value: `${SData.character.kd_list[4]["kd"]}`
                                },
                                {
                                    name: `6. ${f(SData.character.kd_list[5]["name"])}`,
                                    value: `${SData.character.kd_list[5]["kd"]}`
                                },
                                {
                                    name: `7. ${f(SData.character.kd_list[6]["name"])}`,
                                    value: `${SData.character.kd_list[6]["kd"]}`
                                },
                                {
                                    name: `8. ${f(SData.character.kd_list[7]["name"])}`,
                                    value: `${SData.character.kd_list[7]["kd"]}`
                                },
                                {
                                    name: `9. ${f(SData.character.kd_list[8]["name"])}`,
                                    value: `${SData.character.kd_list[8]["kd"]}`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 2:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(선호도 순)")
                            .addFields(
                                {
                                    name: `1. ${f(SData.character.use_list[0]["name"])}`,
                                    value: `${SData.character.use_list[0]["use_rate"]}%`
                                },
                                {
                                    name: `2. ${f(SData.character.use_list[1]["name"])}`,
                                    value: `${SData.character.use_list[1]["use_rate"]}%`
                                },
                                {
                                    name: `3. ${f(SData.character.use_list[2]["name"])}`,
                                    value: `${SData.character.use_list[2]["use_rate"]}%`
                                },
                                {
                                    name: `4. ${f(SData.character.use_list[3]["name"])}`,
                                    value: `${SData.character.use_list[3]["use_rate"]}%`
                                },
                                {
                                    name: `5. ${f(SData.character.use_list[4]["name"])}`,
                                    value: `${SData.character.use_list[4]["use_rate"]}%`
                                },
                                {
                                    name: `6. ${f(SData.character.use_list[5]["name"])}`,
                                    value: `${SData.character.use_list[5]["use_rate"]}%`
                                },
                                {
                                    name: `7. ${f(SData.character.use_list[6]["name"])}`,
                                    value: `${SData.character.use_list[6]["use_rate"]}%`
                                },
                                {
                                    name: `8. ${f(SData.character.use_list[7]["name"])}`,
                                    value: `${SData.character.use_list[7]["use_rate"]}%`
                                },
                                {
                                    name: `9. ${f(SData.character.use_list[8]["name"])}`,
                                    value: `${SData.character.use_list[8]["use_rate"]}%`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 3:
                        c.deferUpdate()
                        AGEmbed = new MessageEmbed()
                            .setTitle("통계 - 요원(승률 순)")
                            .addFields(
                                {
                                    name: `1. ${f(SData.character.win_list[0]["name"])}`,
                                    value: `${SData.character.win_list[0]["win_rate"]}%`
                                },
                                {
                                    name: `2. ${f(SData.character.win_list[1]["name"])}`,
                                    value: `${SData.character.win_list[1]["win_rate"]}%`
                                },
                                {
                                    name: `3. ${f(SData.character.win_list[2]["name"])}`,
                                    value: `${SData.character.win_list[2]["win_rate"]}%`
                                },
                                {
                                    name: `4. ${f(SData.character.win_list[3]["name"])}`,
                                    value: `${SData.character.win_list[3]["win_rate"]}%`
                                },
                                {
                                    name: `5. ${f(SData.character.win_list[4]["name"])}`,
                                    value: `${SData.character.win_list[4]["win_rate"]}%`
                                },
                                {
                                    name: `6. ${f(SData.character.win_list[5]["name"])}`,
                                    value: `${SData.character.win_list[5]["win_rate"]}%`
                                },
                                {
                                    name: `7. ${f(SData.character.win_list[6]["name"])}`,
                                    value: `${SData.character.win_list[6]["win_rate"]}%`
                                },
                                {
                                    name: `8. ${f(SData.character.win_list[7]["name"])}`,
                                    value: `${SData.character.win_list[7]["win_rate"]}%`
                                },
                                {
                                    name: `9. ${f(SData.character.win_list[8]["name"])}`,
                                    value: `${SData.character.win_list[8]["win_rate"]}%`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [AGEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                }
                break
        }

    })

    // 무기
    collector.on('collect',async c => {
        if (!c.isButton()) return
        let WEmbed
        if (!c.customId === "WBack" || !c.customId === "WNext") return
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
                                {
                                    name: `1. ${SData.weapon[0]["name"].startsWith("W") ? f(SData.weapon[0]["name"]) : SData.weapon[0]["name"]}`,
                                    value: `${SData.weapon[0]["value"]}%`
                                },
                                {
                                    name: `2. ${SData.weapon[1]["name"].startsWith("W") ? f(SData.weapon[1]["name"]) : SData.weapon[1]["name"]}`,
                                    value: `${SData.weapon[1]["value"]}%`
                                },
                                {
                                    name: `3. ${SData.weapon[2]["name"].startsWith("W") ? f(SData.weapon[2]["name"]) : SData.weapon[2]["name"]}`,
                                    value: `${SData.weapon[2]["value"]}%`
                                },
                                {
                                    name: `4. ${SData.weapon[3]["name"].startsWith("W") ? f(SData.weapon[3]["name"]) : SData.weapon[3]["name"]}`,
                                    value: `${SData.weapon[3]["value"]}%`
                                },
                                {
                                    name: `5. ${SData.weapon[4]["name"].startsWith("W") ? f(SData.weapon[4]["name"]) : SData.weapon[4]["name"]}`,
                                    value: `${SData.weapon[4]["value"]}%`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [WEmbed]})
                            break
                        } catch (e) {
                            await data.EError(int.commandName + "(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name, e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 1:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(킬 순위 순)")
                            .addFields(
                                {
                                    name: `1. ${SData.kill[0]["name"].startsWith("W") ? f(SData.kill[0]["name"]) : SData.kill[0]["name"]}`,
                                    value: `${SData.kill[0]["value"]}`
                                },
                                {
                                    name: `2. ${SData.kill[1]["name"].startsWith("W") ? f(SData.kill[1]["name"]) : SData.kill[1]["name"]}`,
                                    value: `${SData.kill[1]["value"]}`
                                },
                                {
                                    name: `3. ${SData.kill[2]["name"].startsWith("W") ? f(SData.kill[2]["name"]) : SData.kill[2]["name"]}`,
                                    value: `${SData.kill[2]["value"]}`
                                },
                                {
                                    name: `4. ${SData.kill[3]["name"].startsWith("W") ? f(SData.kill[3]["name"]) : SData.kill[3]["name"]}`,
                                    value: `${SData.kill[3]["value"]}`
                                },
                                {
                                    name: `5. ${SData.kill[4]["name"].startsWith("W") ? f(SData.kill[4]["name"]) : SData.kill[4]["name"]}`,
                                    value: `${SData.kill[4]["value"]}`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            await int.editReply({embeds: [WEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 2:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(평균 킬 거리 순)")
                            .addFields(
                                {
                                    name: `1. ${SData.distance[0]["name"].startsWith("W") ? f(SData.distance[0]["name"]) : SData.distance[0]["name"]}`,
                                    value: `${SData.distance[0]["value"]}m`
                                },
                                {
                                    name: `2. ${SData.distance[1]["name"].startsWith("W") ? f(SData.distance[1]["name"]) : SData.distance[1]["name"]}`,
                                    value: `${SData.distance[1]["value"]}m`
                                },
                                {
                                    name: `3. ${SData.distance[2]["name"].startsWith("W") ? f(SData.distance[2]["name"]) : SData.distance[2]["name"]}`,
                                    value: `${SData.distance[2]["value"]}m`
                                },
                                {
                                    name: `4. ${SData.distance[3]["name"].startsWith("W") ? f(SData.distance[3]["name"]) : SData.distance[3]["name"]}`,
                                    value: `${SData.distance[3]["value"]}m`
                                },
                                {
                                    name: `5. ${SData.distance[4]["name"].startsWith("W") ? f(SData.distance[4]["name"]) : SData.distance[4]["name"]}`,
                                    value: `${SData.distance[4]["value"]}m`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [WEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 3:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(라운드 별 선호도 순)")
                            .addFields(
                                {
                                    name: `1라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_1[0]["name"].startsWith("W") ? f(SData.weapon_round.round_1[0]["name"]) : SData.weapon_round.round_1[0]["name"]} : ${SData.weapon_round.round_1[0]["value"]}%\n2. ${SData.weapon_round.round_1[1]["name"].startsWith("W") ? f(SData.weapon_round.round_1[1]["name"]) : SData.weapon_round.round_1[1]["name"]} : ${SData.weapon_round.round_1[1]["value"]}%\n3. ${SData.weapon_round.round_1[2]["name"].startsWith("W") ? f(SData.weapon_round.round_1[2]["name"]) : SData.weapon_round.round_1[2]["name"]} : ${SData.weapon_round.round_1[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `2라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_2[0]["name"].startsWith("W") ? f(SData.weapon_round.round_2[0]["name"]) : SData.weapon_round.round_2[0]["name"]} : ${SData.weapon_round.round_2[0]["value"]}%\n2. ${SData.weapon_round.round_2[1]["name"].startsWith("W") ? f(SData.weapon_round.round_2[1]["name"]) : SData.weapon_round.round_2[1]["name"]} : ${SData.weapon_round.round_2[1]["value"]}%\n3. ${SData.weapon_round.round_2[2]["name"].startsWith("W") ? f(SData.weapon_round.round_2[2]["name"]) : SData.weapon_round.round_2[2]["name"]} : ${SData.weapon_round.round_2[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `3라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_3[0]["name"].startsWith("W") ? f(SData.weapon_round.round_3[0]["name"]) : SData.weapon_round.round_3[0]["name"]} : ${SData.weapon_round.round_3[0]["value"]}%\n2. ${SData.weapon_round.round_3[1]["name"].startsWith("W") ? f(SData.weapon_round.round_3[1]["name"]) : SData.weapon_round.round_3[1]["name"]} : ${SData.weapon_round.round_3[1]["value"]}%\n3. ${SData.weapon_round.round_3[2]["name"].startsWith("W") ? f(SData.weapon_round.round_3[2]["name"]) : SData.weapon_round.round_3[2]["name"]} : ${SData.weapon_round.round_3[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `4라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_4[0]["name"].startsWith("W") ? f(SData.weapon_round.round_4[0]["name"]) : SData.weapon_round.round_4[0]["name"]} : ${SData.weapon_round.round_4[0]["value"]}%\n2. ${SData.weapon_round.round_4[1]["name"].startsWith("W") ? f(SData.weapon_round.round_4[1]["name"]) : SData.weapon_round.round_4[1]["name"]} : ${SData.weapon_round.round_4[1]["value"]}%\n3. ${SData.weapon_round.round_4[2]["name"].startsWith("W") ? f(SData.weapon_round.round_4[2]["name"]) : SData.weapon_round.round_4[2]["name"]} : ${SData.weapon_round.round_4[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `5라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_5[0]["name"].startsWith("W") ? f(SData.weapon_round.round_5[0]["name"]) : SData.weapon_round.round_5[0]["name"]} : ${SData.weapon_round.round_5[0]["value"]}%\n2. ${SData.weapon_round.round_5[1]["name"].startsWith("W") ? f(SData.weapon_round.round_5[1]["name"]) : SData.weapon_round.round_5[1]["name"]} : ${SData.weapon_round.round_5[1]["value"]}%\n3. ${SData.weapon_round.round_5[2]["name"].startsWith("W") ? f(SData.weapon_round.round_5[2]["name"]) : SData.weapon_round.round_5[2]["name"]} : ${SData.weapon_round.round_5[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `6라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_6[0]["name"].startsWith("W") ? f(SData.weapon_round.round_6[0]["name"]) : SData.weapon_round.round_6[0]["name"]} : ${SData.weapon_round.round_6[0]["value"]}%\n2. ${SData.weapon_round.round_6[1]["name"].startsWith("W") ? f(SData.weapon_round.round_6[1]["name"]) : SData.weapon_round.round_6[1]["name"]} : ${SData.weapon_round.round_6[1]["value"]}%\n3. ${SData.weapon_round.round_6[2]["name"].startsWith("W") ? f(SData.weapon_round.round_6[2]["name"]) : SData.weapon_round.round_6[2]["name"]} : ${SData.weapon_round.round_6[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `7라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_7[0]["name"].startsWith("W") ? f(SData.weapon_round.round_7[0]["name"]) : SData.weapon_round.round_7[0]["name"]} : ${SData.weapon_round.round_7[0]["value"]}%\n2. ${SData.weapon_round.round_7[1]["name"].startsWith("W") ? f(SData.weapon_round.round_7[1]["name"]) : SData.weapon_round.round_7[1]["name"]} : ${SData.weapon_round.round_7[1]["value"]}%\n3. ${SData.weapon_round.round_7[2]["name"].startsWith("W") ? f(SData.weapon_round.round_7[2]["name"]) : SData.weapon_round.round_7[2]["name"]} : ${SData.weapon_round.round_7[2]["value"]}%\`\`\``,
                                    inline: true
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [WEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
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
                                {
                                    name: `1. ${SData.weapon[0]["name"].startsWith("W") ? f(SData.weapon[0]["name"]) : SData.weapon[0]["name"]}`,
                                    value: `${SData.weapon[0]["value"]}%`
                                },
                                {
                                    name: `2. ${SData.weapon[1]["name"].startsWith("W") ? f(SData.weapon[1]["name"]) : SData.weapon[1]["name"]}`,
                                    value: `${SData.weapon[1]["value"]}%`
                                },
                                {
                                    name: `3. ${SData.weapon[2]["name"].startsWith("W") ? f(SData.weapon[2]["name"]) : SData.weapon[2]["name"]}`,
                                    value: `${SData.weapon[2]["value"]}%`
                                },
                                {
                                    name: `4. ${SData.weapon[3]["name"].startsWith("W") ? f(SData.weapon[3]["name"]) : SData.weapon[3]["name"]}`,
                                    value: `${SData.weapon[3]["value"]}%`
                                },
                                {
                                    name: `5. ${SData.weapon[4]["name"].startsWith("W") ? f(SData.weapon[4]["name"]) : SData.weapon[4]["name"]}`,
                                    value: `${SData.weapon[4]["value"]}%`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [WEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 1:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(킬 순위 순)")
                            .addFields(
                                {
                                    name: `1. ${SData.kill[0]["name"].startsWith("W") ? f(SData.kill[0]["name"]) : SData.kill[0]["name"]}`,
                                    value: `${SData.kill[0]["value"]}`
                                },
                                {
                                    name: `2. ${SData.kill[1]["name"].startsWith("W") ? f(SData.kill[1]["name"]) : SData.kill[1]["name"]}`,
                                    value: `${SData.kill[1]["value"]}`
                                },
                                {
                                    name: `3. ${SData.kill[2]["name"].startsWith("W") ? f(SData.kill[2]["name"]) : SData.kill[2]["name"]}`,
                                    value: `${SData.kill[2]["value"]}`
                                },
                                {
                                    name: `4. ${SData.kill[3]["name"].startsWith("W") ? f(SData.kill[3]["name"]) : SData.kill[3]["name"]}`,
                                    value: `${SData.kill[3]["value"]}`
                                },
                                {
                                    name: `5. ${SData.kill[4]["name"].startsWith("W") ? f(SData.kill[4]["name"]) : SData.kill[4]["name"]}`,
                                    value: `${SData.kill[4]["value"]}`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [WEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 2:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(평균 킬 거리 순)")
                            .addFields(
                                {
                                    name: `1. ${SData.distance[0]["name"].startsWith("W") ? f(SData.distance[0]["name"]) : SData.distance[0]["name"]}`,
                                    value: `${SData.distance[0]["value"]}m`
                                },
                                {
                                    name: `2. ${SData.distance[1]["name"].startsWith("W") ? f(SData.distance[1]["name"]) : SData.distance[1]["name"]}`,
                                    value: `${SData.distance[1]["value"]}m`
                                },
                                {
                                    name: `3. ${SData.distance[2]["name"].startsWith("W") ? f(SData.distance[2]["name"]) : SData.distance[2]["name"]}`,
                                    value: `${SData.distance[2]["value"]}m`
                                },
                                {
                                    name: `4. ${SData.distance[3]["name"].startsWith("W") ? f(SData.distance[3]["name"]) : SData.distance[3]["name"]}`,
                                    value: `${SData.distance[3]["value"]}m`
                                },
                                {
                                    name: `5. ${SData.distance[4]["name"].startsWith("W") ? f(SData.distance[4]["name"]) : SData.distance[4]["name"]}`,
                                    value: `${SData.distance[4]["value"]}m`
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [WEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                    case 3:
                        c.deferUpdate()
                        WEmbed = new MessageEmbed()
                            .setTitle("통계 - 무기(라운드 별 선호도 순)")
                            .addFields(
                                {
                                    name: `1라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_1[0]["name"].startsWith("W") ? f(SData.weapon_round.round_1[0]["name"]) : SData.weapon_round.round_1[0]["name"]} : ${SData.weapon_round.round_1[0]["value"]}%\n2. ${SData.weapon_round.round_1[1]["name"].startsWith("W") ? f(SData.weapon_round.round_1[1]["name"]) : SData.weapon_round.round_1[1]["name"]} : ${SData.weapon_round.round_1[1]["value"]}%\n3. ${SData.weapon_round.round_1[2]["name"].startsWith("W") ? f(SData.weapon_round.round_1[2]["name"]) : SData.weapon_round.round_1[2]["name"]} : ${SData.weapon_round.round_1[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `2라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_2[0]["name"].startsWith("W") ? f(SData.weapon_round.round_2[0]["name"]) : SData.weapon_round.round_2[0]["name"]} : ${SData.weapon_round.round_2[0]["value"]}%\n2. ${SData.weapon_round.round_2[1]["name"].startsWith("W") ? f(SData.weapon_round.round_2[1]["name"]) : SData.weapon_round.round_2[1]["name"]} : ${SData.weapon_round.round_2[1]["value"]}%\n3. ${SData.weapon_round.round_2[2]["name"].startsWith("W") ? f(SData.weapon_round.round_2[2]["name"]) : SData.weapon_round.round_2[2]["name"]} : ${SData.weapon_round.round_2[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `3라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_3[0]["name"].startsWith("W") ? f(SData.weapon_round.round_3[0]["name"]) : SData.weapon_round.round_3[0]["name"]} : ${SData.weapon_round.round_3[0]["value"]}%\n2. ${SData.weapon_round.round_3[1]["name"].startsWith("W") ? f(SData.weapon_round.round_3[1]["name"]) : SData.weapon_round.round_3[1]["name"]} : ${SData.weapon_round.round_3[1]["value"]}%\n3. ${SData.weapon_round.round_3[2]["name"].startsWith("W") ? f(SData.weapon_round.round_3[2]["name"]) : SData.weapon_round.round_3[2]["name"]} : ${SData.weapon_round.round_3[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `4라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_4[0]["name"].startsWith("W") ? f(SData.weapon_round.round_4[0]["name"]) : SData.weapon_round.round_4[0]["name"]} : ${SData.weapon_round.round_4[0]["value"]}%\n2. ${SData.weapon_round.round_4[1]["name"].startsWith("W") ? f(SData.weapon_round.round_4[1]["name"]) : SData.weapon_round.round_4[1]["name"]} : ${SData.weapon_round.round_4[1]["value"]}%\n3. ${SData.weapon_round.round_4[2]["name"].startsWith("W") ? f(SData.weapon_round.round_4[2]["name"]) : SData.weapon_round.round_4[2]["name"]} : ${SData.weapon_round.round_4[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `5라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_5[0]["name"].startsWith("W") ? f(SData.weapon_round.round_5[0]["name"]) : SData.weapon_round.round_5[0]["name"]} : ${SData.weapon_round.round_5[0]["value"]}%\n2. ${SData.weapon_round.round_5[1]["name"].startsWith("W") ? f(SData.weapon_round.round_5[1]["name"]) : SData.weapon_round.round_5[1]["name"]} : ${SData.weapon_round.round_5[1]["value"]}%\n3. ${SData.weapon_round.round_5[2]["name"].startsWith("W") ? f(SData.weapon_round.round_5[2]["name"]) : SData.weapon_round.round_5[2]["name"]} : ${SData.weapon_round.round_5[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `6라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_6[0]["name"].startsWith("W") ? f(SData.weapon_round.round_6[0]["name"]) : SData.weapon_round.round_6[0]["name"]} : ${SData.weapon_round.round_6[0]["value"]}%\n2. ${SData.weapon_round.round_6[1]["name"].startsWith("W") ? f(SData.weapon_round.round_6[1]["name"]) : SData.weapon_round.round_6[1]["name"]} : ${SData.weapon_round.round_6[1]["value"]}%\n3. ${SData.weapon_round.round_6[2]["name"].startsWith("W") ? f(SData.weapon_round.round_6[2]["name"]) : SData.weapon_round.round_6[2]["name"]} : ${SData.weapon_round.round_6[2]["value"]}%\`\`\``,
                                    inline: true
                                },
                                {
                                    name: `7라운드`,
                                    value: `\`\`\`1. ${SData.weapon_round.round_7[0]["name"].startsWith("W") ? f(SData.weapon_round.round_7[0]["name"]) : SData.weapon_round.round_7[0]["name"]} : ${SData.weapon_round.round_7[0]["value"]}%\n2. ${SData.weapon_round.round_7[1]["name"].startsWith("W") ? f(SData.weapon_round.round_7[1]["name"]) : SData.weapon_round.round_7[1]["name"]} : ${SData.weapon_round.round_7[1]["value"]}%\n3. ${SData.weapon_round.round_7[2]["name"].startsWith("W") ? f(SData.weapon_round.round_7[2]["name"]) : SData.weapon_round.round_7[2]["name"]} : ${SData.weapon_round.round_7[2]["value"]}%\`\`\``,
                                    inline: true
                                }
                            )
                            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            .setColor("#d94e2f")
                        try {
                            int.editReply({embeds: [WEmbed]})
                            break
                        }catch (e) {
                            await data.EError(int.commandName+"(평균탭)", int.channel.type === "DM" ? "DM" : int.guild.name,e)
                            let ue = new MessageEmbed()
                                .setTitle("⛔ 에러")
                                .setDescription("에러가 발생했습니다 다시시도해주세요!")
                                .setColor("#d94e2f")
                                .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
                            await int.editReply({embeds: [ue]})
                            break
                        }
                }
                break
        }

    })

}

module.exports = { Int_statics }