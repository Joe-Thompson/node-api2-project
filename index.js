const express = require('express');
const postRouter = require("./postsRouter");

const server = express();
server.use(express.json());
server.use("/api/posts", postRouter);

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
});

