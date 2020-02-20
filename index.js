const express = require("express");
const cors = require("cors");
const postRouter = require("./postsRouter");

//adding comments for heroku
const server = express();
server.use(express.json());
server.use(cors());
server.use("/api/posts", postRouter);

const port = process.env.PORT || 4000;

router.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to our little hobbit hole",
  })
});

server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
