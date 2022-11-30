const TelegramApi = require("node-telegram-bot-api");
const token = "5687612665:AAG11GwwVIN9RjoFX7Mp1YaZ4T46NRv303o";
const schedule = require("node-schedule");
const bot = new TelegramApi(token, { polling: true });

const start = () => {
  let chatId = 0;
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Для чего предназначен бот" },
  ]);

  //timescheet 1
  schedule.scheduleJob("0 * * * * *", function () {
    const photoTimesheet = "Timesheet.png";
    bot.sendMessage(chatId, "Напоминание о timesheet!");
    bot.sendPhoto(chatId, photoTimesheet);
  });

  //timescheet 2
  schedule.scheduleJob("* * 12 29 * *", function () {
    const photoTimesheet = "Timesheet.png";
    bot.sendMessage(343945524, "Напоминание о timesheet!");
    bot.sendPhoto(343945524, photoTimesheet);
  });

  //newYear
  schedule.scheduleJob("* * 9 * * *", function () {
    const photoNewYear = "HappyNewYear.png";
    const presentDate = new Date();
    const newYearDate = new Date("01/01/2023");
    const date = Math.floor(
      (newYearDate.getTime() - presentDate.getTime()) / (1000 * 3600 * 24)
    );
    bot.sendMessage(343945524, `До Нового Года осталось ${date} дней!`);
    bot.sendPhoto(343945524, photoNewYear);
  });

  bot.on("message", async (msg) => {
    const text = msg.text;
    // console.log(chatId);
    if (text === "/start") {
      chatId = msg.chat.id;
      return bot.sendMessage(
        chatId,
        `Добро пожаловать в телеграм бот для рабочих уведомлений и напоминаний`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Телеграм бот для рабочих уведомлений и напоминаний`
      );
    }
  });
};

start();
