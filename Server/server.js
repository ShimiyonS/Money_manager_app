const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const con = require("./db/connection.js");

app.use(require("./routes/route"));

// con
//   .then((db) => {
//     if (!db) return process.exit(1);

//     // const port = 8050;
//     app.listen(port, () => {
//       console.log(`server is running localhost:${port}`);
//     });
//     app.on("error", (err) => console.log(`Failed to conenned ${err}`));
//   })
//   .catch((error) => {
//     console.log(`Connection Failed ${error}`);
//   });
app.get("/", (req, res) => {
  res.send("<h1>Welcome To Your Node Server</h1>");
});
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`localhost User Server : ${PORT}`)
);
