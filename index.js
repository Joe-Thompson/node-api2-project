const express = require("express");
const cors = require("cors");
const postRouter = require("./postsRouter");

const server = express();
server.use(express.json());
server.use(cors());
server.use("/api/posts", postRouter);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
