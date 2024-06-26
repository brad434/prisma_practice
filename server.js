const express = require("express");
const app = express();
const port = 3100;

app.use(express.json());

app.use("/api/authors", require("./routes/API/author"));
app.use("/api/students", require("./routes/API/student"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
