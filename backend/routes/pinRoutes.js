const router = require("express").Router();
const { getPins, addPin } = require("../controller/pinController");

router.route("/").get(getPins).post(addPin);

module.exports = router;
