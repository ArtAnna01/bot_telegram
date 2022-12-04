const TelegramApi = require("node-telegram-bot-api");
const token = "5951061062:AAHluK0IgPYow5LAAVK9uQj2qw0tOv-Cuoc";
const schedule = require("node-schedule");
const bot = new TelegramApi(token, { polling: true });

const jobs = (chatId) => {
  //timescheets
  schedule.scheduleJob("0 0 9 /13,29 * *", function () {
    const photoTimesheet = "Timesheet.png";
    bot.sendMessage(chatId, "Напоминание о timesheet!");
    bot.sendPhoto(chatId, photoTimesheet);
  });

  //newYear "0 10 * * *"
  schedule.scheduleJob("0 0 7 */ * *", function () {
    const photoNewYear = "HappyNewYear.png";
    const presentDate = new Date();
    const newYearDate = new Date("01/01/2022");
    const date = Math.floor(
      (newYearDate.getTime() - presentDate.getTime()) / (1000 * 3600 * 24)
    );
    // console.log(Number.isNaN(date));

    if (25 > date > 21) {
      bot.sendMessage(chatId, `До Нового Года осталось ${date} дня!`);
      bot.sendPhoto(chatId, photoNewYear);
    } else if (date === 21) {
      bot.sendMessage(chatId, `До Нового Года остался ${date} день!`);
      bot.sendPhoto(chatId, photoNewYear);
    } else if (5 > date > 1) {
      bot.sendMessage(chatId, `До Нового Года осталось ${date} дня!`);
      bot.sendPhoto(chatId, photoNewYear);
    } else if (date === 1) {
      bot.sendMessage(chatId, `До Нового Года остался ${date} день!`);
      bot.sendPhoto(chatId, photoNewYear);
    } else {
      bot.sendMessage(chatId, `До Нового Года осталось ${date} дней!`);
      bot.sendPhoto(chatId, photoNewYear);
    }
  });

  // console.log(Object.keys(schedule.scheduledJobs));
};

const start = async () => {
  const admins = [114459214, 343945524];
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Для чего предназначен бот" },
    { command: "/jobs", description: "Список событий" },
  ]);

  bot.on("message", async (msg) => {
    console.log(msg);
    const userId = msg.from.id;
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text?.includes("/start") && admins.includes(userId)) {
      let jobList = schedule.scheduledJobs; //Get All scheduled jobs

      if (jobList) {
        Object.values(jobList).map((job) => {
          console.log("Delete Job", job.name);
          schedule.cancelJob(job.name);
        });
      }
      jobs(chatId);
      return bot.sendMessage(
        chatId,
        `Вас приветствует телеграм бот для рабочих уведомлений и напоминаний`
      );
    }

    if (text?.includes("/jobs")) {
      const jobsarr = Object.values(schedule.scheduledJobs)
        .map((el) => el.name)
        .join("\r\n");

      return bot.sendMessage(
        chatId,
        `${jobsarr ? jobsarr : "Чирик-чирик список пуст"}`
      );
    }

    if (text?.includes("/info")) {
      return bot.sendMessage(
        chatId,
        `Телеграм бот для рабочих уведомлений и напоминаний`
      );
    }

    // return bot.sendMessage(chatId, "Бип-бип не узнаю владельца :)");
  });
};

start().catch((err) => console.log(err));
