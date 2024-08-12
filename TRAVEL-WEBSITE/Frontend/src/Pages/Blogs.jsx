import React, { useEffect, useState } from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import BlogCard from "../Shared/BlogCard";
import { BASE_URL } from "../utils/config";
import "../Components/createBlog/createBlog.css";
import axios from "axios";
// import CreateBlog from "../Components/createBlog/CreateBlog";

const Blogs = () => {
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [toggle, setToggle] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blogs data from the API
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs`);
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchBlogs();
  }, [toggle]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error__msg">
        Error loading blog details. Check your network
      </div>
    );
  }

  //create blog

  const handleCreateBlog = async () => {
    await axios
      .post("http://localhost:4000/api/v1/blogs/", {
        photo,
        title,
        content,
        author,
      })
      .then((res) => {
        window.location.reload();
        setToggle((prev) => !prev);
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
    <div>
      <CommonSection title={"All blogs"} />
      <section className="mt-4">
        {/* <CreateBlog /> */}
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
        <Container>
          <Row>
            {loading ? (
              <div className="loader-container">
                <div className="loader" />
                <div className="loading-text">Loading...</div>
              </div>
            ) : (
              blogs.map((blog) => (
                <Col lg="4" md="6" sm="6" className="mb-4" key={blog._id}>
                  <BlogCard blog={blog} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default Blogs;
