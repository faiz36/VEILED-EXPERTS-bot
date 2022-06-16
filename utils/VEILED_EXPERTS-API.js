const axios = require('axios')

async function get_id(name) {
    let id = await axios({
        url: "https://globalstats.vx.nexon.com/api/Search/GetSearchRead/" + encodeURI(name),
        method: "POST",

    })
    return id.data["nickname_list"]
}
async function get_stats(id){
    return axios({
        url: "https://globalstats.vx.nexon.com/api/Profile/GetGameProfile/" + id,
        method: "POST",
    });
}

async function get_seasonRecord(season,id){
    return axios({
        url: `https://globalstats.vx.nexon.com/api/Record/GetSeasonRecord/${season}/${id}`,
        method: "POST"
    });
}

async function get_recentRecord(id){
    return axios.post((`https://globalstats.vx.nexon.com/api/Record/GetRecentRecord/${id}`))
}

async function get_statics(){
    return axios.post('https://globalstats.vx.nexon.com/api/Statistics/GetRead')
}
module.exports = { get_id, get_stats, get_seasonRecord,get_statics,get_recentRecord };