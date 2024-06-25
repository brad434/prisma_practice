const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in your get request." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const authorId = parseInt(req.params.id);
    await prisma.post.deleteMany({
      where: {
        authorId: authorId,
      },
    });
    await prisma.author.delete({
      where: {
        id: authorId,
      },
    });
    console.log("Author has been deleted.");
    res.status(200).json({ message: "Author has been deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occured while deleting the author." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const authorId = parseInt(req.params.id);
    const { name, email } = req.body;

    const updatedAuthor = await prisma.author.update({
      where: {
        id: authorId,
      },
      data: {
        name,
        email,
      },
    });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
