const experss = require("express");
const router = experss.Router();
const { authentication } = require("../middleware/authentication");
const { itemValidator, Item } = require("../models/item");
const { User } = require("../models/user");
const { Uploader } = require("../controllers/uploader");
const multer = require("multer");

router.get("/self_selling_list", authentication, async (req, res) => {
  const user = await User.findById(req.user.id).populate("item");
  res.send(user.sellingItem);
});

router.get("/", async (req, res) => {
  const item = await Item.find();

  res.status(200).send(item);
});

router.get("/:id", authentication, async (req, res) => {
  const item = await Item.findOne({
    user: req.user.id,
    _id: req.params.id
  });

  res.status(200).send(item);
});

router.post(
  "/:userId",
  multer({}).single("images"),
  (req, res, next) => {
    Uploader(req, res, req.file, next, "post");
  },
  async (req, res) => {
    const { error } = itemValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
      _id: req.params.userId
    });

    const payload = {
      ...req.body,
      user: user._id
    };
    item = new Item(payload);
    const userItem = user.sellingItem;
    userItem.push(item.id);
    await item.save();
    await user.save();
    res.status(200).send(item);
  }
);

router.put(
  "/update/:id/:userId",
  multer({}).single("images"),
  (req, res, next) => {
    Uploader(req, res, req.file, next, "update");
  },
  (req, res) => {
    Item.findById(req.params.id, (err, item) => {
      if (item.user === req.params.userId) {
        if (!item) res.status(404).json({ Error: "Item not found." });
        else {
          item.title = req.body.title || item.title;
          item.description = req.body.description || item.description;
          item.category = req.body.category || item.category;
          item.location = req.body.location || item.location;
          item.images = req.body.images || item.images;
          item.price = req.body.price || item.price;
          item.deliveryType = req.body.deliveryType || item.deliveryType;

          item
            .save()
            .then(() =>
              res.json({
                itemlist: item,
                msg: `Item updated successfully.`
              })
            )
            .catch(err => res.status(400).json({ Error: err }));
        }
      } else {
        res.status(401).json({
          msg: "You're unauthorized to update this item."
        });
      }
    });
  }
);

//deleting data
router.delete("/delete/:id", async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id });
  if (!item) return res.status(404).send("Data not found.");

  await item
    .remove()
    .then(() => res.json({ msg: "Item deleted successfully." }));
});

module.exports = router;
