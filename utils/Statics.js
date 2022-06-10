const {Interaction} = require("discord.js");
const {get_statics} = require("./VEILED_EXPERTS-API");

async function Int_statics(int = require(Interaction)) {
    let data = await get_statics()
    console.log(data)
}

module.exports = { Int_statics }