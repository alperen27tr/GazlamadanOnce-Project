import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserPen } from "react-icons/fa6";
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Container,
    Row,
    Col,
} from "reactstrap";
import 'assets/css/BlogList.css'; 

const BlogList = () => {
    const [blogs, setBlogs] = useState({ topBlogs: [], latestBlogs: [] });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/blogs/');
                const blogData = response.data.map((blog) => ({
                    id: blog.blog_id,
                    title: blog.blog_title,
                    username: blog.username,
                    create_time: blog.create_time,
                    views_count: blog.views_count,
                    blog_img: blog.blog_img,
                    reading_time: blog.reading_time
                }));

                const sortedBlogsByViews = blogData.sort((a, b) => b.views_count - a.views_count);
                const sortedBlogsByTime = [...blogData].sort((a, b) => new Date(b.create_time) - new Date(a.create_time));

                const topBlogs = sortedBlogsByViews.slice(0, 3);
                const latestBlogs = sortedBlogsByTime.slice(0, 3);

                setBlogs({ topBlogs, latestBlogs });
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const navigate = useNavigate();
    const handleRedirect = (id) => {
        navigate(`/blog-detail-page/${id}`);
    };

    const handleRedirectBlogs = () => {
        navigate(`/blogs-page`);
    };

    return (
        <Container className="container">
            <h2 className="title">En Çok Okunan Bloglar</h2>
            <Row md={3}>
                {blogs.topBlogs.map((blog, index) => (
                    <Col md="4" key={index} className="mb-4">
                        <Card className="card">
                            <img
                                alt="Sample"
                                src={blog.blog_img}
                            />
                            <CardBody className="card-body">
                                <CardTitle tag="h5" className="card-title">{blog.title}</CardTitle>
                                <CardSubtitle className="mb-2 card-subtitle" tag="h6">
                                    <FaUserPen /> {blog.username}
                                </CardSubtitle>
                                <Button onClick={() => handleRedirect(blog.id)}>Devamını oku</Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h2 className="title">Son Eklenen Bloglar</h2>
            <Row md={3}>
                {blogs.latestBlogs.map((blog, index) => (
                    <Col md="4" key={index} className="mb-4">
                        <Card className="card">
                            <img
                                alt="Sample"
                                src={blog.blog_img}
                            />
                            <CardBody className="card-body">
                                <CardTitle tag="h5" className="card-title">{blog.title}</CardTitle>
                                <CardSubtitle className="mb-2 card-subtitle" tag="h6">
                                    <FaUserPen /> {blog.username}
                                </CardSubtitle>
                                <Button onClick={() => handleRedirect(blog.id)}>Devamını oku</Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="center-button">
                <Button onClick={handleRedirectBlogs} className="btn-custom">Daha Fazlası...</Button>
            </div>
        </Container>
    );
};

export default BlogList;
