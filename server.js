const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const db = require("./models");
const Role = db.role;
const app = express();
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "digivolution-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

db.mongoose
  .connect(
    `mongodb+srv://digivolution:1gnFIIrULVdF6VNi@cluster0.b9eqq9e.mongodb.net/?retryWrites=true&w=majority`
  
  )

db.mongoose.connection.on("error", (err) => {
  console.log("err", err);
  process.exit();
});

db.mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to digivolution application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
