const axios = require('axios')

async function get_id(name) {
    let id = await axios({
        url: "https://barracks.d.nexon.com/api/Search/GetSearchRead/"+encodeURI(name),
        method: "POST",

    })
    return id.data["nickname_list"]
}

async function get_stats(id){
    let stats = await axios({
        url: "https://barracks.d.nexon.com/api/Profile/GetGameProfile/"+id,
        method: "POST",
    })
    return stats;
}
module.exports = { get_id, get_stats };