import React from "react";
import { Button, Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import BlogCard from "../../Shared/BlogCard";
import "../../Shared/Blogcard.css";
import { Link } from "react-router-dom";

const FeaturedBlogsList = ({ lg, sm, md }) => {
  const { data: featuredBlogs, loading } = useFetch(`blogs/featured`);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {Array.isArray(featuredBlogs) &&
        featuredBlogs.map((blog) => (
          <Col lg={lg} md={md} sm={sm} className="mb-4" key={blog._id}>
            <BlogCard blog={blog} />
          </Col>
        ))}
      <div className="viall__btn">
        <Link to={"/blogs"}>
          <Button className="btn primary__btn">View All Blogs</Button>
        </Link>
      </div>
    </>
  );
};

export default FeaturedBlogsList;
