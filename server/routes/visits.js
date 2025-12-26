const express = require("express");
const router = express.Router();
const updateVisits = require("../controllers/updateVisits.js");
const getVisits = require("../controllers/getVisits.js");

//--------------------MIDDLEWARE--------------------*/
router.use((req, res, next) => {
  req.method === "POST" && console.log("-POST /visits", "@", new Date());
  req.method === "GET" && console.log("-GET /visits", "@", new Date());
  next();
});

//--------------------ROUTES--------------------*/
router
  .route("/")
  .post((req, res) => {
    try {
      console.log("req.body /VISITS:", req.body);
      if (JSON.stringify(req.body) == "{}") {
        res.send("404, FAILED TP UPDATE '{}'");
        return "404 NO DATA FOUND: '{'";
      }
      updateVisits(req.body);
      res.send("200, VISITS UPDATED");
    } catch (error) {
      res.send(console.error(error));
    }
  })
  .get((req, res) => {
    console.log("GET /VISITS");
    try {
      if (req.headers["authorization"] !== process.env.ADMIN_PASSWORD) {
        res.send("403, UNAUTHORIZED");
        return "403 UNAUTHORIZED";
      } else {
        console.log("AUTHORIZED");
        getVisits().then((data) => {
          res.send({ visits: data });
        });
      }
    } catch (error) {
      res.send(console.error(error));
    }
  });

module.exports = router;
