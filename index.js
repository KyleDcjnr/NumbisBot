// Examples from class.

// const axios = require('axios') 
// const dotenv = require('dotenv').config()
// const {Telegraf, Scenes, session} = require('telegraf')

// const botToken = process.env.BotToken
// const bot = new Telegraf(botToken)

// bot.start(async (ctx)=>{
//     console.log(' a user started the bot', ctx.from.username)
//     ctx.reply(`Hello ${ctx.from.first_name} ${ctx.from.last_name ?ctx.from.last_name : ''}`)
// })

// bot.launch()


// exercise....
const axios = require('axios')
const dotenv = require('dotenv').config()
const {Telegraf, Scenes, session} = require('telegraf')
const botToken = process.env.BotToken || null;

const bot = new Telegraf(botToken)


// Class attempt & assignment 1

// bot.start(async (ctx)=>{
//     console.log(
//         ' a user interacted with the bot', ctx.from.username
//     );
//     const message = `Welcome to NumbisBot, ${ctx.from.first_name} ${ctx.from.last_name ? ctx.from.last_name : ''}`
//     ctx.replyWithPhoto(
//         {
//             source : "./admin.png"
//         },
//         {
//             caption : message
//         }
//     )

// })

// E no clear *********  Correction from Dray.
const nameScene = new Scenes.BaseScene('nameScene')
const stage = new Scenes.Stage([
    nameScene
]
    
)

bot.use(session())
bot.use(stage.middleware())
// Command handler for /startinteraction
bot.command('start', async (ctx) => {
    console.log(ctx.from.username, ' interacted with the bot ');

    ctx.scene.enter('nameScene')
 
});

// // Text handler for user responses
// bot.on('text', async (ctx) => {
//   const userId = ctx.from.id;



    // const message =`Welcome to NumbisBot, ${userName}! \nNice to meet you`;;
//     ctx.replyWithPhoto(
//         {
//             source : "./admin.png"
//         },
//         {
//             caption : message
//         }
//     )
// });


nameScene.enter(async (ctx)=>{
    ctx.reply('Hello! What is your name?');

    ctx.session.user ={}
})


nameScene.on('text', (ctx)=>{
    ctx.session.user.name = ctx.message.text

    ctx.reply('Hi, Please select your gender', 
    {
      reply_markup: {
        inline_keyboard : [
          [
            {
              text : 'Male', callback_data : 'male'
            },
            {
              text : 'Female', callback_data : 'female'
            }
          ],
          [
            {
              text : 'LGBTQ+', callback_data : 'lgbtq'
            }
          ]
        ]
      }
    })
    ctx.scene.leave()
})

bot.action('male', (ctx)=>{
  const message = `Welcome to NumbisBot, Sir ${ctx.session.user.name} \n\nNice to meet you`;
  ctx.replyWithPhoto(
    {
      source : "./man.png"
    },
    {
      caption : message
    }
  )
})
bot.action('female', (ctx)=> {
  const message = `Welcome to NumbisBot, Ma'am ${ctx.session.user.name} \n\nNice to meet you`;
  ctx.replyWithPhoto(
    {
      source : "./midfemale.png"
    },
    {
      caption : message
    }
  )
})
bot.action('lgbtq', (ctx)=>{
  const message = `Welcome to NumbisBot, ${ctx.session.user.name} \n\nNice to meet you`;
  ctx.replyWithPhoto(
    {
      source : "./lgbtq.png"
    },
    {
      caption : message
    }
  )
})

// start the bot
bot.launch();
