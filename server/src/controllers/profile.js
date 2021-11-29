const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/protectedRoute");

// @route PUT /profile ------------------------------
// @desc Update profile
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "Fill all the information",
    });
  }

  try {
    let updateProfile = {
      username,
      name,
      password,
    };

    const updateCondition = { _id: req.params.id, user: req.userId };

    updateProfile = await User.findOneAndUpdate(
      updateCondition,
      updateProfile,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Update profile successfully",
      profile: updateProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
