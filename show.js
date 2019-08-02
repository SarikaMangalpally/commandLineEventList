var id = process.argv[2];
//console.log(typeof id);
var fs = require("fs");
var buffer = fs.readFileSync("db.json", "utf8");
var data = buffer.toString("utf8");
var object = JSON.parse(data);

if (!fs.existsSync("db.json")) {
  console.log("file is empty");
  return;
} else {
  var obj = object.filter(item => {
    if (item.id === id) {
      return item;
    }
  });
}
if (obj === "") {
  console.log("event with id = " + `${id}` + " doesn't exist");
  return;
} else {
  console.log(obj);
  return;
}
