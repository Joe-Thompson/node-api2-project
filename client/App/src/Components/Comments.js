import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Comments({ match, history }) {
    const id = match.params.id;

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState({
        text: ""
    });

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/posts/${id}`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err)
            });

        axios
            .get(`http://localhost:4000/api/posts/${id}/comments`)
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                setComments([{
                    id: Date.now(),
                    text: "No comments on this post"
                }])
            })
    },[]);

    const changeHandler = (e) => {
        e.preventDefault();
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value
        })
    };

    const submitHandler = (e) => {
      e.preventDefault();
      axios
          .post(`http://localhost:4000/api/posts/${id}/comments`, newComment)
          .then(res => {
              console.log(res);
              history.push('/')
          })
          .catch(err => {
              console.log(err)
          })
    };

    if (!post || !comments) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
           <h1>{post[0].title}</h1>
            <h1>{post[0].contents}</h1>
            {comments.map((item) => {
                return (
                    <div key={item.id}>
                        <h1>{item.text}</h1>
                    </div>
                )
            })}

            <form onSubmit={submitHandler}>
                <input type="text"
                       name="text"
                       placeholder="Enter new comment"
                       value={newComment.text}
                       onChange={changeHandler}
                       />
                       <button type="submit">Submit</button>
            </form>
        </div>
    )

}

export default Comments;
