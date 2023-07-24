const {Scenes} = require('telegraf')

const langScene = new Scenes.BaseScene("langScene")

const langKeyboard = [
    [{text: "Russian", callback_data: "ru"}, {text: "English", callback_data: "en"}, {text: "Deutsch", callback_data: "de"}]
]
let lang = "en"

langScene.enter(ctx => {
    ctx.reply("Please, choose your language.", {
        reply_markup: {
            inline_keyboard: langKeyboard
        }
    })
})

langScene.action(/\w+/, ctx => {
    lang = ctx.callbackQuery.data
    const answer = "You've chosen "
    switch(lang)
    {
        case "ru": ctx.answerCbQuery(answer + "Russian"); break;
        case "de": ctx.answerCbQuery(answer + "Deutsch"); break;
        case "en": ctx.answerCbQuery(answer + "English"); break;
    }
})

module.exports = {langScene, lang}