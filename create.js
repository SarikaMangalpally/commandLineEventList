var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      message: "what is your event name?",
      name: "eventname",
      validate: answers => {
        if (answers !== "") {
          return true;
        } else {
          return "event name can't be empty";
        }
      }
    },
    {
      type: "input",
      message: "On which day event starts?",
      name: "startday",
      validate: answers => {
        if (answers !== "") {
          if (moment(answers, "LL", true).format() !== "Invalid date") {
            return true;
          } else {
            return `format should be example:"december 12, 1997"`;
          }
        } else {
          return "mention start day of the event";
        }
      }
    },
    {
      type: "input",
      message: "At what time does the event start?",
      name: "starttime",
      validate: answers => {
        if (answers !== "") {
          if (moment(answers, "LT", true).format() !== "Invalid date") {
            return true;
          } else {
            return `format should be example:"4:45 PM"`;
          }
        } else {
          return "mention start day of the event";
        }
      }
    },
    {
      type: "input",
      message: "On which day the event ends?",
      name: "endday",
      validate: answers => {
        if (answers !== null) {
          if (moment(answers, "LL", true).format() !== "Invalid date") {
            {
              return true;
            }
          } else {
            return `format should be example:"december 12, 1997"`;
          }
        } else {
          return "mention on which day the event ends.";
        }
      }
    },
    {
      type: "input",
      message: "At what time does the event ends?",
      name: "endtime",
      validate: answers => {
        if (answers !== "") {
          if (moment(answers, "LT", true).format() !== "Invalid date") {
            return true;
          } else {
            return `format should be example:"4:45 PM"`;
          }
        } else {
          return "mention at what time the event ends.";
        }
      }
    },
    {
      type: "input",
      message: "where the event is being conducted?",
      name: "place",
      validate: answers => {
        if (answers !== "") {
          return true;
        } else {
          return "mention where the event is being conducted.";
        }
      }
    }
  ])
  .then(answers => {
    var sd = moment(answers.startday, "LL", true);
    var ed = moment(answers.endday, "LL", true);
    var st = moment(answers.starttime, "LT", true);
    var et = moment(answers.endtime, "LT", true);
    if (moment(sd).isSame(ed)) {
      if (moment(et).isSameOrBefore(st)) {
        console.log("event can't end on same day, at same time/before time");
        return;
      }
    } else {
      if (moment(ed).isBefore(sd)) {
        console.log("event end day can't be before event start day");
        return;
      }
      return parse(answers);
    }
  });
function parse(answers) {
  const exists = fs.existsSync("db.json");
  if (!exists) {
    fs.writeFileSync("db.json", JSON.stringify([]));
  }
  const buffer = fs.readFileSync("db.json", "utf8");
  const data = buffer.toString("utf8");
  //console.log(data);
  const events = JSON.parse(data);
  const event = {
    id: `${new Date().getTime()}`,
    ...answers
  };
  events.push(event);
  fs.writeFileSync("db.json", JSON.stringify(events));
  console.log(event);
}
