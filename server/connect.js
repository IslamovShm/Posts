import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "tz"
})

db.connect((err) => {
    if (err) {
      console.error("Ошибка подключения к базе данных:", err);
      return;
    }
    console.log("Подключение к базе данных успешно установлено!");
  });