const axios = require('axios')

async function get_id(name) {
    let id = await axios({
        url: "https://stats.vx.nexon.com/api/Search/GetSearchRead/"+encodeURI(name),
        method: "POST",

    })
    return id.data["nickname_list"]
}

async function get_stats(id){
    return axios({
        url: "https://stats.vx.nexon.com/api/Profile/GetGameProfile/" + id,
        method: "POST",
    });
}

async function get_seasonRecord(season,id){
    return axios({
        url: `https://stats.vx.nexon.com/api/Record/GetSeasonRecord/${season}/${id}`,
        method: "POST"
    });
}
module.exports = { get_id, get_stats, get_seasonRecord };