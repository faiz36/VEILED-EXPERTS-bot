const { REST} = require('@discordjs/rest');
const { Routes, ApplicationCommandType} = require('discord-api-types/v9');
const {SlashCommandBuilder,ContextMenuCommandBuilder, ContextMenuCommandType} = require("@discordjs/builders");
const { server, token, client } = require('./config.json')
const rest = new REST({version: '9'}).setToken(token);

(async () => {
    try {
        await rest.put(
            Routes.applicationCommands(client),
            { body: [data = new SlashCommandBuilder()
                    .setName('전적')
                    .setDescription('전적을 확인합니다.')
                    .addStringOption(option => option.setName('유저명').setDescription("VX의 유저이름을 적어주세요!").setRequired(true)),
                    data = new SlashCommandBuilder()
                        .setName("통계")
                        .setDescription("VX의 통계를 확인합니다."),
                    data = new SlashCommandBuilder()
                        .setName("랭킹")
                        .setDescription("VX 유저의 랭킹을 확인합니다."),
                    data = new SlashCommandBuilder()
                        .setName("요원")
                        .setDescription("VX의 요원을 확인하세요"),
                    data = new ContextMenuCommandBuilder()
                        .setName("통계")
                        .setType(ApplicationCommandType.Message),
                    data = new ContextMenuCommandBuilder()
                        .setName("랭킹")
                        .setType(ApplicationCommandType.Message),
                    data = new ContextMenuCommandBuilder()
                        .setName("요원")
                        .setType(ApplicationCommandType.Message),
                ]
            }
        )
        console.log("서버 커맨드 등록됨!")
    } catch (error){
        console.log(error);
    }
})();