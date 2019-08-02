var id = process.argv[2];
var fs = require("fs");
var buffer = fs.readFileSync("db.json", "utf8");
var data = JSON.parse(buffer.toString("utf8"));
var object = [];
//console.log(data);
if (!fs.existsSync("db.json")) {
  console.log("file doesn't exist");
  return;
} else {
  if (data !== "") {
    data.map(item => {
      //console.log(item);
      if (item.id === id) {
        data.splice(item, 1, 1);
        console.log("deleted");
      } else {
        object.push(item);
      }
    });
    fs.writeFileSync("db.json", JSON.stringify(object));
    console.log("delted event with id = " + `${id}` + " from the events list");
    return;
  }
  console.log("file is empty");
  return;
}
