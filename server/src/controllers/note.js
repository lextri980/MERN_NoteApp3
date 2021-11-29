const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const verifyToken = require("../middlewares/protectedRoute");

// @route GET /note ------------------------------
// @desc Read note
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).populate("user", [
      "username",
      "name",
    ]);
    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST /note ------------------------------
// @desc Create note
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, content, status } = req.body;
  //Validation
  if (!title || !content || !status) {
    return res.status(400).json({
      success: false,
      message: "Fill all the information",
    });
  }

  try {
    const newNote = new Note({
      title,
      content,
      status: status || "NORMAL",
      user: req.userId,
    });

    await newNote.save();
    return res.status(200).json({
      success: true,
      message: "Create new note successfully",
      note: newNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT /note ------------------------------
// @desc Update note
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, content, status } = req.body;
  //Validation
  if (!title || !content || !status) {
    return res.status(400).json({
      success: false,
      message: "Fill all the information",
    });
  }
  try {
    let updateNote = {
      title,
      content,
      status: status || "NORMAL",
    };

    const updateCondition = { _id: req.params.id, user: req.userId };

    updateNote = await Note.findOneAndUpdate(updateCondition, updateNote, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Update note successfully",
      note: updateNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DELETE /note ------------------------------
// @desc Delete note
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id, user: req.userId };

    const deleteNote = await Note.findOneAndDelete(deleteCondition);

    return res.status(200).json({
      success: true,
      message: "Delete note successfully",
      note: deleteNote,
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
