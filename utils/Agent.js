const { ActionRowBuilder, SelectMenuBuilder, ButtonBuilder,ButtonStyle} = require("discord.js");
const { jack } = require("../utils/agent/Jack")

async function Int_Agent(int) {
    let current = "jack"
    await int.deferReply()
    let FE = jack.one()
    let lrow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("942384949762342972")
                .setCustomId("VX_AgentBack")
                .setStyle(ButtonStyle.Danger)
        )
        .addComponents(
            new ButtonBuilder()
                .setEmoji("933926552800989226")
                .setCustomId("VX_AgentNext")
                .setStyle(ButtonStyle.Danger)
        )
    let row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("VX_AgentInfo")
                .setPlaceholder("요원의 원하는 정보를 선택해주세요!")
                .addOptions([
                    {
                        label:"기본 정보",
                        description: "요원의 기본 정보를 확인합니다.",
                        value:"VX_default"
                    },
                    {
                        label:"인게임 정보",
                        description: "요원의 인게임 정보를 확인합니다(ex 시그니처, 기본특기)",
                        value: "VX_ingame"
                    }
                ])
        )
    await int.editReply({embeds: [FE],components: [lrow,row]})
    setTimeout(async ()=>{
        await int.editReply({components:[]})
    },1000*200)
    const filter = f => {
        return int.id === f.message.interaction.id
    }
    let collector = int.channel.createMessageComponentCollector({filter,time:1000*200})
    collector.on("collect", async c => {

    })
}

module.exports = { Int_Agent }