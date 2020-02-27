const experss = require("express");
const router = experss.Router();
const { User } = require("../models/user");
const { authentication } = require("../middleware/authentication");

router.get("/", authentication, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).send("User Not Found");
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).send("User Not Found");
  res.send(user);
});

module.exports = router;
