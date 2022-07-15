const {Interaction} = require("discord.js");

async function Int_Agent(int = require(Interaction)) {
    await int.deferReply()

}

module.exports = { Int_Agent }