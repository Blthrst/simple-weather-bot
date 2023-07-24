require('dotenv').config()
const { Scenes } = require('telegraf')
const {lang} = require('./langScene')
const {getWeather} = require('./getWeather')

const mainScene = new Scenes.BaseScene("mainScene")

mainScene.enter(ctx => {
    ctx.reply("Write the name of the city whose weather you are interested in.")
})

mainScene.on("message", async ctx => {
   const data = await getWeather(ctx.message.text.toLowerCase(), lang)
   const weather = data.weather
   await ctx.reply(`${data.name}\nTemperature: ${weather.temperature} °C\nWindspeed: ${weather.windspeed} m/s`)
})

module.exports = {mainScene}