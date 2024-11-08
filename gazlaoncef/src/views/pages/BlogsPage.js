import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import Footer from 'components/Footers/Footer';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Button,
} from 'reactstrap';
import { FaUser } from 'react-icons/fa';
import { BiCalendar } from "react-icons/bi";
import { ImHourGlass } from "react-icons/im";
import ScrollToTop from "react-scroll-to-top";
import 'assets/css/BlogsPage.css';
import MobileMenu from 'components/MainPage/MobileMenu'; 

function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/blogs/');
                const blogsData = response.data.map((blog) => ({
                    id: blog.blog_id,
                    title: blog.blog_title,
                    username: blog.username,
                    create_time: blog.create_time,
                    reading_time: blog.reading_time,
                    blog_img: blog.blog_img
                }));
                setBlogs(blogsData);
                console.log(blogsData);
            } catch (error) {
                console.error('Blogları çekerken bir hata oluştu!', error);
            }
        };

        fetchBlogs();
    }, []);


    const handleRedirect = (id) => {
        navigate(`/blog-detail-page/${id}`);
    };

    return (
        <div>
            <IndexNavbar />
            <MobileMenu />
            <Container className="blogs-container">
                <h2 className="title blogs-title">Bloglar</h2>
                <Row md={3}>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Col md="4" key={blog.id} className="mb-4">
                                <Card className="card-container">
                                    <img
                                        alt="Sample"
                                        src={blog.blog_img}
                                        className="card-image"
                                    />
                                    <CardBody className="card-body">
                                        <CardTitle tag="h5">{blog.title}</CardTitle>
                                        <ListGroup flush>
                                            <ListGroupItem>
                                                <FaUser /> <strong>Yazar:</strong> {blog.username}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <BiCalendar /> <strong>Yazılma Tarihi:</strong>
                                                {new Date(blog.create_time).toLocaleDateString()}
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <ImHourGlass /> <strong>Okuma süresi: </strong>
                                                {blog.reading_time} dakika
                                            </ListGroupItem>
                                        </ListGroup>
                                        <Button color="dark" onClick={() => handleRedirect(blog.id)}>
                                            Devamını oku
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Yükleniyor...</p>
                    )}
                </Row>
            </Container>
            <ScrollToTop smooth />
            <Footer />
        </div>

    );
}

export default BlogsPage;
