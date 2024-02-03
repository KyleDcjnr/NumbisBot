// packages we'd be needing.
**axios // This is used for making request to urls (it can be a get or post request).
**express // This is a runtime on nodejs (where we run our server). 
**telegraf // This is the library that allows us to communicate with our telegram bot.
**nodemon // This is a package that keeps our server running automatically.  
**monogoose(mongoDB) // This is the package we use to store our database.
// to install this we'd go to our terminal and make sure we are in the right directory and type in "npm i axios express mongoose telegraf nodemon".  




<!-- Examples from class. -->

const axios = require('axios') 
const dotenv = require('dotenv').config()
const {Telegraf, Scenes, session} = require('telegraf')

const botToken = process.env.BotToken
const bot = new Telegraf(botToken)

bot.start(async (ctx)=>{
    console.log(' a user started the bot', ctx.from.username)
    ctx.reply(`Hello ${ctx.from.first_name} ${ctx.from.last_name ?ctx.from.last_name : ''}`)
})

bot.launch()


 <!-- exercise.... -->
const axios = require('axios')
const dotenv = require('dotenv').config()
const {Telegraf, Scenes, session} = require('telegraf')
const botToken = process.env.BotToken || null;

const bot = new Telegraf(botToken)


 <!-- Class attempt & assignment 1 -->

 bot.start(async (ctx)=>{
     console.log(
         ' a user interacted with the bot', ctx.from.username
     );
     const message = `Welcome to NumbisBot, ${ctx.from.first_name} ${ctx.from.last_name ? ctx.from.last_name : ''}`
     ctx.replyWithPhoto(
         {
             source : "./admin.png"
         },
         {
             caption : message
         }
     )
})
bot.launch()



<!-- Answer to Assignment using userstates.  -->
Dictionary to store user states
const userStates = {};

 <!-- Command handler for /startinteraction but i'm using /start -->
bot.command('start', (ctx) => {
  console.log(ctx.from.username, 'interacted with the bot.');
   <!-- Set the user's state to 'waitingForName' -->
  userStates[ctx.from.id] = 'waitingForName';

  ctx.reply('Hello! What is your name?');
});

 <!-- Text handler for user responses -->
bot.on('text', (ctx) => {
  const userId = ctx.from.id;

   <!-- Check if the user is in 'waitingForName' state -->
  if (userStates[userId] === 'waitingForName') {
    const userName = ctx.message.text;

    const message = `Welcome to NumbisBot, ${userName}! \nNice to meet you`;
    ctx.replyWithPhoto(
        {
            source: "./admin.png"
        },
        {
            caption : message
        },
        quiz
    )
     <!-- Reset the user's state -->
    delete userStates[userId];
  }
});

<!-- Start the bot -->
bot.launch()