var pageNum = parseInt(process.argv[2]);
var pageSize = parseInt(process.argv[3]);
var fs = require("fs");
if (!fs.existsSync("db.json")) {
  console.log("file does not exist");
  return;
} else {
  var buffer = fs.readFileSync("db.json", "utf8");
  var data = buffer.toString("utf8");
  var object = JSON.parse(data);
  for (let i = pageNum; i < pageSize; i++) {
    console.log(object[i]);
  }
}
