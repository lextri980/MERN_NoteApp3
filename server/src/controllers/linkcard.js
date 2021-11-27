const express = require("express");
const router = express.Router();
const LinkCard = require("../models/LinkCard");
const verifyToken = require("../middlewares/protectedRoute");

// @route GET /linkcard ------------------------------
// @desc Read link card
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const linkcards = await LinkCard.find({ user: req.userId }).populate(
      "user",
      ["username", "name"]
    );
    res.status(200).json({
      success: true,
      linkcards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST /linkcard ------------------------------
// @desc Create link card
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //Validation
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required!",
    });
  }
  try {
    const newLinkCard = new LinkCard({
      title,
      description,
      url: url.startsWith("http://") ? url : `http://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newLinkCard.save();
    res.status(200).json({
      success: true,
      message: "Create link card successfully",
      linkcard: newLinkCard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT /linkcard ------------------------------
// @desc Update link card
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  //Validation
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required!",
    });
  }
  try {
    let updateLinkCard = {
      title,
      description: description || "",
      url: (url.startsWith("http://") ? url : `http://${url}`) || "",
      status: status || "TO LEARN",
    };

    const updateCondition = { _id: req.params.id, user: req.userId };

    updateLinkCard = await LinkCard.findOneAndUpdate(
      updateCondition,
      updateLinkCard,
      { new: true }
    );

    res.json({
      success: true,
      message: "Update successfully!",
      linkcard: updateLinkCard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DELETE /linkcard ------------------------------
// @desc Delete link card
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteCondition = {
      _id: req.params.id,
      user: req.userId,
    };

    const deleteLinkCard = await LinkCard.findOneAndDelete(deleteCondition);

    res.json({
      success: true,
      message: 'Delete successfully',
      linkcard: deleteLinkCard
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
