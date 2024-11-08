import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { BiSolidPen } from 'react-icons/bi';
import {
    Button,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col,
} from 'reactstrap';
import 'assets/css/AddComment.css';

function AddComment({ blogId, onCommentAdded }) {
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newComment, setNewComment] = useState([]);

    // Kullanıcı verilerini almak için fonksiyon
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Kullanıcı yetkilendirme token\'ı bulunamadı.');
            setErrorMessage('Yorum yapmak için lütfen giriş yapın!');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;

            const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsername(response.data.username);
        } catch (error) {
            console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
            if (error.response && error.response.status === 401) {
                setErrorMessage('Yetkilendirme hatası. Token geçersiz olabilir.');
            } else {
                setErrorMessage('Kullanıcı bilgileri alınırken hata oluştu.');
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!username || !commentText) {
            setErrorMessage('Giriş Yapılmadı.');
            return;
        }
    
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('Oturum süreniz doldu. Lütfen tekrar giriş yapın!');
            return;
        }
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/comments/',
                {
                    username: username,
                    comment_text: commentText,
                    blog: blogId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            // Yorum eklenince listeyi güncelle
            setCommentText(''); // Yorum eklendikten sonra alanı temizle
            setErrorMessage(''); // Hata mesajını temizle
            onCommentAdded(); // Yeni yorum eklenince üst bileşene haber ver
        } catch (error) {
            console.error('Yorum eklenirken hata oluştu:', error);
            setErrorMessage('Yorum eklenirken hata oluştu.');
        }
    };
    


    return (
        <Container className="centered-container">
            <Row style={{ width: '100%', justifyContent: 'center' }}>
                <Col md="8" className="comment-form">
                    <h2 className="text-center">-Yorum Ekle-</h2>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <BiSolidPen />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Yorum..."
                                type="textarea"
                                rows="4"
                                className="comment-input"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                        </InputGroup>
                        <p className="comment-warning">
                            "Yorum yaparken etik kurallara uymayı, saygılı bir dil kullanmayı ve küfür, şiddet, kin gibi olumsuz içeriklerden kaçınmayı unutmayın."
                        </p>
                        {errorMessage && <a href='/login-page'><p className="error-message">{errorMessage}</p></a>}
                        <Row>
                            <Col className="text-center">
                                <Button color="danger" size="lg" className="submit-button" type="submit" >
                                    Ekle
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}


export default AddComment;
