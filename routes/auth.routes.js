const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const bodyParser = require("body-parser");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");

    next();
  });

  app.post("/api/auth/signup", bodyParser.json(), controller.signup);

  app.post("/api/auth/signin", bodyParser.json(), controller.signin);

  app.post("/api/auth/signout", controller.signout);
};
