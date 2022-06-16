const {get_stats, get_seasonRecord} = require("./VEILED_EXPERTS-API");

const data = {
    record: async (nickname) => {
        let stats = await get_stats(nickname)
        let s_stats = await get_seasonRecord(202206, nickname)
        let kill = s_stats.data.kill.replaceAll(',', '')
        let headshot = s_stats.data.headshot.replaceAll(',', '')

        let value = {
            lanking: {
                info: stats.data.ranking === "UNRANK" ? stats.data.ranking : stats.data.ranking+"위",
            },
            record: {
                winrate: `${stats.data.seasonRecord.win_rate}%`,
                kd: `${stats.data.seasonRecord.kd}`,
                damgerate: `${stats.data.seasonRecord.damage_rate}`,
                headrate: String((headshot / kill * 100).toPrecision(3)) + "%"
            }
        }

        return value
    },
}

module.exports = {
    data
}