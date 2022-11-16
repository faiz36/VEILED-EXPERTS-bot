const {EmbedBuilder} = require("discord.js");
jack = {
    one: () => {
        return new EmbedBuilder()
            .setTitle("잭(JACK KANE)")
            .setDescription("흔적을 남기지 않는 특급 요원 <잭>")
            .addFields(
                {name: "나이", value: "45"},
                {name: "국가, 출신", value: "미국 (시카고)"},
                {name: "소속", value: "1st DEGREE"},
                {name: "코드네임", value: "Shadow"},
                {name: "신체 개조 여부", value: "개조 없음"},
                {name: "VX 코멘트", value: "1급 요원 우대"}
            )
            .setColor("#d94e2f")
            .setThumbnail("https://globalvx.dn.nexoncdn.co.kr/Web/barracks/logo_symbol.png")
    }
}

module.exports = { jack }