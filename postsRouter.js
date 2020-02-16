const express = require("express");
const helpers = require("./data/db");

const router = express.Router();

// (/api/posts) GET requests
router.get("", (req, res) => {
   helpers.find()
       .then(posts => {
           res.status(200).json(posts)
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({ error: "The posts information could not be retrieved" })
       })
});

router.get("/:id", (req, res) => {
    helpers.findById(req.params.id)
        .then(post => {
            if (!post[0]) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved" })
        })
});

router.get("/:id/comments", (req, res) => {
    helpers.findPostComments(req.params.id)
        .then((postComment) => {
            if (!postComment[0]) {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            } else  {
              res.json(postComment)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The comments information could not be retrieved" });
        })
});

// (/api/posts) POST request
router.post("", (req, res) => {
    helpers.insert(req.body)
    .then(post => {
        if (!post) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            res.status(201).json(post)
        }})
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
});

router.post("/:id/comments", (req, res) => {
   const { text } = req.body;
   const post_id = req.params.id;

    helpers.findById(req.params.id)
        .then(post => {
            if (!post[0]) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                helpers.insertComment({ text, post_id })
                    .then(comment => {
                        if (!comment) {
                            res.status(400).json({ errorMessage: "Please provide title and contents for the post" })
                        } else {
                            res.status(200).json(comment)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The post information could not be modified" })
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved" })
        })
});

// (/api/posts) PUT request
router.put("/:id", (req, res) => {
    helpers.findById(req.params.id)
        .then(post => {
            if (!post[0]) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
               helpers.update(req.params.id, req.body)
                   .then(post => {
                       if (!post) {
                           res.status(400).json({ errorMessage: "Please provide title and contents for the post" })
                       } else {
                           res.status(200).json(post)
                       }
                   })
                   .catch(err => {
                       console.log(err);
                       res.status(500).json({ error: "The post information could not be modified" })
                   })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The post information could not be retrieved" })
        })
});

// (/api/posts) DELETE request
router.delete("/:id", (req, res) => {
   helpers.remove(req.params.id)
       .then(post => {
           if (!post) {
               res.status(404).json({ message: "The post with the specified ID does not exist" })
           } else {
               res.status(204).json(post)
           }
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({ error: "The post could not be removed" })
       })
});

module.exports = router;
