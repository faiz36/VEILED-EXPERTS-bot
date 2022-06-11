const {Interaction} = require("discord.js");
const {get_statics} = require("./VEILED_EXPERTS-API");

async function Int_Ranking(int = require(Interaction)) {
    let data
    data = await get_statics()
    data = data.data


}