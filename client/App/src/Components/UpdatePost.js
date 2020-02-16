import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function UpdatePost({ match, history }) {
    const id = match.params.id;

    const [post, setPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: "",
        contents: ""
    });

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },[]);

    const changeHandler = (e) => {
      e.preventDefault();
      setNewPost({
          ...newPost,
          [e.target.name]: e.target.value
      });
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if (!newPost.title || !newPost.contents) {
          window.alert("All fields are required to continue")
      } else {
      axios
          .put(`http://localhost:4000/api/posts/${id}`, newPost)
          .then(res => {
              console.log(res);
              history.push("/")
          })
          .catch(err => {
              console.log(err)
          })
    }};

    const handleDelete = (e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:4000/api/posts/${id}`)
            .then(res => {
                console.log(res);
                history.push("/")
            })
            .catch(err => {
                console.log(err);
            })
    };

    if (!post) {
        return (
            <h1>Loading....</h1>
        )}
    return (
        <div>
            <h1>{post[0].title}</h1>
            <h1>{post[0].contents}</h1>

            <form onSubmit={submitHandler}>
                <input type="text" name="title" placeholder="Please enter a title..." value={newPost.title} onChange={changeHandler} />
                <input type="text" name="contents" placeholder="Please enter content" value={newPost.contents} onChange={changeHandler} />
                <button type="submit">Submit</button>
            </form>
        <button onClick={handleDelete} value={post[0].id}>Delete</button>
            <Link to="/">Back</Link>
        </div>
    )
}

export default UpdatePost;
