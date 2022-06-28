const {get_stats, get_seasonRecord,get_recentRecord} = require("./VEILED_EXPERTS-API");

const data = {
    record: async (usn,season) => {
        let stats = await get_stats(usn)
        let s_stats = await get_seasonRecord(season, usn)
        let r_stats = await get_recentRecord(usn)
        let kill = s_stats.data.kill.replaceAll(',', '')
        let headshot = s_stats.data.headshot.replaceAll(',', '')

        return {
            ranking: {
                info: stats.data.ranking === "UNRANK" ? stats.data.ranking : stats.data.ranking + "위",
            },
            record: {
                winrate: `${stats.data.seasonRecord.win_rate}%`,
                kd: `${stats.data.seasonRecord.kd}`,
                dmgrate: `${stats.data.seasonRecord.damage_rate}`,
                headrate: String((headshot / kill * 100).toPrecision(3)) + "%",
                avg_atk: r_stats.data.recentInfo.round_damage_enemy
            },
            info: {
                blockFlag: stats.data.userInfo.block_flag,
                nickName: stats.data.userInfo.nickname,
                img: stats.data.profile_image
            }
        }
    },
}

module.exports = {
    data
}