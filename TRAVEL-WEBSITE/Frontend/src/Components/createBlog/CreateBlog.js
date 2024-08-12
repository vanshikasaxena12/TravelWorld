import React, { useState } from "react";
import "./createBlog.css";
import axios from "axios";
const CreateBlog = () => {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  //get userdata
  const handleCreateBlog = async () => {
    await axios
      .post("http://localhost:4000/api/v1/blogs/", {
        photo,
        title,
        content,
        author,
      })
      .then((res) => {
        alert("Blog Publiced Successfully!");
        setTitle("");
        setContent("");
        setPhoto("");
        setAuthor("");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      <div className="container">
        <h2 className="services__title">Publice your blog!</h2>
        <div className="row">
          <div className="form-data">
            <div>
              <input
                type="text"
                name="photo"
                className="title-input"
                placeholder="enter img link"
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="title"
              className="title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="author"
              className="title-input"
              onChange={(e) => setAuthor(e.target.value)}
            />

            <button
              className="btn primary__btn btn btn-secondary"
              onClick={handleCreateBlog}
            >
              Publish
            </button>
          </div>

          <textarea
            className="text-area"
            cols="30"
            rows="5"
            placeholder="Tell your story......"
            onChange={(e) => setContent(e.target.value)}
            style={{ marginLeft: "2rem", marginTop: "10px" }}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
