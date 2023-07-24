require('dotenv').config()

const { Telegraf, session, Scenes } = require('telegraf')
const {langScene} = require('./langScene')
const {mainScene} = require('./mainScene')

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Scenes.Stage([langScene, mainScene])

bot.use(session())
bot.use(stage.middleware())

bot.start(ctx => {
    ctx.reply("Use keyboard", {
        reply_markup: {
            keyboard: [["Change language"], ["Learn weather"]],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    })
})

bot.on("message", ctx => {
    if (ctx.message.text !== null) {
        switch(ctx.message.text)
        {
            case "Change language": ctx.scene.enter("langScene"); break;
            case "Learn weather": ctx.scene.enter("mainScene"); break;
            default: ctx.reply("Use only allowed buttons")
        }
    }
    else {
        ctx.reply("Error")
    }
})


bot.launch()