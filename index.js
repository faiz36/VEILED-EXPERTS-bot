const { Client,MessageEmbed } = require('discord.js')
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] })
const { token } = require('./config.json')
const {IntStat} = require("./utils/stat");
const {Int_statics} = require("./utils/Statics");
let count = 0;

client.once('ready', () => {
    console.log('준비됨!')
    let scount = 0;
    let repeat = setInterval(() => {
      const Guilds = client.guilds.cache.map(guild => guild.id);
      if (scount === 0){
        client.user.setActivity(`봇이 켜진후 전적을 확인한 수는 ${count}번 입니다!`)
        scount = 1
      }
        else if(scount === 1){
          client.user.setActivity(`들어가 있는 서버 수는 ${Guilds.length}개 입니다!`)
          scount = 0
        }
    },30000)
    
    
})

client.on('guildCreate',guild=>{
    const Guilds = client.guilds.cache.map(guild => guild.id);
    name = guild.name
    embed = new MessageEmbed()
        .setTitle("**서버 가입(JOINED)**")
        .setColor("#d94e2f")
        .addField("**서버**",name)
        .addField("**서버수**",Guilds.length+"개")
    client.channels.cache.get("982252782373449728").send({embeds: [embed]})

})

client.on('guildDelete',guild=>{
    const Guilds = client.guilds.cache.map(guild => guild.id);
    name = guild.name
    embed = new MessageEmbed()
        .setTitle("**서버 탈퇴(REMOVED)**")
        .setColor("#d94e2f")
        .addField("**서버**",name,false)
        .addField("**서버수**",Guilds.length+"개",false)
    client.channels.cache.get("982252782373449728").send({embeds: [embed]})

})

client.on('interactionCreate', async int => {
    if (!int.isCommand()) return;

    if (int.commandName === "전적"){
        let name = int.options.getString("유저명")
        await IntStat(int, name)
        count += 1
}
    else if (int.commandName === "통계"){
        await Int_statics(int)
    }
})


client.login(token);
