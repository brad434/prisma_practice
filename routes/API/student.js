const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.put("/id", async (req, res) => {
  const updateStudentCohort = await prisma.student.update({
    where: {
      id: 141,
    },
    data: {
      cohort: "Cohort 2",
    },
  });
  res.status(200).json(updateStudentCohort);
});

module.exports = router;
