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

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newAuthor = await prisma.author.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(newAuthor);
    console.log("Successfully created new Author!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occured in creating an author." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = parseInt(id);

    const author = await prisma.author.findUnique({
      where: { id: authorId },
      include: { post: true },
    });
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const getAllPost = await prisma.author.findMany({
      include: {
        post: true,
      },
    });
    res.status(200).json(getAllPost);
    console.log("Posts available.");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occured in the get all post router." });
  }
});
module.exports = router;
