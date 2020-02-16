import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {

    const [posts, setPosts] = useState(null);
    const [newPost, setNewPost] = useState({
        title: "",
        contents: ""
    });

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/posts")
            .then(res => {
                setPosts(res.data)
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
      })
    };

    const submitHandler = (e) => {
      e.preventDefault();
      axios
          .post("http://localhost:4000/api/posts", newPost)
          .then(res => {
              console.log(res);
              window.location.reload();
          })
          .catch(err => {
              console.log(err)
          })

    };

    if (!posts) {
        return (
            <h1>Loading....</h1>
        )}
        return (
        <div>
            <h1>Hey you guys</h1>

            <form onSubmit={submitHandler}>
                <input type="text" name="title" value={newPost.title} placeholder="Please enter Title" onChange={changeHandler} />
                <input type="text" name="contents" value={newPost.contents} placeholder="Please enter Content" onChange={changeHandler} />
                <button type="submit">Create Post</button>
            </form>

            {posts.map((item) => {
                return (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <h2>{item.contents}</h2>
                        <Link to={`/updatePost/${item.id}`}>Update</Link>
                        <Link to={`/comments/${item.id}`}>View Comments</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard;
