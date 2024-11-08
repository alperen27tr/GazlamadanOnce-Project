import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import 'assets/css/CommentList.css';

const CommentList = ({ blogId,refreshComments, comments = [] }) => {
  const [localComments, setLocalComments] = useState(comments);
  const [likedError, setLikedError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/comments/?blog_id=${blogId}`);
        const commentsData = response.data.map((comment) => ({
          id: comment.comment_id,
          username: comment.username,
          text: comment.comment_text,
          create_time: comment.create_time,
          blog: comment.blog,
          profile_image: comment.profile_image,
          likes: comment.likes || 0,
          liked: comment.liked || false,
        }));
        setLocalComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    if (blogId) {
      fetchComments();
    }
  }, [blogId, refreshComments]);  // refreshComments değiştiğinde tekrar veri çekecek
  

  const handleLike = async (index) => {
    const commentId = localComments[index].id;
    const token = localStorage.getItem("token");
  
    try {
      await axios.post(
        `http://127.0.0.1:8000/comments/${commentId}/like/`,
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const newComments = [...localComments];
      newComments[index].likes += 1;
      newComments[index].liked = true;
      setLocalComments(newComments);
      setLikedError(null);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Backend'den gelen hata mesajı:", error.response.data);
        setLikedError("Bu yorumu önceden beğendiniz.");
      } else {
        console.error("Error liking the comment:", error);
      }
    }
  };

  return (
    <ListGroup className="comment-list">
      {likedError && (
        <div className="liked-error">
          {likedError}
        </div>
      )}
      {localComments.length === 0 ? (
        <ListGroupItem>İlk yorum yapan siz olun!</ListGroupItem>
      ) : (
        localComments.map((comment, index) => (
          <ListGroupItem key={comment.id}>
            <Card className="comment-card">
              <CardBody>
                <Row>
                  <Col xs="2">
                    <Avatar
                      alt={comment.username}
                      src={comment.profile_image}
                      style={{ width: 70, height: 70 }}
                    />
                  </Col>
                  <Col xs="10" className="comment-info">
                    <CardTitle tag="h5" className="comment-username">{comment.username}</CardTitle>
                    <small className="text-muted">{new Date(comment.create_time).toLocaleDateString()}</small>
                  </Col>
                </Row>
                <hr />
                <CardText className="comment-text">
                  {comment.text}
                </CardText>

                <div className="like-container">
                  <span
                    className={`like-button ${comment.liked ? 'liked' : ''}`}
                    onClick={() => {
                      if (!comment.liked) {
                        handleLike(index);
                      } else {
                        setLikedError("Bu yorumu daha önce beğendiniz.");
                      }
                    }}
                    role="img"
                    aria-label="like"
                  >
                    👍
                  </span>
                  <span className="like-count">{localComments[index].likes}</span>
                </div>
              </CardBody>
            </Card>
          </ListGroupItem>
        ))
      )}
    </ListGroup>
  );
};

export default CommentList;
