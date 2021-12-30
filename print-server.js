const ThermalPrinter = require("node-thermal-printer").printer;
const Types = require("node-thermal-printer").types;
const bodyParser = require("body-parser");

async function printMsg(number) {
  let printer = new ThermalPrinter({
    type: Types.EPSON,
    interface: "\\\\localhost\\epson",
  });

  printer.alignCenter();
  await printer.printImage("./assets/paris-logo.png");
  printer.newLine();
  printer.setTypeFontA();
  printer.setTextSize(3, 2);
  // printer.println("Número");
  // printer.newLine();
  printer.setTextSize(2, 2);
  printer.println(number);

  printer.cut();

  try {
    console.error("Print done!");
    return printer.execute();
  } catch (error) {
    console.log("Print failed:", error);
  }
}

console.log("<<****Conectado ****>>");
var express = require("express");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.get("/", function (req, res) {
  res.send("Hola Mundo!");
});
app.post("/print", async function (req, res) {
  const { number } = req.body;
  printMsg(number);
  console.log({ number });
  res.status(200).send(req.body);
});

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(80, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
