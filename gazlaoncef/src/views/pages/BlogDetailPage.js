import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IndexNavbar from 'components/Navbars/IndexNavbar';
import CommentList from 'components/BlogDetails/CommentList';
import AddComment from 'components/BlogDetails/AddComment';
import { BiTimeFive, BiSolidPen } from "react-icons/bi";
import axios from 'axios';
import Footer from "components/Footers/Footer";
import BlogReactions from 'components/BlogDetails/BlogReactions';
import ScrollToTop from "react-scroll-to-top";
import MobileMenu from 'components/MainPage/MobileMenu';
import 'assets/css/BlogDetailPage.css';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/blogs/${id}/`);
        setBlog(response.data);
      } catch (error) {
        console.error('Blog detayını çekerken bir hata oluştu!', error);
      }
    };
    fetchBlog();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/comments/?blog_id=${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Yorumları çekerken bir hata oluştu!', error);
    }
  };

  // Yorum eklendiğinde `fetchComments`'i çağırarak yorumları hemen güncelle
  const handleCommentAdded = () => {
    setRefreshComments(prev => !prev); // refreshComments değerini değiştirerek yorumları günceller
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  if (!blog) return <p>Yükleniyor...</p>;

  return (
    <>
      <IndexNavbar />
      <MobileMenu />

      <div className="blog-detail-container">
        <header className="blog-header">
          <img src={blog.blog_img} alt="Blog image" />
        </header>
        <h1 className="blog-title">{blog.blog_title}</h1>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.blog_content }} />
        <div className="blog-info">
          <p><BiTimeFive className="time-icon" /> Son güncelleme: {new Date(blog.update_time).toLocaleString()}</p>
          <p><BiSolidPen className="pen-icon" /> Yazan: {blog.username}</p>
        </div>

        {/* BlogReactions bileşeni */}
        <BlogReactions blogId={blog?.blog_id} className="blog-reactions" />

        {/* Yorum Listesi */}
        <CommentList blogId={blog?.blog_id} refreshComments={refreshComments} />

        <div className="blog-footer">
          <AddComment blogId={blog?.blog_id} onCommentAdded={handleCommentAdded} />
        </div>
      </div>

      <ScrollToTop smooth />
      <Footer />
    </>
  );
};

export default BlogDetailPage;
